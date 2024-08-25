
      
        
        
         type="text/javascript">
          emailjs.init('h9FRwBn_ivZJJ7pip')
        
        
        document.addEventListener('DOMContentLoaded', function() {
    let enviandoPedido = false;

   // Función para obtener los datos del carrito
function getCarritoHTML() {
    const listaCarrito = document.querySelector('.lista-carrito');
    if (!listaCarrito) {
        console.error('No se encontró el contenedor del carrito.');
        return '<p>No se encontraron productos en el carrito.</p>';
    }

    const productos = Array.from(listaCarrito.children);
    if (productos.length === 0) {
        return '<p>No se encontraron productos en el carrito.</p>';
    }

    let carritoHTML = `
        <h2 style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; text-align: center; margin-bottom: 20px;"></h2>
        <table style="width: 100%; border-collapse: collapse; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin-bottom: 20px;">
            <thead>
                <tr style="background-color: #007bff; color: white; border-bottom: 2px solid #0056b3;">
                    <th style="padding: 12px; border-right: 1px solid #0056b3; text-align: left;">Cantidad</th>
                    <th style="padding: 12px; border-right: 1px solid #0056b3; text-align: left;">Descripción</th>
                    <th style="padding: 12px; border-right: 1px solid #0056b3; text-align: right;">Precio Unitario</th>
                    <th style="padding: 12px; text-align: right;">Ventas Gravadas</th>
                </tr>
            </thead>
            <tbody>`;

    let totalVentasGravadas = 0;

    productos.forEach(producto => {
        const cantidad = parseInt(producto.querySelector('.producto-canasta-cantidad')?.textContent || '0');
        const descripcion = producto.querySelector('.producto-canasta-nombre')?.textContent || 'Descripción desconocida';
        const precioUnitario = parseFloat(producto.getAttribute('data-price') || '0');
        const ventasGravadas = cantidad * precioUnitario;

        carritoHTML += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 12px; border-right: 1px solid #ccc; text-align: left;">${cantidad}</td>
                <td style="padding: 12px; border-right: 1px solid #ccc; text-align: left; word-wrap: break-word;">${descripcion}</td>
                <td style="padding: 12px; border-right: 1px solid #ccc; text-align: right;">$${precioUnitario.toFixed(2)}</td>
                <td style="padding: 12px; text-align: right;">$${ventasGravadas.toFixed(2)}</td>
            </tr>`;

        totalVentasGravadas += ventasGravadas;
    });

    carritoHTML += `
            </tbody>
            <tfoot>
                <tr style="border-top: 2px solid #007bff;">
                    <td colspan="3" style="padding: 12px; text-align: right; font-weight: bold;">Total:</td>
                    <td style="padding: 12px; text-align: right; font-weight: bold;">$${totalVentasGravadas.toFixed(2)}</td>
                </tr>
            </tfoot>
        </table>`;
    
    return carritoHTML;
}

// Manejo del clic en el botón de finalizar compra
document.getElementById('finalizar-compra')?.addEventListener('click', function() {
 
    if (enviandoPedido) {
        return; 
    }

    const listaCarrito = document.querySelector('.lista-carrito');
    if (listaCarrito.children.length === 0) {
        // Mostrar una alerta si el carrito está vacío
        alert('El carrito está vacío. Por favor, añade productos antes de realizar la orden.');
        return;
    }
    // Mostrar mensaje de progreso
    const mensajeProgreso = document.getElementById('mensaje-progreso');
    if (mensajeProgreso) {
        mensajeProgreso.classList.remove('oculto');
    }

    // Marcar el botón como procesando y desactivar todos los botones 
    enviandoPedido = true;
    document.body.classList.add('procesando'); // Añadir clase global para el estado de procesamiento

    this.setAttribute('disabled', 'true');
    document.querySelectorAll('.boton-agregar').forEach(btn => {
        btn.setAttribute('disabled', 'true');
    });
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.setAttribute('disabled', 'true');
    }
    document.querySelectorAll('.eliminar-producto').forEach(btn => {
        btn.setAttribute('disabled', 'true');
    });

    
    setTimeout(() => {
        // Ocultar mensaje de progreso
        if (mensajeProgreso) {
            mensajeProgreso.classList.add('oculto');
        }

        // Mostrar mensaje de éxito con opción de confirmar
        const mensajeExito = document.getElementById('mensaje-exito');
        if (mensajeExito) {
            mensajeExito.classList.remove('oculto');
        }

        // Manejar el clic en el botón para ir al formulario
        document.getElementById('confirmar-formulario')?.addEventListener('click', function() {
            // Ocultar el mensaje de éxito
            if (mensajeExito) {
                mensajeExito.classList.add('oculto');
            }

            // Ocultar la página de confirmación
            const paginaConfirmacion = document.getElementById('pagina-confirmacion');
            if (paginaConfirmacion) {
                paginaConfirmacion.classList.add('oculto');
            }

            // Mostrar el formulario
            const formulario = document.getElementById('pagina-formulario');
            if (formulario) {
                formulario.classList.remove('oculto');
                formulario.classList.add('animacion');
                setTimeout(() => {
                    formulario.classList.remove('animacion');
                }, 500); // Duración de la animación
            }

            // Reactivar todos los botones
            document.body.classList.remove('procesando'); // Eliminar clase global de procesamiento
            document.querySelectorAll('.boton-agregar').forEach(btn => {
                btn.removeAttribute('disabled');
            });
            const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
            if (vaciarCarritoBtn) {
                vaciarCarritoBtn.removeAttribute('disabled');
            }
            document.querySelectorAll('.eliminar-producto').forEach(btn => {
                btn.removeAttribute('disabled');
            });

            // Limpiar estado de procesado en el botón
            document.getElementById('finalizar-compra').removeAttribute('disabled');
            enviandoPedido = false;
        });

    }, 4000); // Tiempo de espera simulado para el proceso
});
document.getElementById('formulario-pedido').addEventListener('submit', function(event) {
    event.preventDefault(); // 

    // Mostrar el mensaje de proceso antes de enviar los correos
    mostrarMensajeProceso();

    // Recopilar los datos del formulario
    const formData = new FormData(document.getElementById('formulario-pedido'));
    const nombre = formData.get('nombre');
    const correo = formData.get('correo');
    const metodoEntrega = formData.get('metodo-entrega');
    const direccion = metodoEntrega === 'Entrega a Domicilio' ? formData.get('direccion') : 'N/A';
    const telefono = formData.get('telefono');
    const departamento = formData.get('departamento');
    const municipio = formData.get('municipio');
    const carritoHTML = getCarritoHTML(); // Asegúrate de que esta función devuelva el HTML correcto del carrito

    // Deshabilitar el formulario y sus campos
    deshabilitarFormulario();

    // Objetos con datos para los correos electrónicos
    const orderDataDev = {
        Cliente: nombre,
        correo: correo,
        to_email: 'elsazondemitierrasv2024@gmail.com',
        metodoEntrega: metodoEntrega,
        direccion: direccion,
        telefono: telefono,
        departamento: departamento,
        municipio: municipio,
        fecha: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        carrito: carritoHTML // Verifica que esto devuelva el HTML del carrito
    };

    const orderDataClient = {
        Cliente: nombre,
        to_email: correo,
        fecha: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        carrito: carritoHTML // Verifica que esto devuelva el HTML del carrito
    };

    // Enviar correo al desarrollador
    emailjs.send('service_jjxk7qj', 'template_50yjh34', orderDataDev)
        .then(() => {
            console.log('Correo enviado al desarrollador con éxito.');
        })
        .catch((error) => {
            console.error('Error al enviar correo al desarrollador:', error);
        });

    // Enviar correo al cliente
    emailjs.send('service_jjxk7qj', 'template_030b74b', orderDataClient)
        .then(() => {
            console.log('Correo enviado al cliente con éxito.');

           
            setTimeout(() => {
                // Ocultar el mensaje de proceso y mostrar la confirmación después de la pausa
                ocultarMensajeProceso();
                mostrarMensajeConfirmacion();
            }, 2000); // Esperar 2 segundos adicionales
        })
        .catch((error) => {
            console.error('Error al enviar correo al cliente:', error);

            // Ocultar el mensaje de proceso y habilitar el formulario 
            ocultarMensajeProceso();
            habilitarFormulario();
        });
});

// Función para deshabilitar los campos del formulario y el botón de envío
function deshabilitarFormulario() {
    const formulario = document.getElementById('formulario-pedido');
    if (formulario) {
        formulario.querySelectorAll('input, select, button').forEach(el => el.setAttribute('disabled', 'true'));
    }
}

// Función para habilitar el formulario en caso de error
function habilitarFormulario() {
    const formulario = document.getElementById('formulario-pedido');
    if (formulario) {
        formulario.querySelectorAll('input, select, button').forEach(el => el.removeAttribute('disabled'));
    }
}

// Función para mostrar el mensaje de proceso
function mostrarMensajeProceso() {
    const mensajeProceso = document.getElementById('mensaje-envio');
    if (mensajeProceso) {
        mensajeProceso.classList.remove('oculto');
    }
}

// Función para ocultar el mensaje de proceso
function ocultarMensajeProceso() {
    const mensajeProceso = document.getElementById('mensaje-envio');
    if (mensajeProceso) {
        mensajeProceso.classList.add('oculto');
    }
}

// Función para mostrar el mensaje de confirmación y manejar el clic en "Aceptar"
function mostrarMensajeConfirmacion() {
    const mensajeConfirmacion = document.getElementById('mensaje-confirmacion');
    if (mensajeConfirmacion) {
        mensajeConfirmacion.classList.remove('oculto');

        mensajeConfirmacion.querySelector('button').addEventListener('click', function() {
            // Ocultar el mensaje de confirmación
            mensajeConfirmacion.classList.add('oculto');

            // Ocultar la página del formulario y mostrar la página de confirmación
            document.getElementById('pagina-formulario').classList.add('oculto');
            document.getElementById('pagina-confirmacion').classList.remove('oculto');

            // Vaciar el carrito y reiniciar el formulario
            reiniciarCarritoYFormulario();
        });
    }
}
function reiniciarCarritoYFormulario() {
    // Vaciar el carrito
    const carritoContainer = document.querySelector('.lista-carrito');
    if (carritoContainer) {
        carritoContainer.innerHTML = ''; // Vaciar el carrito
    }

    // Borrar el total
    const totalElement = document.getElementById('total');
    if (totalElement) {
        totalElement.textContent = '0.00'; // Reiniciar el total a 0
        
        // Forzar una actualización visual
        setTimeout(() => {
            console.log('Total después de reiniciar:', totalElement.textContent);
        }, 0);
    }

    // Reiniciar el formulario
    const formulario = document.getElementById('formulario-pedido');
    if (formulario) {
        formulario.reset(); // Limpiar todos los campos del formulario
        habilitarFormulario(); // Reactivar los campos del formulario
    }

    // Reactivar todos los botones y campos
    document.body.classList.remove('procesando'); // Eliminar clase global de procesamiento
    document.querySelectorAll('.boton-agregar').forEach(btn => btn.removeAttribute('disabled'));
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.removeAttribute('disabled');
    }
    document.querySelectorAll('.eliminar-producto').forEach(btn => btn.removeAttribute('disabled'));
    const finalizarCompraBtn = document.getElementById('finalizar-compra');
    if (finalizarCompraBtn) {
        finalizarCompraBtn.removeAttribute('disabled');
    }

   
}


});


            // Calcula el total del carrito
            function calculateTotal() {
                const productos = document.querySelectorAll('.producto-canasta');
                let total = 0;
    
                productos.forEach(producto => {
                    const cantidad = parseInt(producto.querySelector('.producto-canasta-cantidad').textContent);
                    const precioUnitario = parseFloat(producto.getAttribute('data-price'));
                    total += cantidad * precioUnitario;
                });
    
                return total.toFixed(2);
            }
    
            // Actualiza la visualización del total del carrito
            function actualizarTotal() {
                const totalCarrito = document.querySelector('.total-carrito');
                if (totalCarrito) {
                    totalCarrito.textContent = 'Total: $' + calculateTotal();
                }
            }
    // Maneja el clic en los botones de agregar productos
document.querySelectorAll('.boton-agregar').forEach(button => {
    button.addEventListener('click', function () {
        if (this.classList.contains('cargando') || this.classList.contains('añadido') || document.body.classList.contains('procesando')) {
            return;
        }

        // Desactivar botones durante el proceso
        document.body.classList.add('procesando');
        document.querySelectorAll('.boton-agregar').forEach(btn => {
            btn.setAttribute('disabled', 'true');
        });
        document.getElementById('vaciar-carrito').setAttribute('disabled', 'true');
        document.getElementById('finalizar-compra').setAttribute('disabled', 'true');

        this.classList.add('cargando');
        this.innerHTML = '<i class="fas fa-spinner"></i> Añadiendo...';

        setTimeout(() => {
            const producto = {
                name: this.getAttribute('data-name'),
                price: parseFloat(this.getAttribute('data-price')),
                quantity: 1
            };

            const listaCarrito = document.querySelector('.lista-carrito');
            const productoExistente = Array.from(listaCarrito.children).find(item => item.querySelector('.producto-canasta-nombre').textContent === producto.name);
            if (productoExistente) {
                const cantidadElemento = productoExistente.querySelector('.producto-canasta-cantidad');
                const cantidad = parseInt(cantidadElemento.textContent) + 1;
                cantidadElemento.textContent = cantidad;
                productoExistente.querySelector('.producto-canasta-total').textContent = '$' + (cantidad * producto.price).toFixed(2);
            } else {
                const itemHTML = `
                    <div class="producto-canasta" data-price="${producto.price}">
                        <span class="producto-canasta-nombre">${producto.name}</span>
                        <span class="producto-canasta-cantidad">${producto.quantity}</span>
                        <span class="producto-canasta-total">$${producto.price.toFixed(2)}</span>
                        <i class="fas fa-times eliminar-producto"></i>
                    </div>
                `;
                listaCarrito.insertAdjacentHTML('beforeend', itemHTML);
            }
            actualizarTotal();
            this.classList.remove('cargando');
            this.classList.add('añadido');
            this.innerHTML = '<i class="fas fa-check"></i> Añadido';

            setTimeout(() => {
                this.classList.remove('añadido');
                this.innerHTML = '<i class="fas fa-cart-plus"></i> Agregar al carrito';

                // Reactivar botones cuando se complete la adición
                document.body.classList.remove('procesando');
                document.querySelectorAll('.boton-agregar').forEach(btn => {
                    btn.removeAttribute('disabled');
                });
                document.getElementById('vaciar-carrito').removeAttribute('disabled');
                document.getElementById('finalizar-compra').removeAttribute('disabled');
            }, 1700);
        }, 1600);
    });
});

// Maneja el clic en los botones de eliminar productos
document.querySelector('.lista-carrito').addEventListener('click', function (event) {
    if (document.body.classList.contains('procesando')) return; // No permitir eliminación durante el proceso

    if (event.target.classList.contains('eliminar-producto')) {
        const productoCanasta = event.target.closest('.producto-canasta');
        const cantidadElemento = productoCanasta.querySelector('.producto-canasta-cantidad');
        const cantidad = parseInt(cantidadElemento.textContent) - 1;
        const precioUnitario = parseFloat(productoCanasta.getAttribute('data-price'));

        if (cantidad > 0) {
            cantidadElemento.textContent = cantidad;
            productoCanasta.querySelector('.producto-canasta-total').textContent = '$' + (cantidad * precioUnitario).toFixed(2);
        } else {
            productoCanasta.remove();
        }
        actualizarTotal();
    }
});

// Vaciar el carrito
document.getElementById('vaciar-carrito').addEventListener('click', function() {
    if (document.body.classList.contains('procesando')) return; // No permitir vaciado durante el proceso

    const listaCarrito = document.querySelector('.lista-carrito');
    if (listaCarrito.children.length === 0) {
        alert("El carrito ya está vacío.");
        return;
    }
    if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
        listaCarrito.innerHTML = '';
        actualizarTotal();
    }
});

  

    document.addEventListener('DOMContentLoaded', function () {
      const formulario = document.getElementById('formulario-pedido');
      const metodoRecoger = document.getElementById('recoger');
      const metodoDomicilio = document.getElementById('domicilio');
      const direccionAdicional = document.getElementById('direccion-adicional');

      // Mostrar u ocultar campos adicionales según el método de entrega
      metodoRecoger.addEventListener('change', function () {
        if (metodoRecoger.checked) {
          direccionAdicional.classList.remove('mostrar');
          direccionAdicional.querySelectorAll('input').forEach(input => {
            input.required = false;
            input.value = ''; // Limpiar campos adicionales
          });
        }
      });

      metodoDomicilio.addEventListener('change', function () {
        if (metodoDomicilio.checked) {
          direccionAdicional.classList.add('mostrar');
          direccionAdicional.querySelectorAll('input').forEach(input => {
            input.required = true;
          });
        }
      });

      // Validar campos antes de enviar
      formulario.addEventListener('submit', function (event) {
        let camposValidos = true;

        // Verificar que todos los campos obligatorios estén llenos
        formulario.querySelectorAll('input[required]').forEach(input => {
          if (input.value.trim() === '') {
            camposValidos = false;
            input.classList.add('lleno');
          } else {
            input.classList.add('lleno');
          }
        });

        if (!camposValidos) {
          event.preventDefault();
          alert('Por favor, complete todos los campos antes de enviar el formulario.');
        }
      });

      // Cambiar el color del fondo y texto cuando el campo está lleno
      formulario.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function () {
          if (input.value.trim() !== '') {
            input.classList.add('lleno');
          } else {
            input.classList.remove('lleno');
          }
        });
      });
    });
  
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
    
