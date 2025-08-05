document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle with proper ARIA management
  const menuToggle = document.getElementById('menu-toggle');
  const navList = document.getElementById('nav-list');
  
  const toggleMenu = () => {
    const isExpanded = navList.classList.toggle('active');
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isExpanded);
    
    // Toggle body scroll when menu is open
    document.body.style.overflow = isExpanded ? 'hidden' : '';
  };
  
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on nav links
    document.querySelectorAll('.nav-list a').forEach(link => {
      link.addEventListener('click', () => {
        if (navList.classList.contains('active')) {
          toggleMenu();
        }
      });
    });
  }

  // Services Tab Switching with keyboard support
  const tabBtns = document.querySelectorAll('.tab-btn');
  const serviceCategories = document.querySelectorAll('.service-category');
  
  if (tabBtns.length && serviceCategories.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons and categories
        tabBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        serviceCategories.forEach(cat => cat.classList.remove('active'));
        
        // Add active class to clicked button and corresponding category
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');
        const tabId = this.getAttribute('data-tab');
        if (tabId) {
          const targetCategory = document.getElementById(tabId);
          if (targetCategory) targetCategory.classList.add('active');
        }
      });
      
      // Keyboard navigation support
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    });
  }

  // Animate Stats Counting with IntersectionObserver
  const animateStats = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-count')) || 0;
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;
          
          const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
              clearInterval(counter);
              stat.textContent = target;
            } else {
              stat.textContent = Math.floor(current);
            }
          }, 16);
        });
        
        observer.unobserve(entry.target);
      }
    });
  };

  const statsObserver = new IntersectionObserver(animateStats, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  const statsContainer = document.querySelector('.stats-container');
  if (statsContainer) statsObserver.observe(statsContainer);

  // FAQ Accordion with improved accessibility
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    const answerId = question.getAttribute('aria-controls');
    const answer = document.getElementById(answerId);
    
    if (!answer) return;
    
    question.addEventListener('click', () => {
      const isExpanded = question.getAttribute('aria-expanded') === 'true';
      question.setAttribute('aria-expanded', !isExpanded);
      answer.setAttribute('aria-hidden', isExpanded);
      
      // Toggle active class on parent
      question.parentElement.classList.toggle('active');
    });
    
    // Keyboard support
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          if (navList && navList.classList.contains('active')) {
            toggleMenu();
          }
        }
      }
    });
  });

  // Form Submission with error handling
  const appointmentForm = document.getElementById('appointment-form');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formMessages = document.getElementById('form-messages');
      
      try {
        // In a real implementation, you would use fetch() here
        // For now, we'll simulate a successful submission
        if (formMessages) {
          formMessages.innerHTML = `
            <div class="success-message" role="alert">
              Thank you! Your appointment request has been sent. We will contact you shortly.
            </div>
          `;
        }
        
        this.reset();
        
        setTimeout(() => {
          if (formMessages) {
            formMessages.innerHTML = '';
          }
        }, 5000);
      } catch (error) {
        if (formMessages) {
          formMessages.innerHTML = `
            <div class="error-message" role="alert">
              There was an error submitting your form. Please try again or call us directly.
            </div>
          `;
        }
      }
    });
  }

  // Back to Top Button
  const backToTopButton = document.querySelector('.back-to-top');
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    backToTopButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Preloader
  window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
  });
});
