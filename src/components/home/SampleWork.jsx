import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Navigation, Pagination, Autoplay } from 'swiper/modules'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const SAMPLES = [
  { src: '/Portfolio/AI Events.jpg', alt: 'AI Events design' },
  { src: '/Portfolio/AI Studio.jpg', alt: 'AI Studio design' },
  { src: '/Portfolio/Career Guide.jpg', alt: 'Career Guide design' },
  { src: '/Portfolio/Cloth Brand.jpg', alt: 'Cloth Brand design' },
  { src: '/Portfolio/Coffee Brand.jpg', alt: 'Coffee Brand design' },
  { src: '/Portfolio/Design Studio.jpg', alt: 'Design Studio design' },
  { src: '/Portfolio/Food Online.jpg', alt: 'Food Online design' },
  { src: '/Portfolio/Fun School.jpg', alt: 'Fun School design' },
  { src: '/Portfolio/Green Farms.jpg', alt: 'Green Farms design' },
  { src: '/Portfolio/Hand Bags.jpg', alt: 'Hand Bags design' },
  { src: '/Portfolio/Luxuary Furniture.jpg', alt: 'Luxury Furniture design' },
  { src: '/Portfolio/Offers Page.jpg', alt: 'Offers Page design' },
  { src: '/images/sample-1.png', alt: 'Sample design 1' },
  { src: '/images/sample-2.png', alt: 'Sample design 2' },
  { src: '/images/sample-3.png', alt: 'Sample design 3' },
  { src: '/images/sample-4.png', alt: 'Sample design 4' },
  { src: '/images/sample-5.png', alt: 'Sample design 5' },
]

export default function SampleWork() {
  const ref = useScrollReveal()

  return (
    <section className="samples-section" id="samples" ref={ref}>
      <div className="container">
        <div className="samples-label reveal">● Real client work</div>
        <div className="section-badge reveal stagger-1">🎨 SAMPLE WORK</div>
        <h2 className="section-title reveal stagger-2">
          See what we <span className="text-gradient">create</span>
        </h2>
        <p className="section-subtitle reveal stagger-3" style={{ margin: '0 auto' }}>
          From clean, minimal posts to bold, high-impact creatives—we design content that gets attention.
        </p>
      </div>

      <div className="carousel3d-wrap">
        <Swiper
          modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          navigation={{
            prevEl: '.c3d-arrow-left',
            nextEl: '.c3d-arrow-right',
          }}
          pagination={{ el: '.c3d-dots', clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          style={{ paddingBottom: '48px' }}
        >
          {SAMPLES.map((s, i) => (
            <SwiperSlide key={i} style={{ width: '280px' }}>
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                style={{
                  width: '100%',
                  borderRadius: '16px',
                  display: 'block',
                  aspectRatio: '1 / 1',
                  objectFit: 'cover',
                }}
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="c3d-arrow c3d-arrow-left" aria-label="Previous">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <polyline points="15 18 9 12 15 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </button>
        <button className="c3d-arrow c3d-arrow-right" aria-label="Next">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <polyline points="9 6 15 12 9 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </button>
        <div className="c3d-dots" />
      </div>
    </section>
  )
}
