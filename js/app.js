/* IntegraSign · prototipo de interfaz
   Comportamiento común. No hay servidor: todo son datos de ejemplo. */

const ICONOS = {
  lista:   '<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
  mas:     '<path d="M12 5v14M5 12h14"/>',
  pdf:     '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
  panel:   '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
  salir:   '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  escudo:  '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  subir:   '<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',
  check:   '<path d="M5 13l4 4L19 7"/>',
  reloj:   '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  arriba:  '<path d="M6 15l6-6 6 6"/>',
  abajo:   '<path d="M6 9l6 6 6-6"/>',
  basura:  '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  enlace:  '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  alerta:  '<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9L2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',
  info:    '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  mail:    '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  llave:   '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3"/>'
};
function ico(nombre, extra) {
  return '<svg class="ico ' + (extra || '') + '" viewBox="0 0 24 24">' + (ICONOS[nombre] || '') + '</svg>';
}

const LOGO = '<svg viewBox="0 0 40 40" aria-hidden="true">' +
  '<rect width="40" height="40" rx="10" fill="#19a5a3"/>' +
  '<path d="M11 27c3-9 5-13 8-13 3 0 1 9 4 9 2 0 3-4 6-4" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>' +
  '<path d="M11 31h18" stroke="#b9e8e4" stroke-width="2" stroke-linecap="round"/></svg>';

const MARCA = '<span class="brand">' + LOGO + '<span>Integra<span class="sign">Sign</span></span></span>';

const MENUS = {
  solicitante: {
    nombre: 'Daniela Paredes', correo: 'daniela.paredes@correo.ec',
    items: [
      ['Trámites', null],
      ['tramites', 'Mis trámites', '05-mis-tramites.html', 'lista'],
      ['nuevo', 'Nuevo trámite', '06-nuevo-tramite.html', 'mas'],
      ['Documentos', null],
      ['pdf', 'Herramientas PDF', '08-herramientas-pdf.html', 'pdf']
    ]
  },
  admin: {
    nombre: 'Administrador', correo: 'admin@integrasign.ec',
    items: [
      ['Administración', null],
      ['panel', 'Panel de administración', '14-panel-administrador.html', 'panel']
    ]
  }
};

function armarEstructura() {
  const body = document.body;
  const rol = body.dataset.rol;
  if (!rol) return;
  const m = MENUS[rol];
  const activo = body.dataset.activo;
  let nav = '';
  m.items.forEach(function (it) {
    if (it[1] === null) { nav += '<div class="nav-title">' + it[0] + '</div>'; return; }
    nav += '<a href="' + it[2] + '"' + (it[0] === activo ? ' class="active"' : '') + '>' + ico(it[3]) + it[1] + '</a>';
  });
  const menu = document.getElementById('menu');
  if (menu) {
    menu.innerHTML = MARCA + '<nav class="nav">' + nav + '</nav>' +
      '<div class="user"><div class="name">' + m.nombre + '</div><div class="umail">' + m.correo + '</div>' +
      '<a href="01-inicio-sesion.html">' + ico('salir') + 'Cerrar sesión</a></div>';
  }
  const barra = document.getElementById('barra');
  if (barra) {
    const extra = rol === 'admin'
      ? '<span class="chip-verif">' + ico('escudo') + 'Sesión verificada con certificado .p12</span>'
      : '<span class="muted small">' + m.correo + '</span>';
    barra.innerHTML = '<span class="crumbs">' + (body.dataset.ruta || '') + '</span>' + extra;
  }
}

function activarTabs() {
  document.querySelectorAll('[data-tabs]').forEach(function (grupo) {
    const botones = grupo.querySelectorAll('.tab');
    const destino = document.getElementById(grupo.dataset.tabs);
    const paneles = destino ? destino.querySelectorAll(':scope > .panel') : [];
    botones.forEach(function (b) {
      b.addEventListener('click', function () {
        botones.forEach(function (x) { x.classList.remove('active'); });
        paneles.forEach(function (p) { p.classList.remove('active'); });
        b.classList.add('active');
        const p = document.getElementById(b.dataset.panel);
        if (p) p.classList.add('active');
      });
    });
  });
}

function aviso(texto) {
  let t = document.getElementById('aviso');
  if (!t) { t = document.createElement('div'); t.id = 'aviso'; t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = texto;
  t.classList.add('show');
  clearTimeout(t._h);
  t._h = setTimeout(function () { t.classList.remove('show'); }, 3200);
}

function abrirModal(id) { const m = document.getElementById(id); if (m) m.classList.add('open'); }
function cerrarModal(id) { const m = document.getElementById(id); if (m) m.classList.remove('open'); }

/* campo para subir archivos: muestra el nombre elegido */
function vincularArchivo(inputId, destinoId, extension) {
  const inp = document.getElementById(inputId);
  const dest = document.getElementById(destinoId);
  if (!inp || !dest) return;
  inp.addEventListener('change', function () {
    if (!inp.files.length) return;
    const f = inp.files[0];
    const kb = f.size > 1048576 ? (f.size / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(f.size / 1024)) + ' KB';
    dest.innerHTML = '<div class="file-ok"><div class="tipo ' + (extension === 'p12' ? 'p12' : '') + '">' + (extension || 'PDF').toUpperCase() + '</div>' +
      '<div class="meta"><strong>' + f.name + '</strong><small>' + kb + '</small></div>' + ico('check') + '</div>';
    dest.classList.remove('hidden');
    document.dispatchEvent(new CustomEvent('archivo-listo', { detail: inputId }));
  });
}

/* casillas del código de verificación */
function activarCodigo(selector) {
  const casillas = document.querySelectorAll(selector + ' input');
  casillas.forEach(function (c, i) {
    c.addEventListener('input', function () {
      c.value = c.value.replace(/\D/g, '').slice(0, 1);
      if (c.value && casillas[i + 1]) casillas[i + 1].focus();
    });
    c.addEventListener('keydown', function (e) {
      if (e.key === 'Backspace' && !c.value && casillas[i - 1]) casillas[i - 1].focus();
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  armarEstructura();
  activarTabs();
  document.querySelectorAll('[data-cerrar]').forEach(function (b) {
    b.addEventListener('click', function () { cerrarModal(b.dataset.cerrar); });
  });
  document.querySelectorAll('[data-abrir]').forEach(function (b) {
    b.addEventListener('click', function () { abrirModal(b.dataset.abrir); });
  });
});
