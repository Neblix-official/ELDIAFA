// تفعيل القائمة المتنقلة
document.getElementById('mobile-menu-btn').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('active');
    
    // تغيير أيقونة القائمة عند التفعيل
    const icon = this.querySelector('i');
    if (menu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// تأثير التمرير لشريط التنقل
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // تحديث الرابط النشط في القائمة
    updateActiveNavLink();
});

// تفعيل الرسوم المتحركة عند التمرير
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('animated');
        }
    });
}

// تفعيل الرسوم المتحركة عند التحميل وعند التمرير
window.addEventListener('load', function() {
    animateOnScroll();
    
    // إضافة تأثير تحميل للصفحة
    document.body.classList.add('loaded');
});

window.addEventListener('scroll', animateOnScroll);

// شريط آراء العملاء المتحرك
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-slide');
let testimonialInterval;

function initTestimonials() {
    if (testimonials.length > 0) {
        // بدء التشغيل التلقائي
        testimonialInterval = setInterval(nextTestimonial, 5000);
        
        // إضافة مؤشرات التنقل
        createTestimonialIndicators();
    }
}

function showTestimonial(index) {
    testimonials.forEach(slide => slide.classList.remove('active'));
    testimonials[index].classList.add('active');
    
    // تحديث المؤشرات النشطة
    updateTestimonialIndicators(index);
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function createTestimonialIndicators() {
    const carousel = document.getElementById('testimonials-carousel');
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'testimonial-indicators';
    
    testimonials.forEach((_, index) => {
        const indicator = document.createElement('button');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
            resetTestimonialInterval();
        });
        indicatorsContainer.appendChild(indicator);
    });
    
    // إضافة أزرار التنقل
    const prevBtn = document.createElement('button');
    prevBtn.className = 'testimonial-nav prev';
    prevBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    prevBtn.addEventListener('click', () => {
        prevTestimonial();
        resetTestimonialInterval();
    });
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'testimonial-nav next';
    nextBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    nextBtn.addEventListener('click', () => {
        nextTestimonial();
        resetTestimonialInterval();
    });
    
    carousel.appendChild(prevBtn);
    carousel.appendChild(nextBtn);
    carousel.appendChild(indicatorsContainer);
}

function updateTestimonialIndicators(activeIndex) {
    const indicators = document.querySelectorAll('.testimonial-indicators .indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === activeIndex);
    });
}

function resetTestimonialInterval() {
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(nextTestimonial, 5000);
}

// إغلاق القائمة المتنقلة عند النقر على رابط
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.remove('active');
        const menuBtn = document.getElementById('mobile-menu-btn');
        const icon = menuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// الانتقال السلس عند النقر على الروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // إغلاق القائمة المتنقلة إذا كانت مفتوحة
            if (window.innerWidth <= 768) {
                document.getElementById('mobile-menu').classList.remove('active');
                const menuBtn = document.getElementById('mobile-menu-btn');
                const icon = menuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// تحديث الرابط النشط في القائمة
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// التحكم في فيديو الخلفية
function initHeroVideo() {
    const video = document.querySelector('.hero-video');
    if (video) {
        // إعادة تشغيل الفيديو إذا توقف
        video.addEventListener('ended', function() {
            video.currentTime = 0;
            video.play().catch(e => console.log('فيديو الخلفية:', e));
        });
        
        // التأكد من تشغيل الفيديو
        video.play().catch(function(error) {
            console.log('فيديو الخلفية يحتاج تفاعل المستخدم:', error);
        });
    }
}

// تأثيرات تفاعلية لحقول الحجز
function initBookingForm() {
    const bookingInputs = document.querySelectorAll('.booking-input-group input, .booking-input-group select');
    
    bookingInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // تحديث الحالة إذا كان هناك قيمة مسبقة
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
}

// تحميل الصور بشكل كسول (Lazy Loading)
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// تهيئة جميع الوظائف عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initTestimonials();
    initHeroVideo();
    initBookingForm();
    initLazyLoading();
    
    // إضافة تأثير تحميل الصفحة
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 100);
});

// تحسين الأداء عند تغيير حجم النافذة
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // إعادة تهيئة العناصر التي تحتاج إلى إعادة حساب
        animateOnScroll();
    }, 250);
});

// إضافة تأثيرات للصور في المعرض
function initGalleryHover() {
    const galleryImages = document.querySelectorAll('#gallery img');
    
    galleryImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// تهيئة تأثيرات المعرض بعد تحميل الصفحة
window.addEventListener('load', initGalleryHover);

// CSS الإضافي للوظائف الجديدة
const additionalStyles = `
    /* تأثيرات التحميل */
    body:not(.page-loaded) {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    body.page-loaded {
        opacity: 1;
    }
    
    /* مؤشرات آراء العملاء */
    .testimonial-indicators {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 20px;
    }
    
    .testimonial-indicators .indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: none;
        background: rgba(255, 255, 255, 0.3);
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .testimonial-indicators .indicator.active {
        background: var(--primary-color);
        transform: scale(1.2);
    }
    
    .testimonial-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.5);
        border: none;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .testimonial-nav:hover {
        background: var(--primary-color);
    }
    
    .testimonial-nav.prev {
        right: 20px;
    }
    
    .testimonial-nav.next {
        left: 20px;
    }
    
    /* الرابط النشط في القائمة */
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    /* تأثيرات حقول الحجز */
    .booking-input-group.focused {
        transform: translateY(-2px);
    }
    
    .booking-input-group.focused i {
        color: var(--primary-color) !important;
    }
    
    /* تحسينات للهواتف */
    @media (max-width: 768px) {
        .testimonial-nav {
            display: none;
        }
    }
`;

// إضافة الأنماط الإضافية إلى الصفحة
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);