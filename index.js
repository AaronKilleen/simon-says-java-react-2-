const topLeft = document.querySelector('.top-left-panel');
const topRight = document.querySelector('.top-right-panel');
const bottomLeft = document.querySelector('.bottom-left-panel');
const bottomRight = document.querySelector('.bottom-right-panel');
const scoreElement = document.getElementById('scoreValue');
const hiscoreElement = document.getElementById('hiscoreValue');

setCenterOffset();
window.addEventListener("resize", setCenterOffset);
function setCenterOffset()
{
let horizontalOffset = Math.round((window.innerWidth/2 - 100));
let horizontalOffsetString = horizontalOffset.toString();
horizontalOffsetString += 'px';
center.style.left = horizontalOffsetString;
}



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

const shortFlash = panel => {
    return new Promise((resolve, reject) => {
        panel.className += ' active';
        setTimeout(() => {
            panel.className = panel.className.replace(' active', '');
            setTimeout(() => {
                resolve();
            }, 100);
        }, 100)
    });
};


let canClick = false;
let gameEnd = false;
let score = 0;
let hiscore = 0;

const panelClicked = panelClicked => {
	shortFlash(panelClicked);
    if (!canClick) return;
    const expectedPanel = sequenceToGuess.shift();
    const panels = [topLeft, topRight, bottomLeft, bottomRight];
	switch(panelClicked)
	{
		case panels[0]:
        var mySound = new Audio("chimes.wav");
        mySound.play();		
        break;
		case panels[1]:
        var mySound = new Audio("chord.wav");
        mySound.play();		
		break;
		case panels[2]:
        var mySound = new Audio("notify.wav");
        mySound.play();		
        break;
		case panels[3]:
        var mySound = new Audio("tada.wav");
        mySound.play();		
        break;
	}
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
    const panels = [topLeft, topRight, bottomLeft, bottomRight];
    for (const panel of sequence){
        switch(panel)
		{
		case panels[0]:
        var mySound = new Audio("chimes.wav");
        mySound.play();		
        break;
		case panels[1]:
        var mySound = new Audio("chord.wav");
        mySound.play();				
        break;
		case panels[2]:
        var mySound = new Audio("notify.wav");
        mySound.play();			
        break;
		case panels[3]:
        var mySound = new Audio("tada.wav");
        mySound.play();		
        break;
		}
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
