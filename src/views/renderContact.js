import whatsaap from '../icon/whatsapp.svg';
import email from '../icon/gmail-logo.png';
import instagram from '../icon/instagram.svg';
import facebook from '../icon/facebooknegro.png';
import youtube from '../icon/youtube.svg';

export function renderContact() {
  const main = document.getElementById('mainId');
  const section = document.createElement('section');
  section.classList.add('section');

  section.innerHTML = `
    <div class="container__contact">
      <h2>Mas sobre mi</h2>

    </div>
  `;

  main.appendChild(section);

  const container = document.querySelector('.container__contact');

  const ul = document.createElement('ul');
  ul.classList.add('ul__contact');

  ul.innerHTML = `
    <li class='li__contact'><img src=${whatsaap} >1163811096</li>
    <li class='li__contact'><img src=${email} >gonzalocolella</li>
    <li class='li__contact'><img src=${instagram} >@gonzabudano</li>
    <li class='li__contact'><img src=${facebook} >Gonzalo Ezequiel Budano</li>
    <li class='li__contact'><img src=${youtube} >@gonzaloezequiel1979</br>"Hombre del sur este"</li>
  `;

  container.appendChild(ul);

};