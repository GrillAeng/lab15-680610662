import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import { courses,currentStudent, enrollments as initialEnrollments} from "@/lib/mock-data";
import { useState } from "react";
import type { Enrollment } from "@/lib/types";

export default function EnrollmentPage() {
  const [student, setStudent] = useState(currentStudent);
  const [enrollments, setEnrollments] = useState<Enrollment[]>(initialEnrollments);

  const addCourse = (courseId: string) => {
    currentStudent.courses = [
      ...(currentStudent.courses ?? []),
      courseId,
    ];
    setStudent({ ...currentStudent });
   setEnrollments((prev) => [
      ...prev,
      {
        studentId: currentStudent.studentId,
        courseId,
        enrolledAt: new Date().toISOString(),
      },
    ]);
  };

  const deleteCourse = (courseId: string) => {
    currentStudent.courses =
      currentStudent.courses?.filter(
        (id) => id !== courseId
      );

    setStudent({ ...currentStudent });
  setEnrollments((prev) =>
      prev.filter(
        (e) =>
          !(e.studentId === currentStudent.studentId && e.courseId === courseId)
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-xl font-semibold">
          รายวิชาทั้งหมด
        </h1>

        <RegisterDialog onRegister={addCourse} />
      </div>
      <div className="flex flex-col gap-4">
        {courses.map((course) => {
          const enrollment = enrollments.find(
            (e) =>
              e.studentId === student.studentId &&
              e.courseId === course.courseId
          );
          return (
            <CourseCard
              key={course.courseId}
              course={course}
              student={student}
              onDelete={deleteCourse}
              enrolledAt={enrollment?.enrolledAt}
            />
          );
        })}
      </div>
    </div>
  );
}