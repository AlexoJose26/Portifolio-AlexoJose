"use strict";

(function () {
"use strict";

document.addEventListener("DOMContentLoaded", function () {
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
    initMouseGlow();
    initCounters();
    initParallax();
});

function initPreloader() {
    const preloader = document.getElementById("preloader");

    if (!preloader) {
        document.body.classList.remove("loading");
        return;
    }

    let hidden = false;

    function hidePreloader() {
        if (hidden) return;
        hidden = true;

        preloader.classList.add("hidden");
        document.body.classList.remove("loading");

        setTimeout(function () {
            if (preloader && preloader.parentNode) {
                preloader.setAttribute("aria-hidden", "true");
            }
        }, 700);
    }

    requestAnimationFrame(function () {
        if (document.readyState === "complete") {
            setTimeout(hidePreloader, 150);
        }
    });

    window.addEventListener("load", function () {
        setTimeout(hidePreloader, 150);
    }, { once: true });

    setTimeout(hidePreloader, 2500);

    window.addEventListener("pageshow", function () {
        setTimeout(hidePreloader, 100);
    }, { once: true });
}

function initNavbar() {
    const navbar = document.getElementById("navbar");

    if (!navbar) return;

    function updateNavbar() {
        navbar.classList.toggle("scrolled", window.scrollY > 30);
    }

    updateNavbar();

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });
}

function initMobileMenu() {
    const menuButton = document.querySelector(".mobile-menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (!menuButton || !mobileMenu) return;

    const icon = menuButton.querySelector("i");

    function closeMobileMenu() {
        mobileMenu.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");

        if (icon) {
            icon.className = "fa-solid fa-bars";
        }
    }

    function openMobileMenu() {
        mobileMenu.classList.add("open");
        menuButton.setAttribute("aria-expanded", "true");
        document.body.classList.add("menu-open");

        if (icon) {
            icon.className = "fa-solid fa-xmark";
        }
    }

    menuButton.setAttribute("aria-expanded", "false");

    menuButton.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (mobileMenu.classList.contains("open")) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            closeMobileMenu();
        });
    });

    document.addEventListener("click", function (event) {
        if (!mobileMenu.classList.contains("open")) return;

        if (
            !mobileMenu.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {
            closeMobileMenu();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMobileMenu();
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 900) {
            closeMobileMenu();
        }
    });
}

function initScrollReveal() {
    const elements = document.querySelectorAll(".reveal");

    if (!elements.length) return;

    if (
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        elements.forEach(function (element) {
            element.classList.add("visible");
        });
        return;
    }

    if (!("IntersectionObserver" in window)) {
        elements.forEach(function (element) {
            element.classList.add("visible");
        });
        return;
    }

    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    elements.forEach(function (element) {
        observer.observe(element);
    });
}

function initBackToTop() {
    const button = document.querySelector(".back-to-top");

    if (!button) return;

    function updateButton() {
        button.classList.toggle("show", window.scrollY > 500);
    }

    updateButton();

    window.addEventListener("scroll", updateButton, {
        passive: true
    });

    button.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

function initActiveNavigation() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(
        ".nav-link, .mobile-menu a"
    );

    if (!sections.length || !navLinks.length) return;

    let ticking = false;

    function updateActiveLink() {
        if (ticking) return;

        ticking = true;

        window.requestAnimationFrame(function () {
            const scrollPosition = window.scrollY + 180;
            let currentSection = "";

            sections.forEach(function (section) {
                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;

                if (
                    scrollPosition >= top &&
                    scrollPosition < bottom
                ) {
                    currentSection = section.id;
                }
            });

            navLinks.forEach(function (link) {
                const href = link.getAttribute("href");

                link.classList.remove("active");

                if (
                    href &&
                    href.charAt(0) === "#" &&
                    href.substring(1) === currentSection
                ) {
                    link.classList.add("active");
                }
            });

            ticking = false;
        });
    }

    updateActiveLink();

    window.addEventListener("scroll", updateActiveLink, {
        passive: true
    });

    window.addEventListener("resize", updateActiveLink);
}

function initSmoothLinks() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            let target;

            try {
                target = document.querySelector(targetId);
            } catch (error) {
                return;
            }

            if (!target) return;

            event.preventDefault();

            const navbar = document.getElementById("navbar");
            const navbarHeight = navbar
                ? navbar.offsetHeight
                : 0;

            const position =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                15;

            window.scrollTo({
                top: Math.max(0, position),
                behavior: "smooth"
            });

            if (
                link.closest(".mobile-menu") &&
                document.querySelector(".mobile-menu.open")
            ) {
                const menuButton = document.querySelector(
                    ".mobile-menu-button"
                );
                const mobileMenu = document.querySelector(
                    ".mobile-menu"
                );

                mobileMenu.classList.remove("open");
                document.body.classList.remove("menu-open");

                if (menuButton) {
                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    const icon = menuButton.querySelector("i");

                    if (icon) {
                        icon.className = "fa-solid fa-bars";
                    }
                }
            }
        });
    });
}

function initCurrentYear() {
    const yearElements = document.querySelectorAll(
        "[data-current-year]"
    );

    if (!yearElements.length) return;

    const year = new Date().getFullYear();

    yearElements.forEach(function (element) {
        element.textContent = year;
    });
}

function initTypingEffect() {
    const element = document.querySelector("[data-typing]");

    if (!element) return;

    const texts = element.dataset.typing
        ? element.dataset.typing
              .split("|")
              .map(function (text) {
                  return text.trim();
              })
              .filter(Boolean)
        : [];

    if (!texts.length) return;

    if (
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        element.textContent = texts[0];
        return;
    }

    let textIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let timer = null;

    const typingSpeed = 75;
    const deletingSpeed = 40;
    const pauseAfterTyping = 1800;
    const pauseAfterDeleting = 500;

    function type() {
        const currentText = texts[textIndex];

        if (!deleting) {
            characterIndex++;

            element.textContent = currentText.substring(
                0,
                characterIndex
            );

            if (characterIndex >= currentText.length) {
                deleting = true;

                timer = setTimeout(
                    type,
                    pauseAfterTyping
                );

                return;
            }

            timer = setTimeout(type, typingSpeed);
            return;
        }

        characterIndex--;

        element.textContent = currentText.substring(
            0,
            characterIndex
        );

        if (characterIndex <= 0) {
            characterIndex = 0;
            deleting = false;

            textIndex =
                (textIndex + 1) % texts.length;

            timer = setTimeout(
                type,
                pauseAfterDeleting
            );

            return;
        }

        timer = setTimeout(type, deletingSpeed);
    }

    element.textContent = "";

    type();

    window.addEventListener("pagehide", function () {
        if (timer) {
            clearTimeout(timer);
        }
    });
}

function initTiltEffect() {
    const cards = document.querySelectorAll("[data-tilt]");

    if (!cards.length) return;

    if (
        window.matchMedia &&
        window.matchMedia("(hover: none)").matches
    ) {
        return;
    }

    cards.forEach(function (card) {
        card.addEventListener("mousemove", function (event) {
            const rect = card.getBoundingClientRect();

            if (!rect.width || !rect.height) return;

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -3;

            const rotateY =
                ((x - centerX) / centerX) * 3;

            card.style.transform =
                "perspective(900px) " +
                "rotateX(" + rotateX + "deg) " +
                "rotateY(" + rotateY + "deg) " +
                "translateY(-5px)";
        });

        card.addEventListener("mouseleave", function () {
            card.style.transform = "";
        });

        card.addEventListener("blur", function () {
            card.style.transform = "";
        });
    });
}

function initMouseGlow() {
    const elements = document.querySelectorAll(
        "[data-mouse-glow]"
    );

    if (!elements.length) return;

    if (
        window.matchMedia &&
        window.matchMedia("(hover: none)").matches
    ) {
        return;
    }

    elements.forEach(function (element) {
        element.addEventListener("mousemove", function (event) {
            const rect = element.getBoundingClientRect();

            element.style.setProperty(
                "--mouse-x",
                (event.clientX - rect.left) + "px"
            );

            element.style.setProperty(
                "--mouse-y",
                (event.clientY - rect.top) + "px"
            );
        });
    });
}

function initCounters() {
    const counters = document.querySelectorAll(
        "[data-counter]"
    );

    if (!counters.length) return;

    function setFinalValue(element) {
        const target = parseInt(
            element.dataset.counter,
            10
        );

        if (!Number.isNaN(target)) {
            element.textContent = target;
        }
    }

    if (
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        counters.forEach(setFinalValue);
        return;
    }

    if (!("IntersectionObserver" in window)) {
        counters.forEach(setFinalValue);
        return;
    }

    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;

                animateCounter(entry.target);
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.35
        }
    );

    counters.forEach(function (counter) {
        observer.observe(counter);
    });

    function animateCounter(element) {
        const target = parseInt(
            element.dataset.counter,
            10
        );

        if (Number.isNaN(target)) return;

        const duration = 1300;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(
                elapsed / duration,
                1
            );

            const eased =
                1 - Math.pow(1 - progress, 3);

            element.textContent = Math.floor(
                eased * target
            );

            if (progress < 1) {
                window.requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }

        window.requestAnimationFrame(update);
    }
}

function initParallax() {
    const elements = document.querySelectorAll(
        "[data-parallax]"
    );

    if (!elements.length) return;

    if (
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        return;
    }

    if (
        window.matchMedia &&
        window.matchMedia("(hover: none)").matches
    ) {
        return;
    }

    let ticking = false;

    function updateParallax() {
        const viewportCenter = window.innerHeight / 2;

        elements.forEach(function (element) {
            const speed =
                parseFloat(
                    element.dataset.parallax
                ) || 0.1;

            const rect =
                element.getBoundingClientRect();

            const elementCenter =
                rect.top + rect.height / 2;

            const distance =
                elementCenter - viewportCenter;

            const movement = distance * speed;

            element.style.transform =
                "translate3d(0, " +
                movement +
                "px, 0)";
        });

        ticking = false;
    }

    function requestParallaxUpdate() {
        if (ticking) return;

        ticking = true;

        window.requestAnimationFrame(
            updateParallax
        );
    }

    window.addEventListener(
        "scroll",
        requestParallaxUpdate,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        requestParallaxUpdate
    );

    requestParallaxUpdate();
}

document.addEventListener("visibilitychange", function () {
    document.body.classList.toggle(
        "page-hidden",
        document.hidden
    );
});

window.addEventListener("error", function () {
    const preloader = document.getElementById("preloader");

    if (preloader) {
        preloader.classList.add("hidden");
        document.body.classList.remove("loading");
    }
});

console.log(
    "%c Alexo Salvador José ",
    "background:#176b45;color:#fff;font-size:16px;font-weight:bold;padding:8px 12px;border-radius:6px;"
);

console.log(
    "%c Desenvolvedor de Software • Inteligência Artificial ",
    "color:#176b45;font-size:12px;font-weight:600;"
);


})();
