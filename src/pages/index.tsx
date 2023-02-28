import Table from "@/components/Table";
import useStudentCourses from "@/hooks/useStudentCourses";

export default function Home() {
    const { studentCourses, isLoading, hasError, error } = useStudentCourses();

    return (
        <>
            <main>
                {error?.toString()}
                {!isLoading && !hasError ? <Table studentCourses={studentCourses} /> : <h1>Loading...</h1>}
            </main>
        </>
    );
}
