export function _fetch(url: string) {
    const controller = new AbortController();

    return {
        response: fetch(url, { signal: controller.signal }),
        controller: controller
    };

}
