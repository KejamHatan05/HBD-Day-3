const cube = document.getElementById('cube');
const scene = document.querySelector('.scene');

let rotX = 15, rotY = 0;
let autoPlay = true;
let animFrame;
let isDragging = false;
let lastX = 0, lastY = 0;
let zoom = 800;

// ── Auto rotate ── //
function loop() {
    rotY += 0.5;
    cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    if (autoPlay) animFrame = requestAnimationFrame(loop);
}
loop();

// ── Set view via button ── //
function setView(x, y) {
    autoPlay = (x === 15 && y === 0);
    cancelAnimationFrame(animFrame);
    rotX = x;
    rotY = y;
    cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    if (autoPlay) loop();
}

// ── Mouse drag ──
scene.addEventListener('mousedown', e => {
    isDragging = true;
    autoPlay = false;
    cancelAnimationFrame(animFrame);
    lastX = e.clientX;
    lastY = e.clientY;
});

window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    rotY += dx * 0.5;
    rotX -= dy * 0.5;
    rotX = Math.max(-90, Math.min(90, rotX));
    cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    lastX = e.clientX;
    lastY = e.clientY;
});

window.addEventListener('mouseup', () => isDragging = false);

// ── Touch drag ── //
scene.addEventListener('touchstart', e => {
    isDragging = true;
    autoPlay = false;
    cancelAnimationFrame(animFrame);
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
});

window.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - lastX;
    const dy = e.touches[0].clientY - lastY;
    rotY += dx * 0.5;
    rotX -= dy * 0.5;
    rotX = Math.max(-90, Math.min(90, rotX));
    cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
});

window.addEventListener('touchend', () => isDragging = false);

// ── Scroll to zoom ── //
scene.addEventListener('wheel', e => {
    e.preventDefault();
    zoom = Math.max(300, Math.min(1400, zoom - e.deltaY));
    scene.style.perspective = zoom + 'px';
}, { passive: false });
