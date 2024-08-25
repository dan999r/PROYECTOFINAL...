const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_7xrlbep';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Enviar';
      alert('el correo se a enviado correcta mente');
    }, (err) => {
      btn.value = 'Enviando';
      alert(JSON.stringify(err));
    });
});