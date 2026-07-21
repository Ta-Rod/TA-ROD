# Notificaciones de reserva — Agendar Sesión

El sitio (`index.html`) vive en GitHub Pages, que solo sirve archivos
estáticos. La configuración por defecto **no requiere ningún backend, cuenta
ni API key** — ya está lista para funcionar.

## 1. Correo electrónico — FormSubmit (ya configurado)

Cada reserva confirmada se envía por correo a `tatitarodcr@gmail.com` usando
[FormSubmit](https://formsubmit.co), un servicio gratuito que reenvía
formularios por email sin necesitar cuenta, login ni API key — solo apunta al
correo de destino, que ya está puesto en el código (`BOOKING_NOTIFY_EMAIL` en
`index.html`).

**Único paso pendiente:** la primera vez que llegue una reserva real (o una
de prueba), FormSubmit le va a enviar un correo a `tatitarodcr@gmail.com`
pidiendo confirmar con un botón "Activate Form". Hay que revisar la bandeja
de entrada (y spam, por si acaso) y hacer click ahí una sola vez — después de
eso, todas las reservas futuras llegan automáticamente sin ningún paso extra.

Si en algún momento quieres cambiar el correo de destino, solo edita
`BOOKING_NOTIFY_EMAIL` en `index.html` (y repetir la activación una vez con
el nuevo correo).

## 2. WhatsApp — chat pre-escrito (ya configurado)

Al confirmar una reserva, el sitio abre automáticamente una pestaña de
WhatsApp (`wa.me`) dirigida al número `+506 8821-5669`
(`OWNER_WHATSAPP` en `index.html`) con todos los datos de la reserva ya
escritos en el mensaje. La persona que reserva solo tiene que darle
"Enviar" — no requiere backend ni credenciales de ningún tipo.

Si el navegador del cliente bloquea la ventana emergente (poco común, ya que
se abre en el mismo click), el mensaje de confirmación en el sitio se lo
recuerda igual.

## 3. (Opcional/avanzado) WhatsApp 100% automático con Twilio

Si más adelante quieres que el mensaje de WhatsApp llegue solo, sin que el
cliente tenga que darle "Enviar" en su propio WhatsApp, se necesita un
backend con credenciales secretas de Twilio (no se puede hacer solo desde el
navegador sin exponerlas). Ya está preparado en `api/notify-whatsapp.js`,
listo para desplegar en [Vercel](https://vercel.com) (plan gratuito).

Pasos:

1. Crea una cuenta en https://www.twilio.com y activa el
   [WhatsApp Sandbox](https://www.twilio.com/docs/whatsapp/sandbox) (gratis
   para pruebas) o un número de WhatsApp Business aprobado.
2. Copia tu **Account SID** y **Auth Token** desde el dashboard de Twilio.
3. En https://vercel.com, inicia sesión con tu cuenta de GitHub e importa
   este repositorio (`Nayrab55/TA-ROD`) como proyecto nuevo. Vercel detecta
   automáticamente la carpeta `api/` y publica `notify-whatsapp.js` como
   endpoint.
4. En **Project Settings → Environment Variables** del proyecto en Vercel,
   agrega (ver `api/.env.example`):
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_WHATSAPP_FROM` — número de WhatsApp de Twilio, formato
     `whatsapp:+14155238886`
   - `TWILIO_WHATSAPP_TO` — `whatsapp:+50688215669`
   - `ALLOWED_ORIGIN` — `https://nayrab55.github.io`
5. Despliega y copia la URL que te da Vercel (algo como
   `https://ta-rod-notify.vercel.app/api/notify-whatsapp`).
6. En `index.html`, pega esa URL en `WHATSAPP_NOTIFY_ENDPOINT`.

Esto es completamente opcional — el chat de WhatsApp pre-escrito (punto 2) ya
funciona sin esto.
