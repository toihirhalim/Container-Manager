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

const generatePallet = (name, length, width) => {
    const newPallet = document.createElement('div')
    const p = document.createElement('p')
    const closeIcon = document.createElement('img')

    // p
    p.innerText = name;
    newPallet.appendChild(p)

    //close icon
    closeIcon.src = 'images/cancel.png'
    closeIcon.classList.add('close')
    closeIcon.addEventListener('click', deletePallet)

    // pallet
    newPallet.id = name
    newPallet.classList.add('pallet')
    newPallet.style.width = length * 100 + 'px'
    newPallet.style.height = width * 100 + 'px'
    newPallet.appendChild(generateLine(width, true))
    newPallet.appendChild(generateLine(length, false))
    newPallet.appendChild(closeIcon)

    //event listenners
    newPallet.addEventListener('mouseenter', showCloseIcon)
    newPallet.addEventListener('mouseleave', hideCloseIcon)
    newPallet.addEventListener('click', setSelected)

    return newPallet
}

const generateContainer = (length, width) => {
    const container = document.createElement('div')

    container.classList.add('container')
    container.style.width = length * 100 + 'px'
    container.style.height = width * 100 + 'px'

    container.appendChild(generateLine(width, true))
    container.appendChild(generateLine(length, false))

    return container
}