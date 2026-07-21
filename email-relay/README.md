# Correo de reservas vía Google Apps Script

Con esto, cada reserva del sitio manda un correo que sale **literalmente
desde tu propia cuenta de Gmail** (tatitarodcr@gmail.com) — no depende de
ningún servicio externo como FormSubmit.

## Despliegue (5 minutos, gratis, sin tarjeta)

1. Entra a **https://script.google.com** con la cuenta de Gmail
   `tatitarodcr@gmail.com` y haz clic en **"Nuevo proyecto"**.
2. Ponle un nombre arriba, por ejemplo `TA-ROD Email Relay` (clic en
   "Proyecto sin título").
3. Borra todo el código de ejemplo que aparece (`function myFunction() {...}`)
   y pega en su lugar el contenido completo del archivo `Code.gs` que está
   en esta misma carpeta del repositorio.
4. Guarda (ícono de disquete o Ctrl+S).
5. Arriba a la derecha, clic en **"Implementar" → "Nueva implementación"**.
6. En "Seleccionar tipo", clic en el ícono de engranaje ⚙️ y elige
   **"Aplicación web"**.
7. Configura:
   - **Ejecutar como:** Yo (tu cuenta)
   - **Quién tiene acceso:** Cualquier usuario
8. Clic en **"Implementar"**. Google te va a pedir autorizar el script para
   que pueda enviar correos en tu nombre — es normal, dale **"Autorizar
   acceso"**, elige tu cuenta, y si sale una pantalla de advertencia
   ("Google no verificó esta app") clic en **"Configuración avanzada"** →
   **"Ir a TA-ROD Email Relay (no seguro)"** → **"Permitir"**. Esto es
   seguro: es tu propio script, en tu propia cuenta, solo Google muestra esa
   advertencia porque no lo revisó manualmente (no hace falta que lo haga).
9. Copia la **URL de la aplicación web** que te muestra al terminar (algo
   como `https://script.google.com/macros/s/AKfycb.../exec`).
10. Pega esa URL en `index.html`, en la constante `APPS_SCRIPT_EMAIL_URL`
    (sección "MODAL AGENDAR", cerca del inicio del script).

## Si más adelante cambias el código

Cada vez que edites `Code.gs` en script.google.com, tienes que volver a
**"Implementar" → "Gestionar implementaciones"** → ícono de lápiz → cambiar
la versión a "Nueva versión" → **"Implementar"**, para que los cambios
queden activos en la URL ya publicada (guardar solo no alcanza).
