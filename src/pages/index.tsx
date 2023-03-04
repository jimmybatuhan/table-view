import StudentTable from "@/components/StudentTable";
import useStudents from "@/hooks/useStudents";

export default function Home() {
    const { students, isLoading, hasError, error } = useStudents();

    if (isLoading) {
        return (
            <div className="mt-3 p-4 mb-4 text-xl bg-gray-800 text-blue-300" role="alert">
                Loading...
            </div>
        );
    }

    if (hasError && !isLoading) {
        return <h1>{error}</h1>;
    }

    return <StudentTable students={students} />;
}
