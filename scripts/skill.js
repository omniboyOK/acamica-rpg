/* Aqui estan todas las mecanicas del juego,
tambien un libro con todas las habilidades*/

/*Estas son todas funciones globales, es decir,
  son mecanicas genericas como restar vida, sumar defensa, etc.
  Al crear una nueva habilidad solo hay que poner el orden de las
  acciones y listo, 
*/
// Actualiza los valores cuando hay cambios
function update(){
    actualizarValoresEnemigo();
    actualizarValoresJugador();
}

function sinMana(){
    registrar(`No tienes suficiente mana`)
}

//Calcula el gasto de mana
function gastarMana(usuario, valor){
    usuario.estadisticas.mana -= valor
}

//Calculo de daño generico para daño fisico
//usuario es el que ha invocado el hechizo,
//el daño se calcula entre ataque y defensa
function ataqueFisico(usuario){
    usuario.objetivoPortrait.transition("shake");
    let danioEfectuado =
        usuario.estadisticas.ataque * 2 - usuario.objetivo.estadisticas.defensa;
      usuario.objetivo.estadisticas.vida -= danioEfectuado;      
      registrar(
        `${usuario.tipo} ataca a ${usuario.objetivo.tipo} por ${danioEfectuado}`,
        usuario.esEnemigo ? false : true
      );
}

//Calculo de daño generico para daño magico
function ataqueMagico(usuario){
    let danioEfectuado =
        usuario.estadisticas.ataque * 2;
      usuario.objetivo.estadisticas.vida -= danioEfectuado;
      registrar(
        `${usuario.tipo} lanza un hechizo sobre ${usuario.objetivo.tipo} por ${danioEfectuado}`,
        usuario.esEnemigo ? false : true
      );
}

//Todos los buff son un incremento a una estadistica
//Bonificacion de defensa al usuario
function buffDef(usuario, valor){
    usuario.estadisticas.defensa += valor
    usuario.portrait.transition("pulse");
    registrar(
        `${usuario.tipo} ha aumentado su defensa!`,
        usuario.esEnemigo ? false : true
      );
}

//Todos los debuff afectan negativamente a las estadisticas

/* Para agregar un nuevo hehizo hay que agregar un nuevo objeto
y darle los siguientes parametros:
id: un id unico para llevar cuenta de las habilidades,
nombre: este va a aparecer en los botones del jugador,
accion : la funcion a ejecutar cuando el jugador o el monstruo utilizen esa habilidad
*/
const libro = [
// Esta habilidad es de testing, no hace nada
  {
    id: 0,
    nombre: "procrastinar",
    accion: function procrastinar() {
      console.log("this action do nothing");
      this.portrait.transition("jiggle");
      registrar(
        `${this.tipo} no ha hecho nada`,
        this.esEnemigo ? false : true
      );
      nextTurn();
    }
  },
// Habilidad basica de ataque fisico
  {
    id: 1,
    nombre: "atacar",
    accion: function atacar() {
      ataqueFisico(this);
      nextTurn();
      update();
    }
  },
// Buff de la defensa del usuario
  {
    id: 2,
    nombre: "defender",
    accion: function defender() {
      buffDef(this, 3);
      nextTurn();
      update();
    }
  },
// Habilidad basica de ataque magico
  {
    id: 3,
    nombre: "fuego",
    accion: function hechizo() {
      if (this.estadisticas.mana > 200) {
        ataqueMagico(this)
        gastarMana(this, 200)
        nextTurn();
        actualizarValoresEnemigo();
        actualizarValoresJugador();
      } else {
          this.esEnemigo ? nextTurn() : sinMana()
      }
    }
  },
// Esta habilidad abre el inventario, habria que moverla a 0 por si acaso
  {
    id: 4,
    nombre: "inventario",
    accion: function abrirInventario() {
      $(".ui.dimmer").dimmer("show");
    }
  }
];
