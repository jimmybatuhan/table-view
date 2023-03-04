import React, { useMemo } from "react";

const Avatar: React.FC<{ img: string | null; height: number; width: number }> = ({ img, height, width }) => {
    const _url = useMemo(() => (typeof img === "string" ? `/assets/${img}` : `/assets/default.jpg`), [img]);

    return <img className={`h-${height} w-${width} object-cover`} alt={_url} src={_url} />;
};

export default Avatar;
