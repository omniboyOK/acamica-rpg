/**
 * Variables globales
 * --------------------------------------------------------
 * Declaramos todas las variables globales que van a ser
 * utilizadas durante el juego. Ademas de que las variables
 * pueden ser accesibles desde cualquier parte del codigo,
 * podemos considerar que "manejan el estado" del juego.
 */

// Variables de Jquery
var log = $("#juego-historial")

function scrollLog() {
  log.animate({ scrollTop: $("#juego-historial")[0].scrollHeight }, 500)
}

var menu = $("#habilidades-jugador")

// Variable que maneja los turnos
var turnoJugador = true

function swapTurn() {
  turnoJugador = !turnoJugador
}

function disableMenu() {
  $('#habilidades-jugador a').addClass('disabled').click(false)
}

function enableMenu() {
  $('#habilidades-jugador a').removeClass('disabled').click(true)
}

/* Esta funcion cambia los turnos */
function nextTurn() {
  if (turnoJugador) {
    menu.transition("fly right")
    //enableMenu()
    swapTurn()
  } else {
    //disableMenu()
    menu.transition("fly right")
    swapTurn()
    setTimeout(function() {
      enemigoActual.habilidades[Math.floor(Math.random() * 2)].accion()
    }, 2000)
  }
}

// Creamos un array que guarda las habilidades del juego
// de esta manera podemos tomar y quitar habilidades de
// manera dinamica, el proceso para tomar habilidades
// del libro se puede mejorar.
function calcDaño(origen, objetivo) {}

const libro = [
  {
    id: 0,
    nombre: "procrastinar",
    accion: function nothing() {
      switch (turnoJugador) {
        case false:
          {
            console.log("this action do nothing")
            $("#seccion-estadisticas .ui.card").transition("jiggle")
            registrar(`${jugador.nombre} No ha hecho nada`)
            nextTurn()
          }
          break
        case true: {
          console.log("this action do nothing")
          $(".panel.enemigo .ui.card").transition("jiggle")
          registrar(`${enemigoActual.tipo} No ha hecho nada`, false)
          nextTurn()
        }
      }
    }
  },
  {
    id: 1,
    nombre: "atacar",
    accion: function atacar() {
      switch (turnoJugador) {
        case true:
          {
            $("#seccion-estadisticas .ui.card").transition("shake")
            const danioEfectuado =
            enemigoActual.estadisticas.ataque * 2 - jugador.personaje.estadisticas.defensa
            jugador.personaje.estadisticas.vida -= danioEfectuado
            registrar(`${enemigoActual.tipo} ataca a ${jugador.nombre}`, false)
            registrar(`te ha hecho ${danioEfectuado} de daño`, false)
            nextTurn()
            actualizarValoresEnemigo()
            actualizarValoresJugador()
          }
          break
        case false: {
          $(".panel.enemigo .ui.card").transition("shake")
          const danioEfectuado =
            jugador.personaje.estadisticas.ataque * 2 -
            enemigoActual.estadisticas.defensa
          enemigoActual.estadisticas.vida -= danioEfectuado
          registrar(`${jugador.nombre} ataca a ${enemigoActual.tipo}`)
          registrar(`has hecho ${danioEfectuado} de daño`)
          nextTurn()
          actualizarValoresEnemigo()
          actualizarValoresJugador()
        }
      }
    }
  },
  {
    id: 2,
    nombre: "defender",
    accion: function defender() {
      switch (turnoJugador) {
        case true:
          {
            $(".panel.enemigo .ui.card").transition("pulse")
            enemigoActual.estadisticas.defensa += 10
            registrar(`${enemigoActual.tipo} ha aumentado su defensa!`, false)
            nextTurn()
            actualizarValoresEnemigo()
            actualizarValoresJugador()
          }
          break
        case false: {
          $("#seccion-estadisticas .ui.card").transition("pulse")
          jugador.personaje.estadisticas.defensa += 10
          registrar(`${jugador.nombre} ha aumentado su defensa!`)
          nextTurn()
          actualizarValoresEnemigo()
          actualizarValoresJugador()
        }
      }
    }
  },
  {
    id: 3,
    nombre: "fuego",
    accion: function hechizo() {
      switch (turnoJugador) {
        case true:
          {
            if (enemigoActual.estadisticas.mana > 200) {
              $("#seccion-estadisticas .ui.card").transition("pulse")
              const danioEfectuado = enemigoActual.estadisticas.ataque * 2
              jugador.personaje.estadisticas.vida -= danioEfectuado
              enemigoActual.estadisticas.mana -= 200
              registrar(
                `${enemigoActual.tipo} ha lanzado fuego sobre ${
                  jugador.nombre
                }`,
                false
              )
              registrar(`te ha hecho ${danioEfectuado} de daño`, false)
              nextTurn()
              actualizarValoresEnemigo()
              actualizarValoresJugador()
            } else {
              registrar(
                `${
                  enemigoActual.tipo
                } ha intentado lanzar un hechizo pero no tiene suficiente mana`
              )
              nextTurn()
            }
          }
          break
        case false: {
          if (jugador.personaje.estadisticas.mana > 200) {
            $(".panel.enemigo .ui.card").transition("pulse")
            const danioEfectuado = jugador.personaje.estadisticas.ataque * 2
            enemigoActual.estadisticas.vida -= danioEfectuado
            jugador.personaje.estadisticas.mana -= 200
            registrar(
              `${jugador.nombre} ha lanzado fuego sobre ${enemigoActual.tipo}`
            )
            registrar(`has hecho ${danioEfectuado} de daño`)
            nextTurn()
            actualizarValoresEnemigo()
            actualizarValoresJugador()
          } else {
            registrar(`no tienes suficiente mana`)
          }
        }
      }
    }
  },
  {
    id : 4,
    nombre : "inventario",
    accion : function abrirInventario(){
  $('.ui.dimmer')
  .dimmer('show')
  ;
    }
  }
]

// En esta variable global se va a guardar el personaje seleccionado.
let jugador = {}

// En esta variable global se va a guardar el enemigo actual.
let enemigoActual = {}
