import { _fetch } from "@/utils/fetch";
import React, { useEffect, useState } from "react";

const CurrenciesDropdown: React.FC<{ onChange: (c: string) => void }> = ({ onChange }) => {
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const { response, controller } = _fetch(
            "https://gist.githubusercontent.com/JCGonzaga01/9f93162c5fb799b7c084bb28fc69a2f1/raw/94c55f89dc4c1e2e7ca49de5658c3441a2b348af/Updated-Common-Currency.json",
        );

        response
            .then((r) => r.json())
            .then((data) => setCurrencies(Object.keys(data)))
            .catch(() => setHasError(true));

        return () => {
            controller.abort();
        };
    }, []);

    if (hasError) {
        return <>failed to fetch currencies...</>;
    }

    return (
        currencies &&
        !hasError && (
            <div className="my-5">
                <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Convert Currency</label>
                <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue="USD"
                    onChange={(e) => onChange(e.target.value)}
                >
                    {currencies.map((currency) => (
                        <option value={currency} key={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>
        )
    );
};

export default CurrenciesDropdown;
