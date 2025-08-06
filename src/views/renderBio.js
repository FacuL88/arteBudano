export function renderBio() {
  const main = document.getElementById('mainId');
  const section = document.createElement('section');
  section.classList.add('section');

  section.innerHTML = `
    <div class="container__bio">
      <h1>bio</h1>
      <p>Estamos mejorando la pagina</p>    
    </div>
  `;

  main.appendChild(section);
}