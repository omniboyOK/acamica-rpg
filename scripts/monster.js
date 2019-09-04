const enemigos = [
    new Personaje(
      "Orco",
      estadisticas = {
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
      estadisticas = {
        ataque: 50,
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
      estadisticas = {
        ataque: 50,
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
      estadisticas = {
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