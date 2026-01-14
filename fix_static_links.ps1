$root = Get-Location

Write-Host "Processing HTML files..." -ForegroundColor Cyan

Get-ChildItem -Path $root -Recurse -Filter *.html | ForEach-Object {
    $file = $_.FullName
    $content = Get-Content $file -Raw

    # Replace patterns
    $content = $content -replace 'href="/"', 'href="index.html"'
    $content = $content -replace 'href="/([a-zA-Z0-9\-]+)"', 'href="$1.html"'
    $content = $content -replace 'href="//', 'href="'

    Set-Content $file $content
    Write-Host "Updated: $file"
}

Write-Host "`n✔ DONE — All links converted for static hosting!" -ForegroundColor Green
