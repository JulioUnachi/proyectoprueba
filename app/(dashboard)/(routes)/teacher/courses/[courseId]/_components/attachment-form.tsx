"use client"
import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, File, Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-uploads";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachmentForm = ({
  initialData,
  courseId
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Utilizamos toast.promise para la notificación de éxito
      await toast.promise(
        axios.post(`/api/courses/${courseId}/attachments`, values),
        {
          loading: 'Guardando...',
          success: <b>Archivos  Adjunto subido</b>,
          error: <b>No se pudo guardar.</b>,
        }
      );

      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Algo salió mal");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      // Utilizamos toast.promise para la notificación de éxito
      await toast.promise(
        axios.delete(`/api/courses/${courseId}/attachments/${id}`),
        {
          loading: 'Eliminando...',
          success: <b>Archivo adjunto eliminado</b>,
          error: <b>No se pudo eliminar.</b>,
        }
      );
      router.refresh();
    } catch {
      toast.error("Algo salió mal");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-justify-between">
        Archivos adjuntos del curso
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancelar</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Añadir un archivo
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              Aún no hay archivos adjuntos
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">
                    {attachment.name}
                  </p>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      onClick={() => onDelete(attachment.id)}
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Añada todo lo que sus alumnos puedan necesitar para completar el curso.
          </div>
        </div>
      )}
    </div>
  );
};
