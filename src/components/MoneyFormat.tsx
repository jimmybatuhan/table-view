import { formatAndConvert } from "@/utils/exchange";
import React, { memo, useEffect, useMemo, useState } from "react";

const MoneyFormat: React.FC<{ base: string; target: string; amount: number }> = ({ base, target, amount }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [convertedAmount, setConvertedAmount] = useState(amount);
    const formatter = useMemo(() => new Intl.NumberFormat("en-US", { style: "currency", currency: target }), [target]);

    useEffect(() => {
        setIsLoading(true);
        const controller = new AbortController();

        const convert = async () => {
            const _convertedAmount = await formatAndConvert(controller, base, target, amount);
            setConvertedAmount(_convertedAmount);
            setIsLoading(false);
        };
        convert();

        return () => {
            controller.abort();
        };
    }, [base, target, amount]);

    if (isLoading) {
        return <>converting...</>;
    }

    return <>{!Number.isNaN(convertedAmount) ? formatter.format(convertedAmount) : "can't convert amount"}</>;
};

export default memo(MoneyFormat);
