document.addEventListener('DOMContentLoaded', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const formSections = document.querySelectorAll('.form-section');
    const magneticBtns = document.querySelectorAll('.btn-nav-elite, .btn-success');

    // 1. Aurora Progress Bar Logic
    window.addEventListener('scroll', () => {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;
        const scrollWidth = (currentScroll / totalScroll) * 100;
        scrollProgress.style.width = scrollWidth + '%';
    });

    // 2. Magnetic Buttons Effect
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // 3. Section Reveal Observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.filter = 'blur(0)';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    formSections.forEach(section => {
        section.style.opacity = '0';
        section.style.filter = 'blur(10px)';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
        revealObserver.observe(section);
    });

    // 4. Age Calculation Logic (Retained & Refined)
    const dobInput = document.getElementById('dob');
    const ageInput = document.getElementById('ageOnDate');
    const targetDate = new Date('2026-09-15');

    dobInput.addEventListener('change', () => {
        const birthDate = new Date(dobInput.value);
        if (!isNaN(birthDate)) {
            let ageYears = targetDate.getFullYear() - birthDate.getFullYear();
            const monthDiff = targetDate.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && targetDate.getDate() < birthDate.getDate())) {
                ageYears--;
            }
            ageInput.value = ageYears;
        }
    });
});

// Helper for file names in UI
function showFileName(input) {
    const fileName = input.files[0] ? input.files[0].name : "No file chosen";
    const hint = input.nextElementSibling;
    if (hint && hint.classList.contains('upload-hint')) {
        hint.textContent = `Selected: ${fileName}`;
        hint.style.color = 'var(--elite-gold)';
    }
}