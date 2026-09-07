/* ============================================================
   ALEXO SALVADOR JOSÉ — PORTFÓLIO
   JAVASCRIPT PRINCIPAL
   ============================================================ */

"use strict";


/* ============================================================
   01. DOM READY
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    initPreloader();
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initBackToTop();
    initActiveNavigation();
    initSmoothLinks();
    initCurrentYear();
    initTypingEffect();
    initTiltEffect();

});


/* ============================================================
   02. PRELOADER
   ============================================================ */

function initPreloader() {

    const preloader = document.getElementById("preloader");

    if (!preloader) return;

    const hidePreloader = () => {

        setTimeout(() => {

            preloader.classList.add("hidden");

            document.body.classList.remove("loading");

        }, 500);

    };


    if (document.readyState === "complete") {

        hidePreloader();

    } else {

        window.addEventListener(
            "load",
            hidePreloader,
            { once: true }
        );

    }

}


/* ============================================================
   03. NAVBAR
   ============================================================ */

function initNavbar() {

    const navbar = document.getElementById("navbar");

    if (!navbar) return;


    const updateNavbar = () => {

        if (window.scrollY > 30) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    };


    updateNavbar();


    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

}


/* ============================================================
   04. MOBILE MENU
   ============================================================ */

function initMobileMenu() {

    const menuButton =
        document.querySelector(".mobile-menu-button");

    const mobileMenu =
        document.querySelector(".mobile-menu");


    if (!menuButton || !mobileMenu) return;


    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );


    menuButton.addEventListener("click", () => {

        const isOpen =
            mobileMenu.classList.toggle("open");


        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );


        document.body.classList.toggle(
            "menu-open",
            isOpen
        );


        const icon =
            menuButton.querySelector("i");


        if (icon) {

            icon.className =
                isOpen
                    ? "fa-solid fa-xmark"
                    : "fa-solid fa-bars";

        }

    });


    /* Fechar ao clicar num link */

    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                closeMobileMenu();

            });

        });


    /* Fechar ao clicar fora */

    document.addEventListener("click", event => {

        const clickedInsideMenu =
            mobileMenu.contains(event.target);

        const clickedButton =
            menuButton.contains(event.target);


        if (
            mobileMenu.classList.contains("open") &&
            !clickedInsideMenu &&
            !clickedButton
        ) {

            closeMobileMenu();

        }

    });


    /* Fechar com ESC */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            mobileMenu.classList.contains("open")
        ) {

            closeMobileMenu();

        }

    });


    function closeMobileMenu() {

        mobileMenu.classList.remove("open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove(
            "menu-open"
        );


        const icon =
            menuButton.querySelector("i");


        if (icon) {

            icon.className =
                "fa-solid fa-bars";

        }

    }

}


/* ============================================================
   05. SCROLL REVEAL
   ============================================================ */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(".reveal");


    if (!elements.length) return;


    /* Se o navegador não suportar IntersectionObserver */

    if (!("IntersectionObserver" in window)) {

        elements.forEach(element => {

            element.classList.add("visible");

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* ============================================================
   06. BACK TO TOP
   ============================================================ */

function initBackToTop() {

    const button =
        document.querySelector(".back-to-top");


    if (!button) return;


    const updateButton = () => {

        if (window.scrollY > 500) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    };


    updateButton();


    window.addEventListener(
        "scroll",
        updateButton,
        { passive: true }
    );


    button.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* ============================================================
   07. ACTIVE NAVIGATION
   ============================================================ */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll("section[id]");


    const navLinks =
        document.querySelectorAll(
            ".nav-link, .mobile-menu a"
        );


    if (!sections.length || !navLinks.length) return;


    const updateActiveLink = () => {

        const scrollPosition =
            window.scrollY +
            180;


        let currentSection = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;


            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    section.id;

            }

        });


        navLinks.forEach(link => {

            const href =
                link.getAttribute("href");


            link.classList.remove("active");


            if (
                href &&
                href.startsWith("#") &&
                href.substring(1) === currentSection
            ) {

                link.classList.add("active");

            }

        });

    };


    updateActiveLink();


    window.addEventListener(
        "scroll",
        updateActiveLink,
        { passive: true }
    );

}


/* ============================================================
   08. SMOOTH LINKS
   ============================================================ */

function initSmoothLinks() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (!target) return;


            event.preventDefault();


            const navbar =
                document.getElementById("navbar");


            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                15;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });

}


/* ============================================================
   09. CURRENT YEAR
   ============================================================ */

function initCurrentYear() {

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    if (!yearElements.length) return;


    const year =
        new Date().getFullYear();


    yearElements.forEach(element => {

        element.textContent = year;

    });

}


/* ============================================================
   10. TYPING EFFECT
   ============================================================ */

function initTypingEffect() {

    const element =
        document.querySelector(
            "[data-typing]"
        );


    if (!element) return;


    const texts =
        element.dataset.typing
            ? element.dataset.typing
                .split("|")
                .map(text => text.trim())
                .filter(Boolean)
            : [];


    if (!texts.length) return;


    /* Não executar em dispositivos que
       preferem movimento reduzido */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        element.textContent =
            texts[0];

        return;

    }


    let textIndex = 0;
    let characterIndex = 0;
    let deleting = false;


    const typingSpeed = 75;
    const deletingSpeed = 40;
    const pauseAfterTyping = 1800;
    const pauseAfterDeleting = 500;


    function type() {

        const currentText =
            texts[textIndex];


        if (!deleting) {

            characterIndex++;


            element.textContent =
                currentText.substring(
                    0,
                    characterIndex
                );


            if (
                characterIndex >=
                currentText.length
            ) {

                deleting = true;

                setTimeout(
                    type,
                    pauseAfterTyping
                );

                return;

            }


            setTimeout(
                type,
                typingSpeed
            );


        } else {

            characterIndex--;


            element.textContent =
                currentText.substring(
                    0,
                    characterIndex
                );


            if (characterIndex <= 0) {

                deleting = false;


                textIndex =
                    (textIndex + 1) %
                    texts.length;


                setTimeout(
                    type,
                    pauseAfterDeleting
                );

                return;

            }


            setTimeout(
                type,
                deletingSpeed
            );

        }

    }


    type();

}


/* ============================================================
   11. TILT EFFECT
   ============================================================ */

function initTiltEffect() {

    const cards =
        document.querySelectorAll(
            "[data-tilt]"
        );


    if (!cards.length) return;


    /* Desativar em dispositivos touch */

    if (
        window.matchMedia(
            "(hover: none)"
        ).matches
    ) {

        return;

    }


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                    centerY) *
                    -3;


                const rotateY =
                    ((x - centerX) /
                    centerX) *
                    3;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });

}


/* ============================================================
   12. MOUSE GLOW
   ============================================================ */

function initMouseGlow() {

    const elements =
        document.querySelectorAll(
            "[data-mouse-glow]"
        );


    if (!elements.length) return;


    if (
        window.matchMedia(
            "(hover: none)"
        ).matches
    ) {

        return;

    }


    elements.forEach(element => {

        element.addEventListener(
            "mousemove",
            event => {

                const rect =
                    element.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                element.style.setProperty(
                    "--mouse-x",
                    `${x}px`
                );


                element.style.setProperty(
                    "--mouse-y",
                    `${y}px`
                );

            }
        );

    });

}


/* ============================================================
   13. COUNTER ANIMATION
   ============================================================ */

function initCounters() {

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );


    if (!counters.length) return;


    if (
        !("IntersectionObserver" in window)
    ) {

        counters.forEach(counter => {

            counter.textContent =
                counter.dataset.counter;

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting)
                        return;


                    const counter =
                        entry.target;


                    animateCounter(
                        counter
                    );


                    observer.unobserve(
                        counter
                    );

                });

            },
            {
                threshold: 0.7
            }
        );


    counters.forEach(counter => {

        observer.observe(counter);

    });


    function animateCounter(element) {

        const target =
            parseInt(
                element.dataset.counter,
                10
            );


        if (Number.isNaN(target)) return;


        const duration = 1300;

        const startTime =
            performance.now();


        function update(currentTime) {

            const elapsed =
                currentTime -
                startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const current =
                Math.floor(
                    eased * target
                );


            element.textContent =
                current;


            if (progress < 1) {

                requestAnimationFrame(
                    update
                );

            } else {

                element.textContent =
                    target;

            }

        }


        requestAnimationFrame(update);

    }

}


/* ============================================================
   14. PARALLAX
   ============================================================ */

function initParallax() {

    const elements =
        document.querySelectorAll(
            "[data-parallax]"
        );


    if (!elements.length) return;


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        return;

    }


    let ticking = false;


    const updateParallax = () => {

        const scrollY =
            window.scrollY;


        elements.forEach(element => {

            const speed =
                parseFloat(
                    element.dataset.parallax
                ) || 0.1;


            const rect =
                element.getBoundingClientRect();


            const elementCenter =
                rect.top +
                rect.height / 2;


            const viewportCenter =
                window.innerHeight / 2;


            const distance =
                elementCenter -
                viewportCenter;


            const movement =
                distance * speed;


            element.style.transform =
                `translate3d(0, ${movement}px, 0)`;

        });


        ticking = false;

    };


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateParallax
                );

                ticking = true;

            }

        },
        { passive: true }
    );


    updateParallax();

}


/* ============================================================
   15. INITIALIZE OPTIONAL EFFECTS
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initCounters();
        initMouseGlow();
        initParallax();

    }
);


/* ============================================================
   16. PAGE VISIBILITY
   ============================================================ */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            document.body.classList.add(
                "page-hidden"
            );

        } else {

            document.body.classList.remove(
                "page-hidden"
            );

        }

    }
);


/* ============================================================
   17. CONSOLE BRANDING
   ============================================================ */

console.log(
    "%c Alexo Salvador José ",
    "background:#176b45;color:#fff;font-size:16px;font-weight:bold;padding:8px 12px;border-radius:6px;"
);


console.log(
    "%c Desenvolvedor de Software • Inteligência Artificial ",
    "color:#176b45;font-size:12px;font-weight:600;"
);
