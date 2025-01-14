
const cards = document.querySelectorAll('.post');
let currentIndex = 0;

const updateCardPositions = () => {
    cards.forEach((post, index) => {
        post.classList.remove('current', 'previous', 'next', 'hidden');
        const offset = (index - currentIndex + cards.length) % cards.length;

        if (offset === 0) {
            post.classList.add('current'); 
        } else if (offset === 1) {
            post.classList.add('next'); 
        } else if (offset === cards.length - 1) {
            post.classList.add('previous');
        } else {
            post.classList.add('hidden'); 
        }
    });
};

const handleSwipe = (direction) => {
    if (direction === 'up') {
        currentIndex = (currentIndex + 1) % cards.length;
    } else if (direction === 'down') {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    }
    updateCardPositions();
};


let Scroll = false;
let wheelTimeout;

document.addEventListener('wheel', (e) => {
    if (Scroll) return;

    if (e.deltaY > 20) {
        handleSwipe('up');
    } else if (e.deltaY < -20) {
        handleSwipe('down');
    }

    Scroll = true;
    clearTimeout(wheelTimeout);
    wheelTimeout = setTimeout(() => {
        Scroll = false;
    }, 150);
});


let startY = 0;
document.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    const endY = e.changedTouches[0].clientY;
    const deltaY = startY - endY;

    if (deltaY > 50) handleSwipe('up');
    else if (deltaY < -50) handleSwipe('down');
});


document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') handleSwipe('down');
    else if (e.key === 'ArrowDown') handleSwipe('up');
});


updateCardPositions();
