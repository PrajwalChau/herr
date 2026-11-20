import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Flower2, Music2, Pause, Play, Volume2 } from 'lucide-react'
import Envelope from './components/Envelope.jsx'
import Letter from './components/Letter.jsx'
import PhotoGallery from './components/PhotoGallery.jsx'
import FlowerGarden from './components/FlowerGarden.jsx'
import LittleQuestion from './components/LittleQuestion.jsx'
import FinalMessage from './components/FinalMessage.jsx'
import ProgressIndicator from './components/ProgressIndicator.jsx'

const paths = ['envelope', 'the-letter', 'photo-scrapbook', 'botanical-garden', 'little-question', 'the-last-page']

function getInitialStep() {
  const hash = window.location.hash.replace('#/', '').replace('#', '')
  const index = paths.indexOf(hash)
  return index >= 0 ? index : 0
}

export default function App() {
  const [step, setStep] = useState(getInitialStep)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.35)
  const audioRef = useRef(null)

  const navigate = (nextStep) => {
    if (nextStep < 0 || nextStep >= paths.length) return
    setStep(nextStep)
    window.history.replaceState(null, '', `#/${paths[nextStep]}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    window.history.replaceState(null, '', `#/${paths[step]}`)
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    document.documentElement.dataset.reducedMotion = media.matches ? 'true' : 'false'
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume

    const tryStart = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch {
        setIsPlaying(false)
      }
    }

    tryStart()

    const startOnInteraction = () => {
      if (audio.paused) tryStart()
      window.removeEventListener('pointerdown', startOnInteraction)
      window.removeEventListener('touchstart', startOnInteraction)
      window.removeEventListener('keydown', startOnInteraction)
    }

    window.addEventListener('pointerdown', startOnInteraction, { passive: true })
    window.addEventListener('touchstart', startOnInteraction, { passive: true })
    window.addEventListener('keydown', startOnInteraction)

    return () => {
      window.removeEventListener('pointerdown', startOnInteraction)
      window.removeEventListener('touchstart', startOnInteraction)
      window.removeEventListener('keydown', startOnInteraction)
    }
  }, [])

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      return
    }
    try {
      await audio.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }

  const screens = [
    <Envelope onNext={() => navigate(1)} />,
    <Letter onNext={() => navigate(2)} onBack={() => navigate(0)} />,
    <PhotoGallery onNext={() => navigate(3)} onBack={() => navigate(1)} />,
    <FlowerGarden onNext={() => navigate(4)} onBack={() => navigate(2)} />,
    <LittleQuestion onNext={() => navigate(5)} onBack={() => navigate(3)} />,
    <FinalMessage onRestart={() => navigate(0)} onBack={() => navigate(4)} />,
  ]

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand"><Flower2 size={20} /><div><strong>A Letter for Sanjana</strong><small>Anno Domini • Keepsake Folio</small></div></div>
        <ProgressIndicator step={step} onNavigate={navigate} />
      </header>

      <audio ref={audioRef} src="/music/letter-music.m4a" loop preload="auto" autoPlay />
      <div className="music-player" aria-label="Background music controls">
        <button type="button" className="music-toggle" onClick={toggleMusic} aria-label={isPlaying ? 'Pause music' : 'Play music'}>
          <Music2 size={16} />
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <label className="volume-control">
          <Volume2 size={15} />
          <input type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => setVolume(Number(event.target.value))} aria-label="Music volume" />
        </label>
      </div>

      <main className="folio-main">
        <div className="folio-frame">
          <div className="folio-ribbon" aria-hidden="true" />
          <div className="folio-inner">
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.42 }}>
                {screens[step]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  )
}
