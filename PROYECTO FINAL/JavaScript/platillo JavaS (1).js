document.addEventListener('DOMContentLoaded', function() { // Esta línea se asegura de que el código dentro de la función se ejecute 
    const addToCartButtons = document.querySelectorAll('.add-to-cart');  // Selecciona todos los botones con la clase 'add-to-cart' y los guarda en una lista.
    const cartItemsContainer = document.querySelector('.cart-items');   // Selecciona el contenedor donde se mostrarán los ítems del carrito, un elemento con la clase 'cart-items'.
    const cartTotal = document.querySelector('.total-amount');   // Selecciona el elemento donde se mostrará el total del carrito, un elemento con la clase 'total-amount'.

    let cartTotalAmount = 0;

    addToCartButtons.forEach(button => { // Recorre todos los botones de 'add-to-cart'.
        button.addEventListener('click', () => { // Añade la funcion de 'click' a cada botón. Cada vez que se haga clic en un botón, se ejecutará esta función.
            const product = button.parentElement;
            const productName = product.querySelector('h3').innerText; // Selecciona el nombre del producto (contenido en una etiqueta 'h3') y obtiene su texto.
            const productPrice = parseFloat(product.querySelector('.price').innerText.replace('$', '')); // Selecciona el precio del producto (contenido en un elemento con la clase 'price'), 

            // Crear elemento de lista para el carrito
            const cartItem = document.createElement('li'); // Crea un nuevo elemento de lista ('li') que representará un ítem del carrito.
            cartItem.innerText = `${productName} - $${productPrice.toFixed(2)}`; // Establece el texto del nuevo elemento de lista con el nombre y el precio del producto.
            cartItemsContainer.appendChild(cartItem); // Actualizar total del carrito

            // Actualizar total del carrito
            cartTotalAmount += productPrice; //En términos de operación,+= la suma del carrito
            cartTotal.innerText = `$${cartTotalAmount.toFixed(2)}`; // Añade el nuevo elemento de lista al contenedor del carrito.

        });
    });
});


(function () {
    emailjs.init({
        public_key: "SThDC8CLbRDNe4R5R", // Coloca tu llave pública aquí
    });
})();

// Método para enviar el formulario
document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.total-amount');
    const checkoutForm = document.getElementById('checkout-form');

    let cartTotalAmount = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.parentElement;
            const productName = product.querySelector('h3').innerText;
            const productPrice = parseFloat(product.querySelector('.price').innerText);

            // Crear elemento de lista para el carrito
            const cartItem = document.createElement('li');
            cartItem.innerText = `${productName} - $${productPrice.toFixed(2)}`;
            cartItemsContainer.appendChild(cartItem);

            // Actualizar total del carrito
            cartTotalAmount += productPrice;
            cartTotal.value = `$${cartTotalAmount.toFixed(2)}`;
        });
    });

    checkoutForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const cartItems = Array.from(cartItemsContainer.querySelectorAll('li'))
            .map(item => item.innerText)
            .join('\n');
        const totalAmount = cartTotal.value;

        const templateParams = {
            from_name: "Elsazondemitierra",
            cart_items: cartItems,
            total_amount: totalAmount,
        };

        emailjs.send('service_ts3qujj', 'template_u7khh2v', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('El correo ha sido enviado exitosamente.');
            }, function (error) {
                console.log('FAILED...', error);
                alert('Hubo un problema al enviar el correo.');
            });
    });
});


