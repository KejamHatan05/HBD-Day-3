function toggleMode() {
    const body = document.body;
    const btn = document.getElementById('toggleBtn');

    body.classList.toggle('dark');

    if (body.classList.contains('dark')) {
        btn.textContent = '☀️ Light Mode';
    } else {
        btn.textContent = '🌙 Dark Mode';
    }
}

function toggleAbsen(checkbox) {
    const label = checkbox.parentElement;
    if (checkbox.checked) {
        label.classList.add('hadir');
    } else {
        label.classList.remove('hadir');
    }
}
