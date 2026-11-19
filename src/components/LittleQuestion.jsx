import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Flower2 } from 'lucide-react'

const choices = [
  { id: 'rose', name: 'Rose', icon: '🌹', detail: 'A little romantic.', response: 'A timeless classic—may your day carry quiet poetry and warmth.' },
  { id: 'daisy', name: 'Daisy', icon: '🌼', detail: 'Simple and cheerful.', response: 'Lighthearted and effortless—here’s to sunshine and spontaneous laughter.' },
  { id: 'tulip', name: 'Tulip', icon: '🌷', detail: 'Quietly beautiful.', response: 'Graceful and contemplative—a day for cozy corners and cherished thoughts.' },
  { id: 'sunflower', name: 'Sunflower', icon: '🌻', detail: 'Full of sunshine.', response: 'Bright, radiant energy that turns toward warmth wherever it goes.' },
]

export default function LittleQuestion({ onNext, onBack }) {
  const [selected, setSelected] = useState(null)
  const choice = choices.find((item) => item.id === selected)

  return (
    <motion.div className="screen-stage question-stage" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <div className="question-card">
        <span className="eyebrow"><Flower2 size={16} /> Intimate query <Flower2 size={16} /></span>
        <h1>One little question...</h1>
        <p className="question-copy">“If today were a flower, which one would it be?”</p>
        <div className="choice-grid">
          {choices.map((item) => (
            <button key={item.id} type="button" className={`choice-card ${selected === item.id ? 'selected' : ''}`} onClick={() => setSelected(item.id)} aria-pressed={selected === item.id}>
              <span className="choice-icon">{item.icon}</span>
              <strong>{item.name}</strong>
              <small>{item.detail}</small>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {choice ? (
            <motion.div key={choice.id} className="flower-response" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <span>{choice.icon}</span>
              <div><strong>{choice.name}</strong><p>{choice.response}</p></div>
            </motion.div>
          ) : (
            <motion.div key="idle" className="idle-response" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>No flower selected yet...</motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="stage-nav">
        <button type="button" className="text-button" onClick={onBack}><ArrowLeft size={18} /> IV. Pressed Flora</button>
        <button type="button" className="primary-button" onClick={onNext} disabled={!selected}>To the last page <ArrowRight size={18} /></button>
      </div>
    </motion.div>
  )
}
