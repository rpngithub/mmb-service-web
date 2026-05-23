const clients = [
  { src: '/images/clients/Buysellgg.png', alt: 'Buysell GG' },
  { src: '/images/clients/Buysellje.png', alt: 'Buysell JE' },
  // { src: '/images/clients/BYT.png', alt: 'BYT' },
  // { src: '/images/clients/cavinkare_logo.png', alt: 'Cavinkare' },
  { src: '/images/clients/channels4_profile.png', alt: 'Client brand' },
  { src: '/images/clients/Cuisineje.png', alt: 'Cuisine JE' },
  { src: '/images/clients/DATABASE BACKUP & REFRESH.png', alt: 'Database Backup and Refresh' },
  { src: '/images/clients/Dia care.png', alt: 'Dia Care' },
  { src: '/images/clients/E VERIFICATION.png', alt: 'E Verification' },
  { src: '/images/clients/E-Finhub.png', alt: 'E-Finhub' },
  // { src: '/images/clients/Eicher tmtl.png', alt: 'Eicher TMTL' },
  // { src: '/images/clients/Eicher Tractors.png', alt: 'Eicher Tractors' },
  // { src: '/images/clients/esh logo.png', alt: 'ESH' },
  { src: '/images/clients/FunnR.png', alt: 'FunnR' },
  { src: '/images/clients/gsquarehousing_logo.png', alt: 'G Square Housing' },
  { src: '/images/clients/HP.png', alt: 'HP' },
  { src: '/images/clients/indiashoppe.png', alt: 'India Shoppe' },
  // { src: '/images/clients/Lucky land.png', alt: 'Lucky Land' },
  // { src: '/images/clients/Massey.png', alt: 'Massey' },
  { src: '/images/clients/MED.png', alt: 'MED' },
  { src: '/images/clients/MER.png', alt: 'MER' },
  // { src: '/images/clients/Moldtek.png', alt: 'Moldtek' },
  { src: '/images/clients/Oneshop.png', alt: 'Oneshop' },
  { src: '/images/clients/PC.png', alt: 'PC' },
  { src: '/images/clients/REGULATORY REPORTING SOLUTION.png', alt: 'Regulatory Reporting Solution' },
  { src: '/images/clients/soundsgood.png', alt: 'Sounds Good' },
  { src: '/images/clients/Superpowa.png', alt: 'Superpowa' },
  { src: '/images/clients/SymptomsMonitor.png', alt: 'Symptoms Monitor' },
  { src: '/images/clients/SYSTEM MONITOR.png', alt: 'System Monitor' },
  { src: '/images/clients/The Digital Fifth.png', alt: 'The Digital Fifth' },
  { src: '/images/clients/winson capital.png', alt: 'Winson Capital' },

  { src: '/images/clients/academy.png', alt: 'Academy' },
  { src: '/images/clients/brex.png', alt: 'Brex' },
  { src: '/images/clients/eleven.png', alt: 'Eleven' },
  { src: '/images/clients/harvard.png', alt: 'Harvard University' },
  { src: '/images/clients/img.png', alt: 'IMG Academy' },
  { src: '/images/clients/wise.png', alt: 'Wise' },

]

export default function ClientLogos() {
  return (
    <section className="client-logos-section" aria-label="Client logos">
      <div className="container">
        <div className="client-logos-header reveal">
          <div className="section-badge">Trusted by Growing Brands</div>
        </div>
      </div>
      <div className="client-logo-marquee" aria-label="Client logos">
        <div className="client-logo-track">
          {clients.map((c) => (
            <div key={c.alt} className="client-logo-item">
              <img src={c.src} alt={c.alt} loading="lazy" />
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {clients.map((c) => (
            <div key={`dup-${c.alt}`} className="client-logo-item" aria-hidden="true">
              <img src={c.src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
