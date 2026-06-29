document.addEventListener('DOMContentLoaded', () => {
    // 1. 가상 전국 헬스클럽 데이터 정의
    const gymData = [
        {
            id: 1,
            name: "PULSE FITNESS 강남본점",
            region: "서울",
            price: 39000,
            area: 800,
            paymentMethods: ["신용카드", "카카오페이", "지역화폐"],
            freeTowel: true,
            freeClothes: false,
            location: "",
            tel: "준비 중",
            icon: "fa-dumbbell",
            image: "assets/gangnam_gym.png"
        },
        {
            id: 2,
            name: "오션 피트니스 해운대점",
            region: "부산",
            price: 45000,
            area: 600,
            paymentMethods: ["신용카드", "카카오페이", "애플페이"],
            freeTowel: true,
            freeClothes: true,
            location: "",
            tel: "준비 중",
            icon: "fa-water"
        },
        {
            id: 3,
            name: "메트로 짐 반월당점",
            region: "대구",
            price: 35000,
            area: 500,
            paymentMethods: ["신용카드", "지역화폐"],
            freeTowel: true,
            freeClothes: false,
            location: "",
            tel: "준비 중",
            icon: "fa-building-columns"
        },
        {
            id: 4,
            name: "스카이 웰니스 송도점",
            region: "인천",
            price: 50000,
            area: 750,
            paymentMethods: ["신용카드", "애플페이"],
            freeTowel: false,
            freeClothes: false,
            location: "",
            tel: "준비 중",
            icon: "fa-cloud"
        },
        {
            id: 5,
            name: "한빛 피트니스 둔산점",
            region: "대전",
            price: 30000,
            area: 400,
            paymentMethods: ["신용카드", "지역화폐", "카카오페이"],
            freeTowel: true,
            freeClothes: true,
            location: "",
            tel: "준비 중",
            icon: "fa-sun"
        },
        {
            id: 6,
            name: "상무 프라임 헬스클럽",
            region: "광주",
            price: 32000,
            area: 450,
            paymentMethods: ["신용카드", "지역화폐"],
            freeTowel: true,
            freeClothes: false,
            location: "",
            tel: "준비 중",
            icon: "fa-award"
        },
        {
            id: 7,
            name: "PULSE FITNESS 홍대점",
            region: "서울",
            price: 38000,
            area: 450,
            paymentMethods: ["신용카드", "카카오페이", "애플페이"],
            freeTowel: true,
            freeClothes: true,
            location: "",
            tel: "준비 중",
            icon: "fa-bolt"
        },
        {
            id: 8,
            name: "센텀 메디컬 피트니스",
            region: "부산",
            price: 75000,
            area: 900,
            paymentMethods: ["신용카드", "카카오페이", "애플페이", "지역화폐"],
            freeTowel: true,
            freeClothes: true,
            location: "",
            tel: "준비 중",
            icon: "fa-heart-pulse"
        }
    ];

    // 2. DOM 엘리먼트 취득
    const gymsGrid = document.getElementById('gymsGrid');
    const noResults = document.getElementById('noResults');
    const resultsCount = document.getElementById('resultsCount');

    const searchKeyword = document.getElementById('searchKeyword');
    const filterRegion = document.getElementById('filterRegion');
    const filterPrice = document.getElementById('filterPrice');
    const priceVal = document.getElementById('priceVal');
    const filterArea = document.getElementById('filterArea');
    const areaVal = document.getElementById('areaVal');
    const freeTowel = document.getElementById('freeTowel');
    const freeClothes = document.getElementById('freeClothes');
    const btnResetFilters = document.getElementById('btnResetFilters');
    const filterForm = document.getElementById('filterForm');

    // 3. 필터링 및 렌더링 함수
    function renderGyms() {
        const keyword = searchKeyword.value.toLowerCase().trim();
        const region = filterRegion.value;
        const maxPrice = parseInt(filterPrice.value);
        const minArea = parseInt(filterArea.value);
        
        // 결제 수단 선택값 수집
        const selectedPayments = [];
        const checkedPayments = document.querySelectorAll('input[name="payment"]:checked');
        checkedPayments.forEach(cb => selectedPayments.push(cb.value));

        const towelChecked = freeTowel.checked;
        const clothesChecked = freeClothes.checked;

        // 필터링 적용
        const filteredGyms = gymData.filter(gym => {
            // 키워드 필터 (클럽명 또는 주소 검색)
            if (keyword && !gym.name.toLowerCase().includes(keyword) && !gym.location.toLowerCase().includes(keyword)) {
                return false;
            }

            // 지역 필터
            if (region !== 'all' && gym.region !== region) {
                return false;
            }

            // 가격 필터
            if (gym.price > maxPrice) {
                return false;
            }

            // 면적 필터
            if (gym.area < minArea) {
                return false;
            }

            // 결제 수단 필터 (선택된 수단 중 하나라도 지원하는지 여부)
            if (selectedPayments.length > 0) {
                const hasPayment = gym.paymentMethods.some(pm => selectedPayments.includes(pm));
                if (!hasPayment) return false;
            }

            // 무료 제공 필터
            if (towelChecked && !gym.freeTowel) {
                return false;
            }
            if (clothesChecked && !gym.freeClothes) {
                return false;
            }

            return true;
        });

        // 결과 개수 표시
        resultsCount.innerText = filteredGyms.length;

        // 렌더링 실행
        if (filteredGyms.length === 0) {
            gymsGrid.style.display = 'none';
            noResults.style.display = 'block';
        } else {
            gymsGrid.style.display = 'grid';
            noResults.style.display = 'none';

            gymsGrid.innerHTML = filteredGyms.map(gym => {
                // 결제 수단 배지 HTML 생성
                const paymentBadgesHTML = gym.paymentMethods.map(pm => 
                    `<span class="badge ${pm === '애플페이' || pm === '카카오페이' ? 'badge-accent' : ''}">${pm}</span>`
                ).join('');

                return `
                    <div class="gym-card">
                        <div class="gym-card-img-box">
                            <span class="gym-card-region"><i class="fa-solid fa-location-dot"></i> ${gym.region}</span>
                            ${gym.image ? `<img src="${gym.image}" alt="${gym.name}" class="${gym.id === 1 ? 'gym-card-main-img-video' : 'gym-card-main-img'}">` : `<i class="fa-solid ${gym.icon} gym-placeholder"></i>`}
                        </div>
                        <div class="gym-card-body">
                            <h3 class="gym-card-title">${gym.name}</h3>
                            <div class="gym-card-meta">
                                <span><i class="fa-solid fa-expand"></i> ${gym.area}평형</span>
                                <span><i class="fa-solid fa-wallet"></i> ₩${gym.price.toLocaleString()}/월~</span>
                            </div>
                            <div class="gym-card-details">
                                <div class="detail-row">
                                    <span>결제 방식</span>
                                    <div class="payment-badges">${paymentBadgesHTML}</div>
                                </div>
                                <div class="detail-row">
                                    <span>수건 제공 여부</span>
                                    <span class="${gym.freeTowel ? 'badge-yes' : 'badge-no'}">${gym.freeTowel ? '무료 제공' : '미제공 / 유료'}</span>
                                </div>
                                <div class="detail-row">
                                    <span>운동복 제공 여부</span>
                                    <span class="${gym.freeClothes ? 'badge-yes' : 'badge-no'}">${gym.freeClothes ? '무료 제공' : '미제공 / 유료'}</span>
                                </div>
                                <div class="detail-row" style="margin-top: 10px; font-size: 0.8rem; border-top: 1px solid var(--border-color); padding-top: 10px;">
                                    <span style="display: flex; align-items: center; gap: 4px;"><i class="fa-solid fa-phone" style="color: var(--color-accent);"></i> 문의: ${gym.tel}</span>
                                </div>
                            </div>
                            <a href="index.html#contact" class="btn btn-secondary gym-card-btn">상담 예약하기</a>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    // 4. 슬라이더 레이블 업데이트 이벤트
    filterPrice.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        if (val === 80000) {
            priceVal.innerText = "8만원 이하";
        } else {
            priceVal.innerText = `${(val / 10000).toFixed(0)}만원 이하`;
        }
        renderGyms();
    });

    filterArea.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        areaVal.innerText = `${val}평 이상`;
        renderGyms();
    });

    // 5. 기타 필터 컨트롤 이벤트 바인딩
    searchKeyword.addEventListener('input', renderGyms);
    filterRegion.addEventListener('change', renderGyms);
    freeTowel.addEventListener('change', renderGyms);
    freeClothes.addEventListener('change', renderGyms);
    
    // 결제수단 체크박스 이벤트 바인딩
    const paymentCheckboxes = document.querySelectorAll('input[name="payment"]');
    paymentCheckboxes.forEach(cb => {
        cb.addEventListener('change', renderGyms);
    });

    // 6. 초기화 버튼 이벤트
    btnResetFilters.addEventListener('click', () => {
        filterForm.reset();
        
        // 레이블 초기화
        priceVal.innerText = "8만원 이하";
        areaVal.innerText = "300평 이상";
        
        // 체크박스들 수동 리셋 (form.reset()이 작동하더라도 명시적으로 재필터링)
        paymentCheckboxes.forEach(cb => cb.checked = false);
        freeTowel.checked = false;
        freeClothes.checked = false;

        renderGyms();
    });

    // 7. 최초 렌더링
    renderGyms();
});
