import type { ReactNode } from 'react'

interface AuthLayoutProps {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
}

export function AuthLayout({ eyebrow, title, description, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex bg-white">
      <div className="hidden lg:flex lg:w-1/2 relative bg-brand overflow-hidden flex-col justify-between p-12 text-white">
        <div className="relative z-10">
          <span className="font-sans text-sm tracking-widest uppercase text-white/70">
            Student Dispensary
          </span>
        </div>

        <div className="relative z-10 max-w-md">
          <p className="font-sans text-sm tracking-widest uppercase text-accent mb-4">
            {eyebrow}
          </p>
          <h1 className="font-display text-5xl leading-[1.05] font-semibold mb-6">
            {title}
          </h1>
          <p className="font-sans text-white/80 text-base leading-relaxed">
            {description}
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 font-sans text-xs text-white/50 tracking-wide">
          <span>Every symptom logged</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span>Every dose accounted for</span>
        </div>

        <PulseLine />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8">
            <span className="font-sans text-sm tracking-widest uppercase text-brand">
              Student Dispensary
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

function PulseLine() {
  return (
    <svg
      className="absolute bottom-0 left-0 w-full h-40 opacity-90 pointer-events-none"
      viewBox="0 0 600 160"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,110 L140,110 L165,40 L190,140 L215,80 L240,110 L420,110 L445,60 L470,120 L495,110 L600,110"
        fill="none"
        stroke="#F2A93B"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        className="motion-safe:animate-pulse-draw"
      />
    </svg>
  )
}