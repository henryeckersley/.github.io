document.addEventListener('DOMContentLoaded', function() {
  // Initialize Barba.js for smooth page transitions
  barba.init({
    transitions: [{
      name: 'fade',
      leave(data) {
        return gsap.to(data.current.container, { opacity: 0, duration: 0.5 });
      },
      enter(data) {
        return gsap.from(data.next.container, { opacity: 0, duration: 0.5 });
      }
    }]
  });

  // GSAP animations for the Hero Section
  if (document.querySelector('#hero')) {
    const heroTitle = document.querySelector('.hero-title');
    const typingText = document.getElementById('typing-text');
    const cursor = document.querySelector('.typing-cursor');

    const phrases = ["Student", "Athlete", "Coder", "Web Developer"];
    let phraseIndex = 0;
    let charIndex = 0;

    function typeEffect() {
      const currentPhrase = phrases[phraseIndex];
      if (charIndex < currentPhrase.length) {
        typingText.textContent += currentPhrase.charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 150); // Adjust typing speed
      } else {
        setTimeout(() => {
          cursor.style.animation = "blink 1s infinite"; // Keep blinking cursor
          setTimeout(backspaceEffect, 800); // Start backspace after typing
        }, 1000);
      }
    }

    function backspaceEffect() {
      if (charIndex > 0) {
        typingText.textContent = typingText.textContent.slice(0, -1);
        charIndex--;
        setTimeout(backspaceEffect, 100);
      } else {
        phraseIndex = (phraseIndex + 1) % phrases.length; // Cycle through phrases
        typeEffect();
      }
    }

    // GSAP animations before typing effect starts
    gsap.to(heroTitle, { opacity: 1, y: -20, duration: 1, delay: 0.5, onComplete: typeEffect });
    gsap.to('.hero-subtitle', { opacity: 1, y: -20, duration: 1, delay: 1 });
    gsap.from('.btn', { opacity: 0, scale: 0.8, duration: 1, delay: 1.5 });
  }

  // Tab functionality for Resume page
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  if (tabButtons.length) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        // Remove active classes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        // Activate the selected tab
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
        // Animate tab content appearance
        gsap.fromTo(`#${targetTab}`, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
      });
    });
  }

  // Contact form submission handler
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Animate form on submit
      gsap.to(contactForm, { opacity: 0.5, duration: 0.5, y: -10 });
      // Simulate sending message (replace with actual AJAX/API call)
      setTimeout(() => {
        alert('Your message has been sent!');
        gsap.to(contactForm, { opacity: 1, duration: 0.5, y: 0 });
        contactForm.reset();
        gsap.to(contactForm, { opacity: 0.5, y: -10, duration: 0.5, delay: 0.3 }); // Reset form animation
      }, 1000);
    });
  }

  // Initialize advanced canvas animations if present
  if (document.getElementById('hero-canvas')) {
    initHeroCanvas();
  }
  if (document.getElementById('vision-canvas')) {
    initVisionCanvas();
  }
});

// Function: Initialize hero canvas animation using Three.js
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Create particles
  const particlesCount = 500;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  function animate() {
    requestAnimationFrame(animate);
    points.rotation.x += 0.01;
    points.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();

  // Resize handling
  window.addEventListener('resize', function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}

// Function: Initialize vision canvas animation using Three.js
function initVisionCanvas() {
  const container = document.getElementById('vision-canvas-container');
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 5;

  // Create particles
  const particlesCount = 500;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({ color: 0xff00ff, size: 0.05 });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  function animate() {
    requestAnimationFrame(animate);
    points.rotation.x += 0.01;
    points.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();

  // Resize handling
  window.addEventListener('resize', function() {
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  });
}
