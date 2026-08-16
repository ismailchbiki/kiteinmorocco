(function () {
    "use strict";

    const setCurrentYear = () => {
        const yearNode = document.querySelector("[data-current-year]");
        if (!yearNode) return;
        yearNode.textContent = new Date().getFullYear();
    };

    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach((link) => {
            link.addEventListener("click", (event) => {
                const targetId = link.getAttribute("href");
                if (!targetId || targetId === "#") return;

                const target = document.querySelector(targetId);
                if (!target) return;

                event.preventDefault();
                const navHeight = document.querySelector(".site-header")?.offsetHeight || 0;
                const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
                window.scrollTo({ top, behavior: "smooth" });
            });
        });
    };

    const initFormFeedback = () => {
        document.querySelectorAll("form").forEach((form) => {
            form.addEventListener("submit", (event) => {
                const requiredFields = [...form.querySelectorAll("[required]")];
                const invalid = requiredFields.some((field) => !field.value.trim());

                if (invalid) {
                    event.preventDefault();
                    const firstInvalid = requiredFields.find((field) => !field.value.trim());
                    firstInvalid?.focus();
                    firstInvalid?.reportValidity?.();
                }
            });
        });
    };

    setCurrentYear();
    initSmoothScroll();
    initFormFeedback();
})();
