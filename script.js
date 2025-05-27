// Base de datos de videos de agradecimiento
const videos = {
    video1: {
        src: 'alan.mp4',
        title: 'Mensaje de Alan',
        type: 'video'
    },
    video2: {
        src: 'Adrian.mp4',
        title: 'Testimonio de Adrian',
        type: 'video'
    },
    video3: {
        src: 'Jhorman.mp4',
        title: 'Agradecimiento de Jhorman',
        type: 'video'
    },
    video4: {
        src: 'Luis.mp4',
        title: 'Palabras de Luis',
        type: 'video'
    },
    video5: {
        src: 'Karen.png',
        title: 'Reconocimiento de Karen',
        type: 'image'
    },
    video6: {
        src: 'Daya.mp4',
        title: 'Mensaje de Daya',
        type: 'video'
    }
};

function playVideo(videoId) {
    const videoPlayer = document.getElementById('videoPlayer');
    const mainVideo = document.getElementById('mainVideo');
    const video = videos[videoId];
    
    if (video) {
        if (video.type === 'image') {
            // Manejar imagen
            showImage(video);
        } else {
            // Manejar video normal
            // Pausar y limpiar video anterior
            mainVideo.pause();
            mainVideo.currentTime = 0;
            
            // Configurar nuevo video
            mainVideo.src = video.src;
            mainVideo.volume = 1.0; // Volumen al máximo
            
            // Mostrar reproductor
            videoPlayer.style.display = 'flex';
            
            // Agregar efecto de entrada
            videoPlayer.style.opacity = '0';
            setTimeout(() => {
                videoPlayer.style.opacity = '1';
                videoPlayer.style.transition = 'opacity 0.3s ease';
            }, 10);
            
            // Prevenir scroll del body
            document.body.style.overflow = 'hidden';
            
            // Reproducir cuando esté listo
            mainVideo.addEventListener('loadeddata', function playHandler() {
                mainVideo.volume = 1.0;
                mainVideo.play().catch(function(error) {
                    console.log('Error al reproducir automáticamente:', error);
                });
                // Remover el event listener para evitar duplicados
                mainVideo.removeEventListener('loadeddata', playHandler);
            });
        }
    }
}

function showImage(imageData) {
    // Crear modal para imagen
    const imageModal = document.createElement('div');
    imageModal.id = 'imageModal';
    imageModal.style.cssText = `
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 1000;
        justify-content: center;
        align-items: center;
        padding: 20px;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const imageContainer = document.createElement('div');
    imageContainer.style.cssText = `
        position: relative;
        max-width: 800px;
        max-height: 600px;
        width: 100%;
        background: #1a1a1a;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
        text-align: center;
        padding: 20px;
    `;
    
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.cssText = `
        position: absolute;
        top: -50px;
        right: 0;
        background: #ffd700;
        color: #1a1a1a;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s ease;
        z-index: 1001;
    `;
    
    closeButton.addEventListener('click', closeImage);
    
    const image = document.createElement('img');
    image.src = imageData.src;
    image.alt = imageData.title;
    image.style.cssText = `
        max-width: 100%;
        max-height: 500px;
        border-radius: 10px;
        object-fit: contain;
        margin-bottom: 20px;
    `;
    
    const title = document.createElement('h3');
    title.textContent = imageData.title;
    title.style.cssText = `
        color: #ffd700;
        font-size: 1.5rem;
        margin-bottom: 10px;
    `;
    
    const description = document.createElement('p');
    description.textContent = 'Mensaje especial de agradecimiento';
    description.style.cssText = `
        color: #cccccc;
        font-size: 1rem;
        line-height: 1.4;
    `;
    
    imageContainer.appendChild(closeButton);
    imageContainer.appendChild(image);
    imageContainer.appendChild(title);
    imageContainer.appendChild(description);
    imageModal.appendChild(imageContainer);
    
    document.body.appendChild(imageModal);
    document.body.style.overflow = 'hidden';
    
    // Mostrar con animación
    setTimeout(() => {
        imageModal.style.opacity = '1';
    }, 10);
    
    // Cerrar al hacer clic fuera
    imageModal.addEventListener('click', function(event) {
        if (event.target === imageModal) {
            closeImage();
        }
    });
}

function closeImage() {
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.style.opacity = '0';
        setTimeout(() => {
            imageModal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

function closeVideo() {
    const videoPlayer = document.getElementById('videoPlayer');
    const mainVideo = document.getElementById('mainVideo');
    
    videoPlayer.style.opacity = '0';
    setTimeout(() => {
        videoPlayer.style.display = 'none';
        mainVideo.pause();
        mainVideo.currentTime = 0;
        mainVideo.src = '';
        // Restaurar scroll del body
        document.body.style.overflow = 'auto';
    }, 300);
}

// Cerrar video/imagen con tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeVideo();
        closeImage();
    }
});

// Cerrar video al hacer clic fuera del contenedor
document.getElementById('videoPlayer').addEventListener('click', function(event) {
    if (event.target === this) {
        closeVideo();
    }
});

// Hacer clic en el video para reproducir si no se reproduce automáticamente
document.addEventListener('DOMContentLoaded', function() {
    const mainVideo = document.getElementById('mainVideo');
    
    mainVideo.addEventListener('click', function() {
        if (mainVideo.paused) {
            mainVideo.volume = 1.0;
            mainVideo.play().catch(function(error) {
                console.log('Error en reproducción manual:', error);
            });
        }
    });
});

// Animación de entrada para las tarjetas
function animateCards() {
    const cards = document.querySelectorAll('.video-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Animar también la sección de agradecimiento
    const thankYouCard = document.querySelector('.thank-you-card');
    if (thankYouCard) {
        thankYouCard.style.opacity = '0';
        thankYouCard.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            thankYouCard.style.transition = 'all 0.8s ease';
            thankYouCard.style.opacity = '1';
            thankYouCard.style.transform = 'translateY(0)';
        }, cards.length * 100 + 200);
    }
}

// Ejecutar animación cuando la página carga
window.addEventListener('load', animateCards);

// Efecto de partículas doradas
function createGoldenParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '6px';
    particle.style.height = '6px';
    particle.style.background = '#ffd700';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '-1';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = '-10px';
    particle.style.opacity = '0.8';
    particle.style.boxShadow = '0 0 10px #ffd700';
    
    document.body.appendChild(particle);
    
    const animation = particle.animate([
        { transform: 'translateY(0px) rotate(0deg)', opacity: 0.8 },
        { transform: `translateY(${window.innerHeight + 20}px) rotate(360deg)`, opacity: 0 }
    ], {
        duration: 2500 + Math.random() * 1500,
        easing: 'linear'
    });
    
    animation.onfinish = () => particle.remove();
}

// Crear partículas periódicamente
setInterval(createGoldenParticle, 1500);

// Función para crear confeti cuando se carga la página
function createConfetti() {
    const colors = ['#ffd700', '#ffed4e', '#fff', '#ffa500'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '8px';
            confetti.style.height = '8px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '999';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.opacity = '0.9';
            
            document.body.appendChild(confetti);
            
            const animation = confetti.animate([
                { transform: 'translateY(0px) rotate(0deg)', opacity: 0.9 },
                { transform: `translateY(${window.innerHeight + 20}px) rotate(720deg)`, opacity: 0 }
            ], {
                duration: 3000 + Math.random() * 2000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            animation.onfinish = () => confetti.remove();
        }, i * 50);
    }
}

// Crear confeti al cargar la página
window.addEventListener('load', () => {
    setTimeout(createConfetti, 1000);
});

console.log('Script con soporte para imagen cargado correctamente');