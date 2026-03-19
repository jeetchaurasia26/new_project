# EMERGENCY FILE RECOVERY SCRIPT
# This script will recover all deleted industry and service pages

Write-Host "🚨 EMERGENCY FILE RECOVERY STARTING..." -ForegroundColor Red
Write-Host "=" * 70

$artifactDir = "C:\Users\Admin\.gemini\antigravity\brain\0de6e015-49da-41ab-9b67-8223f430a831"

# Define file mappings - artifact to final location
$recoveryMap = @{
    "ecommerce_all_sections.html" = "html\industries\ecommerce-growth-systems.html"
    "edtech_all_sections.html" = "html\industries\education-edtech-solutions.html"
    "fashion_all_sections.html" = "html\industries\fashion-brand-ecommerce.html"
    "fmcg_all_sections.html" = "html\industries\fmcg-supply-chain.html"
    "healthcare_all_sections.html" = "html\industries\healthcare-digital-transformation.html"
    "hospitality_all_sections.html" = "html\industries\hospitality-hotel-automation.html"
    "hospital_clinic_all_sections.html" = "html\industries\hospital-clinic-management.html"
    "it_company_all_sections.html" = "html\industries\it-company-solutions.html"
    "manpower_crm_all_sections.html" = "html\industries\manpower-crm-automation.html"
    "manufacturing_erp_all_sections.html" = "html\industries\manufacturing-erp-automation.html"
    "media_entertainment_all_sections.html" = "html\industries\media-entertainment-solutions.html"
    "mnc_enterprise_all_sections.html" = "html\industries\mnc-enterprise-automation.html"
    "real_estate_all_sections.html" = "html\industries\real-estate-digital-solutions.html"
    "restaurant_cafe_all_sections.html" = "html\industries\restaurants-cafe-marketing.html"
    "textile_all_sections.html" = "html\industries\textile-manufacturing-automation.html"
}

$recovered = 0
$failed = 0

foreach ($artifact in $recoveryMap.Keys) {
    $sourcePath = Join-Path $artifactDir $artifact
    $destPath = $recoveryMap[$artifact]
    
    Write-Host "`nRecovering: $artifact..." -ForegroundColor Cyan
    
    if (Test-Path $sourcePath) {
        try {
            Copy-Item -Path $sourcePath -Destination $destPath -Force
            Write-Host "  ✓ Recovered to: $destPath" -ForegroundColor Green
            $recovered++
        } catch {
            Write-Host "  ✗ Failed: $_" -ForegroundColor Red
            $failed++
        }
    } else {
        Write-Host "  ⚠ Source artifact not found!" -ForegroundColor Yellow
        $failed++
    }
}

Write-Host "`n" + ("=" * 70)
Write-Host "RECOVERY SUMMARY:" -ForegroundColor Cyan
Write-Host "  ✓ Recovered: $recovered files" -ForegroundColor Green
Write-Host "  ✗ Failed: $failed files" -ForegroundColor $(if ($failed -gt 0) { "Red" } else { "Green" })
Write-Host "`nChecking recovered files..." -ForegroundColor Yellow
Get-ChildItem "html\industries\*.html" -File | ForEach-Object { 
    Write-Host "  ✓ $($_.Name)" -ForegroundColor White 
}
