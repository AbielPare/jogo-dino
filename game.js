const dino = document.getElementById('dino');
const obstaculo = document.getElementById('obstaculo');
const moeda = document.getElementById('moeda');
const moedaContador = document.getElementById('moeda-contador');
const pauseBtn = document.getElementById('pause-btn');
const mensagemGameOver = document.getElementById('mensagem-game-over');
const reiniciarBtn = document.getElementById('reiniciar-btn');

let moedas = 0;
let pausado = false;

// PULO
document.addEventListener('keydown', function (e) {
    if ((e.code === 'Space' || e.code === 'ArrowUp') && !pausado) {
        pular();
    }
});

function pular() {
    if (!dino.classList.contains('pulando')) {
        dino.classList.add('pulando');
        dino.style.bottom = '100px';
        setTimeout(() => {
            dino.style.bottom = '0px';
            dino.classList.remove('pulando');
        }, 500);
    }
}

// MOVIMENTO DOS ELEMENTOS
function moverElemento(elemento, velocidade) {
    let pos = parseInt(window.getComputedStyle(elemento).left);
    if (pos < -50) {
        elemento.style.left = '800px';
        if (elemento === moeda) {
            elemento.style.bottom = (Math.random() * 100 + 50) + 'px'; // Altura aleatória
        }
    } else {
        elemento.style.left = (pos - velocidade) + 'px';
    }
}

// COLISÃO COM MOEDA
function detectarMoeda() {
    const dinoRect = dino.getBoundingClientRect();
    const moedaRect = moeda.getBoundingClientRect();

    if (
        dinoRect.left < moedaRect.right &&
        dinoRect.right > moedaRect.left &&
        dinoRect.top < moedaRect.bottom &&
        dinoRect.bottom > moedaRect.top
    ) {
        moedas++;
        moedaContador.textContent = `Moedas: ${moedas}`;
        moeda.style.left = '800px'; // Reset moeda
    }
}

// COLISÃO COM OBSTÁCULO
function detectarColisao() {
    const dinoRect = dino.getBoundingClientRect();
    const obstaculoRect = obstaculo.getBoundingClientRect();

    if (
        dinoRect.left < obstaculoRect.right &&
        dinoRect.right > obstaculoRect.left &&
        dinoRect.top < obstaculoRect.bottom &&
        dinoRect.bottom > obstaculoRect.top
    ) {
        gameOver();
    }
}

// GAME OVER
function gameOver() {
    pausado = true;
    mensagemGameOver.classList.remove('oculto');
}

// REINICIAR
reiniciarBtn.addEventListener('click', () => {
    location.reload();
});

// LOOP DO JOGO
setInterval(() => {
    if (!pausado) {
        moverElemento(obstaculo, 5);
        moverElemento(moeda, 3);
        detectarMoeda();
        detectarColisao();
    }
}, 30);

// PAUSAR/RETOMAR
pauseBtn.addEventListener('click', () => {
    pausado = !pausado;
    pauseBtn.textContent = pausado ? '▶️ Retomar' : '⏸️ Pausar';
});
