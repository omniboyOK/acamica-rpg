/**
 * Variables globales
 * --------------------------------------------------------
 * Declaramos todas las variables globales que van a ser
 * utilizadas durante el juego. Ademas de que las variables
 * pueden ser accesibles desde cualquier parte del codigo,
 * podemos considerar que "manejan el estado" del juego.
 */


 // Variables de Jquery
 var log = $('#juego-historial')
 function scrollLog(){
     log.animate({scrollTop:$("#juego-historial")[0].scrollHeight}, 500);
 }
 
var menu = $('#habilidades-jugador')

// Variable que maneja los turnos

var turnoJugador = true

function swapTurn(){
    turnoJugador = !turnoJugador
}

function nextTurn(){
    if(turnoJugador){
        menu.transition('fly right')
        swapTurn()
    } else {
        menu.transition('fly right')
        swapTurn()
        setTimeout(function(){
            registrar(`Durante su turno, el ${enemigoActual.tipo} no ha hecho nada`, false)
            nextTurn()
        }, 2000)
    }
}

// Creamos un array que guarda las habilidades del juego
// de esta manera podemos tomar y quitar habilidades de
// manera dinamica, el proceso para tomar habilidades
// del libro se puede mejorar.
const libro = [
    {
        id : 0,
        nombre: 'procrastinar',
        accion: function nothing(objetivo){
            console.log('this action do nothing')
            $('#seccion-estadisticas .ui.card').transition('jiggle')
            registrar(`No has hecho nada`)
            nextTurn()
        }
    },
    {   
        id : 1,
        nombre: "atacar",
        accion : function atacar(objetivo){
            $('.panel.enemigo .ui.card').transition('shake')
            const danioEfectuado = (jugador.personaje.estadisticas.ataque * 2) - objetivo.estadisticas.defensa
            registrar(`has hecho ${danioEfectuado} de daño`)
            objetivo.estadisticas.vida = objetivo.estadisticas.vida - danioEfectuado
            registrar(`${!this.esEnemigo ? jugador.nombre : enemigoActual.tipo} ataca a ${this.esEnemigo ? jugador.nombre : enemigoActual.tipo}`, !this.esEnemigo)
            actualizarValoresEnemigo()
            nextTurn()
        }
    },
    {   
        id : 2,
        nombre: "defender",
        accion: function defender(){
            jugador.personaje.estadisticas.defensa += 10
            actualizarValoresJugador()
            registrar(`${!this.esEnemigo ? jugador.nombre : enemigoActual.tipo} ha aumentado su defensa!`, !this.esEnemigo)
            nextTurn()
        }
    },
    {   
        id : 3,
        nombre: "fuego",
        accion : function hechizo(objetivo){
            if(jugador.personaje.estadisticas.mana > 500){
                $('.panel.enemigo .ui.card').transition('shake')
                const danioEfectuado = jugador.personaje.estadisticas.ataque * 3
                objetivo.estadisticas.vida = objetivo.estadisticas.vida - danioEfectuado
                jugador.personaje.estadisticas.mana -= 500
                registrar(`${!this.esEnemigo ? jugador.nombre : enemigoActual.tipo} lanzo fuego hacia ${this.esEnemigo ? jugador.nombre : enemigoActual.tipo}`, !this.esEnemigo)
                actualizarValoresEnemigo()
                actualizarValoresJugador()
                nextTurn()
            } else registrar(`No tienes suficiente mana`)
        }
    }
]

// Creamos el objeto personalizado 'Personaje'.
// Este va a tener las propiedades que corresponden,
// y los metodos, como 'atacar', etc.
function Personaje (tipo, estadisticas, habilidades, enemigo = false)
{
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
        'Guerrero',
        {
            ataque: 60,
            defensa: 50,
            maxVida: 600,
            vida: 600,
            maxMana: 1000,
            mana: 1000,
            portrait: "img/heroes/guerrero.png"
        },
        [
            1,
            2,
            0,
            0
        ]
    ),
    new Personaje(
        'Mago',
        {
            ataque: 30,
            defensa: 20,
            maxVida: 400,
            vida: 400,
            maxMana: 2500,
            mana: 2500,
            portrait: "img/heroes/mago.png"
        },
        [
            1,
            3,
            0,
            0
        ]
    )
]

const enemigos = [
    new Personaje('Orco', {
        ataque: 20,
        defensa: 30,
        maxVida: 250,
        vida: 250,
        maxMana: 750,
        mana: 750,
        portrait: "img/enemigos/orco.png"
    },
    [
        1,
        2,
        3,
        4
    ],
     true),
    new Personaje('Slime', {
        ataque: 10,
        defensa: 20,
        maxVida: 500,
        vida: 500,
        maxMana: 100,
        mana: 100,
        portrait: "img/enemigos/slime.png"
    },
    [], true),
    new Personaje('Demonio', {
        ataque: 10,
        defensa: 10,
        maxVida: 800,
        vida: 800,
        maxMana: 250,
        mana: 250,
        portrait: "img/enemigos/demonio.png"
    },
    [], true),
    new Personaje('Esqueleto', {
        ataque: 10,
        defensa: 10,
        maxVida: 800,
        vida: 800,
        maxMana: 250,
        mana: 250,
        portrait: "img/enemigos/esqueleto.png"
    },
    [], true)
]

// En esta variable global se va a guardar el personaje seleccionado.
let jugador = {}

// En esta variable global se va a guardar el enemigo actual.
let enemigoActual = {}