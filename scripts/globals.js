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
  }
]

// Creamos el objeto personalizado 'Personaje'.
// Este va a tener las propiedades que corresponden,
// y los metodos, como 'atacar', etc.
function Personaje(tipo, estadisticas, habilidades, enemigo = false) {
  this.tipo = tipo
  this.estadisticas = estadisticas
  this.esEnemigo = enemigo
  this.habilidades = [
    libro[habilidades[0]],
    libro[habilidades[1]],
    libro[habilidades[2]],
    libro[habilidades[3]]
  ]
}

// Creamos la constante que contiene los personajes. Es un
// array que contiene n objetos. Cada uno, es un personaje
// que el jugador puede elegir para jugar.
const personajes = [
  new Personaje(
    "Guerrero",
    {
      ataque: 60,
      defensa: 50,
      maxVida: 600,
      vida: 600,
      maxMana: 1000,
      mana: 1000,
      portrait: "img/heroes/guerrero.png"
    },
    [1, 2, 0, 0]
  ),
  new Personaje(
    "Mago",
    {
      ataque: 30,
      defensa: 20,
      maxVida: 400,
      vida: 400,
      maxMana: 2500,
      mana: 2500,
      portrait: "img/heroes/mago.png"
    },
    [1, 3, 0, 0]
  )
]

const enemigos = [
  new Personaje(
    "Orco",
    {
      ataque: 50,
      defensa: 30,
      maxVida: 250,
      vida: 250,
      maxMana: 750,
      mana: 750,
      portrait: "img/enemigos/orco.png"
    },
    [0, 1, 1, 1],
    true
  ),
  new Personaje(
    "Slime",
    {
      ataque: 70,
      defensa: 20,
      maxVida: 200,
      vida: 200,
      maxMana: 500,
      mana: 500,
      portrait: "img/enemigos/slime.png"
    },
    [3, 0, 0, 1],
    true
  ),
  new Personaje(
    "Demonio",
    {
      ataque: 150,
      defensa: 80,
      maxVida: 400,
      vida: 400,
      maxMana: 2500,
      mana: 2500,
      portrait: "img/enemigos/demonio.png"
    },
    [3, 3, 1, 0],
    true
  ),
  new Personaje(
    "Esqueleto",
    {
      ataque: 100,
      defensa: 20,
      maxVida: 600,
      vida: 600,
      maxMana: 250,
      mana: 250,
      portrait: "img/enemigos/esqueleto.png"
    },
    [1, 1, 1, 2],
    true
  )
]

// En esta variable global se va a guardar el personaje seleccionado.
let jugador = {}

// En esta variable global se va a guardar el enemigo actual.
let enemigoActual = {}
