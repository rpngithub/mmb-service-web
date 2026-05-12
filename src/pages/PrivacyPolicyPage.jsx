import { Link } from 'react-router-dom'

function PolicySidebar({ active }) {
  return (
    <aside className="policy-sidebar">
      <h3>Legal Pages</h3>
      <p>Review the terms that guide how Make my Brand protects data, delivers work, and handles cancellations.</p>
      <div className="policy-link-list">
        <Link to="/privacy-policy" className={active === 'privacy' ? 'active' : ''}>Privacy Policy <span>01</span></Link>
        <Link to="/terms-and-conditions" className={active === 'terms' ? 'active' : ''}>Terms &amp; Conditions <span>02</span></Link>
        <Link to="/refund-policy" className={active === 'refund' ? 'active' : ''}>Refund Policy <span>03</span></Link>
      </div>
      <Link to="/register" className="btn btn-primary">Start Free Designs</Link>
    </aside>
  )
}

export { PolicySidebar }

export default function PrivacyPolicyPage() {
  return (
    <main>
      <section className="policy-hero dark-theme">
        <div className="container">
          <div className="policy-eyebrow">Privacy Policy</div>
          <h1 className="policy-title">Your privacy matters.</h1>
          <p className="policy-intro">
            Welcome to Make my Brand, a product of 3dot VFX and Animation Studio. We value your privacy and are
            committed to protecting your personal information. This website and services are operated by{' '}
            <a href="https://3dotanimation.com/" target="_blank" rel="noopener">3Dot Animation Studio LLP</a>
            {' '}under the brand name &ldquo;Make My Brand.&rdquo;
</p>
          <div className="policy-meta">Effective Date: May 1, 2026</div>
        </div>
      </section>

      <section className="policy-section">
        <div className="container">
          <div className="policy-layout">
            <article className="policy-card">
              <div className="policy-block">
                <h2>1. Information We Collect</h2>
                <p>We may collect the following information:</p>
                <ul>
                  <li>Personal information such as name, email address, and mobile number.</li>
                  <li>Business information such as business name, industry, website, branding preferences, and design requirements.</li>
                  <li>Uploaded content such as logos, images, and brand assets.</li>
                </ul>
              </div>

              <div className="policy-block">
                <h2>2. How We Use Your Information</h2>
                <p>We use your information to:</p>
                <ul>
                  <li>Provide social media design and management services.</li>
                  <li>Create and deliver your free and paid designs.</li>
                  <li>Communicate via WhatsApp, email, or phone.</li>
                  <li>Improve our services and user experience.</li>
                  <li>Send updates, offers, or service-related notifications.</li>
                </ul>
              </div>

              <div className="policy-block">
                <h2>3. OTP &amp; Verification</h2>
                <p>We use OTP-based authentication to verify your mobile number and ensure secure account access.</p>
              </div>

              <div className="policy-block">
                <h2>4. Data Sharing</h2>
                <p>We do not sell your personal data. We may share your data with:</p>
                <ul>
                  <li>Service providers, including payment gateways and messaging services.</li>
                  <li>Internal team members for service delivery.</li>
                </ul>
              </div>

              <div className="policy-block">
                <h2>5. Data Storage &amp; Security</h2>
                <p>We take reasonable steps to protect your data from unauthorized access, misuse, or disclosure.</p>
              </div>

              <div className="policy-block">
                <h2>6. Your Rights</h2>
                <p>You may:</p>
                <ul>
                  <li>Request access to your data.</li>
                  <li>Request corrections.</li>
                  <li>Request deletion, subject to service obligations.</li>
                </ul>
              </div>

              <div className="policy-block">
                <h2>7. Cookies &amp; Tracking</h2>
                <p>We may use cookies or analytics tools to enhance website performance and user experience.</p>
              </div>

              <div className="policy-block">
                <h2>8. Contact Us</h2>
                <div className="policy-contact">
                  <p>3dot VFX and Animation Studio</p>
                  <p>Email: <a href="mailto:cotactus@makemybrand.live">cotactus@makemybrand.live</a></p>
                  <p>Phone: <a href="tel:+916380271857">+91 6380271857</a></p>
                  <p>Address: 39E/2, Ranithottam, Medical College Road, Nagercoil, Tamil Nadu - 629003</p>
                </div>
              </div>
            </article>

            <PolicySidebar active="privacy" />
          </div>
        </div>
      </section>
    </main>
  )
}
