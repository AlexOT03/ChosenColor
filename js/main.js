window.onload = function() {
const $$ = elements => document.querySelectorAll(elements);

$$('.play-btn').forEach(button => {
    button.addEventListener('click', function() {
        const level = this.dataset.level;
        console.log('push' + level);
        window.location.href = 'game.html?level=' + level;
    });
});


document.addEventListener('tizenhwkey', function(e) {
    if (e.keyName === 'back') {
    	window.history.back();
    }
});
}

