import { StudentCourse } from "next";
import React, { useEffect, useState } from "react";
import CurrenciesDropdown from "./CurrenciesDropdown";
import MoneyFormat from "./MoneyFormat";

const Table: React.FC<{ studentCourses: StudentCourse[] }> = ({ studentCourses }): JSX.Element => {
    const [data, setData] = useState<Array<StudentCourse>>(studentCourses);
    const [targetCurrency, setTargetCurrency] = useState("USD");
    const [baseCurrency, setBaseCurrency] = useState("USD");
    const [sortedColumn, setSortedColumn] = useState<"name" | "phone" | "email">("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const SortIcon = () => <>&nbsp;{sortOrder === "asc" ? "\u2191" : "\u2193"}</>;

    function setSort(column: "phone" | "email" | "name") {
        setSortedColumn(column);
        setSortOrder((c) => (c === "asc" ? "desc" : "asc"));
    }

    function searchDataSet(keyword: string) {
        setData(
            keyword.length <= 0
                ? studentCourses
                : studentCourses.filter(
                      ({ name, phone, email }) =>
                          name.toLocaleLowerCase().includes(keyword) ||
                          phone.toLocaleLowerCase().includes(keyword) ||
                          email.toLocaleLowerCase().includes(keyword),
                  ),
        );
    }

    useEffect(() => {
        const _data = [...data].sort((x, y) => {
            if (sortOrder === "desc") {
                if (x[sortedColumn] > y[sortedColumn]) {
                    return -1;
                }
            } else if (sortOrder === "asc") {
                if (x[sortedColumn] < y[sortedColumn]) {
                    return -1;
                }
            }
            return 0;
        });

        setData(_data);
    }, [sortedColumn, sortOrder, data]);

    return (
        <div style={{ padding: 10, margin: "auto", width: "50%" }}>
            <div style={{ display: "flex", marginBottom: 10 }}>
                <input
                    placeholder="Search"
                    onChange={(e) => searchDataSet(e.target.value)}
                    style={{ marginRight: 10 }}
                />
                <CurrenciesDropdown
                    onChange={(c) => {
                        setBaseCurrency(targetCurrency);
                        setTargetCurrency(c);
                    }}
                />
            </div>
            {data.length > 0 ? (
                <table border={1}>
                    <thead>
                        <tr>
                            <th onClick={() => setSort("name")}>Name {sortedColumn === "name" && <SortIcon />}</th>
                            <th onClick={() => setSort("phone")}>Phone {sortedColumn === "phone" && <SortIcon />}</th>
                            <th onClick={() => setSort("email")}>Email {sortedColumn === "email" && <SortIcon />}</th>
                            <th>Course Name </th>
                            <th>Course Selection </th>
                            <th>Semester </th>
                            <th>Semester Fee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((course, i) => (
                            <tr key={i}>
                                <td>{course.name}</td>
                                <td>{course.phone}</td>
                                <td>{course.email}</td>
                                <td>{course.course_name}</td>
                                <td>{course.course_selection}</td>
                                <td>{course.semester}</td>
                                <td>
                                    <MoneyFormat
                                        base={baseCurrency}
                                        target={targetCurrency}
                                        amount={course.semester_fee}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h1>No data found...</h1>
            )}
        </div>
    );
};

export default Table;
