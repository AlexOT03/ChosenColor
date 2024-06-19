
window.onload = function () {
    // TODO:: Do your initialization job

    // add eventListener for tizenhwkey
    //document.addEventListener('tizenhwkey', function(e) {
        //if(e.keyName == "back")
	//try {
	    //tizen.application.getCurrentApplication().exit();
	//} catch (ignore) {
	//}
    //});

    // Sample code
    //var textbox = document.querySelector('.contents');
    //textbox.addEventListener("click", function(){
    	//box = document.querySelector('#textbox');
    	//box.innerHTML = box.innerHTML == "Basic" ? "Sample" : "Basic";
    //});
    const buttons = document.querySelectorAll('.color-btn');
    const scoreDisplay = document.getElementById('score');
    const roundDisplay = document.getElementById('round');
    const messageDisplay = document.getElementById('message');
    const startButton = document.getElementById('start-btn');
    const pauseButton = document.getElementById('pause-btn');
    let score = 0;
    let currentColor = '';
    let round = 1;
    let maxRounds = 10;
    let loose = false;
    let countDown = 0;
    let timer;
    let isPaused = false;
    let timeRemaining = 0;
    let pauseStartTime;

    const colors = ['rojo', 'azul', 'verde', 'amarillo'];
    const colorMap = {
        'rojo': 'red',
        'azul': 'blue',
        'verde': 'green',
        'amarillo': 'yellow'
    };

    startButton.addEventListener('click', startGame);
    pauseButton.addEventListener('click', togglePause);

    function startGame() {
        score = 0;
        round = 1;
        scoreDisplay.textContent = `Puntos: ${score}`;
        messageDisplay.textContent = '';
        nextRound();
    }

    function nextRound() {
        if (round > maxRounds && !loose) {
            messageDisplay.style.color = 'white';
            messageDisplay.textContent = '¡Juego terminado! Total: ' + score;
            return;
        } else if (countDown === 3) {
            loose = true;
            messageDisplay.style.color = 'white';
            messageDisplay.textContent = '¡Has perdido!';
            return;
        }

        roundDisplay.textContent = 'Ronda ' + round;
        currentColor = generateRandomColor();
        updateMessageDisplay(`Haz clic en el color: ${currentColor}`);

        buttons.forEach(button => {
            button.addEventListener('click', handleButtonClick);
        });

        startTimer(3000); // tiempo límite por ronda (3 segundos)

        round++;
    }

    function handleButtonClick(event) {
        clearTimeout(timer);
        const clickedColor = event.target.getAttribute('data-color');
        
        if (clickedColor === currentColor) {
            score += 10;
            messageDisplay.textContent = '¡Correcto!';
        } else {
            score -= 10;
            countDown += 1;
            messageDisplay.textContent = 'Incorrecto. Era ' + currentColor;
        }

        scoreDisplay.textContent = `Puntos: ${score}`;
        buttons.forEach(button => {
            button.removeEventListener('click', handleButtonClick);
        });

        setTimeout(nextRound, 1000); // espera 1 segundo antes de la siguiente ronda
    }

    function generateRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function updateMessageDisplay(message) {
        messageDisplay.textContent = message;
        let textColor = generateRandomColor();
        while (textColor === currentColor) {
            textColor = generateRandomColor();
        }
        messageDisplay.style.color = colorMap[textColor];
    }

    function togglePause() {
        if (isPaused) {
            isPaused = false;
            const pauseDuration = Date.now() - pauseStartTime;
            startTimer(timeRemaining - pauseDuration);
            pauseButton.textContent = 'Pausar';
            buttons.forEach(button => {
                button.addEventListener('click', handleButtonClick);
            });
        } else {
            isPaused = true;
            clearTimeout(timer);
            pauseStartTime = Date.now();
            pauseButton.textContent = 'Reanudar';
            buttons.forEach(button => {
                button.removeEventListener('click', handleButtonClick);
            });
        }
    }

    function startTimer(duration) {
        timeRemaining = duration;
        timer = setTimeout(() => {
            if (!isPaused) {
                messageDisplay.textContent = '¡Se acabó el tiempo!';
                nextRound();
            }
        }, timeRemaining);
    }
    
};
