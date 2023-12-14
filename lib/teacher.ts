export const isTeacher = (userId?: string | null) => {
  const teacherIds = [
    process.env.NEXT_PUBLIC_TEACHER_ID_1,
    process.env.NEXT_PUBLIC_TEACHER_ID_2,
    process.env.NEXT_PUBLIC_TEACHER_ID_3,
    process.env.NEXT_PUBLIC_TEACHER_ID_4,
    process.env.NEXT_PUBLIC_TEACHER_ID_5,
    

    
  ];

 
  return userId !== null && userId !== undefined && teacherIds.includes(userId);
};

/*export const isTeacher = (userId?: string | null) => {
  const teacherId1 = process.env.NEXT_PUBLIC_TEACHER_ID_1;
  const teacherId2 = process.env.NEXT_PUBLIC_TEACHER_ID_2;
  const teacherId3 = process.env.NEXT_PUBLIC_TEACHER_ID_3;
  const teacherId4 = process.env.NEXT_PUBLIC_TEACHER_ID_4;
  //const teacherId5 = process.env.NEXT_PUBLIC_TEACHER_ID_5;
  
  return (userId === teacherId1 || userId === teacherId2  || userId ===  teacherId3 && userId ===  teacherId4 )

};

// || userId ===  teacherId3 || userId ===  teacherId4 || userId ===  teacherId5
*/