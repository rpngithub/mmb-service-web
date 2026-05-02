import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function VisionSection() {
  const ref = useScrollReveal()

  return (
    <section className="vision-section" id="vision" ref={ref}>
      <div className="container">
        <div className="section-badge reveal">🚀 COMING SOON</div>
        <h2 className="section-title reveal stagger-1">
          More than just a <span className="text-gradient">service</span>
        </h2>
        <p className="section-subtitle reveal stagger-2" style={{ margin: '0 auto' }}>
          We're building a platform that puts you in control of your brand's social media.
        </p>

        <div className="vision-features">
          <div className="vision-card reveal stagger-1">
            <div className="vision-icon">✏️</div>
            <h3>Edit Your Designs</h3>
            <p>Make quick tweaks and edits to your creatives right from your dashboard.</p>
          </div>
          <div className="vision-card reveal stagger-2">
            <div className="vision-icon">🧩</div>
            <h3>Customize Templates</h3>
            <p>Access a library of templates and customize them to fit your brand's style.</p>
          </div>
          <div className="vision-card reveal stagger-3">
            <div className="vision-icon">📲</div>
            <h3>Publish Directly</h3>
            <p>Schedule and publish your posts directly to social media—all from one platform.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
