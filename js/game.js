window.onload = function() {
    const $ = el => document.querySelector(el);
	const $$ = el => document.querySelectorAll(el);

    let level_id = 0;
	if (window.location.search) {
		level_id = window.location.search.split('=')[1];
	}
	
    const buttons = $$('.color-btn');
    const scoreDisplay = $('#score');
    const roundDisplay = $('#round');
    const livesDisplay = $('#lives');
    const messageDisplay = $('#message');
    const startButton = $('#start-btn');
    const colors = ['rojo', 'azul', 'verde', 'amarillo'];
    const levelDifficultTimes = [1800, 1500, 1000, 900, 800, 700];
    
    let score = 0;
    let buttonClicked = false;
    let livesCounter = 0;
    let livesCounterList = [];
    let currentColor = '';
    let round = 1;
    let maxRounds = 10;
    let loose = false;
    let countDown = 0;
    let timer;
    let timeRemaining = 0;
    let timeLevel = 0;

    if (level_id == 0) {
        n = Math.floor(Math.random() * levelDifficultTimes.length);
        timeLevel = levelDifficultTimes[n];
    } else {
        timeLevel = levelDifficultTimes[level_id - 1];
    }

    if (timeLevel == 1800 || timeLevel == 1500) {
        livesCounter = 3;
    } else if (timeLevel == 1000 || timeLevel == 900) {
        livesCounter = 2;
    } else if (timeLevel == 800 || timeLevel == 700) {
        livesCounter = 1;
    }

    for (let i = 0; i < livesCounter; i++) {
        livesCounterList.push('❤️');
    }
    livesDisplay.textContent = livesCounterList;

    startButton.addEventListener('click', startGame);

    function startGame() {
        loose = false;
        score = 0;
        round = 1;
        countDown = 0;
        livesCounterList = [];
        for (let i = 0; i < livesCounter; i++) {
            livesCounterList.push('❤️');
        }
        livesDisplay.textContent = livesCounterList;
        scoreDisplay.textContent = `🪙${score}`;
        messageDisplay.textContent = '';
        nextRound();
    }

    function nextRound() {
        if (round > maxRounds && !loose) {
            messageDisplay.style.color = 'white';
            if (score >= 100) {
                messageDisplay.textContent = 'Perfecto🏆';
            } else if (score >= 90) {
                messageDisplay.textContent = 'Excelente🎖️';
            } else if (score >= 70) {
                messageDisplay.textContent = 'Buena🏅';
            } else if (score >= 50) {
                messageDisplay.textContent = 'Nada mal🥇';
            } else if (score >= 30) {
                messageDisplay.textContent = 'Poco🥈';
            } else  {
                messageDisplay.textContent = 'Mal🥉';
            }
            return;
        } else if (countDown === livesCounter) {
            loose = true;
            messageDisplay.style.color = 'white';
            messageDisplay.style.fontBold = true;
            livesDisplay.textContent = '💀';
            messageDisplay.textContent = '¡Has perdido! 😣';
            return;
        }

        roundDisplay.textContent = '🚩' + round;
        currentColor = generateRandomColor();
        if (currentColor === 'rojo') {
            colorIcon = '🔴';
        } else if (currentColor === 'azul') {
            colorIcon = '🔵';
        } else if (currentColor === 'verde') {
            colorIcon = '🟢';
        } else if (currentColor === 'amarillo') {
            colorIcon = '🟡';
        } else {
            colorIcon = '⚠️';
        }
        // updateMessageDisplay(`${colorIcon}`);
        messageDisplay.textContent = `${colorIcon}`;

        buttons.forEach(button => {
            button.addEventListener('click', handleButtonClick);
        });

        startTimer(timeLevel); // tiempo límite por ronda (1.5 segundos)

        round++;
    }

    function handleButtonClick(event) {
        clearTimeout(timer);
        const clickedColor = event.target.getAttribute('data-color');
        
        if (clickedColor === currentColor) {
            buttonClicked = true;
            score += 10;
            messageDisplay.style.color = 'white';
            messageDisplay.textContent = '+10🪙';
        } else {
            // score -= 10;
            score > 0 ? score -= 10 : score = 0;
            countDown += 1;
            buttonClicked = false;
            livesCounterList.pop();
            if (livesCounterList.length === 0) {
                livesDisplay.textContent = '💀';
            } else {
                livesDisplay.textContent = livesCounterList;
            }
            messageDisplay.style.color = 'white';
            messageDisplay.textContent = '-10🪙';
        }

        scoreDisplay.textContent = `🪙${score}`;
        buttons.forEach(button => {
            button.removeEventListener('click', handleButtonClick);
        });

        setTimeout(nextRound, 500); // espera 1 segundo antes de la siguiente ronda
    }

    function generateRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function startTimer(duration) {
        timeRemaining = duration;
        timer = setTimeout(() => {
            if (!buttonClicked) {
                livesCounterList.pop();
                countDown += 1;
                livesDisplay.textContent = livesCounterList;
            }
            nextRound();
        }, timeRemaining);
    }
}