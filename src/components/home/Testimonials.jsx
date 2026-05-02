import { useState, useEffect, useRef } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const SLIDES = [
  {
    letter: 'P',
    gradient: 'linear-gradient(135deg, #ed2024, #ed2024)',
    quote:
      '"We finally became consistent on Instagram. The designs look amazing and our engagement has doubled!"',
    name: 'Priya Sharma',
    role: 'Founder, Bloom Boutique',
  },
  {
    letter: 'R',
    gradient: 'linear-gradient(135deg, #1a1a2e, #4a4a6a)',
    quote:
      '"Saved us hours every week. Highly recommended for any business that wants to look professional online."',
    name: 'Rahul Mehta',
    role: 'CEO, FitZone Gym',
  },
  {
    letter: 'A',
    gradient: 'linear-gradient(135deg, #ed2024, #ed2024)',
    quote:
      '"The reels they create are incredible. Our reach on Instagram went up by 3x in just two months."',
    name: 'Ananya Verma',
    role: 'Marketing Head, UrbanBite',
  },
  {
    letter: 'K',
    gradient: 'linear-gradient(135deg, #333, #666)',
    quote:
      '"Finally, a team that understands branding. Our social media has never looked this good."',
    name: 'Karan Joshi',
    role: 'Co-founder, StyleCraft Studios',
  },
]

const AUTO_INTERVAL = 5000

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const timerRef = useRef(null)
  const ref = useScrollReveal()

  const goTo = (i) => {
    setActive(i)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), AUTO_INTERVAL)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), AUTO_INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [])

  const slide = SLIDES[active]
  const progress = ((active + 1) / SLIDES.length) * 100

  return (
    <section className="testimonials-section" id="testimonials" ref={ref}>
      <div className="container">
        <div className="testimonial-layout reveal">
          <div className="testimonial-left">
            <div className="section-badge">⭐ TESTIMONIALS</div>
            <h2 className="section-title">
              What our<br />clients <span className="text-gradient">say</span>
            </h2>
            <p className="section-subtitle" style={{ marginTop: '16px' }}>
              Real feedback from brands we've worked with. Their growth speaks for itself.
            </p>
          </div>

          <div className="testimonial-right">
            <div className="testimonial-avatars">
              {SLIDES.map((s, i) => (
                <button
                  key={i}
                  className={`t-avatar${active === i ? ' active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`${s.name} testimonial`}
                >
                  <span className="t-avatar-letter" style={{ background: s.gradient }}>
                    {s.letter}
                  </span>
                </button>
              ))}
            </div>

            <div className="testimonial-slider">
              <div className="t-slide active">
                <p className="t-quote">{slide.quote}</p>
                <div className="t-author">
                  <span className="t-name">{slide.name}</span>,{' '}
                  <span className="t-role">{slide.role}</span>
                </div>
              </div>
            </div>

            <div className="t-progress">
              <div
                className="t-progress-bar"
                style={{ width: `${progress}%`, transition: 'width 0.4s ease' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
