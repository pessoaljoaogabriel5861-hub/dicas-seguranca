// ========================================
//  COMPRA SEGURA DIGITAL — script.js
//  TCC: João Gabriel, Luísa e Tayná
//  Natal/RN — 2026
// ========================================

var fonteGrande   = false;
var altoContraste = false;

// ---------- UTILITÁRIOS ----------
function el(id) { return document.getElementById(id); }

function anunciar(msg) {
  var aviso = el('aviso-acess');
  if (!aviso) return;
  aviso.textContent = '';
  setTimeout(function () { aviso.textContent = msg; }, 50);
}

function codigo() {
  return (fonteGrande ? 'f' : '') + (altoContraste ? 'c' : '');
}

// Garantia extra: leva a escolha dentro dos links das páginas (?a=fc)
function atualizarLinks() {
  document.querySelectorAll('a[href]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (!/\.html(\?.*)?$/.test(href)) return;
    var base = href.split('?')[0];
    a.setAttribute('href', codigo() ? base + '?a=' + codigo() : base);
  });
}

function salvar() {
  try {
    localStorage.setItem('acess', JSON.stringify({ f: fonteGrande, c: altoContraste }));
  } catch (e) {}
  atualizarLinks();
}

function rotulo(id, emoji, texto) {
  var b = el(id);
  if (b) b.querySelector('span').innerHTML = '<span aria-hidden="true">' + emoji + '</span> ' + texto;
}

// ---------- PAINEL DE ACESSIBILIDADE ----------
function abrirPainel() {
  el('painel-acess').hidden = false;
  el('painel-acess').style.display = 'block';
  el('btn-acessibilidade').setAttribute('aria-expanded', 'true');
  var primeiro = el('btn-fonte');
  if (primeiro) primeiro.focus();
}

function fecharPainel(devolverFoco) {
  var painel = el('painel-acess');
  if (!painel) return;
  painel.hidden = true;
  painel.style.display = 'none';
  var btn = el('btn-acessibilidade');
  if (btn) {
    btn.setAttribute('aria-expanded', 'false');
    if (devolverFoco) btn.focus();
  }
}

function togglePainel() {
  if (el('painel-acess').hidden) abrirPainel(); else fecharPainel(true);
}

// ---------- OPÇÕES ----------
function aplicarFonte(ativo, avisar) {
  fonteGrande = ativo;
  document.body.classList.toggle('fonte-grande', ativo);
  el('btn-fonte').setAttribute('aria-pressed', String(ativo));
  rotulo('btn-fonte', '🔤', ativo ? 'Letra Normal' : 'Letra BEM Maior');
  if (avisar) anunciar(ativo ? 'Letra grande ativada' : 'Letra grande desativada');
}

function aplicarContraste(ativo, avisar) {
  altoContraste = ativo;
  document.body.classList.toggle('alto-contraste', ativo);
  el('btn-contraste').setAttribute('aria-pressed', String(ativo));
  rotulo('btn-contraste', '🌑', ativo ? 'Contraste Normal' : 'Alto Contraste');
  if (avisar) anunciar(ativo ? 'Alto contraste ativado' : 'Alto contraste desativado');
}

function toggleFonteGrande() { aplicarFonte(!fonteGrande, true);   salvar(); }
function toggleContraste()   { aplicarContraste(!altoContraste, true); salvar(); }

function resetAcess() {
  aplicarFonte(false, false);
  aplicarContraste(false, false);
  salvar();
  anunciar('Configurações de acessibilidade restauradas ao normal');
  fecharPainel(true);
}

// ---------- INICIALIZAÇÃO ----------
document.addEventListener('DOMContentLoaded', function () {
  // Restaura preferências (valem para todas as abas do site)
  var f = false, c = false;
  try {
    var salvo = JSON.parse(localStorage.getItem('acess') || '{}');
    f = !!salvo.f; c = !!salvo.c;
  } catch (e) {}
  var p = new URLSearchParams(window.location.search).get('a');
  if (p !== null) { f = p.indexOf('f') > -1; c = p.indexOf('c') > -1; }
  if (f) aplicarFonte(true, false);
  if (c) aplicarContraste(true, false);
  salvar();

  // Data no cabeçalho
  var spanData = el('data-atual');
  if (spanData) {
    var dias  = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'];
    var meses = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
    var hoje  = new Date();
    spanData.textContent = dias[hoje.getDay()] + ', ' + hoje.getDate() + ' de ' +
                           meses[hoje.getMonth()] + ' de ' + hoje.getFullYear();
  }

  // O link "Ir para o conteúdo" move o foco de verdade para o <main>
  var skip = document.querySelector('.skip-link');
  if (skip) skip.addEventListener('click', function () {
    var main = el('conteudo');
    if (main) setTimeout(function () { main.focus(); }, 0);
  });
});

// Esc fecha o painel; clique fora também
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && el('painel-acess') && !el('painel-acess').hidden) fecharPainel(true);
});

document.addEventListener('click', function (e) {
  var painel = el('painel-acess'), btn = el('btn-acessibilidade');
  if (painel && btn && !painel.hidden && !painel.contains(e.target) && !btn.contains(e.target)) {
    fecharPainel(false);
  }
});
