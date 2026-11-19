import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Flower2 } from 'lucide-react'

export default function Letter({ onNext, onBack }) {
  return (
    <motion.div className="screen-stage letter-stage" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <div className="page-heading">
        <span>Page II • Handwritten Notes</span>
        <span>Postmark: Meridian Post</span>
      </div>
      <article className="letter-sheet">
        <div className="postal-mark"><Flower2 /><span>ROYAL<br/>SPECIAL POST</span></div>
        <div className="letter-botanical letter-botanical-left" aria-hidden="true">❧</div>
        <div className="letter-botanical letter-botanical-right" aria-hidden="true">❧</div>

        <h1>Hey Sanjana! 🌷</h1>
        <div className="handwritten-body">
          <p>Okay, first of all, you might be wondering why someone made an entire website just to say hello. 😂</p>
          <p>Well, here's the story.</p>
          <p>I came across your TikTok profile randomly, and honestly, my first thought was, <span className="playful-line">&quot;She's cute!&quot;</span> Something about your vibe caught my attention, so I thought, why not try saying hello?</p>
          <p>I'm usually not the person who randomly DMs girls, <span className="nepali-line">tara timro profile dekhepachi chai ekchoti kura garna man lagyo.</span> You seemed a little different from the usual profiles I come across.</p>
          <p>I know we're complete strangers right now, and I'm not going to pretend we know each other. But I'd genuinely like to change that.</p>
          <p>By the way, <span className="nepali-line">euta kura sodhna man lagyo</span> — are you single, or is someone already lucky enough to have your attention? 😂</p>
          <p>And don't worry, I'm not here with some dramatic love story. Let's start with a simple friendship first. <span className="nepali-line">Mero yo sano effort le at least timro friend banna paune chance ta paos.</span> Baki kura ta chinjan bhayepachi heramla. ;)</p>
          <p>Anyway, that's pretty much it. Just a little introduction from someone who thought you seemed interesting.</p>
          <p className="quiet-line letter-question">So, what do you say? Friends?</p>
        </div>
        <div className="signature">
          <p>P.S. I hope this little website made you smile. Have a lovely day! 🌻</p>
        </div>
      </article>
      <div className="stage-nav">
        <button type="button" className="text-button" onClick={onBack}><ArrowLeft size={18} /> I. Return to envelope</button>
        <button type="button" className="primary-button" onClick={onNext}>Turn the page <ArrowRight size={18} /></button>
      </div>
    </motion.div>
  )
}
