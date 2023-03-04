import React, { useMemo } from "react";

const Avatar: React.FC<{ img: string | null; height: number; width: number }> = ({ img }) => {
    const _url = useMemo(() => (typeof img === "string" ? `/assets/${img}` : `/assets/default.jpg`), [img]);

    return <img className={`h-28 w-28 object-cover`} alt={_url} src={_url} />;
};

export default Avatar;
