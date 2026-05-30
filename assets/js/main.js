// --- APLICAR FONDO GLOBAL ---
const fondoGuardado = localStorage.getItem('sylvaria_fondo') || 'tema-jardin';
document.body.classList.add(fondoGuardado);

// --- MOTOR DE SONIDO ---
function playSFX(tipo) {
    let archivo = "";
    if (tipo === 'arcane') archivo = '../assets/audio/sfx/arcane.wav';
    if (tipo === 'crystals') archivo = '../assets/audio/sfx/crystals.wav';
    if (tipo === 'chimes') archivo = '../assets/audio/sfx/chimes.mp3';
    if (tipo === 'arcane') archivo = '../assets/audio/sfx/arcane.wav';

    if (archivo) {
        const audio = new Audio(archivo);
        audio.volume = 0.6; 
        audio.play().catch(e => console.log("Audio esperando interacción."));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    crearPolvoDeHadas();
    renderizarMisiones(); 
    aplicarEfectoMarchitamiento();

    const formBienvenida = document.getElementById('form-bienvenida');
    const formMisiones = document.getElementById('form-misiones');
    const panelPerfil = document.getElementById('estadisticas-perfil');

    // --- LOGICA INDEX ---
    if (formBienvenida) {
        formBienvenida.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('nombre-jugador').value;
            localStorage.setItem('sylvaria_nombre', nombre);
            if(!localStorage.getItem('sylvaria_xp')) localStorage.setItem('sylvaria_xp', 0);
            if(!localStorage.getItem('sylvaria_misiones')) localStorage.setItem('sylvaria_misiones', JSON.stringify([]));
            if(!localStorage.getItem('sylvaria_historial')) localStorage.setItem('sylvaria_historial', JSON.stringify([]));
            
            document.getElementById('paso-nombre').style.display = 'none';
            document.getElementById('paso-personaje').style.display = 'block';
        });

        document.querySelectorAll('.tarjeta-personaje').forEach(tarjeta => {
            tarjeta.addEventListener('click', () => {
                playSFX('chimes');
                localStorage.setItem('sylvaria_personaje', tarjeta.getAttribute('data-personaje'));
                document.getElementById('paso-personaje').style.display = 'none';
                document.getElementById('paso-reino').style.display = 'block';
            });
        });

        document.querySelectorAll('.tarjeta-reino').forEach(tarjeta => {
            tarjeta.addEventListener('click', () => {
                playSFX('chimes');
                localStorage.setItem('sylvaria_fondo', tarjeta.getAttribute('data-tema'));
                setTimeout(() => window.location.href = './pages/invernadero.html', 300);
            });
        });
    }

    // --- LOGICA INVERNADERO ---
    if (formMisiones) {
        inicializarInvernadero();
        formMisiones.addEventListener('submit', (e) => {
            e.preventDefault();
            agregarMision();
        });
        document.getElementById('btn-salir').addEventListener('click', () => window.location.href = '../index.html');
        
        const dadoOraculo = document.getElementById('dado-oraculo');
        if(dadoOraculo) {
            dadoOraculo.addEventListener('click', () => {
                const tarjetas = document.querySelectorAll('.tarjeta-mision:not(.mision-completada)');
                if(tarjetas.length === 0) return alert("No hay decretos.");
                dadoOraculo.classList.add('girando');
                setTimeout(() => {
                    dadoOraculo.classList.remove('girando');
                    const t = tarjetas[Math.floor(Math.random() * tarjetas.length)];
                    document.getElementById('texto-destino').innerText = t.querySelector('h4').innerText;
                    document.getElementById('pergamino-modal').classList.remove('oculto');
                    playSFX('arcane');
                }, 1000);
            });
            document.getElementById('btn-cerrar-pergamino').addEventListener('click', () => document.getElementById('pergamino-modal').classList.add('oculto'));
        }
    }

    // --- LOGICA PERFIL ---
    if (panelPerfil) {
        cargarEstadisticas();
        const formFondos = document.getElementById('form-fondos');
        if(formFondos) formFondos.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem('sylvaria_fondo', document.getElementById('selector-fondo').value);
            alert("Reino actualizado.");
            location.reload();
        });

        const formPersonaje = document.getElementById('form-personaje');
        if(formPersonaje) formPersonaje.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem('sylvaria_personaje', document.getElementById('selector-personaje').value);
            alert("Espíritu transmutado.");
            location.reload();
        });

        const btnReiniciar = document.getElementById('btn-reiniciar');
        if(btnReiniciar) btnReiniciar.addEventListener('click', reiniciarJuego);
    }
});

/* --- FUNCIONES CORE PERFIL Y ESTADÍSTICAS --- */

function cargarEstadisticas() {
    const xp = localStorage.getItem('sylvaria_xp') || 0;
    const historial = JSON.parse(localStorage.getItem('sylvaria_historial')) || [];
    
    // Contamos las que están en el historial como completadas
    const completadas = historial.length; 
    
    // Aquí está la clave: leemos la memoria histórica, NO las tarjetas vivas
    const corrompidas = localStorage.getItem('sylvaria_total_corrompidas') || 0;

    const elXp = document.getElementById('perfil-xp');
    const elComp = document.getElementById('perfil-completadas');
    const elCorr = document.getElementById('perfil-corrompidas');

    if(elXp) elXp.innerText = xp;
    if(elComp) elComp.innerText = completadas;
    if(elCorr) elCorr.innerText = corrompidas;
}

function reiniciarJuego() {
    if(confirm("¿Estás segura de querer borrar todo tu progreso mágico?")) {
        localStorage.clear();
        window.location.href = '../index.html';
    }
}

/* --- FUNCIONES CORE INVERNADERO --- */

function renderizarMisiones() {
    const contenedor = document.getElementById('contenedor-tarjetas');
    if(!contenedor) return;
    contenedor.innerHTML = ''; 
    
    let misiones = JSON.parse(localStorage.getItem('sylvaria_misiones')) || [];
    let xpActual = parseInt(localStorage.getItem('sylvaria_xp')) || 0;
    const ahora = Date.now();

    misiones.forEach((mision, index) => {
        if (mision.estado === 'pendiente' && ahora > mision.fechaLimite) {
            mision.estado = 'corrompida';
            xpActual = Math.max(0, xpActual - 20);
            localStorage.setItem('sylvaria_xp', xpActual);
            
            // --- ACUMULADOR HISTÓRICO ---
            let totalCorrompidas = parseInt(localStorage.getItem('sylvaria_total_corrompidas')) || 0;
            localStorage.setItem('sylvaria_total_corrompidas', totalCorrompidas + 1);
            
            playSFX('arcane'); 
        }

        const div = document.createElement('div');
        div.classList.add('tarjeta-mision', `prioridad-${mision.prioridad}`);
        if(mision.estado === 'corrompida') div.classList.add('mision-corrompida');
        
        div.innerHTML = `
            <h4>#${index + 1} - ${mision.titulo}</h4>
            <p><small>Plazo: ${mision.tiempo} día(s) | Estado: ${mision.estado.toUpperCase()}</small></p>
            <p><small>Recompensa: ${mision.prioridad === 'alta' ? 200 : mision.prioridad === 'media' ? 100 : 50} XP</small></p>
            <div class="acciones">
                ${mision.estado === 'pendiente' ? `<button class="btn-accion btn-check" onclick="completarMision(${mision.id})">✔ Cumplir</button>` : ''}
                <button class="btn-accion btn-eliminar" onclick="eliminarMision(${mision.id})">✖ Borrar</button>
            </div>
        `;
        contenedor.appendChild(div);
    });

    localStorage.setItem('sylvaria_misiones', JSON.stringify(misiones));
    actualizarBarraXP(); 
    aplicarEfectoMarchitamiento();
}

function agregarMision() {
    const titulo = document.getElementById('titulo-mision').value;
    const prioridad = document.getElementById('prioridad-mision').value;
    const dias = parseInt(document.getElementById('tiempo-mision').value); 
    const fechaLimite = Date.now() + (dias * 24 * 60 * 60 * 1000);
    
    const misiones = JSON.parse(localStorage.getItem('sylvaria_misiones')) || [];
    misiones.push({ id: Date.now(), titulo, prioridad, tiempo: dias, fechaLimite, estado: 'pendiente' });
    
    localStorage.setItem('sylvaria_misiones', JSON.stringify(misiones));
    document.getElementById('form-misiones').reset();
    renderizarMisiones();
}

function completarMision(id) {
    let misiones = JSON.parse(localStorage.getItem('sylvaria_misiones')) || [];
    let historial = JSON.parse(localStorage.getItem('sylvaria_historial')) || [];
    let xp = parseInt(localStorage.getItem('sylvaria_xp')) || 0;
    
    let estadoPocion = localStorage.getItem('sylvaria_pocion_estado');
    let multiplicador = (estadoPocion === 'activa') ? 2 : 1;
    
    misiones = misiones.filter(m => m.estado !== 'corrompida'); 
    
    misiones = misiones.map(m => {
        if (m.id === id && m.estado === 'pendiente') {
            m.estado = 'completada';
            let baseXP = (m.prioridad === 'alta') ? 200 : (m.prioridad === 'media') ? 100 : 50;
            xp += (baseXP * multiplicador);
            historial.push(m);
        }
        return m;
    });
    
    if (estadoPocion === 'activa') {
        localStorage.setItem('sylvaria_pocion_estado', 'cooldown');
        localStorage.setItem('sylvaria_pocion_tiempo', Date.now() + (4 * 60 * 60 * 1000));
    }
    
    localStorage.setItem('sylvaria_misiones', JSON.stringify(misiones.filter(m => m.estado !== 'completada')));
    localStorage.setItem('sylvaria_historial', JSON.stringify(historial));
    localStorage.setItem('sylvaria_xp', xp);
    
    playSFX('crystals'); 
    renderizarMisiones();
    actualizarBarraXP();
    actualizarInterfazHada();
}

function aplicarEfectoMarchitamiento() {
    const imagenHada = document.getElementById('imagen-hada');
    const xp = parseInt(localStorage.getItem('sylvaria_xp')) || 0;
    
    let nivelGris = (xp >= 200) ? 0 : 40; 
    
    const misiones = JSON.parse(localStorage.getItem('sylvaria_misiones')) || [];
    const tieneCorrompidas = misiones.some(m => m.estado === 'corrompida');
    
    if (tieneCorrompidas) {
        nivelGris = 80; 
    }

    if (imagenHada) {
        imagenHada.style.filter = `grayscale(${nivelGris}%)`;
        imagenHada.style.transition = "filter 1s ease"; 
    }
}

function actualizarBarraXP() {
    const xp = parseInt(localStorage.getItem('sylvaria_xp')) || 0;
    const contador = document.getElementById('contador-xp');
    const barra = document.getElementById('barra-progreso');
    
    if(contador) contador.innerText = xp;
    if(barra) {
        const porcentaje = Math.min((xp / 1000) * 100, 100);
        barra.style.width = porcentaje + '%';
    }
}

function actualizarInterfazHada() {
    const personaje = localStorage.getItem('sylvaria_personaje') || 'hada';
    const nombreJugador = localStorage.getItem('sylvaria_nombre') || 'Héroe';
    const xp = parseInt(localStorage.getItem('sylvaria_xp')) || 0;
    const imagenHada = document.getElementById('imagen-hada');
    const textoDialogo = document.getElementById('texto-dialogo');
    const mensajeEstado = document.getElementById('mensaje-estado');

    let nivel = (xp >= 1000) ? 3 : (xp >= 400) ? 2 : 1;

    const textosAvatar = {
        'hada': { nombre: 'Lyra', saludos: { 1: "Apenas comenzamos, pero las ninfas confían en ti.", 2: "¡Tu magia florece grandemente!", 3: "¡Eres la Reina del Loto!" } },
        'guerrero': { nombre: 'Kael', saludos: { 1: "Un recluta con potencial.", 2: "Tu espada se forja en combate.", 3: "¡Eres el General de la Guardia!" } },
        'orco': { nombre: 'Grom', saludos: { 1: "Un cachorro de las cavernas...", 2: "Tu fuerza hace temblar la tierra.", 3: "¡Eres el Gran Jefe de Guerra!" } },
        'hechicera': { nombre: 'Elara', saludos: { 1: "Apenas dominas las chispas...", 2: "Los hilos de magia te obedecen.", 3: "¡Eres la Maestra Arcana!" } }
    };

    const presentaciones = {
        'hada': "Soy Lyra. Con mi magia del loto y tu guía, " + nombreJugador + ", venceremos a la Niebla.",
        'guerrero': "Soy Kael. Mi espada está a tus órdenes, " + nombreJugador + ".",
        'orco': "¡Soy Grom! Mi hacha destrozará las sombras por ti, " + nombreJugador + ".",
        'hechicera': "Soy Elara. Los astros revelan que juntos triunfaremos, " + nombreJugador + "."
    };

    if(imagenHada) imagenHada.src = `../assets/img/${personaje}-nivel${nivel}.png`;
    if(textoDialogo) textoDialogo.innerHTML = `<span class="nombre-avatar">${textosAvatar[personaje].nombre}</span> "${presentaciones[personaje]}"`;
    if(mensajeEstado) mensajeEstado.innerText = textosAvatar[personaje].saludos[nivel];
}

function inicializarInvernadero() {
    const nombre = localStorage.getItem('sylvaria_nombre') || 'Héroe';
    const saludo = document.getElementById('saludo-jugador');
    if(saludo) saludo.innerText = `Bienvenida, ${nombre}`;
    
    const imgPocion = document.getElementById('imagen-pocion');
    const txtContador = document.getElementById('contador-pocion');

    const actualizarVisualPocion = () => {
        const estado = localStorage.getItem('sylvaria_pocion_estado');
        const tiempoFin = parseInt(localStorage.getItem('sylvaria_pocion_tiempo')) || 0;

        if (estado === 'cooldown') {
            const ahora = Date.now();
            const restante = tiempoFin - ahora;
            if (restante > 0) {
                imgPocion.style.filter = "grayscale(100%)";
                let hrs = Math.floor((restante / (1000 * 60 * 60)) % 24);
                let min = Math.floor((restante / (1000 * 60)) % 60);
                let seg = Math.floor((restante / 1000) % 60);
                txtContador.innerText = `Disponible en: ${hrs}h ${min}m ${seg}s`;
            } else {
                localStorage.setItem('sylvaria_pocion_estado', 'disponible');
                imgPocion.style.filter = "none";
                txtContador.innerText = "¡Lista para usar!";
            }
        } else {
            imgPocion.style.filter = "none";
            txtContador.innerText = "¡Lista para usar!";
        }
    };

    if (imgPocion) {
        setInterval(actualizarVisualPocion, 1000);
        actualizarVisualPocion();
        imgPocion.onclick = () => {
            if (localStorage.getItem('sylvaria_pocion_estado') !== 'cooldown') {
                localStorage.setItem('sylvaria_pocion_estado', 'activa');
                playSFX('chimes');
                alert("🧪 ¡La Poción de Luz está activa! Tu próxima misión dará doble XP.");
                location.reload();
            } else {
                alert("⏳ La poción aún está recargando su magia.");
            }
        };
    }
    
    actualizarInterfazHada();
    renderizarMisiones();
}

function eliminarMision(id) { 
    let m = JSON.parse(localStorage.getItem('sylvaria_misiones')) || [];
    localStorage.setItem('sylvaria_misiones', JSON.stringify(m.filter(x => x.id !== id)));
    renderizarMisiones();
}

// Esperar a que toda la página cargue para encender la magia
document.addEventListener("DOMContentLoaded", () => {
    crearPolvoDeHadas();
});

function crearPolvoDeHadas() {
    const contenedor = document.getElementById('contenedor-polvo-hadas');
    
    if (!contenedor) return;

    // Forzar para que ocupe toda la pantalla
    contenedor.style.position = 'fixed';
    contenedor.style.top = '0';
    contenedor.style.left = '0';
    contenedor.style.width = '100vw';
    contenedor.style.height = '100vh';
    contenedor.style.pointerEvents = 'none';
    contenedor.style.zIndex = '9999';
    
    contenedor.innerHTML = '';
    
    // ¡100 particulas!
    for (let i = 0; i < 100; i++) {
        const particula = document.createElement('div');
        
        particula.style.position = 'absolute';
        particula.style.background = '#ffffff';
        particula.style.borderRadius = '50%';
        
        // ¡Triple brillo super potente para que se vea en fondos claros y oscuros!
        particula.style.boxShadow = '0 0 8px #ffffff, 0 0 15px #ffb3ff, 0 0 30px #ffb3ff';
        
        // Tamaño ligeramente mayor (entre 2 y 7 píxeles)
        particula.style.width = (Math.random() * 5 + 2) + 'px';
        particula.style.height = particula.style.width;
        
        // Distribución por toda la pantalla
        particula.style.left = Math.random() * 100 + 'vw';
        particula.style.top = Math.random() * 100 + 'vh';
        
        // Que nazcan visibles (opacidad entre 0.4 y 1)
        particula.style.opacity = Math.random() * 0.6 + 0.4;
        
        contenedor.appendChild(particula);
        
        // Animación más fluida y variada
        setInterval(() => {
            particula.style.transform = `translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px)`;
            particula.style.transition = 'transform 4s ease-in-out, opacity 4s ease-in-out';
            particula.style.opacity = Math.random() * 0.6 + 0.4; // Nunca se vuelven totalmente invisibles
        }, 3000 + Math.random() * 2000); // Tiempos desfasados para que luzca natural
    }
}

// Revisión de estructura de datos

// Validando variables del Storage

// Preparando carga de misiones

// Revisando cálculos de experiencia

// Optimización de sonidos mágicos

// Ajuste de filtros del Invernadero

// Confirmación de borrado de misiones

// Sincronización del Hada

// Conteo de misiones corrompidas

// Limpieza de caché local

// Renderizado de tarjetas de misión

// Alertas de la poción de luz

// Verificación del oráculo

// Fin de la integración principal


