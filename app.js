const addPalletBtn = document.getElementById('addPalletBtn')
const showNewPalletPannel = document.getElementById('showNewPalletPannel')
const addNewPallet = document.getElementById('addNewPallet')
const cancelBtn = document.getElementById('cancelBtn')
const newPalletLength = document.getElementById('newPalletLength')
const newPalletWidth = document.getElementById('newPalletWidth')
const newPalletName = document.getElementById('newPalletName')
const pailletContainer = document.getElementById('pailletContainer')

var palletsSequence = 1;

const containers = {
    "8ft": {
        length: 2.43,
        width: 2.20
    },
    "10ft": {
        length: 2.99,
        width: 2.44
    },
    "20ft": {
        length: 6.06,
        width: 2.44
    },
    "40ft": {
        length: 12.2,
        width: 2.44
    }
}

var pallets = {}

const getPalletsAndDisplay = () => {
    const p = getLocalObject('pallets')

    if (p) {
        pallets = p
        Object.keys(pallets).map(key => {
            let pallet = pallets[key]
            const newPallet = getPallet(key, pallet.length, pallet.width)

            pailletContainer.appendChild(newPallet)
        });
    }
}

const getPalletsSequence = () => {
    let index = getLocalObject('palletsSequence')
    if (index) palletsSequence = index
}

const showAddPallet = e => {
    showNewPalletPannel.style.display = 'block'
    newPalletName.placeholder = 'P' + palletsSequence
}

const closeNewPalletPannel = e => {
    clearInputs();
    showNewPalletPannel.style.display = 'none'
}

const addNewPalletFct = e => {
    let name = newPalletName.value !== '' ? newPalletName.value : 'P' + palletsSequence++
    let length = newPalletLength.value > 0 ? newPalletLength.value : 1
    let width = newPalletWidth.value > 0 ? newPalletWidth.value : 1

    pallets[name] = { length, width }
    setLocalObject('pallets', pallets)
    setLocalObject('palletsSequence', palletsSequence)

    //add new pallet
    const newPallet = getPallet(name, length, width)

    pailletContainer.appendChild(newPallet)

    closeNewPalletPannel()
}

const getPallet = (pName, pLength, pWidth) => {
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

const checkPalletName = e => {
    if (pallets[e.target.value]) {
        newPalletName.style.color = 'red'
        addNewPallet.disabled = true
    } else {
        newPalletName.style.color = 'black'
        addNewPallet.disabled = false
    }
}

const clearInputs = () => {
    newPalletName.value = ''
    newPalletLength.value = ''
    newPalletWidth.value = ''
    addNewPallet.disabled = false
}

getPalletsSequence()
getPalletsAndDisplay()

//events listenners
addPalletBtn.addEventListener('click', showAddPallet)
addNewPallet.addEventListener('click', addNewPalletFct)
cancelBtn.addEventListener('click', closeNewPalletPannel)
newPalletName.addEventListener('input', checkPalletName)

