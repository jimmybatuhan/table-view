import { _fetch } from "@/utils/fetch";
import { Course } from "next";
import { useEffect, useState } from "react";

function useCourses(userId?: string) {
    const courseSource = "https://run.mocky.io/v3/34bdbb5f-70c0-41ce-aa0c-2bf46befa477";
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState<string>();
    const [courses, setCourses] = useState<Course[]>([]);

    function getStudentCourses(userId: string) {
        return courses.filter(course => course.user_id === userId);
    }

    useEffect(() => {
        const { response, controller } = _fetch(courseSource);

        setIsLoading(true);

        response
            .then(response => {
                if (!response.ok) {
                    setHasError(true);
                    setError("Failed to fetch courses");
                }
                return response;
            })
            .then(response => response.json())
            .then((response: Course[]) => {
                let courses: Course[] = userId === undefined
                    ? response
                    : response.filter(course => course.user_id === userId);

                setCourses(courses);
            })
            .finally(() => setIsLoading(false));

        return () => {
            controller.abort();
        };
    }, [userId]);


    return { courses, getStudentCourses, isLoading, hasError, error };
}

export default useCourses;
