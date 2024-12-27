// Add to your JavaScript file
document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = false;

    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            musicToggle.classList.remove('playing');
        } else {
            music.play();
            musicToggle.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });

    // Autoplay on scroll
    let scrollStarted = false;
    window.addEventListener('scroll', () => {
        if (!scrollStarted) {
            music.play();
            musicToggle.classList.add('playing');
            isPlaying = true;
            scrollStarted = true;
        }
    });
});