# SATELITAL

Prototipo académico de plataforma web para la comercialización y solicitud de servicios de **internet satelital**, tomando como referencia la tecnología de Starlink.

Proyecto desarrollado en el marco del programa de **Ingeniería de Sistemas**, con el conjunto residencial **Quintas del Marqués (Mosquera, Cundinamarca, Colombia)** como zona piloto de referencia.

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

1. **Navbar** fijo con navegación por anclas y botón "Solicitar servicio".
2. **Hero** con animación de satélite orbitando y contadores animados.
3. **Beneficios**: 6 tarjetas (velocidad, cobertura, instalación, soporte, tecnología).
4. **Planes**: 3 tarjetas de planes con precio y velocidad fácilmente editables.
5. **Cómo funciona**: flujo visual Hogar → Antena → Satélite → Red de Internet → Hogar.
6. **Cobertura**: información de la zona piloto (Quintas del Marqués, Mosquera) con aviso claro de que los datos son del prototipo, no de Starlink real.
7. **Formulario de solicitud**: con validaciones en tiempo real y mensaje de confirmación.
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
- Los campos del formulario ya corresponden a los atributos que necesitaría una entidad `Solicitud` (nombre, teléfono, correo, dirección, conjunto residencial, unidad, plan, comentarios, estado, referencia).

Entidades previstas para el backend: `Cliente`, `Plan`, `Solicitud`, `Instalación`, `Usuario`.

La API podrá probarse posteriormente con **Postman** una vez esté disponible el backend en Spring Boot o Flask con MySQL.

## Autor

Sebastián Felipe Gaitán Fajardo — Ingeniería de Sistemas.
