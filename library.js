const setLocalObject = (name, items) => {
    if (items)
        localStorage.setItem(name, JSON.stringify(items))
}

const getLocalObject = name => {
    const stringObject = localStorage.getItem(name)
    return JSON.parse(stringObject)
}

const clearLocalStorage = () => {
    localStorage.clear()
}
