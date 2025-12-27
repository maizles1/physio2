'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const images = [
  '/images/carousel/clinic-1.jpg',
  '/images/carousel/clinic-2.jpg',
  '/images/carousel/clinic-3.jpg',
  '/images/carousel/clinic-4.jpg',
  '/images/carousel/clinic-5.jpg',
]

export default function ImageCarousel() {
  return (
    <section className="section-spacing bg-gray-50">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-6 sm:mb-8 text-primary-dark">
            ג'ודו מהעולם
          </h2>
          
          <div className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-xl sm:shadow-2xl w-full h-[400px] sm:h-[500px] md:h-[550px] bg-gray-200">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              dir="rtl"
              className="h-full w-full"
              style={{ direction: 'rtl' }}
            >
              {images.map((src, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-[400px] sm:h-[500px] md:h-[550px] flex items-center justify-center bg-gray-200">
                    <img
                      key={src}
                      src={src}
                      alt={`תמונת קליניקה ${index + 1}`}
                      className="max-w-full max-h-full w-auto h-auto object-contain"
                      loading={index <= 1 ? 'eager' : 'lazy'}
                      style={{ display: 'block' }}
                      onError={(e) => {
                        console.error(`Failed to load image ${index + 1}: ${src}`, e)
                        const target = e.target
                        if (target instanceof HTMLImageElement) {
                          target.style.display = 'none'
                        }
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  )
}


