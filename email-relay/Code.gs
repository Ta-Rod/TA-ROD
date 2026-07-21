/**
 * Recibe los datos de una reserva desde TA-ROD y los envía por correo usando
 * MailApp, es decir, literalmente la cuenta de Gmail donde se despliega este
 * script. Ver README.md en esta misma carpeta para las instrucciones de
 * despliegue (Google Apps Script, gratis, sin tarjeta de crédito).
 */

// Cambia esto si algún día quieres que las reservas lleguen a otro correo.
var NOTIFY_EMAIL = 'tatitarodcr@gmail.com';

function doPost(e) {
  var result = { ok: false };
  try {
    var data = JSON.parse(e.postData.contents);
    var nombre = data['Nombre'] || '';
    var subject = '✦ Nueva reserva en TA-ROD — ' + nombre;
    var body =
      'Nombre: ' + nombre + '\n' +
      'Correo: ' + (data['Correo'] || '') + '\n' +
      'WhatsApp: ' + (data['WhatsApp'] || '') + '\n' +
      'Tipo de sesión: ' + (data['Tipo de sesión'] || '') + '\n' +
      'Modalidad: ' + (data['Modalidad'] || '') + '\n' +
      'Fecha y hora: ' + (data['Fecha y hora'] || '');

    MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
    result.ok = true;
  } catch (err) {
    result.error = String(err);
  }
  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
