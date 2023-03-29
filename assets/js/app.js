// vars declaration
const pacman = document.querySelector('#pacman');
const main   = document.querySelector('main');
const blocks = [];
const points = [];
const soundB = new Audio('assets/sound/block.wav');
const soundP = new Audio('assets/sound/point.wav');
const soundW = new Audio('assets/sound/winner.wav');
let winner   = null;

if (window.innerWidth < 550 || window.innerHeight < 450) {
    const h1     = document.createElement('h2');
    h1.innerHTML = 'Your screen is not the right size to view this game';
    document.body.append(h1);
    main.remove();
}

console.time();

// block generation
for (let i = 0; i < blocksCoords.length; i++) {
    const x     = blocksCoords[i][0];
    const y     = blocksCoords[i][1];
    const block = generateElement(x, y, 'block');
    main.append(block);
    blocks.push(block);
}

// generate random pacman position
let posX;
let posY;
let over;

do {
    over = false;
    posX = Math.floor(Math.random() * (main.offsetWidth - 100) / 50) * 50 + 50;
    posY = Math.floor(Math.random() * (main.offsetHeight - 100) / 50) * 50 + 50;

    for (let i = 0; i < blocksCoords.length && !over; i++) {
        if (posX === blocksCoords[i][0] && posY === blocksCoords[i][1]) {
            over = true;
        }
    }
} while (over);

pacman.style.left = posX + 'px';
pacman.style.top  = posY + 'px';

// white dot generation
for (let x = 0; x < main.offsetWidth; x += 50) { // cicla le colonne
    for (let y = 0; y < main.offsetHeight; y += 50) { // cicla le righe

        // evita di creare il pallino bianco nella posizione di pacman
        if (y === pacman.offsetTop && x === pacman.offsetLeft) continue;

        const point = generateElement(x, y, 'point');
        main.append(point);
        points.push(point);
    }
}

// listen for keyboard arrows events
document.addEventListener('keydown', (event) => {

    // if you won, it does not allow any further movement
    if (winner !== null) return;

    switch (event.key) {
        case 'ArrowUp':
            pacman.style.transform = 'rotate(-90deg)';
            pacman.style.top = pacman.offsetTop - 50 + 'px';
            break;
        case 'ArrowDown':
            pacman.style.transform = 'rotate(90deg)';
            pacman.style.top = pacman.offsetTop + 50 + 'px';
            break;
        case 'ArrowLeft':
            pacman.style.transform = 'rotate(-180deg)';
            pacman.style.left = pacman.offsetLeft - 50 + 'px';
            break;
        case 'ArrowRight':
            pacman.style.transform = 'rotate(0deg)';
            pacman.style.left = pacman.offsetLeft + 50 + 'px';
            break;
        default:
            console.warn('Hai cliccato', event.key);
            break;
    }

    // check if pacman collided with a block
    for (let i = 0; i < blocks.length; i++) {
        if (collision(pacman, blocks[i])) {
            soundB.play();
            winner = false;
            main.classList = 'fade-out';
            pacman.remove();
            console.timeEnd();
        }
    }

    // check if pacman collided with a white dot
    for (let i = 0; i < points.length; i++) {
        if (collision(pacman, points[i])) {
            soundP.play();
            points[i].remove();
            points.splice(i, 1);
        }
    }

    // if the number of white dots equals the number of blocks, then you win
    if (points.length === blocks.length) {
        soundW.play();
        winner = true;
        main.classList = 'fade-out';
        console.timeEnd();
    }
});

// when the animation on main is finished, display the end of game message
main.addEventListener('animationend', function() {

    const h1     = document.createElement('h1');
    h1.innerHTML = winner ? 'You win' : 'Game over!';
    h1.classList = 'fade-in';

    document.body.append(h1);
    main.remove();
});
