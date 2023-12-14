export const isTeacher = (userId?: string | null) => {
  const teacherId1 = process.env.NEXT_PUBLIC_TEACHER_ID_1;
  const teacherId2 = process.env.NEXT_PUBLIC_TEACHER_ID_2;
  
  return (userId === teacherId1 || userId === teacherId2 )

};

// || userId ===  teacherId3 || userId ===  teacherId4 || userId ===  teacherId5
