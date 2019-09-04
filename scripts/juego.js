/*Este archivo contiene un objeto juego,
Todos los elementos del dom que va a necesitar
y modificara luego se guardan en esta variable
@omniboy
*/
var juego = {
    personaje : {},
    enemigoActual : [],
    actualizar : function(enemigo){
        this.enemigoActual = enemigo;
    }
};


juego.turnoJugador = true;
/**
 * Busca todos los elementos que van a ser necesarios,
 * es decir, a los que vamos a acceder, y los guarda
 * en las variables que corresponden
 */
function inicializarElementos() {
  // Estos elementos corresponden a la pantalla de seleccion de personaje
  juego.elemPantallaSeleccion = document.getElementById(
    "overlay-seleccion-personaje"
  );
  juego.elemContenedorPersonajes = document.getElementById(
    "contenedor-personajes"
  );
  juego.elemNombreDeUsuario = document.getElementById("nombre-de-usuario");

  // Estos corresponden al panel del jugador
  juego.elemJugadorNombreUsuario = document.getElementById(
    "panel-nombre-usuario"
  );
  juego.elemJugadorTipoPersonaje = document.getElementById(
    "panel-tipo-personaje"
  );
  juego.elemJugadorEstadisticaAtaque = document.getElementById(
    "estadistica-ataque"
  );
  juego.elemJugadorEstadisticaDefensa = document.getElementById(
    "estadistica-defensa"
  );
  juego.elemJugadorEstadisticaVida = document.getElementById(
    "estadistica-vida"
  );
  juego.elemJugadorEstadisticaMana = document.getElementById(
    "estadistica-mana"
  );
  juego.elemJugadorHabilidades = document.getElementById("habilidades-jugador");

  // Estos corresponden al panel del enemigo
  juego.elemEnemigoTipoPersonaje = document.getElementById(
    "enemigo-panel-tipo-personaje"
  );
  juego.elemEnemigoEstadisticaAtaque = document.getElementById(
    "enemigo-estadistica-ataque"
  );
  juego.elemEnemigoEstadisticaDefensa = document.getElementById(
    "enemigo-estadistica-defensa"
  );
  juego.elemEnemigoEstadisticaVida = document.getElementById(
    "enemigo-estadistica-vida"
  );
  juego.elemEnemigoEstadisticaMana = document.getElementById(
    "enemigo-estadistica-mana"
  );

  // Estos corresponden al juego en general
  juego.elemHistorial = document.getElementById("juego-historial");
}
