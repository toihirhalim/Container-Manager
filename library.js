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

const generatePallet = (pName, pLength, pWidth) => {
    const newPallet = document.createElement('div')
    const p = document.createElement('p')
    const sideLineContainer = document.createElement('div')
    const bottomLineContainer = document.createElement('span')
    const sideLineText = document.createElement('span')
    const bottomLineText = document.createElement('div')
    const sideLine = document.createElement('div')
    const bottomLine = document.createElement('div')
    const sideLineArrowStart = document.createElement('div')
    const sideLineArrowEnd = document.createElement('div')
    const bottomLineArrowStart = document.createElement('div')
    const bottomLineArrowEnd = document.createElement('div')

    // p
    p.innerText = pName;
    newPallet.appendChild(p)

    // side line
    sideLineContainer.classList.add('dimentions', 'side-line-container')
    sideLineText.innerText = pWidth + 'm';
    sideLineContainer.appendChild(sideLineText)
    sideLine.classList.add('line', 'side-line')
    sideLineArrowStart.classList.add('arrow', 'arrow-start')
    sideLineArrowEnd.classList.add('arrow', 'arrow-end')
    sideLine.appendChild(sideLineArrowStart)
    sideLine.appendChild(sideLineArrowEnd)
    sideLineContainer.appendChild(sideLine)

    // bottom line
    bottomLineContainer.classList.add('dimentions', 'bottom-line-container')
    bottomLineText.innerText = pLength + 'm';
    bottomLineContainer.appendChild(bottomLineText)
    bottomLine.classList.add('line', 'bottom-line')
    bottomLineArrowStart.classList.add('arrow', 'arrow-start')
    bottomLineArrowEnd.classList.add('arrow', 'arrow-end')
    bottomLine.appendChild(bottomLineArrowStart)
    bottomLine.appendChild(bottomLineArrowEnd)
    bottomLineContainer.appendChild(bottomLine)

    // pallet
    newPallet.classList.add('pallet')
    newPallet.style.width = pLength * 100 + 'px'
    newPallet.style.height = pWidth * 100 + 'px'
    newPallet.appendChild(sideLineContainer)
    newPallet.appendChild(bottomLineContainer)

    return newPallet
}