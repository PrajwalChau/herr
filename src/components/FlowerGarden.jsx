import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Sparkles, Wind } from 'lucide-react'

const flowers = [
  { name: 'Rosa damascena', type: 'rose', icon: '🌹', note: 'Devotion, kept beneath a velvet ribbon.' },
  { name: 'Bellis perennis', type: 'daisy', icon: '🌼', note: 'Unpretentious and gently radiant.' },
  { name: 'Tulipa gesneriana', type: 'tulip', icon: '🌷', note: 'Patience and undaunted grace.' },
  { name: 'Helianthus annuus', type: 'sunflower', icon: '🌻', note: 'Turning always toward the warmth.' },
]

export default function FlowerGarden({ onNext, onBack }) {
  const [grown, setGrown] = useState([])
  const [breeze, setBreeze] = useState(0)

  const grow = (type) => setGrown((current) => current.includes(type) ? current : [...current, type])

  return (
    <motion.div className="screen-stage garden-stage" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="garden-particles" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => <span key={i} className="garden-petal" />)}
        <span className="butterfly butterfly-one">♧</span><span className="butterfly butterfly-two">♧</span>
      </div>
      <div className="gallery-heading garden-heading">
        <span>Fascicle IV • Botanical Plates</span>
        <h1>A garden of little things</h1>
        <p>Tap a bloom to help it unfurl.</p>
      </div>
      <div className="flower-grid">
        {flowers.map((flower, index) => {
          const isGrown = grown.includes(flower.type)
          return (
            <motion.button
              type="button"
              key={flower.type}
              className={`flower-specimen flower-${flower.type}`}
              onClick={() => grow(flower.type)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              aria-pressed={isGrown}
            >
              <div className="specimen-label">Plate {String(index + 1).padStart(2, '0')}</div>
              <motion.span className="grown-flower" animate={isGrown ? { scale: [0.4, 1.18, 1], rotate: [0, 8, 0] } : { scale: 0.72 }} transition={{ duration: 0.7 }}>
                {flower.icon}
              </motion.span>
              <h2>{flower.name}</h2>
              <p>{isGrown ? flower.note : 'Touch to encourage growth'}</p>
            </motion.button>
          )
        })}
      </div>
      <div className="garden-toolbar">
        <span><Sparkles size={16} /> {grown.length} / 4 specimens awakened</span>
        <button type="button" className="breeze-button" onClick={() => setBreeze((value) => value + 1)}><Wind size={18} /> Invite gentle breeze</button>
      </div>
      {breeze > 0 && <div key={breeze} className="breeze-wave" aria-hidden="true" />}
      <div className="stage-nav">
        <button type="button" className="text-button" onClick={onBack}><ArrowLeft size={18} /> III. Keepsakes</button>
        <button type="button" className="primary-button" onClick={onNext}>The little question <ArrowRight size={18} /></button>
      </div>
    </motion.div>
  )
}
