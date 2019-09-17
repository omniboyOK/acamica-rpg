// Creamos el objeto personalizado 'Personaje'.
// Este va a tener las propiedades que corresponden,
// y los metodos, como 'atacar', etc.
class Personaje{
  constructor(tipo, estadisticas, lista, enemigo = false){
    this.nombre = "";
    this.objetivo = 0,
    this.objetivoPortrait = enemigo ? $("#player_portrait") : $("#enemy_portrait")
    this.portrait = enemigo ? $("#enemy_portrait") : $("#player_portrait")
    this.tipo = tipo
    this.estadisticas = estadisticas
    this.esEnemigo = enemigo
    //Aqui se registra la lista de habilidades como objetos
    this.habilidades = [
      libro[lista[0]],
      libro[lista[1]],
      libro[lista[2]],
      libro[lista[3]]
    ]
    //Aqui tomamos solo las acciones de cada habilidad
    //y se las damos a nuestro personaje
    this.habilidad1 = this.habilidades[0].accion
    this.habilidad2 = this.habilidades[1].accion
    this.habilidad3 = this.habilidades[2].accion
    this.habilidad4 = this.habilidades[3].accion
  }
  
  actualizarObjetivo() {
    this.objetivo = this.esEnemigo ? juego.personaje : juego.enemigoActual
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