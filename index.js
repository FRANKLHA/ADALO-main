let currentPage = 0;
const pages = document.querySelectorAll('.page');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const homeBtn = document.getElementById('home');
const caseStudyBtn = document.getElementById('case-study');
const pageFlipSound = document.getElementById('page-flip-sound');

const pageColors = [
    ['#a8edea', '#fed6e3'],
    ['#d299c2', '#fef9d7'],
    ['#f5f7fa', '#c3cfe2'],
    ['#fdcbf1', '#e6dee9'],
    ['#a1c4fd', '#c2e9fb']
];

function updatePages() {
    pages.forEach((page, index) => {
        page.style.transform = '';
        page.style.transition = 'transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)';
        
        if (index < currentPage) {
            page.style.transform = 'rotateY(-180deg)';
        }
        
        const zIndex = pages.length - Math.abs(currentPage - index);
        page.style.zIndex = zIndex;

        if (!page.classList.contains('cover')) {
            const colorIndex = index % pageColors.length;
            const [color1, color2] = pageColors[colorIndex];
            page.style.background = `linear-gradient(45deg, ${color1}, ${color2})`;
        }
    });

    // Update button visibility
    prevBtn.style.display = currentPage === 0 ? 'none' : 'inline-block';
    nextBtn.style.display = currentPage === pages.length - 1 ? 'none' : 'inline-block';
    homeBtn.style.display = currentPage === 0 ? 'none' : 'inline-block';
    
    // Show case study button on the last page
    if (caseStudyBtn) {
        caseStudyBtn.style.display = currentPage === pages.length - 1 ? 'inline-block' : 'none';
    }
}

function playPageFlipSound() {
    if (pageFlipSound && pageFlipSound.readyState >= 2) {
        pageFlipSound.currentTime = 0;
        pageFlipSound.play().catch(e => console.log('Error playing sound:', e));
    }
}

function goToPage(pageNumber) {
    if (pageNumber >= 0 && pageNumber < pages.length && pageNumber !== currentPage) {
        currentPage = pageNumber;
        playPageFlipSound();
        updatePages();
    }
}

// Event Listeners
prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        playPageFlipSound();
        updatePages();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < pages.length - 1) {
        currentPage++;
        playPageFlipSound();
        updatePages();
    }
});

homeBtn.addEventListener('click', () => {
    goToPage(0);
});

if (caseStudyBtn) {
    caseStudyBtn.addEventListener('click', () => {
        window.location.href = 'practico.html';
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && currentPage < pages.length - 1) {
        currentPage++;
        playPageFlipSound();
        updatePages();
    } else if (e.key === 'ArrowLeft' && currentPage > 0) {
        currentPage--;
        playPageFlipSound();
        updatePages();
    } else if (e.key === 'Home') {
        goToPage(0);
    }
});

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    updatePages();
});