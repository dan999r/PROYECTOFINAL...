// Función para mostrar y ocultar el menú 
function toggleMenu() {
  var menu = document.getElementById("side-menu"); // esta funcion llama a la clase side menu de html q practicamente es el menu desplegable
  menu.classList.toggle("active"); // funcion para cuando se haga click en toglle el menu se activa
}

// Cerrar el menú cuando el cursor se aleja
var sideMenu = document.getElementById("side-menu");
sideMenu.addEventListener("mouseleave", function() {
  sideMenu.classList.remove("active"); // funcion cuando el mouse sale del menu , el menu se cierra
});

// Cerrar el menú al hacer clic en un enlace
var menuLinks = document.querySelectorAll('#side-menu .menu a');// Encuentra todos los enlaces (links) dentro del menú lateral
menuLinks.forEach(function(link) {
  link.addEventListener('click', function() { //"cuando se haga clic en los enlaces, ejecuta la función dentro".

    sideMenu.classList.remove('active'); // // Quita la clase "active" para ocultar el menú
  });
});