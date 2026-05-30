# 🌟 Sylvaria - Jardín de Hadas - Anti-Procrastination Quest

## 📝 Descripción
**Sylvaria** es una plataforma web interactiva y totalmente gamificada diseñada para combatir la procrastinación y optimizar la organización de tareas diarias o académicas bajo la metáfora de un viaje místico. El sistema transforma la gestión del tiempo tradicional en una experiencia inmersiva donde cada tarea se registra como un decreto o misión, permitiendo al usuario avanzar niveles, acumular experiencia (XP) y proteger su propio reino de la Niebla oscura.

---

## 👩‍💻 Autora e Integrante
* **Sofía Zilijosky** (Desarrolladora Autónoma)

---

## 💡 Idea Elegida
* **Idea 1: Anti-Procrastination Quest** (Nicho: Productividad, gaming y estudiantes). Adaptado con éxito para ofrecer un ecosistema visual fluido, estados de misión complejos y persistencia de datos.

---

## 🛠️ Tecnologías Utilizadas
* **HTML5:** Estructura semántica avanzada (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) para garantizar accesibilidad, SEO básico y jerarquía limpia.
* **CSS3 Nativo:** Arquitectura visual propia basada en variables globales, transiciones fluidas, animaciones dinámicas y adaptabilidad *responsive* (*Mobile & Desktop*) mediante Media Queries obligatorias.
* **JavaScript Vanilla:** Motor lógico nativo encargado de la manipulación del DOM, control de temporizadores por intervalos, gestión de eventos y control acústico contextual.
* **Web Storage (localStorage):** Persistencia obligatoria estructurada para guardar el estado del perfil del usuario (nombre, avatar, reino), misiones vigentes, historial acumulado de tareas completadas y registro histórico inmutable de corrupción.

---

## 🚀 Funcionalidades Principales
El proyecto implementa de manera estricta y nativa las siguientes mecánicas clave exigidas por la consigna:

1. 📂 **Gestión Dinámica y Renderizado de Misiones:** Formulario estructurado para registrar misiones definiendo título, plazo en días y prioridad (Alta, Media, Baja). Las *cards* se inyectan dinámicamente modificando el árbol del DOM.
2. 🌫️ **Sistema Predictivo de Corrupción por Plazos:** Automatización lógica en tiempo real. Si el reloj global supera la fecha límite de una misión pendiente, el sistema transmuta automáticamente su estado a `'corrompida'`, penalizando al usuario con la pérdida de 20 XP.
3. 🧝‍♀️ **Mecánica de Marchitamiento Dinámico (Filtro Grayscale):** Vinculación directa entre el estado del reino y la interfaz. Al existir misiones corrompidas en el tablero, el avatar principal activa un filtro CSS instantáneo de escala de grises al 80% con transiciones suavizadas.
4. 🌸 **Purificación Automatizada del Reino:** Al completar de manera exitosa cualquier decreto pendiente, la lógica purifica el tablero, eliminando los registros de misiones corrompidas de la vista activa y restaurando instantáneamente los colores vivos del avatar.
5. 🧪 **Poción de Luz con Enfriamiento (Cooldown):** Consumible interactivo que aplica un multiplicador de recompensa (doble XP) para la próxima misión cumplida. Cuenta con un script que actualiza un contador de segundo a segundo (horas, minutos y segundos) inhabilitándose visualmente durante su recarga.
6. 🎲 **Dado del Oráculo:** Selector aleatorio basado en el objeto `Math` que analiza únicamente las misiones pendientes del usuario, reproduce un efecto visual de giro animado mediante clases de CSS y revela en un pergamino modal el próximo decreto destinado a cumplirse.
7. 📊 **Registro de Leyenda Histórica (Perfil):** Página dedicada a las estadísticas. Muestra la experiencia total y las misiones completadas recuperadas del historial. Cuenta con un acumulador de corrupción persistente que memoriza el conteo exacto de misiones fallidas de manera indefinida.
8. 🔮 **Transmutación de Esencia y Portales:** Formularios dinámicos de configuración que permiten cambiar el personaje (Hada del Loto, Guerrero Fae, Orco Bestial, Hechicera Arcana) o el escenario del fondo global (`body`), guardando las preferencias al instante.
9. 🎵 **Motor de Efectos de Sonido (SFX):** Sistema acústico integrado nativamente en JavaScript que reproduce efectos contextuales de audio (`crystals.wav`, `chimes.mp3`, `arcane.wav`) controlando volumen y previniendo excepciones de interacción con promesas nativas.

---

## 📂 Estructura del Proyecto
La arquitectura de carpetas se organiza de manera rigurosa y limpia respetando las buenas prácticas de desarrollo:

```text
/proyecto
├── index.html                  # Portal de bienvenida, selección de personaje y reino
├── README.md                   # Documentación principal obligatoria del repositorio
├── pages/
│   ├── invernadero.html        # Tablero central de misiones, pociones y avatar dinámico
│   └── perfil.html             # Registro histórico de evolución, estadísticas y configuración
└── assets/
    ├── css/
    │   └── style.css           # Hoja de estilos global, variables, temas y responsive design
    ├── js/
    │   └── main.js            # Lógica central unificada, controladores DOM y Web Storage
    ├── audio/
    │   └── sfx/                # Biblioteca de efectos de sonido nativos del sistema
    └── img/                    # Banco de assets visuales de personajes, fondos y favicons



    📖 INSTRUCCIONES DE USO:

1. Inicio de Partida: Abra el archivo index.html en el navegador, ingrese su nombre en el formulario y haga clic para seleccionar su avatar y el escenario inicial.

2. Decretar Misiones: En el panel del Invernadero, utilice el formulario superior para añadir sus misiones reales estableciendo plazos en días.

3. Progreso y Alertas: Supervise sus plazos. Cumpla las tareas haciendo clic en ✔ Cumplir para obtener la recompensa de XP. Si deja vencer una tarea, verá cómo el avatar pierde su color por la corrupción.

4. Uso Estratégico: Active la Poción de Luz para maximizar sus ganancias en misiones de alta prioridad y use el Dado del Oráculo cuando necesite que el destino elija su próxima tarea.

5. Evolución: Diríjase al Registro de Magia (Perfil) para evaluar sus estadísticas acumuladas de productividad y cambiar su linaje o entorno de trabajo cuando lo desee.

🔗 LINKS DEL PROYECTO

🖥️ Repositorio: [https://github.com/shadowia-sofiazilijosky/sylvaria-jardin-de-hadas]
🌐 Deploy Funcional: [Enlace al deploy oficial del sitio web]

## 🤖 USO DE INTELIGENCIA ARTIFICIAL

El desarrollo de este proyecto contó con asistencia de Inteligencia Artificial exclusivamente para la curaduría visual, paleta de colores y la conceptualización de la gamificación. El detalle completo de las herramientas utilizadas, prompts y las decisiones técnicas tomadas de forma manual por la autora se encuentra documentado en el archivo adjunto `informe-ia.md`.