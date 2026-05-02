import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { getPlans } from '@/api/planService'
import { createCheckout, verifyPayment } from '@/api/subscriptionService'
import { openRazorpayCheckout } from '@/utils/razorpay'

const FALLBACK_PLANS = [
  {
    id: 1, emoji: '🟢', name: 'Starter', originalPrice: '₹1499', price: '₹999',
    desc: 'Perfect for getting started', popular: false,
    features: ['5 social media posts', '1 basic reel', 'Template-based designs', '48-hour delivery'],
    cta: 'Start Now', btnClass: 'db-plan-btn',
  },
  {
    id: 2, emoji: '🔵', name: 'Growth', originalPrice: '₹3499', price: '₹2999',
    desc: 'For consistent content & engagement', popular: true,
    features: ['12 posts (weekly content)', '2 engaging reels', 'Captions included', 'Priority support'],
    cta: 'Get Started', btnClass: 'db-plan-btn primary',
  },
  {
    id: 3, emoji: '🟣', name: 'Pro', originalPrice: '₹9999', price: '₹7999',
    desc: 'For premium, custom content', popular: false,
    features: ['20–24 custom posts', '4–6 high-quality reels', 'Fully custom designs', 'Strategy support', 'Tailored to your brand'],
    cta: 'Book a Call', btnClass: 'db-plan-btn',
  },
]

export default function PlansAndBilling() {
  const { user } = useAuth()
  const [plans, setPlans] = useState(FALLBACK_PLANS)
  const [loading, setLoading] = useState(null)
  const [toast, setToast] = useState('')

  useEffect(() => {
    getPlans()
      .then(({ data }) => { if (Array.isArray(data) && data.length > 0) setPlans(data) })
      .catch(() => {})
  }, [])

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 4000)
  }

  const handleBuy = async (plan) => {
    setLoading(plan.id)
    try {
      const { data: order } = await createCheckout(plan.id)
      await openRazorpayCheckout({
        order,
        user,
        onSuccess: async (paymentData) => {
          try {
            await verifyPayment(paymentData)
            showToast('🎉 Payment successful! Your subscription is now active.')
          } catch {
            showToast('Payment verified but subscription activation failed. Contact support.')
          }
        },
        onError: (err) => {
          if (err.message !== 'Payment cancelled') showToast('Payment failed. Please try again.')
        },
      })
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to initiate checkout. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="db-page active">
      <div className="db-page-header">
        <div>
          <h1 className="db-page-title">Plans & <span className="text-gradient">Billing</span></h1>
          <p className="db-page-subtitle">Choose the perfect plan for your brand's growth</p>
        </div>
      </div>

      <div className="db-current-plan db-card">
        <div className="db-current-plan-info">
          <span className="db-current-plan-badge">Current Plan</span>
          <h3>{user?.subscription?.plan?.name || 'Free Plan'}</h3>
          <p>3 one-time designs • No monthly content</p>
        </div>
        <button
          className="db-action-btn primary"
          onClick={() => document.getElementById('upgradePlans')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Upgrade Now →
        </button>
      </div>

      <div id="upgradePlans">
        <h2 className="db-section-heading">Choose Your Plan</h2>
        <div className="db-plans-grid">
          {plans.map((plan) => (
            <div key={plan.id} className={`db-plan-card${plan.popular ? ' popular' : ''}`}>
              {plan.popular && <div className="db-plan-popular-badge">⭐ Most Popular</div>}
              <div className="db-plan-name">{plan.emoji} {plan.name}</div>
              <div className="db-plan-price">
                {plan.originalPrice && <span className="db-plan-original">{plan.originalPrice}</span>}
                {' '}{plan.price}<span>/mo</span>
              </div>
              <p className="db-plan-desc">{plan.desc}</p>
              <ul className="db-plan-features">
                {(plan.features || []).map((f, i) => (
                  <li key={i}><span className="db-check">✓</span> {f}</li>
                ))}
              </ul>
              <button
                className={plan.btnClass || 'db-plan-btn'}
                disabled={loading === plan.id}
                onClick={() => handleBuy(plan)}
              >
                {loading === plan.id ? 'Processing...' : (plan.cta || 'Get Started')}
              </button>
            </div>
          ))}
        </div>
      </div>

      {toast && (
        <div className="db-toast-container">
          <div className="db-toast">{toast}</div>
        </div>
      )}
    </div>
  )
}
