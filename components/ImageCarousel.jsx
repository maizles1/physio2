'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Image from 'next/image'

const images = [
  '/images/carousel/clinic-1.jpeg',
  '/images/carousel/clinic-2.jpeg',
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
                  <div className="flex items-center justify-center h-[400px] sm:h-[500px] md:h-[550px] w-full relative">
                    <Image
                      src={src}
                      alt={`תמונת קליניקה ${index + 1}`}
                      width={1200}
                      height={800}
                      className="max-w-full max-h-full object-contain"
                      priority={index === 0}
                      unoptimized
                      onError={(e) => {
                        console.error(`Failed to load image: ${src}`, e)
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
