# PowerShell script to insert missing sections 01-03

$file = "html\services-india\app-development-company-india.html"
$content = Get-Content $file -Raw

# Find the insertion point (before Section 04)
$section04Marker = '        <!-- Section 04: Why Choose Us -->'
$insertPoint = $content.IndexOf($section04Marker)

if ($insertPoint -eq -1) {
    Write-Host "ERROR: Could not find Section 04 marker" -ForegroundColor Red
    exit 1
}

# Define the sections to insert
$sectionsToInsert = @'

        <!-- Section 01: Services -->
        <section class="py-5 py-lg-8 py-xl-10">
            <div class="container">
                <div class="row gap-7">
                    <div class="col-xl-4 col-xxl-4">
                        <div class="d-flex align-items-center gap-7 py-2" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">
                            <span class="round-36 flex-shrink-0 text-dark rounded-circle bg-primary d-flex align-items-center justify-content-center fw-medium">01</span>
                            <hr class="border-line">
                            <span class="badge text-bg-dark">SERVICES</span>
                        </div>
                    </div>
                    <div class="col-xl-8 col-xxl-7">
                        <div class="d-flex flex-column gap-8">
                            <div class="d-flex flex-column gap-6" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
                                <h2 class="mb-0">Custom Mobile App Development Services in India</h2>
                                <p class="fs-5 mb-0">As a top-rated <strong>mobile app development company in India</strong>, One Layer™ provides end-to-end application development services. Our solutions prioritize user experience, backend scalability, enterprise security, and measurable business ROI.</p>
                                <p class="mb-0">Whether you need a <strong>native Android app</strong>, <strong>native iOS application</strong>, or <strong>cross-platform solution using Flutter or React Native</strong>, our Indian app developers deliver custom-built solutions aligned with your operational goals.</p>
                            </div>
                            <div class="row g-4" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                                <div class="col-md-6 mb-4">
                                    <div class="p-6 bg-white rounded-4 h-100 shadow-sm border border-opacity-10">
                                        <h5 class="mb-3">Android App Development</h5>
                                        <p class="mb-3">Custom <strong>Android application development</strong> for smartphones, tablets, and Android TV. We build native Kotlin and Java apps optimized for the Indian market.</p>
                                        <ul class="mb-0">
                                            <li>Native Android apps (Kotlin/Java)</li>
                                            <li>Google Play Store optimization</li>
                                            <li>Android Enterprise solutions</li>
                                            <li>Wear OS and TV apps</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-4">
                                    <div class="p-6 bg-white rounded-4 h-100 shadow-sm border border-opacity-10">
                                        <h5 class="mb-3">iOS App Development</h5>
                                        <p class="mb-3">Premium <strong>iOS app development services in India</strong> for iPhone, iPad, and Apple Watch.</p>
                                        <ul class="mb-0">
                                            <li>Native iOS apps (Swift/SwiftUI)</li>
                                            <li>iPad and Apple Watch apps</li>
                                            <li>App Store optimization (ASO)</li>
                                            <li>Apple Enterprise distribution</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-4">
                                    <div class="p-6 bg-white rounded-4 h-100 shadow-sm border border-opacity-10">
                                        <h5 class="mb-3">Cross-Platform Development</h5>
                                        <p class="mb-3">Cost-effective <strong>cross-platform app development using Flutter and React Native</strong>.</p>
                                        <ul class="mb-0">
                                            <li>Flutter app development</li>
                                            <li>React Native development</li>
                                            <li>Hybrid mobile solutions</li>
                                            <li>Progressive Web Apps (PWA)</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-4">
                                    <div class="p-6 bg-white rounded-4 h-100 shadow-sm border border-opacity-10">
                                        <h5 class="mb-3">Enterprise Mobile Solutions</h5>
                                        <p class="mb-3"><strong>Enterprise app development</strong> for large-scale operations and B2B platforms.</p>
                                        <ul class="mb-0">
                                            <li>Business process automation apps</li>
                                            <li>Field force management solutions</li>
                                            <li>Enterprise mobility management</li>
                                            <li>Legacy system integration</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-4">
                                    <div class="p-6 bg-white rounded-4 h-100 shadow-sm border border-opacity-10">
                                        <h5 class="mb-3">Startup App Development</h5>
                                        <p class="mb-3"><strong>MVP and startup app development</strong> for rapid market entry.</p>
                                        <ul class="mb-0">
                                            <li>MVP development</li>
                                            <li>Proof of concept (POC)</li>
                                            <li>Startup consulting</li>
                                            <li>Investor-ready prototypes</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-4">
                                    <div class="p-6 bg-white rounded-4 h-100 shadow-sm border border-opacity-10">
                                        <h5 class="mb-3">App Maintenance & Support</h5>
                                        <p class="mb-3">Comprehensive <strong>mobile app maintenance services</strong>.</p>
                                        <ul class="mb-0">
                                            <li>App store maintenance</li>
                                            <li>Security updates</li>
                                            <li>Performance monitoring</li>
                                            <li>Feature upgrades</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 02: Industries -->
        <section class="py-5 py-lg-8 py-xl-10 bg-light-gray">
            <div class="container">
                <div class="row gap-7">
                    <div class="col-xl-4 col-xxl-4">
                        <div class="d-flex align-items-center gap-7 py-2" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">
                            <span class="round-36 flex-shrink-0 text-dark rounded-circle bg-primary d-flex align-items-center justify-content-center fw-medium">02</span>
                            <hr class="border-line">
                            <span class="badge text-bg-dark">INDUSTRIES</span>
                        </div>
                    </div>
                    <div class="col-xl-8 col-xxl-7">
                        <div class="d-flex flex-column gap-8">
                            <div class="d-flex flex-column gap-6" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
                                <h2 class="mb-0">Industries We Serve Across India</h2>
                                <p class="fs-5 mb-0">One Layer™ provides specialized <strong>industry-specific app development</strong> across diverse sectors in the Indian market.</p>
                            </div>
                            <div class="row g-4" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                                <div class="col-md-6 mb-4">
                                    <div class="p-6 bg-white rounded-4 h-100 shadow-sm border border-opacity-10">
                                        <h5 class="mb-3">Real Estate & PropTech</h5>
                                        <p class="mb-0">Property listing apps, broker platforms, AR/VR property tours, and rental management systems.</p>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-4">
                                    <div class="p-6 bg-white rounded-4 h-100 shadow-sm border border-opacity-10">
                                        <h5 class="mb-3">Healthcare & Fitness</h5>
                                        <p class="mb-0">Telemedicine apps, clinic management, patient portals, fitness tracking, and wellness platforms.</p>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-4">
                                    <div class="p-6 bg-white rounded-4 h-100 shadow-sm border border-opacity-10">
                                        <h5 class="mb-3">E-commerce & D2C</h5>
                                        <p class="mb-0">Custom e-commerce apps, D2C brand applications, marketplace platforms.</p>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-4">
                                    <div class="p-6 bg-white rounded-4 h-100 shadow-sm border border-opacity-10">
                                        <h5 class="mb-3">EdTech & E-Learning</h5>
                                        <p class="mb-0">Learning management systems, coaching apps, examination platforms.</p>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-4">
                                    <div class="p-6 bg-white rounded-4 h-100 shadow-sm border border-opacity-10">
                                        <h5 class="mb-3">Fintech & Banking</h5>
                                        <p class="mb-0">Wallet apps, payment solutions, lending platforms, insurance apps.</p>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-4">
                                    <div class="p-6 bg-white rounded-4 h-100 shadow-sm border border-opacity-10">
                                        <h5 class="mb-3">Manufacturing & Logistics</h5>
                                        <p class="mb-0">Inventory management, supply chain apps, fleet tracking, warehouse management.</p>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-4">
                                    <div class="p-6 bg-white rounded-4 h-100 shadow-sm border border-opacity-10">
                                        <h5 class="mb-3">Hospitality & Food</h5>
                                        <p class="mb-0">Restaurant apps, hotel booking platforms, food delivery, table reservation.</p>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-4">
                                    <div class="p-6 bg-white rounded-4 h-100 shadow-sm border border-opacity-10">
                                        <h5 class="mb-3">SaaS & Technology</h5>
                                        <p class="mb-0">B2B SaaS mobile apps, productivity tools, collaboration platforms.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 03: Process -->
        <section class="py-5 py-lg-8 py-xl-10">
            <div class="container">
                <div class="row gap-7">
                    <div class="col-xl-4 col-xxl-4">
                        <div class="d-flex align-items-center gap-7 py-2" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">
                            <span class="round-36 flex-shrink-0 text-dark rounded-circle bg-primary d-flex align-items-center justify-content-center fw-medium">03</span>
                            <hr class="border-line">
                            <span class="badge text-bg-dark">PROCESS</span>
                        </div>
                    </div>
                    <div class="col-xl-8 col-xxl-7">
                        <div class="d-flex flex-column gap-8">
                            <div class="d-flex flex-column gap-6" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
                                <h2 class="mb-0">Our Indian App Development Process</h2>
                                <p class="fs-5 mb-0">Transparent, agile, and collaborative—our <strong>mobile app development process</strong> ensures timely delivery without compromising quality.</p>
                            </div>
                            <div class="row g-4" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                                <div class="col-md-6 mb-4">
                                    <div class="p-6 bg-white rounded-4 h-100 shadow-sm border border-opacity-10">
                                        <div class="d-flex align-items-center gap-3 mb-3">
                                            <span class="round-28 bg-primary text-dark rounded-circle d-flex align-items-center justify-content-center fw-semibold">01</span>
                                            <h5 class="mb-0">Discovery & Strategy</h5>
                                        </div>
                                        <p class="mb-0">Week 1-2: Business requirements, competitive analysis, user research, and technical architecture planning.</p>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-4">
                                    <div class="p-6 bg-white rounded-4 h-100 shadow-sm border border-opacity-10">
                                        <div class="d-flex align-items-center gap-3 mb-3">
                                            <span class="round-28 bg-primary text-dark rounded-circle d-flex align-items-center justify-content-center fw-semibold">02</span>
                                            <h5 class="mb-0">UI/UX Design</h5>
                                        </div>
                                        <p class="mb-0">Week 3-4: User experience mapping, wireframing, visual design, and interactive prototyping.</p>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-4">
                                    <div class="p-6 bg-white rounded-4 h-100 shadow-sm border border-opacity-10">
                                        <div class="d-flex align-items-center gap-3 mb-3">
                                            <span class="round-28 bg-primary text-dark rounded-circle d-flex align-items-center justify-content-center fw-semibold">03</span>
                                            <h5 class="mb-0">Development Sprints</h5>
                                        </div>
                                        <p class="mb-0">Week 5-10: Agile development with 2-week sprints, daily standups, and bi-weekly demos.</p>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-4">
                                    <div class="p-6 bg-white rounded-4 h-100 shadow-sm border border-opacity-10">
                                        <div class="d-flex align-items-center gap-3 mb-3">
                                            <span class="round-28 bg-primary text-dark rounded-circle d-flex align-items-center justify-content-center fw-semibold">04</span>
                                            <h5 class="mb-0">QA & Security Testing</h5>
                                        </div>
                                        <p class="mb-0">Week 11: Comprehensive testing across 50+ real devices including functional, usability, performance, and security testing.</p>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-4">
                                    <div class="p-6 bg-white rounded-4 h-100 shadow-sm border border-opacity-10">
                                        <div class="d-flex align-items-center gap-3 mb-3">
                                            <span class="round-28 bg-primary text-dark rounded-circle d-flex align-items-center justify-content-center fw-semibold">05</span>
                                            <h5 class="mb-0">Deployment & Launch</h5>
                                        </div>
                                        <p class="mb-0">Week 12: App Store Optimization, Google Play and App Store submission, server deployment.</p>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-4">
                                    <div class="p-6 bg-white rounded-4 h-100 shadow-sm border border-opacity-10">
                                        <div class="d-flex align-items-center gap-3 mb-3">
                                            <span class="round-28 bg-primary text-dark rounded-circle d-flex align-items-center justify-content-center fw-semibold">06</span>
                                            <h5 class="mb-0">Post-Launch Support</h5>
                                        </div>
                                        <p class="mb-0">Analytics monitoring, user feedback implementation, feature iterations, and scalability planning.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

'@

# Insert the sections
$before = $content.Substring(0, $insertPoint)
$after = $content.Substring($insertPoint)
$newContent = $before + $sectionsToInsert + $after

# Save the file
Set-Content -Path $file -Value $newContent -Encoding UTF8 -NoNewline

Write-Host "Successfully inserted sections 01-03!" -ForegroundColor Green
Write-Host "New file line count: $((Get-Content $file).Count)" -ForegroundColor Cyan
