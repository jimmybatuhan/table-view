import { Course, Student, StudentCourse, } from "next";
import { useEffect, useState } from "react";

const studentSource =
    "https://gist.githubusercontent.com/JCGonzaga01/36a8af85464d998221c71ea3eaa57225/raw/6fe851e029ee98e9ec85ceb87433ed5ed0f06e36/users.json";
const courseSource =
    "https://gist.githubusercontent.com/JCGonzaga01/9c9e3590fb23274263678b6c4bcf9963/raw/600c8281f9db7eaba959a732912eba350bf7387d/user-course-selection.json";

function useStudentCourses() {
    const [studentCourses, setStudentCourses] = useState<Array<StudentCourse>>([]);
    const [error, setError] = useState<string>();
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function fetchData() {
        setIsLoading(true);
        setHasError(false);

        const controller = new AbortController();

        Promise.all([
            fetch(courseSource, {
                signal: controller.signal,
            }),
            fetch(studentSource, {
                signal: controller.signal,
            }),
        ])
            .then((p) => p.map((res) => res.json()))
            .then(async (p) => {
                const courses: Course[] = await p[0];
                const students: Student[] = await p[1];
                const studentCourses = courses.map((course) => ({
                    ...(students.find((student) => student.id === course.user_id) as Student),
                    ...course,
                }));

                setStudentCourses(studentCourses);
            })
            .catch((reason) => {
                setHasError(true);
                setError(reason);
            })
            .finally(() => setIsLoading(false));

        return { controller };
    }

    useEffect(() => {
        const { controller } = fetchData();

        return () => {
            controller.abort();
        };
    }, []);

    return { studentCourses, isLoading, hasError, error };
}

export default useStudentCourses;
