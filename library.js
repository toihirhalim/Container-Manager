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
    const rotateIcon = document.createElement('img')

    // p
    p.innerText = name;
    newPallet.appendChild(p)

    //close icon
    closeIcon.src = 'images/cancel.png'
    closeIcon.classList.add('close')
    closeIcon.addEventListener('click', deletePallet)

    //rotate icon
    rotateIcon.src = 'images/rotate.png'
    rotateIcon.classList.add('rotate')
    rotateIcon.addEventListener('click', rotatePallet)

    // pallet
    newPallet.id = name
    newPallet.classList.add('pallet')
    newPallet.style.width = length * 100 + 'px'
    newPallet.style.height = width * 100 + 'px'
    newPallet.appendChild(generateLine(width, true))
    newPallet.appendChild(generateLine(length, false))
    newPallet.appendChild(closeIcon)
    newPallet.appendChild(rotateIcon)

    //event listenners
    newPallet.addEventListener('mouseenter', e => showIcons(e.target))
    newPallet.addEventListener('mouseleave', e => hideIcons(e.target))
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
            return;
        }

        e.preventDefault();

        //hide close and rotate icons
        hideIcons(elmnt);

        //make the position absolute
        if (elmnt.style.position != 'absolute') {
            elmnt.style.position = 'absolute';
            elmnt.style.zIndex = 1;
        }

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

        if (elmnt.parentNode.id == 'pailletContainer') {
            addToContainer(e, elmnt, x, y)
        }

        dropped(e, elmnt, x, y)

        //reshow close and rotate icons
        showIcons(elmnt);

        document.onmouseup = null;
        document.onmousemove = null;
    }
}
