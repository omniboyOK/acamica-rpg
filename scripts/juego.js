/*Este archivo contiene un objeto juego,
Todos los elementos del dom que va a necesitar
y modificara luego se guardan en esta variable
@omniboy
*/
var juego = {
  turnoJugador: true,
  personaje: {},
  enemigoActual: [],
  actualizar: function(enemigo) {
    this.enemigoActual = enemigo;
  }
};

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

/**
 * Va a mostrar los personajes definidos en [globals.js]
 * en la pantalla de seleccion de personaje
 * @return {void}
 */
function mostrarSeleccionPersonaje() {
  // Recorremos el array que contiene los personajes definidos.
  personajes.forEach(function(personaje, index) {
    // Creamos un elemento 'li'
    let contenedorPersonaje = document.createElement("li");

    // Le agregamos la clase 'personaje'
    contenedorPersonaje.classList.add("personaje", "ui", "card");

    // Le agregamos el HTML correspondiente
    contenedorPersonaje.innerHTML = `
            <span>Jugar como</span>
            <div class="ui image fluid">
            <img src=${personaje.estadisticas.portrait}>
            </div>
            <strong>${personaje.tipo}</strong>`;

    // Agregamos una escucha de evento para cuando se seleccione el personaje
    contenedorPersonaje.addEventListener("click", function() {
      seleccionarPersonaje(personaje);
    });

    // Insertamos el elemento, dentro del contenedor de personajes
    juego.elemContenedorPersonajes.appendChild(contenedorPersonaje);
  });
}

/**
 * Se ejecuta cuando se selecciona el personaje.
 * Si todo esta bien, pasa a la pantalla del juego.
 * @return {void}
 */
function seleccionarPersonaje(personaje) {
  let alert = $("#alert");
  // Si no se ingreso un nombre de usuario,
  // mostrar una alerta y volver.
  if (!juego.elemNombreDeUsuario.value) {
    alert
      .html(
        `
        <div class="ui warning message">
            <i class="icon warning"></i>
            Debes ingresar un nombre para tu personaje!
        </div>`
      )
      .show();
    alert.fadeOut(3000);
    return false;
  }

  // Si se ingreso, se guarda en la propiedad
  // nombre del objeto 'jugador'. Y en la propiedad
  // 'personaje' del mismo objeto, se guarda el
  // personaje seleccionado.

  juego.personaje = personaje;
  juego.personaje.nombre = juego.elemNombreDeUsuario.value;

  registrar(`${juego.personaje.nombre} jugara como ${juego.personaje.tipo}`);
  // Despues de esto, se muestra la pantalla del juego.
  mostrarPantallaJuego();
}

/**
 * Luego de que se ingresa al juego, se muestra la
 * pantalla inicial, donde, basicamente, se juega.
 * @return {void}
 */
function mostrarPantallaJuego() {
  nextTurn();
  // Mostramos el menu de habilidades
  menu.css("visibility", "visible");
  // Ocultamos la pantalla de seleccion de personaje
  $("#overlay-seleccion-personaje").transition("scale");

  // Selecciona el proximo enemigo
  siguienteEnemigo();

  // Mostramos los datos del persoaje
  actualizarValoresJugador();
  actualizarHabilidadesJugador();

  // Mostramos los datos del enemigo
  actualizarValoresEnemigo();
}

function actualizarHabilidadesJugador() {
  // Agregamos habilidades del personaje al menu
  // creando botones que apuntan a las funciones del objeto
  // pero toman los datos de la lista de habilidades
  juego.personaje.habilidades.forEach(function(value, index) {
    let boton = document.createElement("a");
    boton.classList.add("ui", "item", "enabled");
    $(boton).click(() => {
      switch (index) {
        case 0:
          juego.personaje.habilidad1();
          break;
        case 1:
          juego.personaje.habilidad2();
          break;
        case 2:
          juego.personaje.habilidad3();
          break;
        case 3:
          juego.personaje.habilidad4();
          break;
      }
    });
    boton.innerHTML = juego.personaje.habilidades[index].nombre;
    juego.elemJugadorHabilidades.appendChild(boton);
  });
}

function actualizarValoresJugador() {
  $("#player_portrait")
    .children()
    .attr("src", juego.personaje.estadisticas.portrait);
  juego.elemJugadorNombreUsuario.innerHTML = juego.nombre;
  juego.elemJugadorTipoPersonaje.innerHTML = juego.personaje.tipo;
  juego.elemJugadorEstadisticaAtaque.innerHTML =
    juego.personaje.estadisticas.ataque;
  juego.elemJugadorEstadisticaDefensa.innerHTML =
    juego.personaje.estadisticas.defensa;
  // Con Progress de semantic podemos actualizar una barra de vida o mana
  if (juego.personaje.estadisticas.vida > 0) {
    $("#player_lifebar").progress({
      percent:
        (juego.personaje.estadisticas.vida * 100) /
        juego.personaje.estadisticas.maxVida
    });
  } else {
    menu.transition();
    $("#player_lifebar").progress({
      percent: 0
    });
    $("#juego").transition();
    $("#gameover").modal("show");
  }
  $("#player_manabar").progress({
    percent:
      (juego.personaje.estadisticas.mana * 100) /
      juego.personaje.estadisticas.maxMana
  });
}

function actualizarValoresEnemigo() {
  $("#enemy_portrait")
    .children()
    .attr("src", juego.enemigoActual.estadisticas.portrait);
  juego.elemEnemigoTipoPersonaje.innerHTML = juego.enemigoActual.tipo;
  juego.elemEnemigoEstadisticaAtaque.innerHTML =
    juego.enemigoActual.estadisticas.ataque;
  juego.elemEnemigoEstadisticaDefensa.innerHTML =
    juego.enemigoActual.estadisticas.defensa;
  // Con Progress de semantic podemos actualizar una barra de vida o mana
  $("#enemy_manabar").progress({
    percent:
      (juego.enemigoActual.estadisticas.mana * 100) /
      juego.enemigoActual.estadisticas.maxMana
  });
  // Si el enemigo muere, lo descartamos y pasamos al siguiente
  if (juego.enemigoActual.estadisticas.vida <= 0) {
    $("#enemy_lifebar").progress({
      percent: 0
    });
    $(".panel.enemigo .ui.card").transition("horizontal flip", 1000);
    setTimeout(function() {
      actualizarValoresEnemigo();
    }, 1700);

    siguienteEnemigo();
    $(".panel.enemigo .ui.card").transition("horizontal flip");
  } else {
    $("#enemy_lifebar").progress({
      percent:
        (juego.enemigoActual.estadisticas.vida * 100) /
        juego.enemigoActual.estadisticas.maxVida
    });
  }
}

/**
 * Selecciona un enemigo de la lista de enemigos
 * y lo enfrenta al jugador
 */
function siguienteEnemigo() {
  // Toma al primer enemigo de la lista en orden, falta crear lista independiente
  // con enemigos aleatorios, de otra manera los enemigos que reaparecen tienen
  // vida = 0 y eso genera recursividad
  if (enemigos.length > 0) {
    let enemigo = enemigos.shift();
    juego.actualizar(enemigo);
    console.log(juego.enemigoActual);
    juego.enemigoActual.actualizarObjetivo();
    juego.personaje.actualizarObjetivo();
    registrar(`El proximo enemigo es ${juego.enemigoActual.tipo}`, false);
  } else {
    registrar(`No quedan más enemigos`, false);
  }
}

/**
 * Agrega un registro al historial
 */
function registrar(evento, personaje = true) {
  let d = new Date();
  let h = d
    .getHours()
    .toString()
    .padStart(2, "0");
  let m = d
    .getMinutes()
    .toString()
    .padStart(2, "0");
  let s = d
    .getSeconds()
    .toString()
    .padStart(2, "0");
  let hora = "[" + h + ":" + m + ":" + s + "]";
  let registro = document.createElement("li");
  registro.classList.add('ui','inverted', personaje ? "green" : "red", 'segment')
  // Si es true el color es azul si es false es rojo
  registro.innerHTML = hora + " " + evento;
  juego.elemHistorial.appendChild(registro);
  scrollLog();
}
