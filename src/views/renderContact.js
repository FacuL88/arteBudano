import whatsaap from '../icon/whatsapp.svg';
import email from '../icon/gmail-logo.png';
import instagram from '../icon/instagram.svg';
import facebook from '../icon/facebooknegro.png';
import youtube from '../icon/youtube.svg';

export function renderContact() {
  const main = document.getElementById('mainId');

  main.innerHTML = `
    <div class='container' style='padding: calc(var(--space-xl) + 80px) var(--space-md) var(--space-xl);'>
      <div class='contact-header'>
        <h1>Contacto</h1>
        <p class='contact-subtitle'>Conecta con mi arte y descubre más sobre mi trabajo</p>
      </div>
      
      <div class='contact-content'>
        <div class='contact-info'>
          <h2>Información de Contacto</h2>
          <p>Si estás interesado en adquirir una obra, colaborar en un proyecto o simplemente quieres conocer más sobre mi trabajo, no dudes en contactarme.</p>
          
          <div class='contact-methods'>
            <div class='contact-method'>
              <div class='contact-icon'>
                <img src='${whatsaap}' alt='WhatsApp'>
              </div>
              <div class='contact-details'>
                <h3>WhatsApp</h3>
                <p>+54 9 1163811096</p>
              </div>
            </div>
            
            <div class='contact-method'>
              <div class='contact-icon'>
                <img src='${email}' alt='Email'>
              </div>
              <div class='contact-details'>
                <h3>Email</h3>
                <p>gonzacolella@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class='contact-social'>
          <h2>Redes Sociales</h2>
          <p>Sígueme en mis redes para ver mi trabajo más reciente y el proceso creativo detrás de cada obra.</p>
          
          <div class='social-links'>
            <a href='https://instagram.com/@gonzabudano' target='_blank' class='social-link'>
              <img src='${instagram}' alt='Instagram'>
              <span>@gonzabudano</span>
            </a>
            
            <a href='https://facebook.com/gonzalo.ezequiel.budano' target='_blank' class='social-link'>
              <img src='${facebook}' alt='Facebook'>
              <span>Gonzalo Ezequiel Budano</span>
            </a>
            
            <a href='https://youtube.com/@gonzaloezequiel1979' target='_blank' class='social-link'>
              <img src='${youtube}' alt='YouTube'>
              <span>@gonzaloezequiel1979</span>
              <small>"Hombre del sur este"</small>
            </a>
          </div>
        </div>
      </div>
      
      <div class='contact-footer'>
        <p>Gracias por tu interés en mi arte. Cada obra es una pieza única que busca transmitir emociones y contar historias.</p>
      </div>
    </div>
  `;
};