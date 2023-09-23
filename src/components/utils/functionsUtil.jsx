

export const debounce = (callback, wait = 1000) => {
    let timerId;
    return (...args) => {
        console.log('hello');
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(() => {
            callback(...args);
        }, wait);
    }
}

export const throttle = (callback, wait = 1000) => {
    let startTime = 0;
    return (...args) => {
        const currentTime = Date.now();
        if (currentTime - wait < startTime) return;
        callback(...args);
        startTime = currentTime;
    }
}