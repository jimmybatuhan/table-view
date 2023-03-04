import { Student } from "next";
import React, { useState } from "react";
import Link from "next/link";
import useCourses from "@/hooks/useCourses";
import SortIcon from "./SortIcon";
import Avatar from "./Avatar";

const Table: React.FC<{ students: Student[] }> = ({ students }): JSX.Element => {
    const [data, setData] = useState<Student[]>(students);
    const [sortedColumn, setSortedColumn] = useState<"name" | "current_major" | "recent_status">();
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">();
    const { getStudentCourses, isLoading, hasError, error } = useCourses();

    function setSort(column: "name" | "current_major" | "recent_status") {
        let order = sortOrder;
        let _data = [...data];

        if (sortOrder === undefined) {
            order = "desc";
        } else if (sortOrder === "desc") {
            order = "asc";
        } else {
            order = undefined;
        }

        _data =
            order !== undefined
                ? _data.sort((x, y) =>
                      (order === "desc" && x[column] > y[column]) || (order === "asc" && x[column] < y[column])
                          ? -1
                          : 0,
                  )
                : students;

        setSortedColumn(column);
        setSortOrder(order);
        setData(_data);
    }

    function searchDataSet(keyword: string) {
        setData(
            keyword.length <= 0
                ? students
                : students.filter(
                      ({ name, phone, email, recent_status, nickname, details: { major } }) =>
                          name.toLocaleLowerCase().includes(keyword) ||
                          phone.toLocaleLowerCase().includes(keyword) ||
                          email.toLocaleLowerCase().includes(keyword) ||
                          recent_status.toLocaleLowerCase().includes(keyword) ||
                          major.toLowerCase().includes(keyword) ||
                          nickname.toLowerCase().includes(keyword),
                  ),
        );
    }

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

    return (
        <React.Fragment>
            <div className="my-5">
                <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Search Student</label>
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                    onChange={(e) => searchDataSet(e.target.value)}
                />
            </div>
            {data.length ? (
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-white">
                            <th></th>
                            <th className="py-3" onClick={() => setSort("name")}>
                                Name {sortedColumn === "name" && <SortIcon order={sortOrder} />}
                            </th>
                            <th className="py-3">Phone</th>
                            <th className="py-3">Email</th>
                            <th className="py-3" onClick={() => setSort("current_major")}>
                                Major {sortedColumn === "current_major" && <SortIcon order={sortOrder} />}
                            </th>
                            <th className="py-3" onClick={() => setSort("recent_status")}>
                                Status {sortedColumn === "recent_status" && <SortIcon order={sortOrder} />}
                            </th>
                            <th className="py-3">Total Course</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((student, i) => (
                            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={i}>
                                <td className="px-3 py-3">
                                    <Avatar height={12} width={12} img={student.details.user_img} />
                                </td>
                                <td>
                                    <Link className="text-blue-200 underline" href={`/${student.details.user_id}`}>
                                        {student.name} {student.nickname.length > 0 ? `(${student.nickname})` : ""}
                                    </Link>
                                </td>
                                <td>{student.phone}</td>
                                <td>{student.email}</td>
                                <td>{student.current_major}</td>
                                <td>{student.recent_status}</td>
                                <td className="text-center">{getStudentCourses(student.details.user_id).length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h1>
                    {hasError ? (
                        error
                    ) : (
                        <div className="mt-3 p-4 mb-4 text-xl bg-gray-800 text-red-300" role="alert">
                            No data found...
                        </div>
                    )}
                </h1>
            )}
        </React.Fragment>
    );
};

export default Table;
