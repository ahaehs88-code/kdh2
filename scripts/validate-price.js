const fs = require('fs');
const path = require('path');

// gyms.js 파일 경로 설정
const gymsJsPath = path.join(__dirname, '../gyms.js');

try {
    if (!fs.existsSync(gymsJsPath)) {
        console.warn("Warning: gyms.js 파일이 아직 존재하지 않아 검증을 건너뜁니다.");
        process.exit(0);
    }

    const content = fs.readFileSync(gymsJsPath, 'utf8');
    
    // gyms.js 내의 gymData 배열 선언부 추출
    const match = content.match(/const gymData\s*=\s*(\[[^]*?\]);/);
    if (!match) {
        // gyms.js 파일에서 gymData를 수정하지 않은 툴 액션의 경우 검증 통과 처리
        console.log("Info: gyms.js 내에 gymData 선언부가 식별되지 않아 검증을 패스합니다.");
        process.exit(0);
    }
    
    // 추출된 텍스트를 평가하여 가상 객체로 로드
    // eslint-disable-next-line no-eval
    const gymData = eval(match[1]);
    
    if (!Array.isArray(gymData)) {
        console.error("Error: gymData가 유효한 배열 형식이 아닙니다.");
        process.exit(1);
    }
    
    // 각 지점의 가격 정보 유효성 검사
    for (const gym of gymData) {
        if (gym.price === undefined || gym.price === null) {
            console.error(`Validation Error: 지점 '${gym.name}'에 가격(price) 속성이 없습니다.`);
            process.exit(1);
        }
        
        if (typeof gym.price !== 'number' || Number.isNaN(gym.price)) {
            console.error(`Validation Error: 지점 '${gym.name}'의 가격('${gym.price}')이 올바른 숫자 형식이 아닙니다.`);
            process.exit(1);
        }
        
        if (gym.price < 0) {
            console.error(`Validation Error: 지점 '${gym.name}'의 가격('${gym.price}')은 0원 이상이어야 합니다.`);
            process.exit(1);
        }
    }
    
    console.log("Success: 모든 등록된 지점의 가격 정보가 정상적으로 기입되어 있습니다.");
    process.exit(0);
} catch (err) {
    console.error("Error during hook validation: " + err.message);
    process.exit(1);
}
