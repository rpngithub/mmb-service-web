import { Link } from 'react-router-dom'
import { PolicySidebar } from './PrivacyPolicyPage'

export default function TermsPage() {
  return (
    <main>
      <section className="policy-hero dark-theme">
        <div className="container">
          <div className="policy-eyebrow">Terms &amp; Conditions</div>
          <h1 className="policy-title">Clear terms for better work.</h1>
          <p className="policy-intro">
            Welcome to Make my Brand, operated by 3dot VFX and Animation Studio. By accessing or using our services,
            you agree to the following terms. These Terms and Conditions govern the use of services provided under the
            brand &ldquo;Make My Brand,&rdquo; operated by{' '}
            <a href="https://3dotanimation.com/" target="_blank" rel="noopener">3Dot Animation Studio LLP</a>.
            {' '}All payments and transactions are processed under the legal entity name{' '}
            <a href="https://3dotanimation.com/" target="_blank" rel="noopener">3Dot Animation Studio LLP</a>.
</p>
          <div className="policy-meta">Effective Date: May 1, 2026</div>
        </div>
      </section>

      <section className="policy-section">
        <div className="container">
          <div className="policy-layout">
            <article className="policy-card">
              <div className="policy-block">
                <h2>1. Services</h2>
                <p>We provide:</p>
                <ul>
                  <li>Social media design services.</li>
                  <li>Reel creation.</li>
                  <li>Social media creative support.</li>
                  <li>Social media management based on selected plans.</li>
                </ul>
              </div>

              <div className="policy-block">
                <h2>2. Free Designs</h2>
                <ul>
                  <li>We offer 3 free designs to newly registered users.</li>
                  <li>These designs are provided for evaluation purposes.</li>
                  <li>Continued services require purchasing a paid plan.</li>
                </ul>
              </div>

              <div className="policy-block">
                <h2>3. User Responsibilities</h2>
                <p>You agree to:</p>
                <ul>
                  <li>Provide accurate and complete information.</li>
                  <li>Share required brand assets and content.</li>
                  <li>Ensure you have rights to all materials shared.</li>
                </ul>
              </div>

              <div className="policy-block">
                <h2>4. Payments</h2>
                <ul>
                  <li>All plans must be paid in advance.</li>
                  <li>Pricing is clearly listed on our website.</li>
                  <li>Payments are processed via secure payment gateways.</li>
                </ul>
              </div>

              <div className="policy-block">
                <h2>5. Service Delivery</h2>
                <p>Designs are generally delivered within 48 hours. Timelines may vary based on requirements and communication.</p>
              </div>

              <div className="policy-block">
                <h2>6. Revisions</h2>
                <p>Revisions are included as per the selected plan. Excessive or additional revisions may incur extra charges.</p>
              </div>

              <div className="policy-block">
                <h2>7. Intellectual Property</h2>
                <ul>
                  <li>Final approved designs are owned by the client.</li>
                  <li>We reserve the right to showcase work in our portfolio unless requested otherwise.</li>
                </ul>
              </div>

              <div className="policy-block">
                <h2>8. Account Access</h2>
                <p>Users log in using mobile number with OTP verification. You are responsible for maintaining access to your registered mobile number.</p>
              </div>

              <div className="policy-block">
                <h2>9. Termination</h2>
                <p>We reserve the right to suspend or terminate accounts for misuse or violation of these terms.</p>
              </div>

              <div className="policy-block">
                <h2>10. Limitation of Liability</h2>
                <p>We are not responsible for:</p>
                <ul>
                  <li>Business losses due to design performance.</li>
                  <li>Delays caused by incomplete or delayed user inputs.</li>
                </ul>
              </div>

              <div className="policy-block">
                <h2>11. Changes to Terms</h2>
                <p>We may update these terms at any time. Continued use of our services indicates acceptance of the updated terms.</p>
              </div>

              <div className="policy-block">
                <h2>12. Contact</h2>
                <div className="policy-contact">
                  <p>3dot VFX and Animation Studio</p>
                  <p>Email: <a href="mailto:cotactus@makemybrand.live">cotactus@makemybrand.live</a></p>
                  <p>Phone: <a href="tel:+916380271857">+91 6380271857</a></p>
                  <p>Address: 39E/2, Ranithottam, Medical College Road, Nagercoil, Tamil Nadu - 629003</p>
                </div>
              </div>
            </article>

            <PolicySidebar active="terms" />
          </div>
        </div>
      </section>
    </main>
  )
}
