// Creamos el objeto personalizado 'Personaje'.
// Este va a tener las propiedades que corresponden,
// y los metodos, como 'atacar', etc.
class Personaje{
  constructor(tipo, estadisticas, habilidades, enemigo = false){
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
  
}

// Creamos la constante que contiene los personajes. Es un
// array que contiene n objetos. Cada uno, es un personaje
// que el jugador puede elegir para jugar.
const personajes = [
    new Personaje(
      "Guerrero",
      estadisticas = {
        ataque: 60,
        defensa: 50,
        maxVida: 600,
        vida: 600,
        maxMana: 1000,
        mana: 1000,
        portrait: "img/heroes/guerrero.png"
      },
      [1, 2, 0, 4]
    ),
    new Personaje(
      "Mago",
      estadisticas = {
        ataque: 30,
        defensa: 20,
        maxVida: 400,
        vida: 400,
        maxMana: 2500,
        mana: 2500,
        portrait: "img/heroes/mago.png"
      },
      [1, 3, 0, 4]
    ),
    new Personaje(
      "Asesino",
      estadisticas = {
        ataque: 70,
        defensa: 30,
        maxVida: 500,
        vida: 500,
        maxMana: 500,
        mana: 500,
        portrait: "img/heroes/Actor1-3.png"
      },
      [1, 2, 0, 4]
    ),
    new Personaje(
      "Sacerdota",
      estadisticas = {
        ataque: 40,
        defensa: 30,
        maxVida: 500,
        vida: 500,
        maxMana: 1500,
        mana: 1500,
        portrait: "img/heroes/Actor3-4.png"
      },
      [1, 2, 0, 4]
    ),
    new Personaje(
      "Guerrera",
      estadisticas = {
        ataque: 60,
        defensa: 50,
        maxVida: 600,
        vida: 600,
        maxMana: 1000,
        mana: 1000,
        portrait: "img/heroes/Actor1-2.png"
      },
      [1, 2, 0, 4]
    ),
    new Personaje(
      "Asesino",
      estadisticas = {
        ataque: 70,
        defensa: 30,
        maxVida: 500,
        vida: 500,
        maxMana: 500,
        mana: 500,
        portrait: "img/heroes/Actor1-3.png"
      },
      [1, 2, 0, 4]
    ),
    new Personaje(
      "Sacerdota",
      estadisticas = {
        ataque: 40,
        defensa: 30,
        maxVida: 500,
        vida: 500,
        maxMana: 1500,
        mana: 1500,
        portrait: "img/heroes/Actor3-4.png"
      },
      [1, 2, 0, 4]
    )
  ]

