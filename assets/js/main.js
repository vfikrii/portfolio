document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. LOADING ANIMATION
    // =========================================
    const loader = document.getElementById('loader');
    const statusOk = document.querySelector('.status-ok');
    const loadingDone = document.querySelector('.loading-done');
    
    setTimeout(() => {
        statusOk.classList.remove('hidden');
    }, 800);
    
    setTimeout(() => {
        loadingDone.classList.remove('hidden');
    }, 1500);

    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        
        // Trigger reveal for elements in viewport after load
        revealElements();
    }, 2200);

    // =========================================
    // 2. NAVBAR SCROLL & MOBILE MENU
    // =========================================
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        // Toggle background opacity based on scroll
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(13, 17, 23, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.backgroundColor = 'rgba(13, 17, 23, 0.8)';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/Show navbar on scroll up/down
        if (lastScrollY < window.scrollY && window.scrollY > 100) {
            navbar.classList.add('scroll-down');
            navbar.classList.remove('scroll-up');
        } else {
            navbar.classList.add('scroll-up');
            navbar.classList.remove('scroll-down');
        }
        lastScrollY = window.scrollY;
        
        updateActiveLink();
    });

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // =========================================
    // 3. TYPEWRITER EFFECT
    // =========================================
    const typewriterElement = document.getElementById('typewriter');
    const roles = [
        "Linux Administrator", 
        "Network Administrator", 
        "Infrastructure Enthusiast"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    
    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingDelay = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingDelay = 500; // Pause before new typing
        }
        
        setTimeout(typeEffect, typingDelay);
    }
    
    // Start typing effect slightly after loader is done
    setTimeout(typeEffect, 2500);

    // =========================================
    // 4. REVEAL ANIMATIONS (Intersection Observer)
    // =========================================
    const revealElementsList = document.querySelectorAll('.reveal, .reveal-delay');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);
    
    revealElementsList.forEach(el => {
        revealOnScroll.observe(el);
    });
    
    // Initial check for elements already in view
    function revealElements() {
        revealElementsList.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;
            
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add("active");
            }
        });
    }

    // =========================================
    // 5. ACTIVE LINK HIGHLIGHTING
    // =========================================
    const sections = document.querySelectorAll('section');
    
    function updateActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 200; // Offset for fixed navbar
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    // =========================================
    // 6. BACK TO TOP BUTTON
    // =========================================
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// =========================================
// 7. MODAL & SLIDER LOGIC
// =========================================
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Re-enable background scrolling
    }
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('project-modal')) {
        event.target.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

let slideIndexes = {
    'project1-modal': 0,
    'project2-modal': 0,
    'project3-modal': 0,
    'project4-modal': 0,
    'project5-modal': 0
};

window.changeSlide = function(modalId, n) {
    let slides = document.querySelectorAll(`#${modalId} .modal-slider img`);
    if(slides.length === 0) return;
    
    slideIndexes[modalId] += n;
    
    if (slideIndexes[modalId] >= slides.length) {
        slideIndexes[modalId] = 0;
    }
    if (slideIndexes[modalId] < 0) {
        slideIndexes[modalId] = slides.length - 1;
    }
    
    slides.forEach(slide => slide.style.display = 'none');
    slides[slideIndexes[modalId]].style.display = 'block';
}

// =========================================
// 8. CERTIFICATE MODAL LOGIC
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.cert-card-new').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const media = this.querySelector('.cert-image img, .cert-image embed, .cert-image object, .cert-image iframe');
            if (!media) return;
            
            let src = media.getAttribute('src') || media.getAttribute('data');
            let isPdf = false;
            
            if (media.tagName.toLowerCase() === 'embed' || media.tagName.toLowerCase() === 'object' || media.tagName.toLowerCase() === 'iframe') {
                isPdf = true;
            } else if (src && src.toLowerCase().endsWith('.pdf')) {
                isPdf = true;
            }
            
            openCertModal(title, src, isPdf);
        });
    });
});

window.openCertModal = function(title, src, isPdf) {
    document.getElementById('cert-modal-title').textContent = title;
    const body = document.getElementById('cert-modal-body');
    
    // Clear previous
    body.innerHTML = '';
    
    if(isPdf) {
        body.innerHTML = `<embed src="${src}" type="application/pdf" width="100%" height="100%" style="border:none; min-height: 70vh;">`;
    } else {
        body.innerHTML = `<img src="${src}" style="max-width:100%; max-height:100%; object-fit:contain;">`;
    }
    
    openModal('cert-modal');
}
