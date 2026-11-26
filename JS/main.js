document.addEventListener("DOMContentLoaded", function () {

  const header = document.querySelector('.header-principal');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('rolando');
    }
    else if (window.scrollY < 20) {
      header.classList.remove('rolando');
    }
  });

  const mobileMenu = document.getElementById('mobile-menu');
  const navList = document.querySelector('.nav-list');

  mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
  });

  const container = document.querySelector('.container-diferenciais');
  if (container) {
    container.style.opacity = '0';
    container.style.transition = 'opacity 1s ease-in-out';
    setTimeout(() => {
      container.style.opacity = '1';
    }, 100);
  }

  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      alert("Você clicou no card: " + card.querySelector('h3').innerText);
    });
  });
});

// Carrossel de slides da formatura
const slides = document.querySelectorAll('.carrossel-formatura .slide');
const indicadores = document.querySelectorAll('.carrossel-formatura .indicador');
const btnAnterior = document.querySelector('.carrossel-formatura .btn-anterior');
const btnProximo = document.querySelector('.carrossel-formatura .btn-proximo');

let slideAtual = 0;

// Função que atualiza qual foto e qual bolinha ficam ativas
function mostrarSlide(indice) {
  // Faz o carrossel dar a volta (do último para o primeiro e vice-versa)
  if (indice >= slides.length) {
    slideAtual = 0;
  } else if (indice < 0) {
    slideAtual = slides.length - 1;
  } else {
    slideAtual = indice;
  }

  // Remove a classe 'ativo' de todos os slides e indicadores
  slides.forEach((slide) => slide.classList.remove('ativo'));
  indicadores.forEach((indicador) => indicador.classList.remove('ativo'));

  // Adiciona 'ativo' apenas no slide e indicador atuais
  slides[slideAtual].classList.add('ativo');
  if (indicadores[slideAtual]) {
    indicadores[slideAtual].classList.add('ativo');
  }
}

// Clique nos botões de seta
btnProximo.addEventListener('click', () => {
  mostrarSlide(slideAtual + 1);
});

btnAnterior.addEventListener('click', () => {
  mostrarSlide(slideAtual - 1);
});

// Clique direto nas bolinhas/indicadores lá embaixo
indicadores.forEach((indicador, index) => {
  indicador.addEventListener('click', () => {
    mostrarSlide(index);
  });
});

// Vídeo do diretor 
const videoDirecao = document.getElementById('videoDirecao');
const overlayVideo = document.getElementById('overlayVideo');
const btnPlayVideo = document.getElementById('btnPlayVideo');

if (videoDirecao && btnPlayVideo) {
  btnPlayVideo.addEventListener('click', () => {
    videoDirecao.play();
    videoDirecao.setAttribute('controls', 'controls');
    overlayVideo.classList.add('escondido');
  });
}
  videoDirecao.addEventListener('ended', () => {
    overlayVideo.classList.remove('escondido');
    videoDirecao.removeAttribute('controls');
  });
// Botão de Acessibilidade e Fontes (Direto nos elementos)
const toggleBtn = document.getElementById('toggle-acessibilidade');
const menuContainer = document.getElementById('menu-acessibilidade');
const increaseBtn = document.getElementById('increase-font');
const decreaseBtn = document.getElementById('decrease-font');

// Seleciona todos os textos comuns do seu site
const elementosTexto = document.querySelectorAll('p, h1, h2, h3, h4, a, span, li');

let ajusteTamanho = 0; // Controla quanto foi aumentado/diminuído em pixels
const maxAjuste = 6;  // Limite máximo para não quebrar o layout (+6px)
const minAjuste = -2; // Limite mínimo (-2px)
const step = 2;       // Cada clique muda 2 pixels

if (toggleBtn && menuContainer) {
  toggleBtn.addEventListener('click', () => {
    menuContainer.classList.toggle('ativo');
  });
}

if (increaseBtn) {
  increaseBtn.addEventListener('click', () => {
    if (ajusteTamanho < maxAjuste) {
      ajusteTamanho += step;
      elementosTexto.forEach(el => {
        // Pega o tamanho atual calculado pelo navegador e soma o ajuste
        let tamanhoAtual = window.getComputedStyle(el).fontSize;
        el.style.fontSize = (parseFloat(tamanhoAtual) + step) + 'px';
      });
    }
  });
}

if (decreaseBtn) {
  decreaseBtn.addEventListener('click', () => {
    if (ajusteTamanho > minAjuste) {
      ajusteTamanho -= step;
      elementosTexto.forEach(el => {
        let tamanhoAtual = window.getComputedStyle(el).fontSize;
        el.style.fontSize = (parseFloat(tamanhoAtual) - step) + 'px';
      });
    }
  });
}