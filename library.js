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

const generateLine = (dimension, isSideLine) => {
    const lineContainer = document.createElement('div')
    const lineText = document.createElement('span')
    const line = document.createElement('div')
    const lineArrowStart = document.createElement('div')
    const lineArrowEnd = document.createElement('div')

    let lineType = isSideLine ? 'side' : 'bottom'

    lineText.innerText = dimension + "m"

    lineArrowStart.classList.add('arrow', 'arrow-start')
    lineArrowEnd.classList.add('arrow', 'arrow-end')

    lineContainer.classList.add('dimensions', lineType + '-line-container')
    line.classList.add('line', lineType + '-line')

    line.appendChild(lineArrowStart)
    line.appendChild(lineArrowEnd)

    lineContainer.appendChild(lineText)
    lineContainer.appendChild(line)

    return lineContainer
}

const generatePallet = (pName, pLength, pWidth) => {
    const newPallet = document.createElement('div')
    const p = document.createElement('p')
    const closeIcon = document.createElement('img')

    // p
    p.innerText = pName;
    newPallet.appendChild(p)

    //close icon
    closeIcon.src = 'images/cancel.png'
    closeIcon.classList.add('close')
    closeIcon.addEventListener('click', deletePallet)

    // pallet
    newPallet.id = pName
    newPallet.classList.add('pallet')
    newPallet.style.width = pLength * 100 + 'px'
    newPallet.style.height = pWidth * 100 + 'px'
    newPallet.appendChild(generateLine(pWidth, true))
    newPallet.appendChild(generateLine(pLength, false))
    newPallet.appendChild(closeIcon)

    return newPallet
}