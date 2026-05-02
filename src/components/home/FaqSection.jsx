import { useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const faqs = [
  {
    q: 'How do I get started?',
    a: "Choose a plan or request your free designs. Share your brand details, and we'll start designing within 24 hours.",
  },
  {
    q: 'How fast is delivery?',
    a: 'Most designs are delivered within 48 hours. For larger plans, we follow a scheduled content calendar.',
  },
  {
    q: 'Can I request revisions?',
    a: "Yes, revisions are included in all plans. We work with you until you're 100% satisfied with the designs.",
  },
  {
    q: 'Are designs customized?',
    a: "Yes—especially in Growth and Pro plans, every design is tailored to your brand's colors, fonts, and style guidelines.",
  },
  {
    q: 'Do you post on my account?',
    a: "Currently, we provide ready-to-post content. Social media management and publishing is coming soon as part of our platform.",
  },
  {
    q: 'Is there a minimum commitment?',
    a: "No—cancel anytime. There are no contracts or long-term commitments. We believe our work speaks for itself.",
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null)
  const ref = useScrollReveal()

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section className="faq-section" id="faq" ref={ref}>
      <div className="container">
        <div className="section-badge reveal">❓ FAQ</div>
        <h2 className="section-title reveal stagger-1">
          Frequently asked <span className="text-gradient">questions</span>
        </h2>

        <div className="faq-list">
          {faqs.map((item, i) => (
            <div key={i} className={`faq-item reveal stagger-${i + 1}`}>
              <button
                className={`faq-question${openIndex === i ? ' open' : ''}`}
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                {item.q}
                <span className="faq-icon">{openIndex === i ? '−' : '+'}</span>
              </button>
              {openIndex === i && (
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
