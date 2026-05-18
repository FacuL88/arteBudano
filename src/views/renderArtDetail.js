import { array } from './provider';

export function renderArtDetail(artId) {
    const main = document.getElementById('mainId');
    const artwork = array.find(item => item.id === parseInt(artId));
    
    if (!artwork) {
        main.innerHTML = `
            <div class='container' style='padding: var(--space-xl) 0; text-align: center;'>
                <h1>Obra no encontrada</h1>
                <button class='btn' onclick="window.history.back()">Volver</button>
            </div>
        `;
        return;
    }

    main.innerHTML = `
        <div class='container' style='padding: var(--space-xl) 0;'>
            <button class='btn btn-secondary mb-lg' onclick="window.history.back()">Volver</button>
            
            <div style='display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-xl); align-items: start;'>
                <div>
                    <img src='${artwork.img}' alt='${artwork.name}' style='width: 100%; border-radius: var(--radius-md); border: 1px solid var(--border);'>
                </div>
                
                <div>
                    <h1 style='margin-bottom: var(--space-md);'>${artwork.name}</h1>
                    
                    <div style='display: flex; flex-direction: column; gap: var(--space-xs); margin-bottom: var(--space-lg);'>
                        <div style='display: flex; justify-content: space-between; padding: var(--space-xs) 0; border-bottom: 1px solid var(--border);'>
                            <strong>Medidas:</strong>
                            <span>${artwork.medidas}</span>
                        </div>
                        <div style='display: flex; justify-content: space-between; padding: var(--space-xs) 0; border-bottom: 1px solid var(--border);'>
                            <strong>Técnica:</strong>
                            <span>${artwork.tecnica}</span>
                        </div>
                        <div style='display: flex; justify-content: space-between; padding: var(--space-xs) 0; border-bottom: 1px solid var(--border);'>
                            <strong>Año:</strong>
                            <span>${artwork.año}</span>
                        </div>
                        <div style='display: flex; justify-content: space-between; padding: var(--space-xs) 0;'>
                            <strong>Disponibilidad:</strong>
                            <span>${artwork.stock > 0 ? `${artwork.stock} disponible` : 'Agotado'}</span>
                        </div>
                    </div>
                    
                    <div style='margin-bottom: var(--space-lg);'>
                        <h3 style='margin-bottom: var(--space-sm);'>Descripción</h3>
                        <p style='color: var(--text-medium); line-height: 1.6;'>${artwork.description}</p>
                    </div>
                    
                    <div style='text-align: center; margin-top: var(--space-lg);'>
                        <a href='https://wa.me/541163811096?text=Hola, estoy interesado en la obra "${artwork.name}"' target='_blank' class='whatsapp-btn'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='white' viewBox='0 0 16 16' style='margin-right: var(--space-xs);'>
                                <path d='M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z'/>
                            </svg>
                            Consultar por WhatsApp
                        </a>
                    </div>
                </div>
            </div>
            
            <div style='margin-top: var(--space-xl); padding-top: var(--space-xl); border-top: 1px solid var(--border);'>
                <h2 style='text-align: center; margin-bottom: var(--space-lg);'>Obras Relacionadas</h2>
                <div style='display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-md);'>
                    ${array.filter(item => item.id !== artwork.id).slice(0, 3).map(item => `
                        <div style='text-align: center; cursor: pointer;' onclick='showArtDetail(${item.id})'>
                            <img src='${item.img}' alt='${item.name}' style='width: 100%; height: 150px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: var(--space-sm);'>
                            <h4 style='margin-bottom: var(--space-xs);'>${item.name}</h4>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    
    window.showArtDetail = (artId) => {
        const main = document.getElementById('mainId');
        main.innerHTML = '';
        renderArtDetail(artId);
    };
}
