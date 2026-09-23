import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { currentStudent,courses } from "@/lib/mock-data";
import type { Course, Student } from "@/lib/types";
type RegisterDialogProps = {
  onRegister: (courseId: string) => void;
};

export function RegisterDialog({ onRegister }: RegisterDialogProps) {
  const [open, setOpen] = useState(false); // true = แสดง Dialog
  const [courseId, setCourseId] = useState("");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault(); // ไม่ให้หน้าเว็บ reload
    if (courseId) {
      onRegister(courseId);
    }
    setCourseId(""); // เคลียร์ฟอร์ม
    setOpen(false); // ปิด Dialog
  }

  const availableCourses = courses.filter(
    (course) => !currentStudent.courses?.includes(course.courseId)
  );

  return (
    <Dialog
  open={open}
  onOpenChange={(isOpen) => {
    setOpen(isOpen);
    if (!isOpen) {
      setCourseId("");
    }
  }}
>
      <DialogTrigger>
        <Button>ลงทะเบียน</Button>
      </DialogTrigger>

      {/* ฟอร์มที่แสดงออกมาเมื่อกดปุ่ม */}
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>
            <DialogDescription>เลือกวิชาที่ต้องการลงทะเบียน แล้วกรอกข้อมูลให้ครบ</DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="course-select">วิชา</Label>
            <Select id="course-select"
            value={courseId}
            onValueChange={(value) => {
            if (value !== null) {
              setCourseId(value);
            }
            }}>
            <SelectTrigger className="w-full" >
            {courseId ? (
              <span className="block max-w-[350px] truncate text-left">
                {(() => {
                  const selectedCourse = courses.find(
                    (course) => course.courseId === courseId
                  );
                  return selectedCourse
                    ? `${selectedCourse.courseId} - ${selectedCourse.courseTitle}`
                    : "เลือกวิชา";
                })()}
                </span>
              ) : (
                <span className="text-muted-foreground">
                  เลือกวิชา
                </span>
              )}
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                   <SelectGroup >
                   {availableCourses.map((course) => (
                    <SelectItem key={course.courseId} value={course.courseId}>
                      <span className="whitespace-normal">
                        {course.courseId} - {course.courseTitle}
                      </span>
                     </SelectItem>
                    ))}
                   </SelectGroup>
               </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-time">เวลา</Label>
            <Input id="register-time" type="time" defaultValue={new Date().toLocaleTimeString("en-GB", {hour: "2-digit",minute: "2-digit"})} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="Student">ชื่อ นศ.</Label>
            <Input
                id="Student"
                value={`${currentStudent.firstName} ${currentStudent.lastName}`}
                readOnly
                className="border-input"
              />
          </div>

          <div className="space-y-2">
            <Label htmlFor="Program">โปรแกรม</Label>
            <Input
                id="Program"
                value={currentStudent.program}
                readOnly
                className="border-input"
              />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!courseId}>
              ยืนยันการลงทะเบียน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
