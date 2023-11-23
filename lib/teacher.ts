export const isTeacher = (userId?: string | null) => {
  const teacherId1 = process.env.NEXT_PUBLIC_TEACHER_ID_1;
  const teacherId2 = process.env.NEXT_PUBLIC_TEACHER_ID_2;

  return (userId === teacherId1 || userId === teacherId2)

  
};
