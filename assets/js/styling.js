document.addEventListener('DOMContentLoaded', function() {
  const typeEffect = async (element, text, speed) => {
      if (!element) return;

      const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
      
      while (true) {
          element.innerHTML = '';
          // Type text
          for (let i = 0; i < text.length; i++) {
              element.innerHTML += text.charAt(i);
              await sleep(speed);
          }
          
          // Wait before deleting
          await sleep(2000);
          
          // Delete text
          for (let i = text.length; i >= 0; i--) {
              element.innerHTML = text.substring(0, i);
              await sleep(speed/2);
          }
          
          // Wait before next loop
          await sleep(500);
      }
  };

  const elements = {
      heading: document.querySelector('.heading-warna'),
      paragraph: document.querySelector('.paragraf-warna')
  };

  if (elements.heading) {
      typeEffect(elements.heading, "Reynaldy Al", 100);
  }
  if (elements.paragraph) {
      typeEffect(elements.paragraph, "Information Systems Student", 80);
  }
    // Fade-in effect
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach(element => {
      element.classList.add('visible');
    });
  
    // Particles.js configuration
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#ffffff"
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000"
          },
          polygon: {
            nb_sides: 5
          },
          image: {
            src: "img/github.svg",
            width: 100,
            height: 100
          }
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#FFD700",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 3,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse"
          },
          onclick: {
            enable: true,
            mode: "push"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    });
  });
  
  // aboutme ketikan animasi
  document.addEventListener('DOMContentLoaded', function() {
    function typeEffect(element, text, speed) {
      let i = 0;
      function typing() {
        if (i < text.length) {
          element.innerHTML += text.charAt(i);
          i++;
          setTimeout(typing, speed);
        }
      }
      element.innerHTML = '';
      typing();
    }
  
    const headingElement = document.querySelector('#about h2');
    typeEffect(headingElement, "About Me", 70);
  });
  
  document.addEventListener("DOMContentLoaded", function() {
    const skillBoxes = document.querySelectorAll('.skill-box');
    skillBoxes.forEach((box, index) => {
      setTimeout(() => {
        box.classList.add('animate');
      }, index * 200); // Delay each animation by 200ms
    });
  });
  
  document.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
  });