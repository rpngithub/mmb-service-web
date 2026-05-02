import { PolicySidebar } from './PrivacyPolicyPage'

export default function RefundPolicyPage() {
  return (
    <main>
      <section className="policy-hero dark-theme">
        <div className="container">
          <div className="policy-eyebrow">Refund Policy</div>
          <h1 className="policy-title">Fair cancellations, clearly handled.</h1>
          <p className="policy-intro">
            At Make my Brand, we strive to provide high-quality services. This Refund Policy outlines when refunds
            are applicable.
          </p>
          <div className="policy-meta">Effective Date: May 1, 2026</div>
        </div>
      </section>

      <section className="policy-section">
        <div className="container">
          <div className="policy-layout">
            <article className="policy-card">
              <div className="policy-block">
                <h2>1. Eligibility for Refund</h2>
                <p>You are eligible for a refund if:</p>
                <ul>
                  <li>You cancel your paid plan within 7 days of purchase.</li>
                  <li>Work has not progressed significantly beyond initial stages.</li>
                </ul>
              </div>

              <div className="policy-block">
                <h2>2. Non-Refundable Cases</h2>
                <p>Refunds will not be provided if:</p>
                <ul>
                  <li>More than 7 days have passed since purchase.</li>
                  <li>Designs have been delivered and approved.</li>
                  <li>Work has progressed significantly.</li>
                  <li>Delays are caused due to lack of response or inputs from the client.</li>
                </ul>
              </div>

              <div className="policy-block">
                <h2>3. Free Designs</h2>
                <ul>
                  <li>The 3 free designs are provided at no cost.</li>
                  <li>No refunds apply to free services.</li>
                </ul>
              </div>

              <div className="policy-block">
                <h2>4. Processing Time</h2>
                <ul>
                  <li>Approved refunds will be processed within 5-10 business days.</li>
                  <li>Refunds will be issued to the original payment method.</li>
                </ul>
              </div>

              <div className="policy-block">
                <h2>5. Cancellation Process</h2>
                <p>To request a refund:</p>
                <ul>
                  <li>Contact us via email or WhatsApp.</li>
                  <li>Provide your registered mobile number and purchase details.</li>
                </ul>
              </div>

              <div className="policy-block">
                <h2>6. Contact</h2>
                <div className="policy-contact">
                  <p>3dot VFX and Animation Studio</p>
                  <p>Email: <a href="mailto:cotactus@makemybrand.live">cotactus@makemybrand.live</a></p>
                  <p>Phone: <a href="tel:+916380271857">+91 6380271857</a></p>
                  <p>Address: 39E/2, Ranithottam, Medical College Road, Nagercoil, Tamil Nadu - 629003</p>
                </div>
              </div>
            </article>

            <PolicySidebar active="refund" />
          </div>
        </div>
      </section>
    </main>
  )
}
