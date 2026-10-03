import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // Stacked animation logic
  const stackedCardsContainer = document.getElementById('stackedCards');
  const cards = Array.from(document.querySelectorAll('.stack-card'));
  
  if (stackedCardsContainer) {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 800; // Adjust for scroll distance needed to complete animation
      let progress = Math.min(scrollY / maxScroll, 1);

      let virtualIndex = progress * cards.length;

      cards.forEach((card, i) => {
        // card order: 3 is frontmost (index 3), 0 is backmost (index 0)
        let cardOrder = 3 - i; 
        let currentPos = cardOrder - virtualIndex;

        if (currentPos < -1) {
          // completely gone (scrolled past)
          card.style.opacity = 0;
          card.style.transform = `translate(-50%, 0%) scale(1.1)`;
        } else if (currentPos < 0) {
          // fading out
          let fadeProgress = -currentPos; // 0 to 1
          card.style.opacity = 1 - fadeProgress;
          let scale = 1 + (0.1 * fadeProgress);
          let y = -30 + (30 * fadeProgress); // Moves down slightly as it fades
          card.style.transform = `translate(-60%, ${y}%) scale(${scale})`;
        } else {
          // in stack
          let clampedPos = Math.min(currentPos, 3);
          
          // positions: 0 is front, 3 is back
          // front -> x: -60%, y: -30%
          // back -> x: -30%, y: -60%
          let x = -60 + (clampedPos * 10);
          let y = -30 - (clampedPos * 10);
          let scale = 1 - (clampedPos * 0.05);
          
          card.style.opacity = 1 - (clampedPos * 0.1); // slight fade for cards in back
          card.style.transform = `translate(${x}%, ${y}%) scale(${scale})`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init
  }

  // Floating elements scroll animation (Bidirectional)
  const observerOptions = {
    root: null,
    rootMargin: '-5% 0px -5% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        entry.target.classList.remove('hide-up');
        entry.target.classList.remove('hide-down');
      } else {
        entry.target.classList.remove('show');
        // Vanish up or down depending on scroll direction
        if (entry.boundingClientRect.top < 0) {
          entry.target.classList.add('hide-up');
          entry.target.classList.remove('hide-down');
        } else {
          entry.target.classList.add('hide-down');
          entry.target.classList.remove('hide-up');
        }
      }
    });
  }, observerOptions);

  // Apply fade-up classes dynamically to MORE elements for stagger effect
  const animatedElements = document.querySelectorAll(
    '.section-header, .idea-card, .tab, .v-tab, .floating-effect, .feature-list li, .step-item, .hero h1, .hero p, .hero-buttons, .preview-card, .profile-card, .cta-block'
  );
  
  animatedElements.forEach((el, index) => {
    // Determine the type of animation
    if (el.classList.contains('cta-block')) {
      // CTA blocks use wipe, don't add fade-up-element
    } else {
      el.classList.add('fade-up-element');
    }
    
    // Start them in hide-down state
    el.classList.add('hide-down');
    
    // Create organic stagger effect depending on position inside parent
    let delay = 0;
    if (el.classList.contains('idea-card') || el.classList.contains('tab') || el.classList.contains('v-tab') || el.classList.contains('step-item') || el.classList.contains('cta-block')) {
      // Stagger siblings
      let siblings = Array.from(el.parentNode.children);
      let siblingIndex = siblings.indexOf(el);
      delay = siblingIndex * 0.15;
    } else {
      delay = (index % 3) * 0.1;
    }
    el.style.transitionDelay = `${delay}s`;
    
    observer.observe(el);
  });
  
  // Scroll Progress and Back to Top
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    // Progress bar
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (window.scrollY / scrollableHeight) * 100;
    if (scrollProgress) {
      scrollProgress.style.width = `${scrollPercentage}%`;
    }

    // Back to top visibility
    if (backToTop) {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Tab interactions with image swap and animations
  const tabs = document.querySelectorAll('.tabs .tab');
  const tabImage = document.querySelector('.tab-visual img');
  const tabImages = [
    '/Desktop - 14 1.png',
    '/Desktop - 18 1.png',
    '/Desktop - 20 1.png',
    '/Desktop - 38 1.png',
    '/Desktop - 14 1.png'
  ];

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      // Manage active state
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Animate image out
      if (tabImage) {
        tabImage.style.opacity = 0;
        tabImage.style.transform = 'translateY(15px) scale(0.98)';
        
        // Swap src and animate in after transition
        setTimeout(() => {
          tabImage.src = tabImages[index];
          tabImage.style.opacity = 1;
          tabImage.style.transform = 'translateY(0) scale(1)';
        }, 400); // Wait for the 0.4s CSS transition to finish
      }
    });
  });

  const vTabs = document.querySelectorAll('.v-tab');
  vTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      vTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
});
