import { Student } from "next";
import { useRouter } from "next/router";
import Avatar from "@/components/Avatar";
import CoursesTable from "@/components/CoursesTable";
import React, { useEffect, useState } from "react";
import useCourses from "@/hooks/useCourses";
import useStudents from "@/hooks/useStudents";
import Link from "next/link";

const Profile = () => {
    const { query } = useRouter();
    const { id } = query;
    const [student, setStudent] = useState<Student>();
    const {
        courses,
        isLoading: coursesIsLoading,
        hasError: coursesHasError,
        error: coursesError,
    } = useCourses(id as string);
    const {
        isLoading: studentsIsLoading,
        hasError: studentHasError,
        error: studentsError,
        students,
    } = useStudents(id as string);

    useEffect(() => {
        setStudent(students.at(0));
    }, [students]);

    if (studentsIsLoading && coursesIsLoading) {
        return (
            <div className="mt-3 p-4 mb-4 text-xl bg-gray-800 text-blue-300" role="alert">
                Loading...
            </div>
        );
    }

    if (studentHasError || (coursesHasError && !studentsIsLoading && !coursesIsLoading)) {
        return (
            <>
                <h1>{studentsError}</h1>
                <h1>{coursesError}</h1>
            </>
        );
    }

    return (
        <div className="flex flex-row space-x-5">
            <div className="w-4/12">
                {student !== undefined && (
                    <div className="flex flex-col items-center justify-center space-y-3 bg-gray-700 mt-6 rounded-lg p-5">
                        <Avatar img={student.details.user_img} height={100} width={100} />
                        <div className="text-gray-200 text-sm">
                            Name:{" "}
                            <span className="text-white font-semibold">
                                {student.name} {student.nickname.length > 0 && <>({student.nickname})</>}
                            </span>
                        </div>
                        <div className="text-gray-200 text-sm">
                            Major: <span className="text-white font-semibold">{student.current_major}</span>
                        </div>
                        <div className="text-gray-200 text-sm">
                            Year: <span className="text-white font-semibold">{student.details.year}</span>
                        </div>
                        <div className="text-gray-200 text-sm">
                            Good: <span className="text-white font-semibold">{student.recent_status}</span>
                        </div>
                    </div>
                )}

                <Link href="/">
                    <button
                        type="button"
                        className="text-white mt-3 w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                        Student List
                    </button>
                </Link>
            </div>
            <div className="w-8/12">
                {courses.length > 0 && !coursesIsLoading && !coursesHasError ? (
                    <CoursesTable courses={courses} />
                ) : (
                    <div className="mt-3 p-4 mb-4 text-xl bg-gray-800 text-red-300" role="alert">
                        No courses found...
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
