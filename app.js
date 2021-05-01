const addPalletBtn = document.getElementById('addPalletBtn')
const showNewPalletPannel = document.getElementById('showNewPalletPannel')
const addNewPallet = document.getElementById('addNewPallet')
const cancelBtn = document.getElementById('cancelBtn')
const newPalletLength = document.getElementById('newPalletLength')
const newPalletWidth = document.getElementById('newPalletWidth')
const newPalletName = document.getElementById('newPalletName')
const pailletContainer = document.getElementById('pailletContainer')
const palletsElements = document.getElementsByClassName('pallet')
const selectContainer = document.getElementById('selectContainer')

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
            const newPallet = generatePallet(key, pallet.length, pallet.width)

            pailletContainer.appendChild(newPallet)

            newPallet.addEventListener('mouseenter', showCloseIcon)
            newPallet.addEventListener('mouseleave', hideCloseIcon)
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
    addNewPallet.focus()
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
    const newPallet = generatePallet(name, length, width)

    pailletContainer.appendChild(newPallet)

    newPallet.addEventListener('mouseenter', showCloseIcon)
    newPallet.addEventListener('mouseleave', hideCloseIcon)

    closeNewPalletPannel()
    addPalletBtn.focus()
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

const showCloseIcon = e => {
    e.target.lastChild.style.display = 'block'
}

const hideCloseIcon = e => {
    e.target.lastChild.style.display = 'none'
}

const deletePallet = e => {
    const pallet = e.target.parentNode
    const palletContainer = pallet.parentNode

    palletContainer.removeChild(pallet)

    delete pallets[pallet.id]

    setLocalObject('pallets', pallets)

    if (Object.keys(pallets).length <= 0) {
        palletsSequence = 1
        setLocalObject('palletsSequence', palletsSequence)
    }

}

const handleContainerChange = e => {
    console.log(containers[e.target.value])
}

getPalletsSequence()
getPalletsAndDisplay()

//events listenners
addPalletBtn.addEventListener('click', showAddPallet)
addNewPallet.addEventListener('click', addNewPalletFct)
cancelBtn.addEventListener('click', closeNewPalletPannel)
selectContainer.addEventListener('input', handleContainerChange)