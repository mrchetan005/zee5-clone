

export const debounce = (callback, wait = 1000) => {
    let timerId;
    return (...args) => {
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(() => {
            callback(...args);
        }, wait);
    }
}
