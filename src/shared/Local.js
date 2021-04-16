const getLocal = (name) => {
    localStorage.getItem(`${name}`);
}

const setLocal = (name, value) => {
    localStorage.setItem(`${name}`, `${value}`);
}

const deleteLocal = (name) => {
    localStorage.removeItem(`${name}`);
}

export {getLocal, setLocal, deleteLocal};