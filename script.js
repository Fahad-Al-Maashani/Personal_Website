// — MATRIX RAIN EFFECT —
const canvas = document.getElementById('matrix');
const ctx    = canvas.getContext('2d');
const letters =
  'アァカサタナハマヤャラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const fontSize = 16;
let columns, drops;

function initMatrix() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops   = Array(columns).fill(1);
}
window.addEventListener('resize', initMatrix);
initMatrix();

function drawMatrix() {
  ctx.fillStyle = 'rgba(0,0,0,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00ffcc';
  ctx.font      = fontSize + 'px monospace';

  for (let i = 0; i < columns; i++) {
    const char = letters.charAt(Math.random() * letters.length | 0);
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(drawMatrix, 50);

// — SMOOTH SCROLL —
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href'))
            .scrollIntoView({ behavior: 'smooth' });
  });
});

// — SECTION REVEAL ON SCROLL —
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
sections.forEach(s => observer.observe(s));

// — DOWNLOAD CV VIA FETCH + BLOB — 
const cvLink = document.getElementById('download-cv');

if (cvLink) {
  cvLink.addEventListener('click', function(e) {
    e.preventDefault();
    const pdfPath = cvLink.getAttribute('href');

    fetch(pdfPath)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not OK');
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a   = document.createElement('a');
        a.style.display = 'none';
        a.href        = url;
        // use the download attribute’s filename, or default to cv.pdf
        a.download    = cvLink.download || 'cv.pdf';
        document.body.appendChild(a);
        a.click();
        // cleanup
        window.URL.revokeObjectURL(url);
        a.remove();
      })
      .catch(err => {
        console.error('Download failed:', err);
        alert('Sorry, could not download the CV.');
      });
  });
}

