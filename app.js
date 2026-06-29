document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon classes if FontAwesome is loaded
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu on click of nav link (mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 3. Active Nav Link on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // 4. BMI Calculator
    const bmiForm = document.getElementById('bmiForm');
    const heightInput = document.getElementById('bmiHeight');
    const weightInput = document.getElementById('bmiWeight');
    const bmiResults = document.getElementById('bmiResults');
    const bmiNumber = document.getElementById('bmiNumber');
    const bmiStatus = document.getElementById('bmiStatus');
    const bmiDesc = document.getElementById('bmiDesc');
    const bmiGauge = document.getElementById('bmiGauge');
    const tableRows = document.querySelectorAll('.bmi-table-row');

    if (bmiForm) {
        bmiForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const height = parseFloat(heightInput.value);
            const weight = parseFloat(weightInput.value);

            if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
                alert('올바른 키와 몸무게를 입력해주세요.');
                return;
            }

            // Calculate BMI (height is in cm, weight in kg)
            const heightInMeters = height / 100;
            const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

            // Determine status and description
            let status = '';
            let description = '';
            let color = '';
            let gaugePercent = 0;
            let activeRowIdx = 0;

            if (bmi < 18.5) {
                status = '저체중 (Underweight)';
                description = '건강을 위해 균형 잡힌 영양 섭취와 근력 운동이 필요합니다.';
                color = '#3498db'; // blue
                gaugePercent = 20;
                activeRowIdx = 0;
            } else if (bmi >= 18.5 && bmi < 24.9) {
                status = '정상 체중 (Normal)';
                description = '아주 훌륭합니다! 꾸준한 운동과 식단으로 지금의 건강한 상태를 유지해 보세요.';
                color = '#e2fd52'; // neon lime
                gaugePercent = 50;
                activeRowIdx = 1;
            } else if (bmi >= 25.0 && bmi < 29.9) {
                status = '과체중 (Overweight)';
                description = '적절한 유산소 운동과 식습관 조절을 통해 체중 관리를 권장합니다.';
                color = '#f39c12'; // orange
                gaugePercent = 75;
                activeRowIdx = 2;
            } else {
                status = '비만 (Obese)';
                description = '건강을 위해 전문가의 트레이닝 지도를 받거나 체계적인 다이어트를 추천합니다.';
                color = '#e74c3c'; // red
                gaugePercent = 95;
                activeRowIdx = 3;
            }

            // Display Results
            bmiNumber.innerText = bmi;
            bmiStatus.innerText = status;
            bmiStatus.style.color = color;
            bmiDesc.innerText = description;
            
            // Show result box
            bmiResults.style.display = 'block';
            
            // Animate gauge bar
            setTimeout(() => {
                bmiGauge.style.width = `${gaugePercent}%`;
                bmiGauge.style.backgroundColor = color;
            }, 50);

            // Highlight table row
            tableRows.forEach((row, idx) => {
                if (idx === activeRowIdx) {
                    row.classList.add('active');
                } else {
                    row.classList.remove('active');
                }
            });

            // Smooth scroll to results
            bmiResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    // 5. Pricing Toggle (Monthly vs Annual)
    const pricingSwitch = document.getElementById('pricingSwitch');
    const planToggleLabelM = document.getElementById('planToggleM');
    const planToggleLabelA = document.getElementById('planToggleA');
    const priceBasic = document.getElementById('priceBasic');
    const pricePremium = document.getElementById('pricePremium');

    // Prices
    const prices = {
        basic: { monthly: 39000, annual: 31200 }, // annual is 31,200/mo (approx 20% discount)
        premium: { monthly: 79000, annual: 63200 }
    };

    function updatePrices(isAnnual) {
        if (isAnnual) {
            priceBasic.innerText = prices.basic.annual.toLocaleString();
            pricePremium.innerText = prices.premium.annual.toLocaleString();
            pricingSwitch.classList.add('checked');
            planToggleLabelA.classList.add('active');
            planToggleLabelM.classList.remove('active');
        } else {
            priceBasic.innerText = prices.basic.monthly.toLocaleString();
            pricePremium.innerText = prices.premium.monthly.toLocaleString();
            pricingSwitch.classList.remove('checked');
            planToggleLabelM.classList.add('active');
            planToggleLabelA.classList.remove('active');
        }
    }

    if (pricingSwitch) {
        let isAnnual = false;
        
        pricingSwitch.addEventListener('click', () => {
            isAnnual = !isAnnual;
            updatePrices(isAnnual);
        });

        planToggleLabelM.addEventListener('click', () => {
            isAnnual = false;
            updatePrices(isAnnual);
        });

        planToggleLabelA.addEventListener('click', () => {
            isAnnual = true;
            updatePrices(isAnnual);
        });
    }

    // 5.5 PT Goal Selection Modal
    const ptLearnMoreBtn = document.getElementById('ptLearnMoreBtn');
    const ptModal = document.getElementById('ptModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    if (ptLearnMoreBtn && ptModal) {
        ptLearnMoreBtn.addEventListener('click', () => {
            ptModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // prevent background scrolling
        });

        const closeModal = () => {
            ptModal.classList.remove('active');
            document.body.style.overflow = ''; // restore background scrolling
        };

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', closeModal);
        }

        // Close modal on click outside modal content
        ptModal.addEventListener('click', (e) => {
            if (e.target === ptModal) {
                closeModal();
            }
        });

        // Close modal on options click
        ptModal.querySelectorAll('.modal-option-card').forEach(card => {
            card.addEventListener('click', () => {
                closeModal();
            });
        });
    }

    // 6. Scroll Reveal Effect
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const triggerBottom = (window.innerHeight / 5) * 4;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Initial run
    revealOnScroll();
});
