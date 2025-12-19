'use client'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const images = ['clinic-1.jpg', 'clinic-2.jpg', 'clinic-3.jpg', 'clinic-4.jpg', 'clinic-5.jpg']
console.log('Carousel images array:', images)

export default function ImageCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    rtl: true,
  }

  return (
    <section className="section-spacing bg-gray-50">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-6 sm:mb-8 text-primary-dark">
            הקליניקה שלנו
          </h2>
          
          <div className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-xl sm:shadow-2xl w-full h-[400px] sm:h-[500px] md:h-[550px] bg-gray-200">
            <Slider {...settings}>
              {images.map((img, index) => (
                <div key={index} className="flex items-center justify-center h-[400px] sm:h-[500px] md:h-[550px]">
                  <img
                    src={`/images/carousel/${img}`}
                    alt={`תמונת קליניקה ${index + 1}`}
                    className="max-w-full max-h-full object-contain"
                    onLoad={() => console.log(`✅ Image loaded: ${img}`)}
                    onError={(e) => console.error(`❌ Failed to load: ${img}`, e)}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  )
}
