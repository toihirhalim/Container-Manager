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

const pallets = {}

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

    //add new pallet
    const newPallet = getPallet(name, length, width)

    pailletContainer.appendChild(newPallet)

    closeNewPalletPannel()
}

const getPallet = (pName, pLength, pWidth) => {
    const newPallet = document.createElement('div')
    const p = document.createElement('p')
    p.innerText = pName;
    newPallet.appendChild(p)
    newPallet.classList.add('pallet')

    newPallet.style.width = pLength * 100 + 'px'
    newPallet.style.height = pWidth * 100 + 'px'

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

addPalletBtn.addEventListener('click', showAddPallet)
addNewPallet.addEventListener('click', addNewPalletFct)
cancelBtn.addEventListener('click', closeNewPalletPannel)
newPalletName.addEventListener('input', checkPalletName)

