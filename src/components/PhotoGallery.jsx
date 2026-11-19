import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ImageOff } from 'lucide-react'

const photoCount = 53

const photos = Array.from({ length: photoCount }, (_, index) => {
  const number = String(index + 1).padStart(2, '0')
  return {
    src: `/images/sanjana-${number}.webp`,
    caption: 'A preserved moment of quiet light',
  }
})

function Polaroid({ photo, index }) {
  const [missing, setMissing] = useState(false)
  return (
    <motion.figure
      className={`polaroid polaroid-${index + 1}`}
      initial={{ opacity: 0, y: 24, rotate: index % 2 ? 4 : -4 }}
      animate={{ opacity: 1, y: 0, rotate: index % 2 ? 2 : -2 }}
      transition={{ delay: Math.min(index * 0.06, 0.9), duration: 0.7 }}
    >
      <div className="tape" />
      <div className="photo-window">
        {missing ? (
          <div className="photo-placeholder"><ImageOff size={28} /><span>Approved photograph unavailable</span></div>
        ) : (
          <img src={photo.src} alt="A privately approved keepsake" loading="lazy" onError={() => setMissing(true)} />
        )}
      </div>
      <figcaption>{photo.caption}<small>Artifact • N° {String(index + 1).padStart(2, '0')}</small></figcaption>
    </motion.figure>
  )
}

export default function PhotoGallery({ onNext, onBack }) {
  return (
    <motion.div className="screen-stage gallery-stage" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="gallery-heading">
        <span>Folio Fascicle • Keepsakes</span>
        <h1>A few little snapshots</h1>
        <p>{photoCount} small moments, pressed like flowers between the pages.</p>
      </div>
      <div className="polaroid-grid">
        {photos.map((photo, index) => <Polaroid key={photo.src} photo={photo} index={index} />)}
      </div>
      <div className="stage-nav">
        <button type="button" className="text-button" onClick={onBack}><ArrowLeft size={18} /> II. The Letter</button>
        <button type="button" className="primary-button" onClick={onNext}>Enter the garden <ArrowRight size={18} /></button>
      </div>
    </motion.div>
  )
}
