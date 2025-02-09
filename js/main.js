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

    const text = "Hi, my name is Henry."; // Customize as needed
    let index = 0;

    function typeEffect() {
      if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 150); // Adjust typing speed
      } else {
        cursor.style.animation = "blink 0.7s infinite"; // Keep blinking cursor
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
    // Slowly rotate the particle field
    points.rotation.x += 0.0005;
    points.rotation.y += 0.001;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}

// Function: Initialize vision canvas animation using Three.js
function initVisionCanvas() {
  const canvas = document.getElementById('vision-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.z = 10;

  // Create multiple rotating cubes (or vision elements)
  const cubes = [];
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  for (let i = 0; i < 10; i++) {
    const material = new THREE.MeshStandardMaterial({ 
      color: new THREE.Color(Math.random(), Math.random(), Math.random()), 
      roughness: 0.5 
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = (Math.random() - 0.5) * 15;
    cube.position.y = (Math.random() - 0.5) * 10;
    cube.position.z = (Math.random() - 0.5) * 10;
    scene.add(cube);
    cubes.push(cube);
  }
  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);

  function animateVision() {
    requestAnimationFrame(animateVision);
    cubes.forEach(cube => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    });
    renderer.render(scene, camera);
  }
  animateVision();

  window.addEventListener('resize', function() {
    const container = document.getElementById('vision-canvas-container');
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  });
}

