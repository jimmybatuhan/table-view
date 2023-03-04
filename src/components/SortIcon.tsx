import React from "react";

const SortIcon: React.FC<{ order?: "asc" | "desc" }> = ({ order }) => {
    return <>{order !== undefined ? <>&nbsp;{order === "asc" ? "\u2191" : "\u2193"}</> : <></>}</>;
};

export default SortIcon;
