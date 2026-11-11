document.addEventListener("DOMContentLoaded", function() {
    
    const header = document.querySelector('.header-principal');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('rolando');
        } 
        else if (window.scrollY < 20) {
            header.classList.remove('rolando');
        }
    });

    const container = document.querySelector('.container-diferenciais');
    if (container) {
        container.style.opacity = '0';
        container.style.transition = 'opacity 1s ease-in-out';
        setTimeout(() => {
            container.style.opacity = '1';
        }, 100);
    }

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            alert("Você clicou no card: " + card.querySelector('h3').innerText);
        });
    });
});