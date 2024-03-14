
export const getItem = (key) => {
    const value = localStorage.getItem(key);
    if(value && value[0] === "{"){
       try {
              return JSON.parse(value);
       }catch (e){
              return value;
       }
    }
    return value;
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
