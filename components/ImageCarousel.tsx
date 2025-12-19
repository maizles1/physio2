'use client'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useEffect, useRef } from 'react'

export default function ImageCarousel() {
  const sliderRef = useRef<Slider>(null)
  
  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7242/ingest/880c9da5-111c-4908-a21d-54ca7c959f70',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ImageCarousel.tsx:useEffect',message:'Component mounted on client',data:{hasWindow:typeof window!=='undefined',hasDocument:typeof document!=='undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'A'})}).catch(()=>{});
    
    // Check if slick classes exist in DOM after a delay
    setTimeout(() => {
      const slickElements = document.querySelectorAll('.slick-slide, .slick-list, .slick-track');
      fetch('http://127.0.0.1:7242/ingest/880c9da5-111c-4908-a21d-54ca7c959f70',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ImageCarousel.tsx:useEffect:setTimeout',message:'Checking slick DOM elements',data:{slickSlideCount:slickElements.length,slickClasses:Array.from(slickElements).map(el=>el.className)},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'C'})}).catch(()=>{});
    }, 1000);
  }, []);
  
  fetch('http://127.0.0.1:7242/ingest/880c9da5-111c-4908-a21d-54ca7c959f70',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ImageCarousel.tsx:6',message:'ImageCarousel component rendering',data:{sliderExists:typeof Slider!=='undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'A'})}).catch(()=>{});
  // #endregion

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

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/880c9da5-111c-4908-a21d-54ca7c959f70',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ImageCarousel.tsx:18',message:'Settings configured',data:{settings},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'A'})}).catch(()=>{});
  // #endregion

  // #region agent log
  try {
    fetch('http://127.0.0.1:7242/ingest/880c9da5-111c-4908-a21d-54ca7c959f70',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ImageCarousel.tsx:return',message:'About to render Slider',data:{sliderType:typeof Slider,settingsExist:!!settings},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'A'})}).catch(()=>{});
  } catch (e) {
    fetch('http://127.0.0.1:7242/ingest/880c9da5-111c-4908-a21d-54ca7c959f70',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ImageCarousel.tsx:return',message:'Error before render',data:{error:String(e)},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
  }
  // #endregion

  return (
    <section className="section-spacing bg-gray-50">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-6 sm:mb-8 text-primary-dark">
            הקליניקה שלנו
          </h2>
          
          <div className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-xl sm:shadow-2xl w-full h-[400px] sm:h-[500px] md:h-[550px] bg-gray-200">
            <Slider {...settings} ref={sliderRef}>
              <div className="flex items-center justify-center h-[400px] sm:h-[500px] md:h-[550px]">
                <img 
                  src="/images/carousel/clinic-1.jpg" 
                  alt="תמונת קליניקה 1" 
                  className="max-w-full max-h-full object-contain"
                  // #region agent log
                  onLoad={() => fetch('http://127.0.0.1:7242/ingest/880c9da5-111c-4908-a21d-54ca7c959f70',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ImageCarousel.tsx:img1',message:'Image 1 loaded successfully',data:{src:'/images/carousel/clinic-1.jpg'},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'B'})}).catch(()=>{})}
                  onError={(e) => fetch('http://127.0.0.1:7242/ingest/880c9da5-111c-4908-a21d-54ca7c959f70',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ImageCarousel.tsx:img1',message:'Image 1 failed to load',data:{src:'/images/carousel/clinic-1.jpg',error:String(e.target)},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'B'})}).catch(()=>{})}
                  // #endregion
                />
              </div>
              <div className="flex items-center justify-center h-[400px] sm:h-[500px] md:h-[550px]">
                <img 
                  src="/images/carousel/clinic-2.jpg" 
                  alt="תמונת קליניקה 2" 
                  className="max-w-full max-h-full object-contain"
                  // #region agent log
                  onLoad={() => fetch('http://127.0.0.1:7242/ingest/880c9da5-111c-4908-a21d-54ca7c959f70',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ImageCarousel.tsx:img2',message:'Image 2 loaded successfully',data:{src:'/images/carousel/clinic-2.jpg'},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'B'})}).catch(()=>{})}
                  onError={(e) => fetch('http://127.0.0.1:7242/ingest/880c9da5-111c-4908-a21d-54ca7c959f70',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ImageCarousel.tsx:img2',message:'Image 2 failed to load',data:{src:'/images/carousel/clinic-2.jpg',error:String(e.target)},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'B'})}).catch(()=>{})}
                  // #endregion
                />
              </div>
              <div className="flex items-center justify-center h-[400px] sm:h-[500px] md:h-[550px]">
                <img 
                  src="/images/carousel/clinic-3.jpg" 
                  alt="תמונת קליניקה 3" 
                  className="max-w-full max-h-full object-contain"
                  // #region agent log
                  onLoad={() => fetch('http://127.0.0.1:7242/ingest/880c9da5-111c-4908-a21d-54ca7c959f70',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ImageCarousel.tsx:img3',message:'Image 3 loaded successfully',data:{src:'/images/carousel/clinic-3.jpg'},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'B'})}).catch(()=>{})}
                  onError={(e) => fetch('http://127.0.0.1:7242/ingest/880c9da5-111c-4908-a21d-54ca7c959f70',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ImageCarousel.tsx:img3',message:'Image 3 failed to load',data:{src:'/images/carousel/clinic-3.jpg',error:String(e)},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'B'})}).catch(()=>{})}
                  // #endregion
                />
              </div>
              <div className="flex items-center justify-center h-[400px] sm:h-[500px] md:h-[550px]">
                <img 
                  src="/images/carousel/clinic-4.jpg" 
                  alt="תמונת קליניקה 4" 
                  className="max-w-full max-h-full object-contain"
                  // #region agent log
                  onLoad={() => fetch('http://127.0.0.1:7242/ingest/880c9da5-111c-4908-a21d-54ca7c959f70',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ImageCarousel.tsx:img4',message:'Image 4 loaded successfully',data:{src:'/images/carousel/clinic-4.jpg'},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'B'})}).catch(()=>{})}
                  onError={(e) => fetch('http://127.0.0.1:7242/ingest/880c9da5-111c-4908-a21d-54ca7c959f70',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ImageCarousel.tsx:img4',message:'Image 4 failed to load',data:{src:'/images/carousel/clinic-4.jpg',error:String(e)},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'B'})}).catch(()=>{})}
                  // #endregion
                />
              </div>
              <div className="flex items-center justify-center h-[400px] sm:h-[500px] md:h-[550px]">
                <img 
                  src="/images/carousel/clinic-5.jpg" 
                  alt="תמונת קליניקה 5" 
                  className="max-w-full max-h-full object-contain"
                  // #region agent log
                  onLoad={() => fetch('http://127.0.0.1:7242/ingest/880c9da5-111c-4908-a21d-54ca7c959f70',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ImageCarousel.tsx:img5',message:'Image 5 loaded successfully',data:{src:'/images/carousel/clinic-5.jpg'},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'B'})}).catch(()=>{})}
                  onError={(e) => fetch('http://127.0.0.1:7242/ingest/880c9da5-111c-4908-a21d-54ca7c959f70',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ImageCarousel.tsx:img5',message:'Image 5 failed to load',data:{src:'/images/carousel/clinic-5.jpg',error:String(e)},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'B'})}).catch(()=>{})}
                  // #endregion
                />
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </section>
  )
}
