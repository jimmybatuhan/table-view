
export interface Student {
    id: number;
    name: string;
    phone: string;
    email: string;
}

export interface Course {
    id: number;
    user_id: number,
    course_selection: string;
    course_name: string;
    semester: string;
    semester_fee: number;
}

export type StudentCourse = Student & Course;
