/**
 * Esta funcion es la que se ejecuta al cargar la pagina.
 * Dispara otras funciones.
 * @return {void}
 */
function iniciar ()
{
    inicializarElementos()
    mostrarSeleccionPersonaje()
}

/**
 * Busca todos los elementos que van a ser necesarios,
 * es decir, a los que vamos a acceder, y los guarda
 * en las variables que corresponden
 * @return {void}
 */
function inicializarElementos ()
{
    // Estos elementos corresponden a la pantalla de seleccion de personaje
    window.elemPantallaSeleccion    = document.getElementById('overlay-seleccion-personaje')
    window.elemContenedorPersonajes = document.getElementById('contenedor-personajes')
    window.elemNombreDeUsuario      = document.getElementById('nombre-de-usuario')

    // Estos corresponden al panel del jugador
    window.elemJugadorNombreUsuario        = document.getElementById('panel-nombre-usuario')
    window.elemJugadorTipoPersonaje        = document.getElementById('panel-tipo-personaje')
    window.elemJugadorEstadisticaAtaque    = document.getElementById('estadistica-ataque')
    window.elemJugadorEstadisticaDefensa   = document.getElementById('estadistica-defensa')
    window.elemJugadorEstadisticaVida      = document.getElementById('estadistica-vida')
    window.elemJugadorEstadisticaMana      = document.getElementById('estadistica-mana')
    window.elemJugadorHabilidades          = document.getElementById('habilidades-jugador')

    // Estos corresponden al panel del enemigo
    window.elemEnemigoTipoPersonaje        = document.getElementById('enemigo-panel-tipo-personaje')
    window.elemEnemigoEstadisticaAtaque    = document.getElementById('enemigo-estadistica-ataque')
    window.elemEnemigoEstadisticaDefensa   = document.getElementById('enemigo-estadistica-defensa')
    window.elemEnemigoEstadisticaVida      = document.getElementById('enemigo-estadistica-vida')
    window.elemEnemigoEstadisticaMana      = document.getElementById('enemigo-estadistica-mana')

    // Estos corresponden al juego en general
    window.elemHistorial = document.getElementById('juego-historial')
}

/**
 * Va a mostrar los personajes definidos en [globals.js]
 * en la pantalla de seleccion de personaje
 * @return {void}
 */
function mostrarSeleccionPersonaje ()
{
    // Recorremos el array que contiene los personajes definidos.
    personajes.forEach(function (personaje) {
        // Creamos un elemento 'li'
        let contenedorPersonaje = document.createElement('li')

        // Le agregamos la clase 'personaje'
        contenedorPersonaje.classList.add('personaje')

        // Le agregamos el HTML correspondiente
        contenedorPersonaje.innerHTML = `
            <span>Jugar como</span>
            <strong>${personaje.tipo}</strong>`

        // Agregamos una escucha de evento para cuando se seleccione el personaje
        contenedorPersonaje.addEventListener('click', function () {
            seleccionarPersonaje(personaje)
        })

        // Insertamos el elemento, dentro del contenedor de personajes
        window.elemContenedorPersonajes.appendChild(contenedorPersonaje)
    })
}

/**
 * Se ejecuta cuando se selecciona el personaje.
 * Si todo esta bien, pasa a la pantalla del juego.
 * @return {void}
 */
function seleccionarPersonaje (personaje)
{
    // Si no se ingreso un nombre de usuario,
    // mostrar una alerta y volver.
    if (!window.elemNombreDeUsuario.value) {
        alert('Ingrese un nombre de usuario!')
        return false
    }

    // Si se ingreso, se guarda en la propiedad
    // nombre del objeto 'jugador'. Y en la propiedad
    // 'personaje' del mismo objeto, se guarda el
    // personaje seleccionado.
    jugador.nombre = window.elemNombreDeUsuario.value
    jugador.personaje = personaje

    registrar(`${jugador.nombre} jugara como ${jugador.personaje.tipo}`)

    // Despues de esto, se muestra la pantalla del juego.
    mostrarPantallaJuego()
}


/**
 * Luego de que se ingresa al juego, se muestra la
 * pantalla inicial, donde, basicamente, se juega.
 * @return {void}
 */
function mostrarPantallaJuego ()
{
    // Ocultamos la pantalla de seleccion de personaje
    window.elemPantallaSeleccion.classList.add('oculto')

    // Selecciona el proximo enemigo
    siguienteEnemigo()

    // Mostramos los datos del persoaje
    actualizarValoresJugador()
    actualizarHabilidadesJugador()

    // Mostramos los datos del enemigo
    actualizarValoresEnemigo()
}

function actualizarHabilidadesJugador ()
{
    // Agregamos el boton "Atacar"
    let botonAtacar = document.createElement('button')
    botonAtacar.setAttribute('type', 'button')
    botonAtacar.addEventListener('click', function () {
        jugador.personaje.atacar(enemigoActual)
    })
    botonAtacar.innerHTML = 'Atacar!'

    window.elemJugadorHabilidades.appendChild(botonAtacar)
}

function actualizarValoresJugador ()
{
    window.elemJugadorNombreUsuario.innerHTML = jugador.nombre
    window.elemJugadorTipoPersonaje.innerHTML = jugador.personaje.tipo
    window.elemJugadorEstadisticaAtaque.innerHTML = jugador.personaje.estadisticas.ataque
    window.elemJugadorEstadisticaDefensa.innerHTML = jugador.personaje.estadisticas.defensa
    window.elemJugadorEstadisticaVida.innerHTML =
        jugador.personaje.estadisticas.vida + '/' + jugador.personaje.estadisticas.maxVida
    window.elemJugadorEstadisticaMana.innerHTML =
        jugador.personaje.estadisticas.mana + '/' + jugador.personaje.estadisticas.maxMana
}

function actualizarValoresEnemigo ()
{
    window.elemEnemigoTipoPersonaje.innerHTML = enemigoActual.tipo
    window.elemEnemigoEstadisticaAtaque.innerHTML = enemigoActual.estadisticas.ataque
    window.elemEnemigoEstadisticaDefensa.innerHTML = enemigoActual.estadisticas.defensa
    window.elemEnemigoEstadisticaVida.innerHTML =
        enemigoActual.estadisticas.vida + '/' + enemigoActual.estadisticas.maxVida
    window.elemEnemigoEstadisticaMana.innerHTML =
        enemigoActual.estadisticas.mana + '/' + enemigoActual.estadisticas.maxMana
}

/**
 * Selecciona un enemigo de la lista de enemigos
 * y lo enfrenta al jugador
 */
function siguienteEnemigo ()
{
    const indiceAleatorio = Math.floor(Math.random() * enemigos.length)
    let enemigo = enemigos[indiceAleatorio]
    console.log(enemigo)
    enemigoActual = enemigo
    registrar(`El proximo enemigo es ${enemigo.tipo}`, false)
}

/**
 * Agrega un registro al historial
 */
function registrar (evento, jugador = true)
{
    let d = new Date()
    let h = d.getHours().toString().padStart(2, '0')
    let m = d.getMinutes().toString().padStart(2, '0')
    let s = d.getSeconds().toString().padStart(2, '0')
    let hora = '[' + h + ':' + m + ':' + s + ']'
    let registro = document.createElement('li')
    registro.style.color = jugador ? 'blue' : 'red'
    registro.innerHTML = hora + ' ' + evento
    window.elemHistorial.appendChild(registro)
}

// Agregamos un listener, que escucha el evento
// 'DOMContentLoaded'. Se ejecuta cuando el DOM
// se cargo completamente. En este caso, ejecuta
// la funcion 'iniciar'
document.addEventListener('DOMContentLoaded', iniciar)
