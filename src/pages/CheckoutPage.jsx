import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { createCheckout, verifyPayment } from '@/api/subscriptionService'
import { openRazorpayCheckout } from '@/utils/razorpay'
import WhatsAppFAB from '@/components/common/WhatsAppFAB'
import '@/styles/checkout.css'

const formatRupee = (value, fraction = 0) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: fraction }).format(value)

const waNumber = import.meta.env.VITE_WA_NUMBER || '916380271857'

export default function CheckoutPage() {
  const { user, business, setUserProfile } = useAuth()
  const navigate = useNavigate()
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [billingCycle, setBillingCycle] = useState(plan?.duration_unit || 'MONTH') // default to MONTH if not specified

  useEffect(() => {
    const raw = localStorage.getItem('activate')
    if (!raw) { navigate('/'); return }
    const storedPlan = JSON.parse(raw)
    setPlan(storedPlan)
    setBillingCycle(storedPlan.duration_unit || 'MONTH')

  }, [navigate])

  if (!plan) return null

  const basePrice = parseInt(plan.price.replace('₹', '').replace(',', '')) || 0
  const billingMultiplier = billingCycle === 'YEAR' ? 10 : 1 // simple multiplier for yearly billing
  const adjustedPrice = basePrice * billingMultiplier
  const gst = adjustedPrice * 0.18
  const total = adjustedPrice + gst

  console.log('CheckoutPage render', { plan, basePrice, billingCycle, adjustedPrice, gst, total }) // debug log

  const features = Array.isArray(plan.features) ? plan.features : []

  const brandName = business?.brand_name || ''
  const industry = business?.business_other || business?.business_name || ''
  const mobile = user?.mobile || ''

  const handleProceedToPayment = async () => {
    setLoading(true)
    setError('')
    try {
      const { data: order } = await createCheckout(plan.id, billingCycle)
      await openRazorpayCheckout({
        order,
        user,
        onSuccess: async (paymentData) => {
          try {
            const { data } = await verifyPayment(paymentData)
            setUserProfile(data) // update user profile with new subscription status
            localStorage.removeItem('activate')
            navigate('/payment-success')
          } catch {
            setError('Payment verified but subscription activation failed. Contact support.')
          } finally {
            setLoading(false)
          }
        },
        onError: (err) => {
          if (err.message !== 'Payment cancelled') {
            setError('Payment failed. Please try again.')
          }
          setLoading(false)
        },
      })
    } catch {
      setError('Could not initiate payment. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header */}
      <header className="co-shell co-header">
        <Link to="/" className="co-logo" aria-label="Make My Brand home">
          <img src="/images/mmb-logo.svg" alt="Make My Brand" />
        </Link>
        <div className="co-header-actions">
          <span className="co-secure-badge">🔒 Secure Checkout</span>
          <a
            className="co-support-btn"
            href={`https://wa.me/${waNumber}?text=Hi%2C%20I%20need%20help%20with%20checkout.`}
            target="_blank"
            rel="noopener"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M.057 24l1.687-6.163a11.78 11.78 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0c3.181.001 6.167 1.24 8.413 3.488a11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807a9.9 9.9 0 0 0 5.392 1.592c5.448 0 9.888-4.439 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.77 9.77 0 0 0 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            WhatsApp Support
          </a>
        </div>
      </header>

      <main className="co-shell">
        {/* Intro */}
        <section className="co-intro">
          <div className="co-eyebrow">{plan.name} Checkout</div>
          <h1 className="co-title">Launch your brand content engine.</h1>
          <p className="co-intro-copy">Review your plan and complete payment securely.</p>
        </section>

        <div className="co-grid">
          {/* Left stack */}
          <div className="co-left-stack">
            {/* Card 01 — Selected Plan */}
            <section className="co-card" aria-labelledby="plan-card-title">
              <div className="co-card-heading">
                <div className="co-card-title">
                  <span className="co-icon-box">01</span>
                  <h2 id="plan-card-title">Selected Plan</h2>
                </div>
                {plan.is_popular && <span className="co-pill">Most popular</span>}
              </div>

              <div className="co-plan-top">
                <div>
                  <div className="co-plan-name">{plan.name}</div>
                  {plan.desc && <p className="co-plan-tagline">{plan.desc}</p>}
                  <div className="co-plan-price">
                    {formatRupee(basePrice)}<span>/{plan?.duration_unit ? plan?.duration_unit.toLowerCase() : 'month'}</span>
                  </div>
                  {features.length > 0 && (
                    <ul className="co-feature-list">
                      {features.map((f, i) => (
                        <li key={i}>
                          <span className="co-check">✓</span>
                          {typeof f === 'string' ? f : f.label || f.name || JSON.stringify(f)}
                        </li>
                      ))}
                    </ul>
                  )}
                  </div>
                  <div className="field">
                    <label htmlFor="billingCycle">Billing cycle</label>
                    <select id="billingCycle" name="billingCycle" value={billingCycle} onChange={(e) => setBillingCycle(e.target.value)}>
                      <option value="MONTH" data-months="1" data-price={basePrice}>Monthly</option>
                      <option value="YEAR" data-months="12" data-price={basePrice * 10}>Yearly</option>
                    </select>
                  </div>
                
              </div>
            </section>

            {/* Card 02 — Brand Details (read-only) */}
            <section className="co-card" aria-labelledby="brand-card-title">
              <div className="co-card-heading">
                <div className="co-card-title">
                  <span className="co-icon-box">02</span>
                  <h2 id="brand-card-title">Brand Details</h2>
                </div>
              </div>

              <div className="co-info-grid">
                <div className="co-info-item">
                  <span className="co-info-label">Brand Name</span>
                  <div className={`co-info-value${!brandName ? ' empty' : ''}`}>
                    {brandName || 'Not provided'}
                  </div>
                </div>
                <div className="co-info-item">
                  <span className="co-info-label">Industry</span>
                  <div className={`co-info-value${!industry ? ' empty' : ''}`}>
                    {industry || 'Not provided'}
                  </div>
                </div>
                <div className="co-info-item">
                  <span className="co-info-label">Name</span>
                  <div className={`co-info-value${!user?.name ? ' empty' : ''}`}>
                    {user?.name || 'Not provided'}
                  </div>
                </div>
                <div className="co-info-item">
                  <span className="co-info-label">WhatsApp Number</span>
                  <div className={`co-info-value${!mobile ? ' empty' : ''}`}>
                    {mobile ? `+91 ${mobile}` : 'Not provided'}
                  </div>
                </div>
                <div className="co-info-item full">
                  <span className="co-info-label">Email</span>
                  <div className={`co-info-value${!user?.email ? ' empty' : ''}`}>
                    {user?.email || 'Not provided'}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right sidebar — Order Summary */}
          <aside className="co-summary-wrap" aria-labelledby="summary-title">
            <section className="co-summary-card">
              <h2 id="summary-title">Order Summary</h2>

              <div className="co-summary-plan">
                <strong>{plan.name}</strong>
                {plan.desc && <span>{plan.desc}</span>}
              </div>

              <div className="co-summary-lines">
                <div className="co-summary-line">
                  <span>Billing cycle</span>
                  <strong>{billingCycle === 'YEAR' ? 'Yearly' : 'Monthly'}</strong>
                </div>
                <div className="co-summary-line">
                  <span>{plan.name}</span>
                  <strong>{formatRupee(adjustedPrice, 2)}</strong>
                </div>
                <div className="co-summary-line">
                  <span>GST 18%</span>
                  <strong>{formatRupee(gst, 2)}</strong>
                </div>
              </div>

              <div className="co-total-line">
                <span>Total price</span>
                <strong>{formatRupee(total, 2)}</strong>
              </div>

              <button className="co-cta" onClick={handleProceedToPayment} disabled={loading}>
                {loading ? 'Processing...' : 'Proceed to Payment →'}
              </button>

              {error && <p className="co-error">{error}</p>}

              <div className="co-trust-row" aria-label="Payment methods">
                <span>UPI</span>
                <span>Cards</span>
                <span>Net Banking</span>
              </div>

              <div className="co-guarantee">
                <strong>Secure checkout with support before payment.</strong>
                Your order details are reviewed by the Make My Brand team before production starts.
              </div>
            </section>
          </aside>
        </div>
      </main>

      <WhatsAppFAB />
    </div>
  )
}
