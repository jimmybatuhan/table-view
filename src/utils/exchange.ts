export async function formatAndConvert(controller: AbortController, base = "USD", target = "USD", amount: number): Promise<number> {
    try {
        /** added this to save requests in the api */
        if (target === "USD") {
            return amount;
        }

        const api_key = "679aae77947f03c9abd287ec";
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${api_key}/pair/${base}/${target}`, {
            signal: controller.signal
        });
        const conversion = (await response.json()).conversion_rate as number;

        return amount * conversion;

    } catch (e) {
        return NaN;
    }
}
