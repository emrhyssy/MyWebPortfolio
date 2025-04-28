// Add this at the beginning of your existing script.js
document.addEventListener('DOMContentLoaded', function() {
    // Page Loader
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    document.body.prepend(loader);
    
    // Hide loader when page is loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('fade-out');
            
            // Remove loader after animation completes
            setTimeout(function() {
                loader.remove();
            }, 500);
        }, 1000);
    });
    
    // Rest of your existing JavaScript...
    
    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const x = e.pageX - button.offsetLeft;
            const y = e.pageY - button.offsetTop;
            
            button.style.setProperty('--x', x + 'px');
            button.style.setProperty('--y', y + 'px');
        });
    });
    
    // Parallax effect for hero image
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            heroImage.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        });
    }
    
    // Animate skills on hover
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Project card tilt effect
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.addEventListener('mousemove', function(e) {
            const x = e.offsetX;
            const y = e.offsetY;
            const centerX = this.offsetWidth / 2;
            const centerY = this.offsetHeight / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        project.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
});document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links ul li a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[type="text"]:nth-of-type(2)').value;
            const message = this.querySelector('textarea').value;
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.skill, .project, .about-image, .about-text');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animation
    const animatedElements = document.querySelectorAll('.skill, .project, .about-image, .about-text');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});

// Photo Albums Lightbox
const albums = {
    travel: [
        { src: 'https://via.placeholder.com/800x600/3498db/ffffff', title: 'Mountain View' },
        { src: 'https://via.placeholder.com/800x600/e74c3c/ffffff', title: 'Beach Sunset' },
        { src: 'https://via.placeholder.com/800x600/2ecc71/ffffff', title: 'City Skyline' }
    ],
    nature: [
        { src: 'https://via.placeholder.com/800x600/1abc9c/ffffff', title: 'Forest Path' },
        { src: 'https://via.placeholder.com/800x600/9b59b6/ffffff', title: 'Waterfall' },
        { src: 'https://via.placeholder.com/800x600/f1c40f/ffffff', title: 'Wildlife' }
    ],
    events: [
        { src: 'https://via.placeholder.com/800x600/e67e22/ffffff', title: 'Conference' },
        { src: 'https://via.placeholder.com/800x600/34495e/ffffff', title: 'Workshop' },
        { src: 'https://via.placeholder.com/800x600/7f8c8d/ffffff', title: 'Meetup' }
    ]
};

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const photoCounter = document.getElementById('photo-counter');
const closeLightbox = document.querySelector('.close-lightbox');
const prevPhoto = document.getElementById('prev-photo');
const nextPhoto = document.getElementById('next-photo');
const viewAlbumButtons = document.querySelectorAll('.view-album');

let currentAlbum = [];
let currentPhotoIndex = 0;

// Open lightbox with album
viewAlbumButtons.forEach(button => {
    button.addEventListener('click', function() {
        const albumKey = this.getAttribute('data-album');
        currentAlbum = albums[albumKey];
        currentPhotoIndex = 0;
        updateLightbox();
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Close lightbox
closeLightbox.addEventListener('click', function() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Navigation between photos
prevPhoto.addEventListener('click', function() {
    if (currentPhotoIndex > 0) {
        currentPhotoIndex--;
        updateLightbox();
    }
});

nextPhoto.addEventListener('click', function() {
    if (currentPhotoIndex < currentAlbum.length - 1) {
        currentPhotoIndex++;
        updateLightbox();
    }
});

// Update lightbox content
function updateLightbox() {
    if (currentAlbum.length > 0) {
        const photo = currentAlbum[currentPhotoIndex];
        lightboxImage.src = photo.src;
        lightboxImage.alt = photo.title;
        lightboxTitle.textContent = photo.title;
        photoCounter.textContent = `${currentPhotoIndex + 1} of ${currentAlbum.length}`;
    }
}

// Close lightbox when clicking outside content
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (lightbox.style.display === 'block') {
        if (e.key === 'Escape') {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else if (e.key === 'ArrowLeft' && currentPhotoIndex > 0) {
            currentPhotoIndex--;
            updateLightbox();
        } else if (e.key === 'ArrowRight' && currentPhotoIndex < currentAlbum.length - 1) {
            currentPhotoIndex++;
            updateLightbox();
        }
    }
});

// Quiz Gallery Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const quizItems = document.querySelectorAll('.quiz-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        // Filter quiz items
        quizItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Floating Hearts Creation
function createHearts() {
    // Random hearts on page load
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 300);
    }
    
    // Hearts on mouse move
    document.addEventListener('mousemove', function(e) {
        if (Math.random() > 0.95) {
            createHeart(e.clientX, e.clientY);
        }
    });
    
    // Hearts on scroll
    window.addEventListener('scroll', function() {
        if (Math.random() > 0.98) {
            createHeart(
                Math.random() * window.innerWidth,
                window.scrollY + window.innerHeight
            );
        }
    });
}

function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤';
    heart.className = 'heart';
    
    if (x && y) {
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
    } else {
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.top = `${Math.random() * 100}vh`;
    }
    
    heart.style.fontSize = `${Math.random() * 2 + 1}rem`;
    heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
    
    // Random colors
    const colors = ['#ff6b6b', '#74b9ff', '#a29bfe', '#55efc4', '#ffeaa7'];
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    document.body.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

// Heart Cursor Effect
function initHeartCursor() {
    const cursor = document.getElementById('heart-cursor');
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        // Create small hearts along cursor trail
        if (Math.random() > 0.7) {
            const trailHeart = document.createElement('div');
            trailHeart.innerHTML = '❤';
            trailHeart.style.position = 'fixed';
            trailHeart.style.left = `${e.clientX}px`;
            trailHeart.style.top = `${e.clientY}px`;
            trailHeart.style.fontSize = '0.8rem';
            trailHeart.style.color = '#ff6b6b';
            trailHeart.style.pointerEvents = 'none';
            trailHeart.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
            trailHeart.style.opacity = '0.7';
            document.body.appendChild(trailHeart);
            
            setTimeout(() => {
                trailHeart.remove();
            }, 1000);
        }
    });
}

// Like Button Functionality
function initLikeButtons() {
    const likeButtons = document.querySelectorAll('.like-btn');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('liked');
            
            if (this.classList.contains('liked')) {
                // Create burst effect
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        createHeart(
                            this.getBoundingClientRect().left + this.offsetWidth / 2,
                            this.getBoundingClientRect().top + this.offsetHeight / 2
                        );
                    }, i * 100);
                }
            }
        });
    });
}

// Heart Rating System
function initHeartRating() {
    const hearts = document.querySelectorAll('.heart-rating .heart');
    
    hearts.forEach((heart, index) => {
        heart.addEventListener('click', function() {
            // Set all hearts up to this one as active
            hearts.forEach((h, i) => {
                if (i <= index) {
                    h.classList.add('active');
                } else {
                    h.classList.remove('active');
                }
            });
            
            // Create floating hearts based on rating
            for (let i = 0; i < index + 1; i++) {
                setTimeout(() => {
                    createHeart(
                        this.getBoundingClientRect().left + this.offsetWidth / 2,
                        this.getBoundingClientRect().top + this.offsetHeight / 2
                    );
                }, i * 200);
            }
        });
    });
}

// Call these functions in your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
    
    // Add these new initializations
    createHearts();
    initHeartCursor();
    initLikeButtons();
    initHeartRating();
    
    // Add heart-btn class to all buttons if you want the heart effect
    document.querySelectorAll('.btn').forEach(btn => {
        btn.classList.add('heart-btn');
    });
});

// Enhanced Heart Animation System
function initHeartSystem() {
    // Create heart rain container
    const heartRain = document.createElement('div');
    heartRain.className = 'heart-rain';
    document.body.appendChild(heartRain);
    
    // Generate lots of red hearts
    function createHeartRain() {
        // Create 20 hearts every second
        setInterval(() => {
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    createFloatingHeart();
                }, i * 50);
            }
        }, 1000);
    }
    
    // Create a single floating heart
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        heart.className = 'heart';
        
        // Random position at bottom
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.top = `${window.innerHeight + 50}px`;
        
        // Random size
        const size = Math.random() * 1.5 + 1;
        heart.style.fontSize = `${size}rem`;
        
        // Random animation duration
        heart.style.animationDuration = `${Math.random() * 3 + 4}s`;
        
        // Random delay
        heart.style.animationDelay = `${Math.random() * 2}s`;
        
        // Add to heart rain container
        document.querySelector('.heart-rain').appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }
    
    // Create heart burst effect
    function createHeartBurst(x, y, count = 10) {
        for (let i = 0; i < count; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤';
            heart.className = 'heart-burst';
            
            // Position at click/touch
            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;
            
            // Random size
            const size = Math.random() * 1.5 + 1;
            heart.style.fontSize = `${size}rem`;
            
            // Random direction
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const xOffset = Math.cos(angle) * distance;
            const yOffset = Math.sin(angle) * distance;
            
            // Add movement
            heart.style.setProperty('--x-end', `${xOffset}px`);
            heart.style.setProperty('--y-end', `${yOffset}px`);
            
            document.body.appendChild(heart);
            
            // Remove after animation
            setTimeout(() => {
                heart.remove();
            }, 1000);
        }
    }
    
    // Heart burst on click/touch
    document.addEventListener('click', (e) => {
        createHeartBurst(e.clientX, e.clientY, 15);
    });
    
    document.addEventListener('touchstart', (e) => {
        createHeartBurst(e.touches[0].clientX, e.touches[0].clientY, 15);
    });
    
    // Start heart rain
    createHeartRain();
    
    // Create initial hearts
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createFloatingHeart();
        }, i * 100);
    }
}

// Update your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
    
    // Replace createHearts() with:
    initHeartSystem();
    
    // Keep other heart-related functions if you still want them
    initHeartCursor();
    initLikeButtons();
    initHeartRating();
});

// Particle.js configuration
document.addEventListener('DOMContentLoaded', function() {
  particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 1
          }
        },
        "push": {
          "particles_nb": 4
        }
      }
    },
    "retina_detect": true
  });
});
// Interactive Connection Dots
function initCanvasBackground() {
  const canvas = document.getElementById('canvas-bg');
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const dots = [];
  const dotCount = 80;
  const maxDistance = 150;
  
  // Create dots
  class Dot {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = Math.random() * 2 - 1;
      this.vy = Math.random() * 2 - 1;
      this.radius = Math.random() * 3 + 1;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      // Bounce off walls
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fill();
    }
  }
  
  // Initialize dots
  for (let i = 0; i < dotCount; i++) {
    dots.push(new Dot());
  }
  
  // Draw connections
  function drawConnections() {
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance/maxDistance})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.stroke();
        }
      }
    }
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    dots.forEach(dot => {
      dot.update();
      dot.draw();
    });
    
    drawConnections();
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Resize handler
  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Call this in your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
  initCanvasBackground();
});

