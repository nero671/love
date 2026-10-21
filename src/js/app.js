import {
    isWebp,
    headerFixed,
    initSafetySectionAnimation,
    togglePopupWindows,
    addTouchClass,
    addLoadedClass,
    Tabs,
    submitForm
} from './modules';

import BurgerMenu from './modules/BurgerMenu';

import Swiper, {Autoplay, Navigation, Pagination} from 'swiper';
import validationForm from "./modules/validationForm.js";
import {validation} from "./modules/validation.js";

window.Swiper = Swiper;
window.SwiperModules = {
    Navigation,
    Pagination,
    Autoplay,
};

const bw = document.body.clientWidth;

isWebp();
new BurgerMenu().init();

togglePopupWindows();

function smoothScrollTo(targetY, duration = 600) {
    const startY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const distance = targetY - startY;
    let startTime = null;

    const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    function step(timestamp) {
        if (!startTime) {
            startTime = timestamp;
        }

        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutQuad(progress);

        window.scrollTo(0, startY + distance * eased);

        if (elapsed < duration) {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.faq__header').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.parentElement;
            const allItems = document.querySelectorAll('.faq__item');

            allItems.forEach(el => {
                if (el !== item) el.classList.remove('active');
            });

            item.classList.toggle('active');
        });
    });
});

// document.addEventListener('DOMContentLoaded', () => {
//     if (bw > 1050) {
//         const section = document.querySelector('.about-history');
//         if (!section) return;
//
//         const items = document.querySelectorAll('.about-history__timeline-item');
//         const images = document.querySelectorAll('.about-history-img img');
//         if (!items.length || !images.length) return;
//
//         const body = document.body;
//
//         let currentStep = 0;
//         let isAnimating = false;
//
//         function setStep(index) {
//             index = Math.max(0, Math.min(index, items.length - 1));
//
//
//             items.forEach((el, i) => {
//                 if (index === 0) {
//                     el.classList.toggle('is-active', i === 0);
//                 } else {
//                     el.classList.toggle('is-active', i <= index);
//                 }
//             });
//
//             images.forEach((img, i) => {
//                 img.style.opacity = i === index ? '1' : '0';
//                 img.style.zIndex  = i === index ? '2' : '1';
//             });
//
//             currentStep = index;
//
//             if (currentStep === 1) {
//                 body.classList.add('lock');
//             } else {
//                 body.classList.remove('lock');
//             }
//         }
//
//         window.addEventListener('wheel', e => {
//             const rect = section.getBoundingClientRect();
//             const sectionCenter = rect.top + rect.height / 2;
//             const screenCenter = window.innerHeight / 2;
//
//             const isCentered = Math.abs(sectionCenter - screenCenter) < 100;
//
//             if (!isCentered) return;
//
//             if (isAnimating) return;
//             isAnimating = true;
//
//             if (e.deltaY > 0) {
//                 setStep(currentStep + 1);
//             } else {
//                 setStep(currentStep - 1);
//             }
//
//             setTimeout(() => {
//                 isAnimating = false;
//             }, 600);
//
//         }, { passive: true });
//
//         setStep(0);
//     }
//
// });

// document.addEventListener('DOMContentLoaded', () => {
//     if (bw <= 1050) return;
//
//     const section = document.querySelector('.about-history');
//     if (!section) return;
//
//     const items = document.querySelectorAll('.about-history__timeline-item');
//     const images = document.querySelectorAll('.about-history-img img');
//     if (!items.length || !images.length) return;
//
//     let currentStep = -1; // чтобы первый setStep точно сработал
//
//     function setStep(index) {
//         index = Math.max(0, Math.min(index, items.length - 1));
//
//         if (index === currentStep) return; // защита от лишних перерендеров
//
//         items.forEach((el, i) => {
//             if (index === 0) {
//                 el.classList.toggle('is-active', i === 0);
//             } else {
//                 el.classList.toggle('is-active', i <= index);
//             }
//         });
//
//         images.forEach((img, i) => {
//             img.style.opacity = i === index ? '1' : '0';
//             img.style.zIndex  = i === index ? '2' : '1';
//         });
//
//         currentStep = index;
//     }
//
//     function handleScroll() {
//         const rect = section.getBoundingClientRect();
//         const viewportHeight = window.innerHeight;
//
//         if (rect.bottom <= 0 || rect.top >= viewportHeight) return;
//
//         const sectionHeight = rect.height;
//
//         const centerOffset = viewportHeight / 2 - rect.top;
//
//         const progress = Math.min(
//             1,
//             Math.max(0, centerOffset / sectionHeight)
//         );
//
//         const stepIndex = Math.floor(progress * items.length);
//
//         setStep(stepIndex);
//     }
//
//     window.addEventListener('scroll', handleScroll);
//     window.addEventListener('resize', handleScroll);
//
//     handleScroll();
// });


//анимация шагов
document.addEventListener('DOMContentLoaded', () => {
    if (bw <= 1050) return;

    gsap.registerPlugin(ScrollTrigger);

    const section = document.querySelector('.about-history');
    if (!section) return;

    const items = document.querySelectorAll('.about-history__timeline-item');
    const images = document.querySelectorAll('.about-history-img img');
    if (!items.length || !images.length) return;

    let currentStep = -1;

    function setStep(index) {
        index = Math.max(0, Math.min(index, items.length - 1));
        if (index === currentStep) return;

        items.forEach((el, i) => {
            if (index === 0) {
                el.classList.toggle('is-active', i === 0);
            } else {
                el.classList.toggle('is-active', i <= index);
            }
        });

        images.forEach((img, i) => {
            img.style.opacity = i === index ? '1' : '0';
            img.style.zIndex  = i === index ? '2' : '1';
        });

        currentStep = index;
    }

    const scrollPerStep = 400;

    ScrollTrigger.create({
        trigger: section,
        start: "center center",
        end: `+=${items.length * scrollPerStep}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onUpdate: self => {
            const stepIndex = Math.floor(self.progress * items.length);
            setStep(stepIndex);
        }
    });

    ScrollTrigger.refresh();
});

document.addEventListener('DOMContentLoaded', () => {
    if (bw <= 1050) return;

    gsap.registerPlugin(ScrollTrigger);

    //анимация карточке
    const steps = document.querySelectorAll('.step');
    if (steps.length < 4) return;

    const leftSteps = [steps[0], steps[2]];

    const rightSteps = [steps[1], steps[3]];

    gsap.set(leftSteps, {
        x: -180,
        opacity: 0
    });

    gsap.set(rightSteps, {
        x: 180,
        opacity: 0
    });

    gsap.timeline({
        scrollTrigger: {
            trigger: steps[1],
            start: 'top 75%',
            toggleActions: 'play none none'
        }
    })
        .to(leftSteps, {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out'
        }, 0)
        .to(rightSteps, {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out'
        }, 0);


    //анимация безопасности
    const cards = document.querySelectorAll('.safety__card');
    if (!cards.length) return;

    gsap.set(cards, {
        opacity: 0
    });

    gsap.to(cards, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.safety__cards',
            start: 'top 75%',
            toggleActions: 'play none none'
        }
    });

    //анимация телефонов
    const phone1 = document.querySelector('.safety__phone--1');
    const phone2 = document.querySelector('.safety__phone--2');
    const phone3 = document.querySelector('.safety__phone--3');
    const phone4 = document.querySelector('.safety__phone--4');

    if (!phone1) return;

    gsap.set([phone1, phone4], { y: -850, opacity: 0 });
    gsap.set([phone2, phone3], { y: 850, opacity: 0 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.safety__cta',
            start: 'top top',
            toggleActions: 'play none none'
        }
    });

    tl
        .to(phone1, { y: -10,   opacity: 1, duration: 0.9, ease: "power3.out" }, 0)
        .to(phone2, { y: -100,  opacity: 1, duration: 0.9, ease: "power3.out" }, 0)
        .to(phone3, { y: 76,    opacity: 1, duration: 0.9, ease: "power3.out" }, 0)
        .to(phone4, { y: -10,   opacity: 1, duration: 0.9, ease: "power3.out" }, 0);


    // gsap.to(".intro-section-img", {
    //     opacity: 1,
    //     duration: 0.6,
    //     scrollTrigger: {
    //         trigger: "body",
    //         start: "top+=10 top",
    //         once: true
    //     }
    // });

    // window.addEventListener("load", () => {
    //     gsap.to(".intro-section-img", {
    //         opacity: 1,
    //         duration: 0.6,
    //         delay: 3
    //     });
    // });
});
