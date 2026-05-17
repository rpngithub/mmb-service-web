import { useState } from 'react'
import { submitInquiry } from '../api/inquiryService'

const INITIAL_FORM = { name: '', email: '', phone: '', query_type: '', notes: '' }

export default function ContactPage() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [loading, setLoading] = useState(false)
  const [inquiryNumber, setInquiryNumber] = useState(null)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setInquiryNumber(null)
    try {
      const { data } = await submitInquiry(form)
      setInquiryNumber(data.inquiry_number)
      setForm(INITIAL_FORM)
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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

              {inquiryNumber && (
                <div className="form-success">
                  Thank you! Your inquiry has been submitted. Your inquiry number is <strong>{inquiryNumber}</strong> — keep it for future reference. We will get back to you soon.
                </div>
              )}

              {error && <div className="form-error">{error}</div>}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="contactName">Name</label>
                    <input
                      type="text"
                      id="contactName"
                      name="name"
                      autoComplete="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="contactEmail">Email ID</label>
                    <input
                      type="email"
                      id="contactEmail"
                      name="email"
                      autoComplete="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="contactPhone">Phone</label>
                    <input
                      type="tel"
                      id="contactPhone"
                      name="phone"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="contactQuery">Query Type</label>
                    <select
                      id="contactQuery"
                      name="query_type"
                      required
                      value={form.query_type}
                      onChange={handleChange}
                    >
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
                  <textarea
                    id="contactNotes"
                    name="notes"
                    placeholder="Tell us what you need help with..."
                    required
                    value={form.notes}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </form>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}
