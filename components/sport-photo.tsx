"use client"

import { useEffect, useState } from "react"
import { ImageIcon } from "lucide-react"

export function SportPhoto({
  src,
  sport,
}: {
  src?: string
  sport: string
}) {
  const [open, setOpen] = useState(false)
  const [entered, setEntered] = useState(false)

  // Trigger the enter animation on the next frame after mount.
  useEffect(() => {
    if (!open) {
      setEntered(false)
      return
    }
    const id = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(id)
  }, [open])

  // Lock scroll and allow Escape to close while the preview is open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  if (!src) {
    return (
      <span
        className="flex h-12 w-12 items-center justify-center rounded-lg border border-dashed border-border bg-secondary/50 text-muted-foreground"
        aria-label="No photo available"
      >
        <ImageIcon className="h-4 w-4" aria-hidden="true" />
      </span>
    )
  }

  return (
    <>
      <button
        type="button"
        // Desktop: hover to preview. Mobile/touch: tap to preview.
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen(true)}
        className="group relative h-12 w-12 overflow-hidden rounded-lg border border-border bg-secondary outline-none ring-ring transition-transform hover:scale-105 focus-visible:ring-2"
        aria-label={`View larger photo for ${sport}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src || "/placeholder.svg"}
          alt={`${sport} photo`}
          className="h-full w-full object-cover"
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${sport} photo preview`}
          onClick={() => setOpen(false)}
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-out sm:p-8 ${
            entered ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Dark semi-transparent backdrop */}
          <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />

          {/* Centered enlarged image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src || "/placeholder.svg"}
            alt={`${sport} enlarged photo`}
            onClick={(e) => e.stopPropagation()}
            className={`relative max-h-[90vh] max-w-[90vw] rounded-2xl border border-border object-contain shadow-2xl transition-all duration-300 ease-out ${
              entered ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          />
        </div>
      )}
    </>
  )
}
