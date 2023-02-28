import React, { useEffect, useState } from "react";

const CurrenciesDropdown: React.FC<{ onChange: (c: string) => void }> = ({ onChange }) => {
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        fetch(
            "https://gist.githubusercontent.com/JCGonzaga01/9f93162c5fb799b7c084bb28fc69a2f1/raw/94c55f89dc4c1e2e7ca49de5658c3441a2b348af/Updated-Common-Currency.json",
            { signal: controller.signal },
        )
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
            <select defaultValue="USD" onChange={(e) => onChange(e.target.value)}>
                {currencies.map((currency) => (
                    <option value={currency} key={currency}>
                        {currency}
                    </option>
                ))}
            </select>
        )
    );
};

export default CurrenciesDropdown;
