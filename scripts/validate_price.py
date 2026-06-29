import os
import re
import sys

# gyms.js 파일 경로 설정
gyms_js_path = os.path.normpath(os.path.join(os.path.dirname(__file__), '../gyms.js'))

try:
    if not os.path.exists(gyms_js_path):
        print("Warning: gyms.js 파일이 아직 존재하지 않아 검증을 건너뜁니다.")
        sys.exit(0)

    with open(gyms_js_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # const gymData = [ ... ] 선언부 추출
    match = re.search(r'const gymData\s*=\s*(\[.*?\]);', content, re.DOTALL)
    if not match:
        print("Info: gyms.js 내에 gymData 선언부가 식별되지 않아 검증을 패스합니다.")
        sys.exit(0)

    gym_data_text = match.group(1)
    
    # 각 지점 객체 { ... } 추출
    gym_blocks = re.findall(r'(\{[^}]*?\})', gym_data_text, re.DOTALL)
    
    if not gym_blocks:
        print("Error: 등록된 지점 객체가 없습니다.")
        sys.exit(1)

    for block in gym_blocks:
        # 지점명 추출
        name_match = re.search(r'name:\s*["\'](.*?)["\']', block)
        name = name_match.group(1) if name_match else "알 수 없는 지점"

        # 가격 속성 추출
        price_match = re.search(r'price:\s*(\d+)', block)
        if not price_match:
            print(f"Validation Error: 지점 '{name}'에 가격(price) 속성이 없거나 올바른 정수가 아닙니다.")
            sys.exit(1)
        
        price = int(price_match.group(1))
        if price < 0:
            print(f"Validation Error: 지점 '{name}'의 가격은 0원 이상이어야 합니다. 입력값: {price}")
            sys.exit(1)

    print("Success: 모든 등록된 지점의 가격 정보가 정상적으로 기입되어 있습니다.")
    sys.exit(0)
except Exception as e:
    print(f"Error during hook validation: {e}")
    sys.exit(1)
