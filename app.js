const addPalletBtn = document.getElementById('addPalletBtn')
const showNewPalletPannel = document.getElementById('showNewPalletPannel')
const addNewPallet = document.getElementById('addNewPallet')
const cancelBtn = document.getElementById('cancelBtn')
const newPalletLength = document.getElementById('newPalletLength')
const newPalletWidth = document.getElementById('newPalletWidth')
const newPalletName = document.getElementById('newPalletName')
const pailletContainer = document.getElementById('pailletContainer')
const palletName = document.getElementById('palletName')
const palletLength = document.getElementById('palletLength')
const palletWidth = document.getElementById('palletWidth')

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

var selectedPallet = null

const getPalletsAndDisplay = () => {
    const p = getLocalObject('pallets')

    if (p) {
        pallets = p
        Object.keys(pallets).map(key => {
            let pallet = pallets[key]
            const newPallet = generatePallet(key, pallet.length, pallet.width)

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

const setSelected = e => {
    var target = e.target

    while (true) {
        if (target.id) break
        else target = target.parentNode
    }

    if (selectedPallet)
        selectedPallet.style.borderColor = 'rgb(51, 52, 54)'

    selectedPallet = target
    selectedPallet.style.borderColor = 'rgb(157, 50, 10)'

    var pallet = pallets[selectedPallet.id]

    palletName.value = selectedPallet.id
    palletLength.value = pallet.length
    palletWidth.value = pallet.width
}

const isPalletSelected = e => {
    if (selectedPallet)
        return true
    e.target.value = ''
    return false
}

const updatePalletName = e => {
    if (!(e.target.value && isPalletSelected(e))) return

    if (pallets[e.target.value]) {
        e.target.style.color = 'red'
        return
    }

    e.target.style.color = 'black'
    let pallet = pallets[selectedPallet.id]
    delete pallets[selectedPallet.id]
    selectedPallet.id = e.target.value
    selectedPallet.firstChild.innerText = e.target.value
    pallets[e.target.value] = pallet
    setLocalObject('pallets', pallets)
}

const updatePalletLength = e => {
    if (!isPalletSelected(e)) return

    var length = e.target.value > 0 ? e.target.value : 1
    selectedPallet.style.width = length * 100 + "px"
    pallets[selectedPallet.id].length = length
    selectedPallet.children[2].firstChild.innerText = length + "m"
    setLocalObject('pallets', pallets)
}

const updatePalletWidth = e => {
    if (!isPalletSelected(e)) return

    var width = e.target.value > 0 ? e.target.value : 1
    selectedPallet.style.height = width * 100 + "px"
    pallets[selectedPallet.id].width = width
    selectedPallet.children[1].firstChild.innerText = width + "m"
    setLocalObject('pallets', pallets)
}

getPalletsSequence()
getPalletsAndDisplay()

//events listenners
addPalletBtn.addEventListener('click', showAddPallet)
addNewPallet.addEventListener('click', addNewPalletFct)
cancelBtn.addEventListener('click', closeNewPalletPannel)
palletName.addEventListener('input', updatePalletName)
palletLength.addEventListener('input', updatePalletLength)
palletWidth.addEventListener('input', updatePalletWidth)