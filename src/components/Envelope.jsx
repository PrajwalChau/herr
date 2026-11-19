import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Heart, Mail } from 'lucide-react'

export default function Envelope({ onNext }) {
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    if (!opened) return
    const timer = window.setTimeout(() => setOpened(true), 700)
    return () => window.clearTimeout(timer)
  }, [])

  const openLetter = () => setOpened(true)

  return (
    <div className="screen-stage envelope-stage">
      <div className="petal-field" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => <span key={i} className="falling-petal" />)}
      </div>

      <motion.div className="envelope-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="stamp"><span>POST</span><span>1884</span><Mail size={28} /><small>L'AMOUR PUR</small></div>
        <div className="letter-flourish left" aria-hidden="true">❧</div>
        <div className="letter-flourish right" aria-hidden="true">❧</div>

        <div className="envelope-copy">
          <span className="eyebrow"><Heart size={12} fill="currentColor" /> To my muse <Heart size={12} fill="currentColor" /></span>
          <h1>To Sanjana,</h1>
          <p>“A little something I wanted you to find...”</p>
          <small>tucked between the pages of memory and quiet sunlight</small>
        </div>

        <div className="envelope-wrap" aria-label="Vintage envelope">
          <motion.div
            className="envelope-flap"
            animate={opened ? { rotateX: 180, opacity: 0.25 } : { rotateX: 0, opacity: 1 }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
          />
          <motion.button
            className="wax-seal"
            type="button"
            onClick={openLetter}
            animate={opened ? { scale: [1, 1.18, 0], opacity: [1, 1, 0], rotate: 18 } : { scale: 1 }}
            transition={{ duration: 0.75 }}
            aria-label="Open the letter"
          >
            <span>S</span><Heart size={12} fill="currentColor" />
          </motion.button>
        </div>

        <AnimatePresence>
          {opened && (
            <motion.div className="sealed-note" initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.55 }}>
              <p>The red wax has yielded. The letter is ready.</p>
              <button type="button" className="primary-button" onClick={onNext}>Open &amp; continue <ArrowRight size={18} /></button>
            </motion.div>
          )}
        </AnimatePresence>

        {!opened && (
          <button type="button" className="primary-button open-button" onClick={openLetter}>Open the letter <ArrowRight size={18} /></button>
        )}
      </motion.div>
    </div>
  )
}
