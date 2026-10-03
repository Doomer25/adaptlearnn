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
  
  // Tab interactions with image and text swap
  const tabs = document.querySelectorAll('.tabs .tab');
  const tabImage = document.querySelector('.tab-visual img');
  const tabHeading = document.getElementById('tabHeading');
  const tabDesc = document.getElementById('tabDesc');
  
  const tabData = [
    {
      img: '/Desktop - 14 1.png',
      heading: 'BRING YOUR MATERIAL',
      desc: 'Upload a document or start with a topic.'
    },
    {
      img: '/Desktop - 18 1.png',
      heading: 'SHAPE YOUR LESSON',
      desc: 'Choose how content is presented.'
    },
    {
      img: '/Desktop - 20 1.png',
      heading: 'ENGAGE ACTIVELY',
      desc: 'Dive into your personalized content.'
    },
    {
      img: '/Desktop - 38 1.png',
      heading: 'PRACTICE MAKES PERFECT',
      desc: 'Test your understanding with quizzes.'
    },
    {
      img: '/Desktop - 14 1.png', // Reusing image
      heading: 'TRACK YOUR PROGRESS',
      desc: 'See how far you have come and what is next.'
    }
  ];

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      // Manage active state
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Animate content out
      if (tabImage && tabHeading && tabDesc) {
        tabImage.style.opacity = 0;
        tabImage.style.transform = 'translateY(15px) scale(0.98)';
        
        tabHeading.style.opacity = 0;
        tabHeading.style.transform = 'translateY(-10px)';
        tabDesc.style.opacity = 0;
        
        // Swap src and text and animate in after transition
        setTimeout(() => {
          tabImage.src = tabData[index].img;
          tabHeading.textContent = tabData[index].heading;
          tabDesc.textContent = tabData[index].desc;
          
          tabImage.style.opacity = 1;
          tabImage.style.transform = 'translateY(0) scale(1)';
          
          tabHeading.style.opacity = 1;
          tabHeading.style.transform = 'translateY(0)';
          tabDesc.style.opacity = 1;
        }, 400); // Wait for the CSS transition
      }
    });
  });

  // Vertical Tabs (See How It Adapts)
  const vTabs = document.querySelectorAll('.v-tab');
  const vTabCard = document.getElementById('vTabCard');
  const vTabTitle = document.getElementById('vTabTitle');
  const vTabText = document.getElementById('vTabText');
  
  const vTabData = [
    {
      title: 'What Is JavaScript?',
      text: 'JavaScript makes web pages interactive and dynamic. It responds to clicks without reloading the page.',
      className: ''
    },
    {
      title: 'What Is JavaScript?',
      text: 'JavaScript makes web pages interactive.<br><br>It responds when you click without reloading the page.',
      className: ''
    },
    {
      title: 'What Is JavaScript?',
      text: 'JavaScript makes web pages interactive and dynamic<br>It responds to clicks without reloading the page.',
      className: 'large-text',
      titleClass: 'large-title'
    }
  ];

  vTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      vTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      if (vTabCard && vTabTitle && vTabText) {
        // Animate out
        vTabCard.style.opacity = 0.5;
        vTabCard.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
          vTabTitle.innerHTML = vTabData[index].title;
          vTabText.innerHTML = vTabData[index].text;
          
          // Apply specific class for Low Vision
          if (vTabData[index].className) {
            vTabText.classList.add(vTabData[index].className);
          } else {
            vTabText.className = '';
          }
          
          if (vTabData[index].titleClass) {
            vTabTitle.classList.add(vTabData[index].titleClass);
          } else {
            vTabTitle.className = '';
          }
          
          // Animate back in
          vTabCard.style.opacity = 1;
          vTabCard.style.transform = 'translateY(0)';
        }, 300);
      }
    });
  });

  // Mastery Practice Stepper & Quiz Logic
  const stepItems = document.querySelectorAll('.step-item');
  const quizPreview = document.getElementById('quizPreview');
  const progressPreview = document.getElementById('progressPreview');
  const quizOptions = document.querySelectorAll('.quiz-opt');
  const quizSubmit = document.getElementById('quizSubmit');
  const quizFeedback = document.getElementById('quizFeedback');
  const quizNext = document.getElementById('quizNext');
  let selectedOption = null;

  function updateStepper(index) {
    stepItems.forEach(s => s.classList.remove('active'));
    if (stepItems[index]) stepItems[index].classList.add('active');
    
    // Toggle views
    if (index === 3) {
      if (quizPreview) quizPreview.style.display = 'none';
      if (progressPreview) progressPreview.style.display = 'block';
    } else {
      if (quizPreview) quizPreview.style.display = 'block';
      if (progressPreview) progressPreview.style.display = 'none';
    }
  }

  // Handle Stepper Click manually (optional, but good for previewing)
  stepItems.forEach((step, index) => {
    step.addEventListener('click', () => {
      updateStepper(index);
    });
  });

  // Handle Option Click
  quizOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      // Don't allow changing if already submitted
      if (quizSubmit.classList.contains('submitted')) return;

      quizOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedOption = opt;
      quizSubmit.disabled = false;
      quizSubmit.style.background = 'var(--primary-color)';
    });
  });

  // Handle Submit Answer
  if (quizSubmit) {
    quizSubmit.addEventListener('click', () => {
      if (!selectedOption || quizSubmit.classList.contains('submitted')) return;
      
      quizSubmit.classList.add('submitted');
      quizOptions.forEach(o => o.classList.add('disabled'));
      
      const isCorrect = selectedOption.dataset.correct === 'true';
      
      if (isCorrect) {
        selectedOption.classList.remove('selected');
        selectedOption.classList.add('correct');
        quizSubmit.classList.add('state-correct');
        quizSubmit.textContent = 'Correct answer';
        quizSubmit.style.background = '';
        updateStepper(1); // Set "Answer" step active
      } else {
        selectedOption.classList.remove('selected');
        selectedOption.classList.add('wrong');
        quizSubmit.classList.add('state-wrong');
        quizSubmit.textContent = 'Wrong Answer';
        quizSubmit.style.background = '';
        quizFeedback.style.display = 'block';
        updateStepper(2); // Set "Feedback" step active
      }
    });
  }

  if (quizNext) {
    quizNext.addEventListener('click', () => {
       updateStepper(3); // Go to progress step
    });
  }
});
