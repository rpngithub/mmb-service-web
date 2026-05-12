import { Link } from 'react-router-dom'

export default function AboutUsPage() {
  return (
    <main>
      <section className="policy-hero about-hero dark-theme">
        <div className="container">
          <div className="policy-eyebrow">About Make My Brand</div>
          <h1 className="policy-title">Build a Brand That Looks Professional Every Day</h1>
          <p className="policy-intro">
            Make My Brand helps businesses stay consistent on social media with professionally designed creatives,
            engaging reels, and ready-to-post content - powered by the creative expertise of{' '}
            <a href="https://3dotanimation.com/" target="_blank" rel="noopener">3Dot Animation Studio LLP</a>.
          </p>
          <div className="about-hero-actions">
            <Link to="/register" className="btn btn-primary">Get Started</Link>
            <a href="/#pricing" className="btn btn-secondary">View Plans</a>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="about-main">

            <section className="about-story-panel">
              <div className="about-copy">
                <div className="section-badge">Introduction</div>
                <h2>About Make My Brand</h2>
                <p>Make My Brand is a creative platform designed to help businesses grow their online presence through high-quality social media content, reels, and branding support.</p>
                <p>We simplify content creation for businesses by delivering ready-to-post creatives that maintain brand consistency, improve engagement, and save valuable time.</p>
                <p>Whether you are a startup, local business, creator, or growing company, our goal is to help you build a stronger and more professional digital presence.</p>
              </div>
              <figure className="about-image-card">
                <img src="/images/about-mmb.png" alt="Creative team planning brand content" />
              </figure>
              <div className="about-vision-cards">
                <div className="about-vision-card">
                  <span className="vision-icon" aria-hidden="true"><img src="/images/vision.webp" alt="" /></span>
                  <h3>Our Vision</h3>
                  <p>To become a trusted creative platform that helps brands grow through consistent design, engaging content, and modern digital solutions.</p>
                </div>
                <div className="about-vision-card">
                  <span className="vision-icon" aria-hidden="true"><img src="/images/mission.webp" alt="" /></span>
                  <h3>Our Mission</h3>
                  <p>To make professional branding and social media content simple, accessible, and effective for businesses of all sizes.</p>
                </div>
              </div>
            </section>

            <section className="about-feature-row reverse">
              <figure className="about-image-card">
                <img src="/images/3dot-animations.jpg" alt="3Dot Animation Studio creative team" />
              </figure>
              <div className="about-copy">
                <div className="section-badge">Who We Are</div>
                <h2>Backed by Creative Industry Experience</h2>
                <p>Make My Brand is operated by <a href="https://3dotanimation.com/" target="_blank" rel="noopener">3Dot Animation Studio LLP</a>, a creative studio with experience in animation, branding, design, video production, digital solutions, and visual storytelling.</p>
                <p>With years of experience working on creative projects and brand communication, our team understands how to create content that is visually engaging, modern, and business-focused.</p>
                <p>This strong creative foundation allows us to deliver social media solutions that are both practical and impactful.</p>
              </div>
            </section>

            <section className="about-services-panel">
              <div className="about-section-heading">
                <div className="section-badge">What We Do</div>
                <h2>Social Media Content Designed for Growth</h2>
                <p>We help businesses stay active online with professionally designed content tailored to their brand identity.</p>
              </div>
              <div className="about-service-showcase">
                <div className="about-service-grid">
                  <div className="about-service-card">
                    <span className="service-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1.5"></rect><rect x="13" y="4" width="7" height="7" rx="1.5"></rect><rect x="4" y="13" width="7" height="7" rx="1.5"></rect><rect x="13" y="13" width="7" height="7" rx="1.5"></rect></svg></span>
                    <h3>Social Media Post Designs</h3>
                  </div>
                  <div className="about-service-card">
                    <span className="service-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="3"></rect><path d="M9 8l6 4-6 4V8z"></path></svg></span>
                    <h3>Instagram Reels &amp; Short Videos</h3>
                  </div>
                  <div className="about-service-card">
                    <span className="service-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M4 10h16"></path></svg></span>
                    <h3>Monthly Content Packages</h3>
                  </div>
                  <div className="about-service-card">
                    <span className="service-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l8 4v10l-8 4-8-4V7l8-4z"></path><path d="M12 3v18M4 7l8 4 8-4"></path></svg></span>
                    <h3>Brand-Based Creative Design</h3>
                  </div>
                  <div className="about-service-card">
                    <span className="service-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4z"></path><path d="M8 9h8M8 13h5M17 17l3 3"></path></svg></span>
                    <h3>Ready-to-Post Marketing Creatives</h3>
                  </div>
                  <div className="about-service-card">
                    <span className="service-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13l4-8 4 8 4-8 4 8"></path><path d="M5 17h14"></path></svg></span>
                    <h3>Promotional &amp; Campaign Content</h3>
                  </div>
                  <div className="about-service-card">
                    <span className="service-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v4M12 17v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M3 12h4M17 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"></path></svg></span>
                    <h3>Custom Design Support</h3>
                  </div>
                  <div className="about-service-card about-service-more">
                    <span className="service-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V8l8-4 8 4v12"></path><path d="M9 20v-6h6v6M8 10h.01M12 10h.01M16 10h.01"></path></svg></span>
                    <h3>Business Branding Creatives</h3>
                  </div>
                </div>
              </div>
            </section>

            <section className="about-why-panel">
              <div className="about-section-heading">
                <div className="section-badge">Why Choose Us</div>
                <h2>Why Businesses Choose Make My Brand</h2>
              </div>
              <div className="about-card-grid">
                <div className="about-mini-card">
                  <div className="why-card-top"><span className="why-number">01</span><span className="why-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 4v10l-7 4-7-4V7l7-4z"></path><path d="M12 3v18M5 7l7 4 7-4"></path></svg></span></div>
                  <h3>Consistent Branding</h3>
                  <p>Every design follows your brand identity to maintain a professional and recognizable appearance across platforms.</p>
                </div>
                <div className="about-mini-card is-featured">
                  <div className="why-card-top"><span className="why-number">02</span><span className="why-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"></path></svg></span></div>
                  <h3>Fast Turnaround</h3>
                  <p>Our streamlined workflow helps businesses receive content quickly and consistently.</p>
                </div>
                <div className="about-mini-card">
                  <div className="why-card-top"><span className="why-number">03</span><span className="why-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4z"></path><path d="M8 9h8M8 13h5M15 16l2 2 4-4"></path></svg></span></div>
                  <h3>Ready-to-Post Content</h3>
                  <p>No extra formatting or editing required. We deliver content optimized for immediate publishing.</p>
                </div>
                <div className="about-mini-card">
                  <div className="why-card-top"><span className="why-number">04</span><span className="why-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v4M12 17v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M3 12h4M17 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"></path></svg></span></div>
                  <h3>Creative Expertise</h3>
                  <p>Our background in animation, design, and digital branding helps us create visually engaging content that stands out.</p>
                </div>
                <div className="about-mini-card">
                  <div className="why-card-top"><span className="why-number">05</span><span className="why-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 16V8l8-5 8 5v8l-8 5-8-5z"></path><path d="M8 12h8M12 8v8"></path></svg></span></div>
                  <h3>Scalable Solutions</h3>
                  <p>Whether you need a few posts or complete monthly creative support, our services are built to grow with your business.</p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </section>

      <section className="about-final-cta">
        <div className="container">
          <div className="about-final-card">
            <h2>Ready to Build Your Brand?</h2>
            <p>Let us help you create consistent, professional social media content that helps your business grow online.</p>
            <div className="about-hero-actions">
              <Link to="/register" className="btn btn-primary">Start Your Plan</Link>
              <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
