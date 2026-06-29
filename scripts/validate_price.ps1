$gymsJsPath = Join-Path $PSScriptRoot "..\gyms.js"
if (!(Test-Path $gymsJsPath)) {
    Write-Output "Warning: gyms.js file not found at $gymsJsPath. Skipping validation."
    exit 0
}

$content = Get-Content -Path $gymsJsPath -Raw -Encoding UTF8

if ($content -match '(?s)const gymData\s*=\s*(\[.*?\]);') {
    $gymDataText = $Matches[1]
} else {
    Write-Output "Info: gymData array not found in gyms.js. Skipping validation."
    exit 0
}

$blocks = [regex]::Matches($gymDataText, '(?s)\{[^}]*?\}')

if ($blocks.Count -eq 0) {
    Write-Output "Error: No gym objects found."
    exit 1
}

foreach ($block in $blocks) {
    $blockText = $block.Value

    $name = "Unknown Gym"
    if ($blockText -match 'name:\s*["'']([^"'']+)["'']') {
        $name = $Matches[1]
    }

    if ($blockText -match 'price:\s*(\d+)') {
        $price = [int]$Matches[1]
        if ($price -lt 0) {
            Write-Output "Validation Error: Gym '$name' has negative price: $price"
            exit 1
        }
    } else {
        Write-Output "Validation Error: Gym '$name' has missing or invalid price property."
        exit 1
    }
}

Write-Output "Success: All gyms have valid price properties."
exit 0
