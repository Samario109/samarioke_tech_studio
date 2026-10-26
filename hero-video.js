const heroVideo = document.getElementById('hero-background-video');
const heroVideoToggle = document.getElementById('heroVideoToggle');
const reducedMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

if (heroVideo && heroVideoToggle) {
    const updateVideoToggle = (isPlaying) => {
        heroVideoToggle.setAttribute('aria-label', isPlaying ? 'Pause background video' : 'Play background video');
        heroVideoToggle.innerHTML = isPlaying
            ? '<i class="fa-solid fa-pause" aria-hidden="true"></i><span>Pause video</span>'
            : '<i class="fa-solid fa-play" aria-hidden="true"></i><span>Play video</span>';
    };

    const pauseForReducedMotion = () => {
        if (reducedMotionPreference.matches) {
            heroVideo.pause();
            updateVideoToggle(false);
        } else if (heroVideo.paused) {
            heroVideo.play().then(() => updateVideoToggle(true)).catch(() => updateVideoToggle(false));
        }
    };

    if (reducedMotionPreference.matches) {
        heroVideo.pause();
        updateVideoToggle(false);
    } else {
        heroVideo.play().then(() => updateVideoToggle(true)).catch(() => updateVideoToggle(false));
    }

    heroVideoToggle.addEventListener('click', () => {
        if (heroVideo.paused) {
            heroVideo.play().then(() => updateVideoToggle(true)).catch((error) => {
                console.error('Hero video could not be played:', error);
                updateVideoToggle(false);
            });
        } else {
            heroVideo.pause();
            updateVideoToggle(false);
        }
    });

    reducedMotionPreference.addEventListener('change', pauseForReducedMotion);
}
