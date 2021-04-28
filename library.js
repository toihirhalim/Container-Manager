export const setLocalObject = (name, items) => {
    if (items)
        localStorage.setItem(name, JSON.stringify(items))
}

export const getLocalObject = name => {
    const stringObject = localStorage.getItem(name)
    return JSON.parse(stringObject)
}

export const clearLocalStorage = () => {
    localStorage.clear()
}
