import { Course } from "next";
import React, { useMemo, useState } from "react";
import SortIcon from "./SortIcon";
import MoneyFormat from "./MoneyFormat";
import CurrenciesDropdown from "./CurrenciesDropdown";

const CoursesTable: React.FC<{ courses: Course[] }> = ({ courses }) => {
    const data = useMemo(() => courses, [courses]);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>();
    const [semesterCodes, setSemesterCodes] = useState(getUniqueSemesterCodes);
    const [baseCurrency, setBaseCurrency] = useState("USD");
    const [targetCurrency, setTargetCurrency] = useState("USD");

    function getUniqueSemesterCodes() {
        return courses.filter((course, i) => courses.indexOf(course) === i).map((course) => course.semester_code);
    }

    function setSort() {
        let order = sortOrder;
        let _semesterCodes = [...semesterCodes];

        if (sortOrder === undefined) {
            order = "desc";
        } else if (sortOrder === "desc") {
            order = "asc";
        } else {
            order = undefined;
        }

        _semesterCodes =
            order !== undefined
                ? _semesterCodes.sort((x, y) => ((order === "desc" && x > y) || (order === "asc" && x < y) ? -1 : 0))
                : getUniqueSemesterCodes();

        setSemesterCodes(_semesterCodes);
        setSortOrder(order);
    }

    return (
        <div>
            <CurrenciesDropdown
                onChange={(c) => {
                    setBaseCurrency(targetCurrency);
                    setTargetCurrency(c);
                }}
            />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left dark:text-gray-400">
                    <thead className="text-white text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-4" onClick={setSort}>
                                Semester Code <SortIcon order={sortOrder} />
                            </th>
                            <th className="px-6 py-4">Course Name</th>
                            <th className="px-6 py-4">Course Selection</th>
                            <th className="px-6 py-4">Course Fee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {semesterCodes.map((semesterCode, i) =>
                            data
                                .filter((course) => course.semester_code === semesterCode)
                                .map((course, i) => (
                                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={i}>
                                        <td className="px-6 py-4">{i === 0 && <>{semesterCode}</>}</td>
                                        <td className="px-6 py-4">{course.course_name}</td>
                                        <td className="px-6 py-4">{course.course_selection}</td>
                                        <td className="px-6 py-4">
                                            <MoneyFormat
                                                base={baseCurrency}
                                                target={targetCurrency}
                                                amount={course.course_fee}
                                            />
                                        </td>
                                    </tr>
                                )),
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CoursesTable;
