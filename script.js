document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('contenedor');
  const preguntaEl = document.getElementById('pregunta');
  const btnBack = document.getElementById('btnBack');
  const btnFullscreen = document.getElementById('btnFullscreen');

  // --- Datos ---
  const opcionesNegativas = ['Comida fría','Cruda','Mal sabor','Poca variedad','Tardanza en servir','Otro'];
  const opcionesPositivas = ['Sabor','Variedad','Atención','Ambiente','Raciones adecuadas','Otro'];
  const opcionesPrincipales = [
    { texto:'Excelente', tipo:'positivo' },
    { texto:'Bueno',     tipo:'positivo' },
    { texto:'Regular',   tipo:'negativo' },
    { texto:'Malo',      tipo:'negativo' }
  ];

  // --- Estado ---
  let seleccionPrincipal = null;
  let wakeLock = null;

  // --- UI ---
  function setPreguntaPrincipal() {
    preguntaEl.textContent = '¿Qué tal estuvo el servicio?';
    btnBack.classList.add('oculto');
  }

  function setPreguntaSecundaria() {
    preguntaEl.textContent = `¿Por qué calificaste “${seleccionPrincipal}”?`;
    btnBack.classList.remove('oculto');
  }

  function mostrarBotonesPrincipales(){
    seleccionPrincipal = null;
    setPreguntaPrincipal();
    contenedor.innerHTML = '';
    opcionesPrincipales.forEach(op => {
      const btn = document.createElement('button');
      btn.className = `boton-grande ${op.tipo==='positivo'?'boton-positivo':'boton-negativo'}`;
      btn.textContent = op.texto;
      btn.onclick = () => {
        seleccionPrincipal = op.texto;
        mostrarOpcionesSecundarias(op.tipo);
      };
      contenedor.appendChild(btn);
    });
  }

  function mostrarOpcionesSecundarias(tipo){
    setPreguntaSecundaria();
    contenedor.innerHTML = '';
    const ops = (tipo==='negativo'?opcionesNegativas:opcionesPositivas);
    ops.forEach(opcion => {
      const btn = document.createElement('button');
      btn.className = 'boton-grande';
      btn.textContent = opcion;
      btn.onclick = () => mostrarAgradecimiento(opcion);
      contenedor.appendChild(btn);
    });
  }

  function mostrarAgradecimiento(motivo){
    contenedor.innerHTML = `
      <div class="mensaje-agradecimiento">
        ¡Gracias por tu opinión!<br/>
        <small>${seleccionPrincipal} · ${motivo}</small>
      </div>`;
    // Aquí podrías enviar al backend:
    // fetch('/api/respuesta', { method:'POST', headers:{'Content-Type':'application/json'},
    //   body: JSON.stringify({ principal: seleccionPrincipal, motivo }) });

    setTimeout(mostrarBotonesPrincipales, 1500);
  }

  btnBack.addEventListener('click', mostrarBotonesPrincipales);

  // --- Modo pantalla completa ---
  async function enterFullscreen() {
    try {
      const el = document.documentElement;
      if (el.requestFullscreen) await el.requestFullscreen();
      else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen(); // Safari
      btnFullscreen.classList.add('oculto');
    } catch(e){ /* no-op */ }
  }
  btnFullscreen.addEventListener('click', enterFullscreen);
  // Oculta el botón si ya está en fullscreen
  document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) btnFullscreen.classList.add('oculto');
    else btnFullscreen.classList.remove('oculto');
  });

  // --- Wake Lock (evitar que la tablet se duerma) ---
  async function requestWakeLock(){
    try{
      if ('wakeLock' in navigator) {
        wakeLock = await navigator.wakeLock.request('screen');
        wakeLock.addEventListener('release', () => { /* opcional log */ });
      }
    }catch(e){ /* permisos o no soportado */ }
  }
  // Re-adquirir si cambia la visibilidad
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && !wakeLock) requestWakeLock();
  });

  // Inicialización
  mostrarBotonesPrincipales();
  requestWakeLock();
});
