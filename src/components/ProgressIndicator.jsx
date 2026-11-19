import React from 'react'

const labels = ['Envelope', 'Letter', 'Keepsakes', 'Garden', 'Question', 'Epilogue']

export default function ProgressIndicator({ step, onNavigate }) {
  return (
    <nav className="progress-nav" aria-label="Letter chapters">
      {labels.map((label, index) => (
        <button
          key={label}
          type="button"
          className={`progress-dot ${index === step ? 'active' : ''}`}
          onClick={() => onNavigate(index)}
          aria-label={`Go to ${index + 1}. ${label}`}
          aria-current={index === step ? 'page' : undefined}
        >
          <span>{index + 1}</span>
          <em>{label}</em>
        </button>
      ))}
    </nav>
  )
}
