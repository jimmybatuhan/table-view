import { _fetch } from "@/utils/fetch";
import { Profile, Student } from "next";
import { useEffect, useState } from "react";

function useStudents(userId?: string) {
    const studentsSource = "https://run.mocky.io/v3/79ebd782-efd6-469b-8dd5-663cf03406ad";
    const studentProfileSource = "https://run.mocky.io/v3/214aef9d-b18a-4188-b55f-a25046408a7e";
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState<string>();
    const [students, setStudents] = useState<Student[]>([]);

    function getStudent(userId: string) {
        return students.find(student => student.details.user_id === userId);
    }

    function getStatusFromType(type?: number) {
        switch (type) {
            case 1:
                return "Good";
            case 2:
                return "Probation";
            case 3:
                return "Inactive";
            default:
                return "Withdrawn";
        }
    }

    useEffect(() => {
        const { response: studentResponse, controller: studentController } = _fetch(studentsSource);
        const { response: profileResponse, controller: profileController } = _fetch(studentProfileSource);

        setIsLoading(true);

        Promise.all([studentResponse, profileResponse])
            .then(responses => {
                if (!responses.some(response => response.ok)) {
                    setHasError(true);
                    setError("Failed to fetch students");
                }
                return responses;
            })
            .then(responses => responses.map((r) => r.json()))
            .then(async responses => {
                let students: Omit<Student, "status" | "profile">[] = await responses.at(0);
                const profiles: Profile[] = await responses.at(1);

                if (userId !== undefined) {
                    students = students.filter(student => `user_${student.id}` === userId);
                }

                setStudents((students.map(student => {
                    const profile = profiles
                        .find(profile => profile.user_id === `user_${student.id}`) as Profile;
                    const recentStatus = profile.status
                        .sort((c, n) => new Date(c.date).getTime() > (new Date(n.date)).getTime() ? -1 : 0)
                        ?.at(0);

                    return {
                        ...student,
                        current_major: profile.major,
                        recent_status: getStatusFromType(recentStatus?.type),
                        details: profile
                    };
                })));
            })
            .finally(() => setIsLoading(false));

        return () => {
            profileController.abort();
            studentController.abort();
        };
    }, [userId]);

    return { students, getStudent, isLoading, hasError, error };
}

export default useStudents;
