// --- CARROSSEL DA GALERIA DE CONQUISTAS ---
const slidesGaleria = document.querySelectorAll('.galeria-slide');
const miniaturas = document.querySelectorAll('.galeria-miniaturas .miniatura');
const contadorGaleria = document.getElementById('galeriaContador');
const btnAntGaleria = document.getElementById('btnAntGaleria');
const btnProxGaleria = document.getElementById('btnProxGaleria');
const btnPausaGaleria = document.getElementById('btnPausaGaleria');

if (slidesGaleria.length > 0) {
  let indiceGaleria = 0;
  let pausado = false;

  function atualizarGaleria(novoIndice) {
    if (novoIndice >= slidesGaleria.length) {
      indiceGaleria = 0;
    } else if (novoIndice < 0) {
      indiceGaleria = slidesGaleria.length - 1;
    } else {
      indiceGaleria = novoIndice;
    }

    slidesGaleria.forEach((slide) => slide.classList.remove('ativo'));
    miniaturas.forEach((mini) => mini.classList.remove('ativo'));

    slidesGaleria[indiceGaleria].classList.add('ativo');
    if (miniaturas[indiceGaleria]) {
      miniaturas[indiceGaleria].classList.add('ativo');
    }

    // Atualiza o texto "01 / 05" com zero à esquerda
    const atualFormatado = String(indiceGaleria + 1).padStart(2, '0');
    const totalFormatado = String(slidesGaleria.length).padStart(2, '0');
    contadorGaleria.textContent = `${atualFormatado} / ${totalFormatado}`;
  }

  btnProxGaleria.addEventListener('click', () => atualizarGaleria(indiceGaleria + 1));
  btnAntGaleria.addEventListener('click', () => atualizarGaleria(indiceGaleria - 1));

  miniaturas.forEach((miniatura, idx) => {
    miniatura.addEventListener('click', () => atualizarGaleria(idx));
  });

  // Troca automática a cada 5 segundos com botão de pausa/play
  setInterval(() => {
    if (!pausado) {
      atualizarGaleria(indiceGaleria + 1);
    }
  }, 5000);

  btnPausaGaleria.addEventListener('click', () => {
    pausado = !pausado;
    btnPausaGaleria.textContent = pausado ? '▶' : '||';
  });
}

// --- CARROSSEL DE VÍDEOS DO MURAL (SEMPRE EM MOVIMENTO) ---
const itensVideosMural = document.querySelectorAll('.video-mural-item');
const contadorVideosMural = document.getElementById('contadorVideosMural');
const btnAntVideoMural = document.getElementById('btnAntVideoMural');
const btnProxVideoMural = document.getElementById('btnProxVideoMural');

if (itensVideosMural.length > 0) {
  let indiceVideoMural = 0;

  function mostrarVideoMural(novoIndice) {
    // Pausa o vídeo que estava tocando antes de trocar
    const videoAtual = itensVideosMural[indiceVideoMural].querySelector('video');
    if (videoAtual) {
      videoAtual.pause();
    }

    if (novoIndice >= itensVideosMural.length) {
      indiceVideoMural = 0;
    } else if (novoIndice < 0) {
      indiceVideoMural = itensVideosMural.length - 1;
    } else {
      indiceVideoMural = novoIndice;
    }

    itensVideosMural.forEach((item) => item.classList.remove('ativo'));
    itensVideosMural[indiceVideoMural].classList.add('ativo');

    const atualFmt = String(indiceVideoMural + 1).padStart(2, '0');
    const totalFmt = String(itensVideosMural.length).padStart(2, '0');
    contadorVideosMural.textContent = `${atualFmt} / ${totalFmt}`;
  }

  btnProxVideoMural.addEventListener('click', () => mostrarVideoMural(indiceVideoMural + 1));
  btnAntVideoMural.addEventListener('click', () => mostrarVideoMural(indiceVideoMural - 1));
}

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