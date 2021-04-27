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

const showAddPallet = e => {
    showNewPalletPannel.style.display = 'block'
    newPalletName.placeholder = 'P' + palletsSequence
}

const closeNewPalletPannel = e => {
    showNewPalletPannel.style.display = 'none'
}

const addNewPalletFct = e => {
    let name = newPalletName.value !== '' ? newPalletName.value : 'P' + palletsSequence++
    let length = newPalletLength.value > 0 ? newPalletLength.value : 1
    let width = newPalletWidth.value > 0 ? newPalletWidth.value : 1

    //add new pallet
    const newPallet = document.createElement('div')
    const p = document.createElement('p')
    p.innerText = name;
    newPallet.appendChild(p)
    newPallet.classList.add('pallet')

    newPallet.style.width = length * 100 + 'px'
    newPallet.style.height = width * 100 + 'px'

    pailletContainer.appendChild(newPallet)

    //clear inputs
    newPalletName.value = ''
    newPalletLength.value = ''
    newPalletWidth.value = ''

    closeNewPalletPannel()
}

addPalletBtn.addEventListener('click', showAddPallet)
addNewPallet.addEventListener('click', addNewPalletFct)
cancelBtn.addEventListener('click', closeNewPalletPannel)

