# GLORIA III — Paquete Inicial
Proyecto base listo para publicar en GitHub Pages.

## Estructura
- `index.html` → Portada con fondo difuminado y CTA.
- `login.html` → Login simulado (elige Admin o Vigilancia).
- `dashboard.html` → Panel (protegido para Admin).
- `residentes.html` → Tabla con buscador por placa/apartamento/torre/nombre/apellido/cédula.
- `pagos.html` y `contacto.html` → Placeholder para completar.
- `style.css` y `script.js` → Estilos y lógica común.
- `img/fondo-difuminado.jpg` → Fondo reemplazable por foto real de la urbanización.

## Comportamiento de roles
- **Admin** → redirige a `dashboard.html` (con guard).
- **Vigilancia** → redirige a `residentes.html` (solo consulta).
Se guarda el rol en `localStorage` (`gloria3_rol`).

## Publicación
1. Sube todo al repositorio.
2. En GitHub: Settings → Pages → Source: `main` (root).
3. Abre la URL de GitHub Pages y prueba.
