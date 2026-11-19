import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Heart, MessageCircle, RotateCcw, X } from 'lucide-react'

export default function FinalMessage({ onRestart, onBack }) {
  const [showProposal, setShowProposal] = useState(false)
  const [showTikTok, setShowTikTok] = useState(false)
  const tiktokLink = import.meta.env.VITE_TIKTOK_MESSAGE_LINK || 'https://www.tiktok.com/messages'

  return (
    <motion.div className="screen-stage final-stage" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <div className="final-sheet">
        <div className="final-mark">EPILOGUE • FINIS</div>
        <div className="final-content">
          <h1>And that’s the end of this little letter.</h1>
          <p>No grand occasion.<br />No complicated reason.</p>
          <p>Just a little creation I thought might brighten your day.</p>
          <strong>Hope it made you smile.</strong>
          <div className="final-signature">Until next time…</div>
        </div>
        <div className="wax-ribbon">
          <div className="mini-wax"><span>♥</span></div>
          <div><b>A keepsake for evermore</b><small>Preserved in amber memories.</small></div>
          <div className="final-actions">
            <button type="button" className="primary-button" onClick={() => setShowProposal(true)}><Heart size={18} /> One little proposal</button>
            <button type="button" className="text-button" onClick={() => setShowTikTok(true)}><MessageCircle size={18} /> Write a TikTok message</button>
            <button type="button" className="text-button" onClick={onRestart}><RotateCcw size={16} /> Reopen from the beginning</button>
          </div>
        </div>
      </div>
      <button type="button" className="text-button final-back" onClick={onBack}><ArrowLeft size={18} /> V. Whispered Query</button>

      <AnimatePresence>
        {showProposal && (
          <motion.div className="reply-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="One little proposal">
            <motion.div className="reply-modal" initial={{ scale: 0.96, y: 12 }} animate={{ scale: 1, y: 0 }}>
              <button type="button" className="modal-close" onClick={() => setShowProposal(false)} aria-label="Close"><X size={18} /></button>
              <span className="eyebrow"><Heart size={14} /> A small question <Heart size={14} /></span>
              <h2>Could we write the next little chapter together?</h2>
              <p>A cup of tea, a quiet conversation, or simply one honest hello—nothing has to be complicated.</p>
              <a className="primary-button modal-link" href={tiktokLink} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Reply on TikTok</a>
              <button type="button" className="text-button modal-dismiss" onClick={() => setShowProposal(false)}>Maybe another moment</button>
            </motion.div>
          </motion.div>
        )}

        {showTikTok && (
          <motion.div className="reply-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Write a TikTok message">
            <motion.div className="reply-modal" initial={{ scale: 0.96, y: 12 }} animate={{ scale: 1, y: 0 }}>
              <button type="button" className="modal-close" onClick={() => setShowTikTok(false)} aria-label="Close"><X size={18} /></button>
              <span className="eyebrow">Send a gentle note</span>
              <h2>Write on TikTok</h2>
              <p>Open your TikTok messages and send the little note you would like to share.</p>
              <a className="primary-button modal-link" href={tiktokLink} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Open TikTok messages</a>
              <button type="button" className="text-button modal-dismiss" onClick={() => setShowTikTok(false)}>Quietly dismiss</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
