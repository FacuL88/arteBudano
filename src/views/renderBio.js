import img from "../images/gonzaBio.jpeg"

export function renderBio() {
  const main = document.getElementById('mainId');
  const section = document.createElement('section');
  section.classList.add('section');

  section.innerHTML = `
    <div class="container__bio">
      <h1 class="bio__title">Bio</h1>
      <div class="bio__content">
        <div class="bio__text">
          <p class="bio__paragraph">La creatividad me ayuda a vivir los días de una forma más tranquila, intento que cada día me pueda encontrar en ese sitio de paz asegurada, que en muchas personas al tiempo de estar compartiendo un instante o un momento conmigo ya la pueden percibir y yo al mismo tiempo compartirla.</p>
          <p class="bio__paragraph">La pintura para mí es una herramienta espejo, donde uno narra desde lo más hondo del ser y a su vez nos lleva a jugar en el tiempo.</p>
          <p class="bio__paragraph">Indefectiblemente surgen preguntas… algunas como:</p>
          <p class="bio__question">¿Puede la obra que uno está creando pintar lo que no está?</p>
          <p class="bio__question">¿Pueden los otros que observan las pinturas ver algo más allá, desde su propia narrativa?</p>
          <p class="bio__question">¿Qué respuestas puede ofrecer el artista a todas estas situaciones?</p>
          <p class="bio__paragraph">Tratarlo es un tema algo difícil, lo genuino de sorprenderse con lo inimaginable del ser. Todas estas ideas sensibles que quieren expresarse, sobrepasan los límites, dan vueltas por muchos ámbitos y los sentidos, sentimientos que acompañan, nunca son ajenos, lo emotivo es que lleguen a converger hasta iniciar ese viaje. Sentirse parte también de lo que arrastra ese diálogo que la propia obra genera, que incluso puede ser algo confuso no comprendido del todo, porque lo incomprensible también puede ser pintado, expresado. Y en cierta forma el arte puede sanar o salvarte, protegerte de lo que no va con vos mismo o acercarte a revivir un momento.</p>
        </div>
        <div class="bio__image">
          <img src=${img} alt="Gonzalo - Artista">
        </div>
      </div>
    </div>
  `;

  main.appendChild(section);
}