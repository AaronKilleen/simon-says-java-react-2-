const topLeft = document.querySelector('.top-left-panel');
const topRight = document.querySelector('.top-right-panel');
const bottomLeft = document.querySelector('.bottom-left-panel');
const bottomRight = document.querySelector('.bottom-right-panel');
const scoreElement = document.getElementById('scoreValue');
const hiscoreElement = document.getElementById('hiscoreValue');

const getRandomPanel = () => {
    const panels = [topLeft, topRight, bottomLeft, bottomRight];
    return panels[parseInt(Math.random() * panels.length)]
}

let sequence = [getRandomPanel()];
let sequenceToGuess = [...sequence];

const flash = panel => {
    return new Promise((resolve, reject) => {
        panel.className += ' active';
        setTimeout(() => {
            panel.className = panel.className.replace(' active', '');
            setTimeout(() => {
                resolve();
            }, 250);
        }, 1000)
    });
};

let canClick = false;
let gameEnd = false;
let score = 0;
let hiscore = 0;

const panelClicked = panelClicked => {
    if (!canClick) return;
    const expectedPanel = sequenceToGuess.shift();
    if (expectedPanel === panelClicked) {
        if (sequenceToGuess.length === 0){
            scoreIncrement();
            sequence.push(getRandomPanel());
            sequenceToGuess = [...sequence];
            startFlashing();
        }
    } else {
        gameEnd = true;
        score = 0;
        scoreElement.innerHTML = score;
        alert('game over');
        sequence = [getRandomPanel()];
        sequenceToGuess = [...sequence];
    }
};

const startFlashing = async () => {
    canClick = false;
    for (const panel of sequence){
        await flash(panel)
    }
    canClick = true;
}

function scoreIncrement() {
    score = scoreElement.innerHTML;
    score++;
    scoreElement.innerHTML = score;

    if (score > hiscore) {
        hiscore = score;
        hiscoreElement.innerHTML = hiscore;
    }
}