'use client'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const ImageCarousel = dynamic(() => import('@/components/ImageCarousel'), {
  ssr: false,
})

export default function ImageCarouselWrapper() {
  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7242/ingest/880c9da5-111c-4908-a21d-54ca7c959f70',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ImageCarouselWrapper.tsx:useEffect',message:'Wrapper component mounted',data:{clientSide:typeof window!=='undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'A'})}).catch(()=>{});
  }, []);
  // #endregion
  return <ImageCarousel />
}
