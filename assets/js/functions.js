// generates a block or a white dot
function generateElement(left, top, className) {

    const elem = document.createElement('span');

    elem.style.left = left + 'px';
    elem.style.top  = top  + 'px';
    elem.classList  = className;

    return elem;
}

// check if pacman collides with a block or a white dot
function collision(pacman, elem) {

    const pacmanCoord = pacman.getBoundingClientRect();
    const elemCoord   = elem.getBoundingClientRect();

    return pacmanCoord.y === elemCoord.y && pacmanCoord.x === elemCoord.x;
}