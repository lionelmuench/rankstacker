let boxCount = 0;

function addBox() {
    const rankContainer = document.getElementById('rank-container');
    const newBox = document.createElement('div');
    newBox.className = 'rank-box';
    newBox.setAttribute('draggable', true);
    newBox.innerText = "Box " + (boxCount + 1);
    newBox.setAttribute('data-id', boxCount);
    newBox.style.top = (boxCount * 50) + "px";

    newBox.addEventListener('dragstart', dragStart);
    newBox.addEventListener('dragover', dragOver);
    newBox.addEventListener('dragend', dragEnd);
    newBox.addEventListener('dblclick', editBox);

    rankContainer.appendChild(newBox);
    boxCount++;
}

function removeBox() {
    const rankContainer = document.getElementById('rank-container');
    if (boxCount > 0) {
        rankContainer.removeChild(rankContainer.lastChild);
        boxCount--;
    }
}

let currentBox = null;
let currentPosition = null;
let overBox = null;

function dragStart(e) {
    currentBox = e.target;
    currentPosition = Array.from(currentBox.parentNode.children).indexOf(currentBox);
    e.target.style.opacity = '0.5';
}

function dragOver(e) {
    e.preventDefault();
    overBox = e.target;
}

function dragEnd(e) {
    e.target.style.opacity = '1';

    if (overBox) {
        const overBoxPosition = Array.from(overBox.parentNode.children).indexOf(overBox);
        const parent = currentBox.parentNode;
        if (currentPosition < overBoxPosition) {
            parent.insertBefore(currentBox, overBox.nextSibling);
        } else {
            parent.insertBefore(currentBox, overBox);
        }
    }

    overBox = null;
}

function editBox(e) {
    const box = e.target;
    const currentText = box.innerText;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.addEventListener('blur', () => {
        box.innerText = input.value;
        box.addEventListener('dblclick', editBox);
    });
    box.innerHTML = '';
    box.appendChild(input);
    input.focus();
    box.removeEventListener('dblclick', editBox);
}
