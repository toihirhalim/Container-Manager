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

    dragElement(newPallet)

    return newPallet
}

function dragElement(elmnt) {
    var mouseRelPosX = 0, mouseRelPosY = 0, x = 0, y = 0;

    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;

        // delete on close 
        if (e.target.classList.contains('close')) {
            deletePallet(e);
            return;
        }

        // on rotate click
        if (e.target.classList.contains('rotate')) {
            //rotatePallet();
            return;
        }

        e.preventDefault();
        //make the position absolute
        elmnt.style.position = 'absolute';
        elmnt.style.zIndex = 1;

        mouseRelPosX = e.pageX - elmnt.offsetLeft;
        mouseRelPosY = e.pageY - elmnt.offsetTop;

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        x = e.clientX - mouseRelPosX;
        y = e.clientY - mouseRelPosY;
        elmnt.style.top = y + "px";
        elmnt.style.left = x + "px";
    }

    function closeDragElement(e) {
        /* stop moving when mouse button is released:*/
        dropped(e, elmnt, x, y)
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
