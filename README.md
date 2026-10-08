# SATELITAL

Prototipo académico de plataforma web para la comercialización y solicitud de servicios de **internet satelital**, tomando como referencia la tecnología de Starlink.

Dirigido a los **negocios locales de Mosquera, Cundinamarca** (casco urbano y veredas). Proyecto desarrollado en el marco del programa de **Ingeniería de Sistemas** (semillero SIIANTEC, TEINCO). El contenido del sitio se basa en el documento `PROYECTO SATELITAL.pdf`: piloto de ~50 negocios, meta de 80 % de cobertura en 12 meses y 85 % de satisfacción tras tres meses de uso.

> Este es un prototipo académico. Los precios, velocidades y datos de cobertura mostrados son de referencia y **no representan información oficial de Starlink**.

## Estado actual (Etapa 1 — Frontend estático)

- HTML5, CSS3 y JavaScript puro (sin frameworks).
- Sin backend ni base de datos todavía: el formulario de solicitud guarda los datos en `localStorage` del navegador y muestra un mensaje de confirmación con un número de referencia.
- Estructura pensada para conectarse en una segunda etapa con una API REST.

## Estructura del proyecto

```
satelital/
├── index.html          # Página principal (todas las secciones)
├── css/
│   └── styles.css      # Estilos globales, tema espacial y responsive
├── js/
│   └── script.js       # Lógica de interfaz, validaciones y simulación de envío
├── assets/
│   ├── images/         # Imágenes del sitio (vacío por ahora, listo para usar)
│   └── icons/
│       └── favicon.svg
└── README.md
```

## Secciones del sitio

1. **Navbar** fijo con navegación por anclas, botón "Solicitar servicio" y botón para alternar entre tema oscuro (por defecto) y claro; la elección se guarda en el navegador.
2. **Hero** con animación de satélite orbitando y contadores animados.
3. **Beneficios**: 6 tarjetas pensadas para negocios (pagos y ventas, conectividad satelital, casco urbano y veredas, instalación, soporte con seguimiento, tecnología de órbita baja).
4. **Planes**: 3 tarjetas (Emprende $200.000 · 120 Mbps, Negocio $300.000 · 250 Mbps, Empresa $400.000 · 400 Mbps, precios mensuales). Los tres incluyen lo mismo; solo cambia la velocidad.
5. **Cómo funciona**: flujo visual Negocio → Antena → Satélite → Red de Internet → Negocio, más los pasos posteriores a la solicitud (verificación de cobertura, visita, instalación, activación y capacitación).
6. **Cobertura**: piloto por fases en Mosquera, con aviso claro de que las cifras son metas del proyecto, no datos medidos ni de Starlink real.
7. **Formulario de solicitud**: datos del negocio (tipo, ubicación urbana/rural, conexión actual), validaciones en tiempo real y mensaje de confirmación.
8. **Nosotros**: descripción del proyecto como iniciativa académica.
9. **Contacto**: correo, teléfono, WhatsApp y ubicación (datos de ejemplo).
10. **Footer**: marca, navegación secundaria y derechos de autor.

## Cómo ejecutar el proyecto

No requiere instalación ni dependencias. Basta con abrir el archivo `index.html` en un navegador, o servirlo con un servidor local (recomendado para evitar restricciones de algunos navegadores con rutas locales):

**Opción 1 — Abrir directamente:**
Haz doble clic en `satelital/index.html`.

**Opción 2 — Servidor local con Python:**
```bash
cd satelital
python -m http.server 5500
```
Luego abre `http://localhost:5500` en el navegador.

**Opción 3 — Extensión Live Server (VS Code):**
Abre la carpeta `satelital/` en VS Code y usa "Go Live".

## Datos editables del prototipo

Los precios y velocidades de los planes están en `index.html` (sección `#planes`) y se pueden modificar directamente en los atributos `data-price` y en el texto de cada tarjeta. Los mismos valores se reflejan en las opciones del `<select id="plan">` del formulario.

## Próximas etapas (fuera del alcance de esta versión)

El frontend está preparado para evolucionar hacia:

```
Frontend SATELITAL
      ↓
   API REST
      ↓
Backend (Spring Boot / Flask)
      ↓
    MySQL
```

Puntos de integración ya marcados en el código:

- `js/script.js` — función `initRequestForm()`: el envío del formulario guarda los datos en `localStorage`; ahí se marcó con un comentario `TODO(API REST)` dónde reemplazar esa lógica por una petición `fetch` real hacia un endpoint como `POST /api/solicitudes`.
- Los campos del formulario ya corresponden a los atributos que necesitaría una entidad `Solicitud` (nombre del negocio, contacto, teléfono, correo, tipo de negocio, zona, dirección o vereda, conexión actual, plan, comentarios, estado, referencia).

Entidades previstas para el backend: `Usuario`, `NegocioLocal`, `Zona`, `Plan` (servicio de internet), `Solicitud`, `Instalación`, `Ticket`.

> **Decisión pendiente:** el documento del proyecto propone Node.js/Express + PostgreSQL + React, mientras que la idea inicial del prototipo era Spring Boot o Flask + MySQL. Hay que elegir una sola alternativa antes de construir el backend.

La API podrá probarse posteriormente con **Postman** una vez esté disponible el backend.

## Autor

Sebastián Felipe Gaitán Fajardo — Ingeniería de Sistemas.
