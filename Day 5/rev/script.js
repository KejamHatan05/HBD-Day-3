const cube = document.getElementById('cube');
        let rotX = 15, rotY = 0;
        let autoPlay = true;
        let animFrame;
        let isDragging = false;
        let lastX = 0, lastY = 0;
        let zoom = 800;

        function setView(x, y) {
            autoPlay = (x === 15 && y === 0);
            cancelAnimationFrame(animFrame);
            rotX = x; rotY = y;
            if (autoPlay) loop();
            else cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
            cube.style.animation = 'none';
        }

        function loop() {
            rotY += 0.5;
            cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
            if (autoPlay) animFrame = requestAnimationFrame(loop);
        }
        loop();

        // Drag to rotate
        const scene = document.querySelector('.scene');
        scene.addEventListener('mousedown', e => {
            isDragging = true;
            autoPlay = false;
            cancelAnimationFrame(animFrame);
            cube.style.animation = 'none';
            lastX = e.clientX; lastY = e.clientY;
        });
        window.addEventListener('mousemove', e => {
            if (!isDragging) return;
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            rotY += dx * 0.5;
            rotX -= dy * 0.5;
            // Clamp X so top/bottom stay visible
            rotX = Math.max(-90, Math.min(90, rotX));
            cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
            lastX = e.clientX; lastY = e.clientY;
        });
        window.addEventListener('mouseup', () => isDragging = false);

        // Touch support
        scene.addEventListener('touchstart', e => {
            isDragging = true;
            autoPlay = false;
            cancelAnimationFrame(animFrame);
            cube.style.animation = 'none';
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

        // Scroll to zoom
        scene.addEventListener('wheel', e => {
            e.preventDefault();
            zoom = Math.max(300, Math.min(1400, zoom - e.deltaY));
            scene.style.perspective = zoom + 'px';
        });