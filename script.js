// ========================================
//  COMPRA SEGURA DIGITAL — script.js
//  TCC: João Gabriel, Luísa e Tayná
//  Mãe Luíza, Natal/RN — 2026
// ========================================

// ---------- NAVEGAÇÃO ENTRE SEÇÕES ----------

/**
 * Troca a seção visível e marca o link da nav como ativo.
 * @param {string} id - ID da seção a exibir (ex: 'dicas', 'golpes')
 */
function trocarSecao(id) {
  // Oculta todas as seções
  document.querySelectorAll('.secao').forEach(function (s) {
    s.classList.remove('ativa');
  });

  // Remove destaque de todos os links da nav
  document.querySelectorAll('nav a').forEach(function (a) {
    a.classList.remove('ativo');
  });

  // Exibe a seção escolhida
  var secao = document.getElementById(id);
  if (secao) secao.classList.add('ativa');

  // Marca o link correspondente como ativo
  var linkAtivo = document.querySelector('nav a[data-secao="' + id + '"]');
  if (linkAtivo) linkAtivo.classList.add('ativo');

  // Fecha o painel de acessibilidade se estiver aberto
  fecharPainel();

  // Volta ao topo suavemente
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Liga os cliques da nav automaticamente ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('nav a[data-secao]').forEach(function (link) {
    link.addEventListener('click', function () {
      trocarSecao(this.getAttribute('data-secao'));
    });
  });

  // Liga também os cards da página inicial
  document.querySelectorAll('[data-ir]').forEach(function (el) {
    el.addEventListener('click', function () {
      trocarSecao(this.getAttribute('data-ir'));
    });
  });

  // Data atual no header
  var spanData = document.getElementById('data-atual');
  if (spanData) {
    var dias  = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'];
    var meses = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
    var hoje  = new Date();
    spanData.textContent =
      dias[hoje.getDay()] + ', ' +
      hoje.getDate() + ' de ' +
      meses[hoje.getMonth()] + ' de ' +
      hoje.getFullYear();
  }
});

// ---------- ACESSIBILIDADE ----------

function togglePainel() {
  var painel = document.getElementById('painel-acess');
  if (painel.style.display === 'block') {
    fecharPainel();
  } else {
    painel.style.display = 'block';
  }
}

function fecharPainel() {
  var painel = document.getElementById('painel-acess');
  if (painel) painel.style.display = 'none';
}

var fonteGrande   = false;
var altoContraste = false;

function toggleFonteGrande() {
  fonteGrande = !fonteGrande;
  document.body.classList.toggle('fonte-grande', fonteGrande);
  document.getElementById('txt-fonte').textContent = fonteGrande
    ? '🔤 Letra Normal'
    : '🔤 Letra BEM Maior';
}

function toggleContraste() {
  altoContraste = !altoContraste;
  document.body.classList.toggle('alto-contraste', altoContraste);
  document.getElementById('txt-contraste').textContent = altoContraste
    ? '🌑 Contraste Normal'
    : '🌑 Alto Contraste';
}

function resetAcess() {
  fonteGrande   = false;
  altoContraste = false;
  document.body.classList.remove('fonte-grande', 'alto-contraste');
  document.getElementById('txt-fonte').textContent     = '🔤 Letra BEM Maior';
  document.getElementById('txt-contraste').textContent = '🌑 Alto Contraste';
  fecharPainel();
}

// Fecha painel ao clicar fora
document.addEventListener('click', function (e) {
  var painel = document.getElementById('painel-acess');
  var btn    = document.getElementById('btn-acessibilidade');
  if (
    painel && btn &&
    !painel.contains(e.target) &&
    e.target !== btn &&
    !btn.contains(e.target)
  ) {
    fecharPainel();
  }
});
