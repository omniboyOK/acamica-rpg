/**
 * Variables globales
 * --------------------------------------------------------
 * Declaramos todas las variables globales que van a ser
 * utilizadas durante el juego. Ademas de que las variables
 * pueden ser accesibles desde cualquier parte del codigo,
 * podemos considerar que "manejan el estado" del juego.
 */
// 

const heroe = juego.personaje;
const villano = juego.enemigoActual;

// Variables de Jquery
var log = $("#juego-historial")

function scrollLog() {
  log.animate({ scrollTop: $("#juego-historial")[0].scrollHeight }, 500)
}

var menu = $("#habilidades-jugador");

// Variable que maneja los turnos

function swapTurn() {
  if (!juego.turnoJugador) {
    menu.css("pointer-events", "none");
    menu.addClass('disabled');
  } else{
    menu.css("pointer-events", "auto");
    menu.show(500)
    menu.removeClass('disabled');
  }  
  juego.turnoJugador = !juego.turnoJugador
}

/* Esta funcion cambia los turnos */
function nextTurn() {
  if (juego.turnoJugador) {
    swapTurn()
  } else {
    swapTurn()
    setTimeout(function() {
      switch(Math.floor(Math.random() * 2)){
        case 0 : juego.enemigoActual.habilidad1()
        break;
        case 1 : juego.enemigoActual.habilidad2()
        break;
        case 2 : juego.enemigoActual.habilidad3()
        break;
        case 3 : juego.enemigoActual.habilidad4()
        break;
      }
    }, 2000)
  }
}

// Creamos un array que guarda las habilidades del juego
// de esta manera podemos tomar y quitar habilidades de
// manera dinamica, el proceso para tomar habilidades
// del libro se puede mejorar.
function calcDaño(origen, objetivo) {}


