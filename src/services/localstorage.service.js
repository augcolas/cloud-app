
export const getItem = (key) => {
    return localStorage.getItem(key);
}

export const setItem = (key, value) => {
    if(typeof value === "object"){
        value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
}

export const removeItem = (key) => {
    localStorage.removeItem(key);
}
