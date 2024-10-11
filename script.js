const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause')
const musicaFocoinput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const imagensBt = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPause = new Audio('/sons/pause.mp3');
const audioBeep = new Audio('/sons/beep.mp3');
document.get
let tempoDecorridoEmsegundos = 1500
let intervaloId = null

musica.loop = true

focoBt.addEventListener('click', () => {
    tempoDecorridoEmsegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmsegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
    
})
longoBt.addEventListener('click', () => {
    tempoDecorridoEmsegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
    
})
musicaFocoinput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`                
            break;
        
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`                
            break;
        
    
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmsegundos <= 0) {
        audioBeep.play()
        alert('tempo finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmsegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId) {
        audioPause.play();
        zerar()
        return
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    imagensBt.setAttribute('src', '/imagens/pause.png')
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    imagensBt.setAttribute('src', '/imagens/play_arrow.png')
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmsegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()