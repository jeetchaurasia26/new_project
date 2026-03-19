# SEO Page Generator for One Layer™ Website
# This script generates 111+ SEO-optimized pages

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  One Layer™ SEO Page Generator                             ║" -ForegroundColor Cyan  
Write-Host "║  Creating 111+ SEO-optimized pages                          ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Base configuration
$projectRoot = "c:\Users\Admin\Downloads\Project\Project\Project\new_project\html"
$pagesCreated = 0

# ==================== NATIONAL SERVICE PAGES ====================

$national Services = @(
    @{
        slug = "crm-development-company-india"
        title = "CRM Development"
        shortTitle = "CRM Development"
        description = "Custom CRM development solutions"
        metaDesc = "Professional CRM Development services in India. Custom Salesforce, Zoho & HubSpot implementations. Trusted by 40K+ businesses."
    },
    @{
        slug = "crm-setup-automation-company-india"
        title = "CRM Setup & Automation"
        shortTitle = "CRM Automation"
        description = "CRM configuration and automation services"
        metaDesc = "Expert CRM Setup & Automation services in India. Salesforce, Zoho, HubSpot configuration. Workflow automation specialists."
    },
    @{
        slug = "digital-marketing-company-india"
        title = "Digital Marketing"
        shortTitle = "Digital Marketing"
        description = "Full-service digital marketing solutions"
        metaDesc = "Complete Digital Marketing services in India. SEO, PPC, Social Media, Content Marketing. ROI-focused campaigns."
    },
    @{
        slug = "seo-company-india"
        title = "SEO Services"
        shortTitle = "SEO Services"
        description = "Search engine optimization services"
        metaDesc = "Professional SEO Services in India. Rank #1 on Google. Keyword research, link building, technical SEO experts."
    },
    @{
        slug = "automation-company-india"
        title = "Business Automation"
        shortTitle = "Business Automation"
        description = "Process automation and workflow optimization"
        metaDesc = "Business Automation solutions in India. Workflow automation, RPA, API integrations. Save 60%+ operational costs."
    },
    @{
        slug = "ai-automation-company-india"
        title = "AI Automation"
        shortTitle = "AI Automation"
        description = "AI-powered automation solutions"
        metaDesc = "AI Automation services in India. ChatGPT integrations, AI chatbots, ML automation. Future-proof your business."
    },
    @{
        slug = "graphic-design-company-india"
        title = "Graphic Design"
        shortTitle = "Graphic Design"
        description = "Professional graphic design services"
        metaDesc = "Creative Graphic Design services in India. Logo, branding, packaging, social media designs. 1000+ brands served."
    },
    @{
        slug = "video-advertising-company-india"
        title = "Video Advertising"
        shortTitle = "Video Advertising"
        description = "Video production and advertising services"
        metaDesc = "Video Advertising services in India. YouTube ads, reels, explainer videos, brand films. Performance-driven campaigns."
    },
    @{
        slug = "branding-company-india"
        title = "Branding Services"
        shortTitle = "Branding"
        description = "Complete brand identity and strategy"
        metaDesc = "Professional Branding services in India. Brand strategy, logo design, identity systems. Build memorable brands."
    },
    @{
        slug = "influencer-marketing-company-india"
        title = "Influencer Marketing"
        shortTitle = "Influencer Marketing"
        description = "Influencer campaign management"
        metaDesc = "Influencer Marketing services in India. Instagram, YouTube influencer campaigns. 10K+ influencer network."
    }
)

Write-Host "Creating National Service Pages..." -ForegroundColor Yellow
Write-Host "Target: 10 pages in services-india/" -ForegroundColor Gray
Write-Host ""

foreach ($service in $nationalServices) {
    $filePath = Join-Path $projectRoot "services-india\$($service.slug).html"
    
    # Check if file already exists
    if (Test-Path $filePath) {
        Write-Host "  ⊗ SKIPPED: $($service.slug) (already exists)" -ForegroundColor DarkGray
        continue
    }
    
    # Generate content (placeholder for now - will be filled by agent)
    $content = @"
<!-- THIS FILE IS A PLACEHOLDER - WILL BE FILLED WITH FULL CONTENT -->
<!-- Service: $($service.title) -->
<!-- Meta: $($service.metaDesc) -->

<!-- Section 01: Foundation -->
<section class="py-5 py-lg-8 py-xl-10">
    <div class="container">
        <div class="row gap-7">
            <div class="col-xl-4 col-xxl-4">
                <div class="d-flex align-items-center gap-7 py-2">
                    <span class="round-36 flex-shrink-0 text-dark rounded-circle bg-primary d-flex align-items-center justify-content-center fw-medium">01</span>
                    <hr class="border-line">
                    <span class="badge text-bg-dark">FOUNDATION</span>
                </div>
            </div>
            <div class="col-xl-8 col-xxl-7">
                <h2>$($service.title) in India</h2>
                <p class="fs-5">$($service.description)</p>
            </div>
        </div>
    </div>
</section>

<!-- Placeholder: Will add 7 more sections like app-development-company-india.html -->
"@
    
    # Create the file
    New-Item -Path $filePath -ItemType File -Force | Out-Null
    Set-Content -Path $filePath -Value $content -Encoding UTF8
    
    $pagesCreated++
    Write-Host "  ✓ CREATED: $($service.slug).html" -ForegroundColor Green
}

Write-Host ""
Write-Host "National Service Pages: COMPLETE" -ForegroundColor Green
Write-Host ""

# ==================== CITY SERVICE PAGES ====================

$cities = @(
    @{name="delhi"; displayName="Delhi"; landmark="Connaught Place"},
    @{name="mumbai"; displayName="Mumbai"; landmark="Bandra-Kurla Complex"},
    @{name="bangalore"; displayName="Bangalore"; landmark="Koramangala"},
    @{name="hyderabad"; displayName="Hyderabad"; landmark="HITEC City"},
    @{name="pune"; displayName="Pune"; landmark="Hinjewadi"},
    @{name="noida"; displayName="Noida"; landmark="Sector 62"},
    @{name="gurgaon"; displayName="Gurgaon"; landmark="Cyber City"},
    @{name="chennai"; displayName="Chennai"; landmark="T-Nagar"},
    @{name="kolkata"; displayName="Kolkata"; landmark="Salt Lake"},
    @{name="jaipur"; displayName="Jaipur"; landmark="Vaishali Nagar"},
    @{name="indore"; displayName="Indore"; landmark="Vijay Nagar"},
    @{name="surat"; displayName="Surat"; landmark="Adajan"},
    @{name="chandigarh"; displayName="Chandigarh"; landmark="IT Park"}
)

$cityServices = @(
    @{slug="website-development-company"; title="Website Development Company"; shortTitle="Website Development"},
    @{slug="app-development-company"; title="App Development Company"; shortTitle="App Development"},
    @{slug="crm-development-company"; title="CRM Development Company"; shortTitle="CRM Development"},
    @{slug="digital-marketing-company"; title="Digital Marketing Company"; shortTitle="Digital Marketing"},
    @{slug="automation-company"; title="Automation Company"; shortTitle="Business Automation"},
    @{slug="ai-automation-company"; title="AI Automation Company"; shortTitle="AI Automation"}
)

Write-Host "Creating City-Level Service Pages..." -ForegroundColor Yellow
Write-Host "Target: 13 cities × 6 services = 78 pages" -ForegroundColor Gray
Write-Host ""

foreach ($city in $cities) {
    # Create city folder
    $cityFolder = Join-Path $projectRoot "locations\$($city.name)"
    if (-not (Test-Path $cityFolder)) {
        New-Item -Path $cityFolder -ItemType Directory -Force | Out-Null
    }
    
    Write-Host "  📁 $($city.displayName)/" -ForegroundColor Cyan
    
    foreach ($service in $cityServices) {
        $filePath = Join-Path $cityFolder "$($service.slug).html"
        
        if (Test-Path $filePath) {
            Write-Host "    ⊗ SKIPPED: $($service.slug) (exists)" -ForegroundColor DarkGray
            continue
        }
        
        $content = @"
<!-- City Service Page: $($service.title) in $($city.displayName) -->
<!-- THIS IS A PLACEHOLDER - WILL BE FILLED WITH LOCALIZED CONTENT -->

<!-- Section 01: Foundation -->
<section class="py-5 py-lg-8 py-xl-10">
    <div class="container">
        <div class="row gap-7">
            <div class="col-xl-4 col-xxl-4">
                <div class="d-flex align-items-center gap-7 py-2">
                    <span class="round-36 flex-shrink-0 text-dark rounded-circle bg-primary d-flex align-items-center justify-content-center fw-medium">01</span>
                    <hr class="border-line">
                    <span class="badge text-bg-dark">FOUNDATION</span>
                </div>
            </div>
            <div class="col-xl-8 col-xxl-7">
                <h2>$($service.title) in $($city.displayName)</h2>
                <p class="fs-5">Professional $($service.shortTitle) services in $($city.displayName), serving businesses in $($city.landmark) and across the city.</p>
            </div>
        </div>
    </div>
</section>

<!-- Placeholder: Will add 7 more localized sections -->
"@
        
        Set-Content -Path $filePath -Value $content -Encoding UTF8
        $pagesCreated++
        Write-Host "    ✓ $($service.slug).html" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "City Service Pages: COMPLETE" -ForegroundColor Green
Write-Host ""

# ==================== INDUSTRY SOLUTION PAGES ====================

$newIndustries = @(
    @{slug="ecommerce-growth-systems"; title="E-Commerce Growth Systems"},
    @{slug="coaches-consultants-automation"; title="Coaches & Consultants Automation"},
    @{slug="sme-business-infrastructure"; title="SME Business Infrastructure"},
    @{slug="automobile-digital-marketing"; title="Automobile Digital Marketing"},
    @{slug="beauty-brand-growth"; title="Beauty Brand Growth"},
    @{slug="agriculture-tech-solutions"; title="Agriculture Tech Solutions"}
)

Write-Host "Creating New Industry Solution Pages..." -ForegroundColor Yellow
Write-Host "Target: 6 new industry pages" -ForegroundColor Gray
Write-Host ""

foreach ($industry in $newIndustries) {
    $filePath = Join-Path $projectRoot "industries\$($industry.slug).html"
    
    if (Test-Path $filePath) {
        Write-Host "  ⊗ SKIPPED: $($industry.slug) (exists)" -ForegroundColor DarkGray
        continue
    }
    
    $content = @"
<!-- Industry Solution Page: $($industry.title) -->
<!-- THIS IS A PLACEHOLDER - WILL BE FILLED WITH INDUSTRY-SPECIFIC CONTENT -->

<!-- Section 01: Foundation -->
<section class="py-5 py-lg-8 py-xl-10">
    <div class="container">
        <div class="row gap-7">
            <div class="col-xl-4 col-xxl-4">
                <div class="d-flex align-items-center gap-7 py-2">
                    <span class="round-36 flex-shrink-0 text-dark rounded-circle bg-primary d-flex align-items-center justify-content-center fw-medium">01</span>
                    <hr class="border-line">
                    <span class="badge text-bg-dark">FOUNDATION</span>
                </div>
            </div>
            <div class="col-xl-8 col-xxl-7">
                <h2>$($industry.title)</h2>
                <p class="fs-5">Digital transformation solutions for the $($industry.title) sector</p>
            </div>
        </div>
    </div>
</section>

<!-- Placeholder: Will add 7 more industry-specific sections -->
"@
    
    Set-Content -Path $filePath -Value $content -Encoding UTF8
    $pagesCreated++
    Write-Host "  ✓ CREATED: $($industry.slug).html" -ForegroundColor Green
}

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║           PAGE GENERATION COMPLETE!                         ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "  • National Service Pages: 10 pages" -ForegroundColor White
Write-Host "  • City Service Pages: 78 pages (13 cities × 6 services)" -ForegroundColor White
Write-Host "  • Industry Pages: 6 pages" -ForegroundColor White
Write-Host "  • Total Pages Created: $pagesCreated" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next Step: Fill placeholder pages with full content" -ForegroundColor Magenta
Write-Host ""
