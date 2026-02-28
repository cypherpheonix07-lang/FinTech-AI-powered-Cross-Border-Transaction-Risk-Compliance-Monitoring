Get-ChildItem -Path "c:\Users\user\OneDrive\Desktop\CODING PROJECTS\PROJECT-THANDAV\TransactTrace-Nexus\FinTech — AI-powered Cross-Border Transaction Risk & Compliance Monitoring\backend\src" -Filter "*.ts" -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $newContent = $content -replace "from\s+(['""])(\./[^'""]+)\.js\1", 'from $1$2$1'
    if ($content -ne $newContent) {
        Set-Content -Path $_.FullName -Value $newContent -NoNewline
        Write-Host "Fixed: $($_.FullName)"
    }
}
Write-Host "All .js extensions removed from TypeScript imports!"
