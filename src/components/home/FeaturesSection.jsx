import { useScrollReveal } from '@/hooks/useScrollReveal'

const features = [
  { num: '01', title: 'Professional Social Media Designs', desc: 'Eye-catching posts that align with your brand guidelines and captivate your audience.' },
  { num: '02', title: 'Engaging Reels for Your Brand', desc: 'Scroll-stopping short videos that boost engagement and grow your reach on Instagram.' },
  { num: '03', title: 'Captions (In Selected Plans)', desc: 'Thoughtfully written captions with relevant hashtags that complement your visuals.' },
  { num: '04', title: 'Consistent Brand Identity', desc: 'Every design follows your colors, fonts, and tone—so your feed looks cohesive.' },
  { num: '05', title: 'Ready-to-Post Monthly Content', desc: 'Your content calendar, designed and delivered—just download, schedule, and post.' },
  { num: '06', title: 'Fast Turnaround Time', desc: 'Most designs are delivered within 48 hours, so you never miss a posting schedule.' },
]

export default function FeaturesSection() {
  const ref = useScrollReveal()

  return (
    <section className="features-section" id="features" ref={ref}>
      <div className="container">
        <div className="features-layout">
          <div className="features-left">
            <div className="section-badge">🎯 WHAT YOU GET</div>
            <h2 className="section-title">
              Everything you need to stay active and{' '}
              <span className="text-gradient">look professional</span>
            </h2>
            <p className="section-subtitle">
              From design to delivery, we cover every aspect of your brand's social media presence.
            </p>
          </div>
          <div className="features-right">
            {features.map((f, i) => (
              <div key={f.num} className="feature-card scroll-card" data-index={i}>
                <div className="feature-number">{f.num}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
