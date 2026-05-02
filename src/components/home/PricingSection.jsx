import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { getPlans } from '@/api/planService'

const FALLBACK_PLANS = [
  {
    id: 'starter',
    emoji: '🟢',
    name: 'Starter Plan',
    originalPrice: '₹1499',
    price: '₹999',
    desc: 'Perfect for getting started',
    features: ['5 social media posts', '1 basic reel', 'Template-based designs', '48-hour delivery'],
    cta: 'Start Now',
    btnClass: 'btn-outline-red',
    popular: false,
  },
  {
    id: 'growth',
    emoji: '🔵',
    name: 'Growth Plan',
    originalPrice: '₹3499',
    price: '₹2999',
    desc: 'For consistent content and engagement',
    features: ['12 posts (weekly content)', '2 engaging reels', 'Captions included', 'Priority support'],
    cta: 'Get Started',
    btnClass: 'btn-primary',
    popular: true,
  },
  {
    id: 'pro',
    emoji: '🟣',
    name: 'Pro Plan',
    originalPrice: '₹9999',
    price: '₹7999',
    desc: 'For premium, custom content',
    features: [
      '20–24 custom posts',
      '4–6 high-quality reels',
      'Fully custom designs',
      'Strategy support',
      'Tailored to your brand',
    ],
    cta: 'Start Now',
    btnClass: 'btn-outline-red',
    popular: false,
  },
]

function PlanCard({ plan, stagger }) {
  return (
    <div className={`pricing-card${plan.popular ? ' popular' : ''} reveal stagger-${stagger}`}>
      {plan.popular && <div className="popular-badge">⭐ Most Popular</div>}
      <div className="pricing-plan-name">{plan.emoji} {plan.name}</div>
      <div className="pricing-price">
        <span className="pricing-original">{plan.originalPrice}</span>
        {' '}{plan.price} <span>/ month</span>
      </div>
      <p className="pricing-desc">{plan.desc}</p>
      <ul className="pricing-features">
        {plan.features.map((f, i) => (
          <li key={i}><span className="check">✓</span> {f}</li>
        ))}
      </ul>
      <Link to="/register" className={`btn ${plan.btnClass}`}>{plan.cta}</Link>
    </div>
  )
}

export default function PricingSection() {
  const [plans, setPlans] = useState(FALLBACK_PLANS)
  const ref = useScrollReveal()

  useEffect(() => {
    getPlans()
      .then(({ data }) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((p, i) => ({
            id: p.id,
            emoji: ['🟢', '🔵', '🟣'][i] || '⚪',
            name: p.name,
            originalPrice: null,
            price: `₹${p.price}`,
            desc: p.description || '',
            features: Object.entries(p.features || {}).map(([k, v]) => `${v} ${k}`),
            cta: i === 1 ? 'Get Started' : 'Start Now',
            btnClass: i === 1 ? 'btn-primary' : 'btn-outline-red',
            popular: i === 1,
          }))
          setPlans(mapped)
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section className="pricing-section" id="pricing" ref={ref}>
      <div className="container">
        <div className="section-badge reveal">💸 PRICING</div>
        <h2 className="section-title reveal stagger-1">
          Plans designed for every stage<br />of{' '}
          <span className="text-gradient">your business</span>
        </h2>
        <p className="pricing-micro reveal stagger-2">No contracts. Cancel anytime.</p>

        <div className="pricing-grid">
          {plans.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} stagger={i + 1} />
          ))}
        </div>

        <p className="pricing-custom reveal">
          Need something custom?{' '}
          <Link to="/register">Let's build a plan for you →</Link>
        </p>
      </div>
    </section>
  )
}
