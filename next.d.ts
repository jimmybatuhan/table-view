export type StudentStatus = {
    date: string;
    type: number;
};

export type Profile = {
    id: number,
    user_id: string;
    user_img: string | null;
    major: string;
    year: string;
    status: StudentStatus[];
};

export interface Student {
    email: string;
    id: number;
    name: string;
    nickname: string;
    phone: string;
    current_major: string;
    recent_status: string;
    details: Profile;
};

export interface Course {
    course_fee: number;
    course_name: string;
    course_selection: string;
    id: number;
    semester_code: string;
    user_id: string,
}


export type StudentCourse = Student & Course;
