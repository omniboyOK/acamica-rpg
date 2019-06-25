/**
 * Variables globales
 * --------------------------------------------------------
 * Declaramos todas las variables globales que van a ser
 * utilizadas durante el juego. Ademas de que las variables
 * pueden ser accesibles desde cualquier parte del codigo,
 * podemos considerar que "manejan el estado" del juego.
 */

// Creamos el objeto personalizado 'Personaje'.
// Este va a tener las propiedades que corresponden,
// y los metodos, como 'atacar', etc.
function Personaje (tipo, estadisticas, enemigo = false)
{
    this.tipo = tipo
    this.estadisticas = estadisticas
    this.esEnemigo = enemigo
    this.atacar = function (objetivo) {
        const danioEfectuado = objetivo.estadisticas.ataque * (100 / 100 + objetivo.estadisticas.defensa)
        objetivo.estadisticas.vida = objetivo.estadisticas.vida - danioEfectuado
        registrar(`${!this.esEnemigo ? jugador.nombre : enemigoActual.tipo} ataca a ${this.esEnemigo ? jugador.nombre : enemigoActual.tipo}`, !this.esEnemigo)
    }
}

// Creamos la constante que contiene los personajes. Es un
// array que contiene n objetos. Cada uno, es un personaje
// que el jugador puede elegir para jugar.
const personajes = [
    new Personaje(
        'Guerrero',
        {
            ataque: 45,
            defensa: 60,
            maxVida: 2500,
            vida: 2500,
            maxMana: 1000,
            mana: 1000
        }),
    new Personaje(
        'Mago',
        {
            ataque: 60,
            defensa: 30,
            maxVida: 2000,
            vida: 2000,
            maxMana: 2500,
            mana: 2500
        }
    )
]

const enemigos = [
    new Personaje('Ogro', {
        ataque: 20,
        defensa: 30,
        maxVida: 2500,
        vida: 2500,
        maxMana: 750,
        mana: 750
    }, true),
    new Personaje('Dragon', {
        ataque: 80,
        defensa: 120,
        maxVida: 3250,
        vida: 3250,
        maxMana: 100,
        mana: 100
    }, true),
    new Personaje('Lagarto', {
        ataque: 10,
        defensa: 10,
        maxVida: 1500,
        vida: 1500,
        maxMana: 250,
        mana: 250
    }, true)
]

// En esta variable global se va a guardar el personaje seleccionado.
let jugador = {}

// En esta variable global se va a guardar el enemigo actual.
let enemigoActual = {}
