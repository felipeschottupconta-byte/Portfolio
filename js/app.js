document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    setupNavigation();
});

// --- Carregar Projetos do JSON ---
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();
        const container = document.getElementById('automacao-container');

        projects.forEach(proj => {
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => openProjectModal(proj);
            
            // Gerar HTML do Card
            card.innerHTML = `
                <div class="card-body">
                    <div class="card-category">${proj.category}</div>
                    <h3 class="card-title">${proj.title}</h3>
                    <p class="card-desc">${proj.description}</p>
                    <div class="card-footer">
                        <div class="tech-stack-mini">
                            ${proj.tech.map(t => `<span class="mini-badge">${t}</span>`).join('')}
                        </div>
                        <i class="fas fa-arrow-right arrow-icon" style="color: var(--accent)"></i>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Erro ao carregar projetos. Se estiver rodando localmente sem servidor, o navegador pode bloquear o JSON.", error);
    }
}

// --- Gerenciamento de Modais ---
function openProjectModal(proj) {
    const modal = document.getElementById('dynamic-modal');
    
    // Popular Modal com dados do JSON
    document.getElementById('modal-title').textContent = proj.title;
    document.getElementById('modal-stack').textContent = proj.details.stack;
    document.getElementById('modal-desc').textContent = proj.description;
    document.getElementById('modal-challenge').textContent = proj.details.challenge;

    // Listas
    const featList = document.getElementById('modal-features');
    featList.innerHTML = proj.details.features.map(f => `<li>${f}</li>`).join('');
    
    modal.classList.add('active'); // Usa classe CSS para mostrar
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('dynamic-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// --- Navegação (Tabs) ---
function setupNavigation() {
    window.switchTab = (viewId, btn) => {
        // Remove active de todos
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.view-section').forEach(v => {
            v.style.display = 'none';
            v.classList.remove('active-view');
        });
        
        // Ativa o selecionado
        btn.classList.add('active');
        const view = document.getElementById('view-' + viewId);
        view.style.display = 'block';
        setTimeout(() => view.classList.add('active-view'), 10);
    };

    // Fechar modal ao clicar fora
    window.onclick = (e) => {
        if (e.target.classList.contains('modal-overlay')) closeModal();
    };
}

// --- Lightbox (Para a aba BI - Imagens) ---
window.openLightbox = (imgSrc, event) => {
    event.stopPropagation();
    const lb = document.getElementById('image-lightbox');
    lb.querySelector('img').src = imgSrc;
    lb.style.display = 'flex';
};

window.closeLightbox = () => {
    document.getElementById('image-lightbox').style.display = 'none';
};