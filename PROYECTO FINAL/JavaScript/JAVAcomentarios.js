// Inicializar EmailJS con tu User ID
(function() {
    emailjs.init("2ghaF-Nd9a8fNqxMa"); // Reemplaza "TU_USER_ID" con tu User ID de EmailJS
})();

document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Envía el formulario usando EmailJS
    emailjs.sendForm('service_ts3qujj', 'template_u7khh2v', this)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            document.getElementById('response-message').innerText = "¡Comentario enviado con éxito!";
            document.getElementById('comment-form').reset();
        }, function(error) {
            console.log('FAILED...', error);
            document.getElementById('response-message').innerText = "Ocurrió un error al enviar tu comentario. Inténtalo de nuevo.";
        });
});
