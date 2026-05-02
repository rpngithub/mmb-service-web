export default function ContactPage() {
  return (
    <main>
      <section className="policy-hero dark-theme">
        <div className="container">
          <div className="policy-eyebrow">Contact Us</div>
          <h1 className="policy-title">Let us build your brand's next post.</h1>
          <p className="policy-intro">
            Have a question about plans, designs, revisions, or your account? Reach us directly or send your details
            through the form.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-layout">
            <aside className="contact-info-panel">
              <h2>Talk to Make my Brand</h2>
              <p>We are here for plan questions, custom design requests, revisions, refunds, and support.</p>

              <div className="contact-list">
                <div className="contact-item">
                  <span>Business Email</span>
                  <a href="mailto:cotactus@makemybrand.live">cotactus@makemybrand.live</a>
                </div>
                <div className="contact-item">
                  <span>Phone</span>
                  <a href="tel:+916380271857">+91 6380271857</a>
                </div>
                <div className="contact-item">
                  <span>Registered Address</span>
                  <strong>39E/2, Ranithottam, Medical College Road, Nagercoil, Tamil Nadu - 629003</strong>
                </div>
              </div>

              <div className="whatsapp-highlight">
                <p>
                  Send a quick message with your business name and requirement. Our team can guide you on the right
                  plan or next step.
                </p>
                <a
                  href="https://wa.me/916380271857?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Make%20my%20Brand."
                  className="btn"
                  target="_blank"
                  rel="noopener"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </aside>

            <section className="contact-form-panel">
              <h2>Send an inquiry</h2>
              <p>Share a few details and we will get back to you through email, phone, or WhatsApp.</p>

              <form
                className="contact-form"
                action="mailto:cotactus@makemybrand.live"
                method="post"
                encType="text/plain"
              >
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="contactName">Name</label>
                    <input type="text" id="contactName" name="Name" autoComplete="name" required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="contactEmail">Email ID</label>
                    <input type="email" id="contactEmail" name="Email" autoComplete="email" required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="contactPhone">Phone</label>
                    <input type="tel" id="contactPhone" name="Phone" autoComplete="tel" required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="contactQuery">Query Type</label>
                    <select id="contactQuery" name="Query Type" required>
                      <option value="">Select a query</option>
                      <option>📦 Packages &amp; Pricing</option>
                      <option>🎨 Custom Design Request</option>
                      <option>🔄 Revisions / Changes</option>
                      <option>💰 Refund / Cancellation</option>
                      <option>🛠 Technical Issue</option>
                      <option>❓ General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="contactNotes">Notes</label>
                  <textarea id="contactNotes" name="Notes" placeholder="Tell us what you need help with..." />
                </div>

                <button type="submit" className="btn btn-primary">Submit Inquiry</button>
              </form>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}
