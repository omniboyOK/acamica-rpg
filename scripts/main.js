/**
 * Esta funcion es la que se ejecuta al cargar la pagina.
 * Dispara otras funciones.
 * @return {void}
 */

function iniciar() {
  menu.hide();
  inicializarElementos();
  mostrarSeleccionPersonaje();
}

// Agregamos un listener, que escucha el evento
// 'DOMContentLoaded'. Se ejecuta cuando el DOM
// se cargo completamente. En este caso, ejecuta
// la funcion 'iniciar'
document.addEventListener("DOMContentLoaded", iniciar);
