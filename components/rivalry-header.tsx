import { competitors, getStandings } from "@/lib/rivalry-data"

function CompetitorBlock({
  side,
  leading,
}: {
  side: "alex" | "sam"
  leading: boolean
}) {
  const c = competitors[side]
  const isOne = side === "alex"
  const ring = isOne ? "ring-rival-one/30" : "ring-rival-two/30"
  const bg = isOne ? "bg-rival-one" : "bg-rival-two"
  const fg = isOne ? "text-rival-one-foreground" : "text-rival-two-foreground"

  return (
    <div
      className={`flex flex-1 flex-col items-center gap-3 text-center ${
        isOne ? "sm:items-end sm:text-right" : "sm:items-start sm:text-left"
      }`}
    >
      <div className="relative">
        <div
          className={`flex size-16 items-center justify-center rounded-full font-display text-xl font-bold ring-4 ${ring} ${bg} ${fg} sm:size-20 sm:text-2xl`}
          aria-hidden="true"
        >
          {c.initials}
        </div>
        {leading && (
          <span
            className={`absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${bg} ${fg}`}
          >
            Leading
          </span>
        )}
      </div>
      <div className={leading ? "mt-1" : ""}>
        <h2 className="font-display text-2xl font-bold leading-none tracking-tight text-balance sm:text-3xl">
          {c.name}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{c.handle}</p>
        <p
          className={`mt-2 text-xs font-semibold uppercase tracking-wider ${
            isOne ? "text-rival-one" : "text-rival-two"
          }`}
        >
          {c.tagline}
        </p>
      </div>
    </div>
  )
}

export function RivalryHeader() {
  const s = getStandings()

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Head-to-Head · Season 2026/2027
        </p>
        <h1 className="mt-2 text-center font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
          Snídaňový boj
        </h1>

        <div className="mt-8 flex items-center justify-between gap-4 sm:gap-8">
          <CompetitorBlock side="alex" leading={s.leader === "alex"} />

          <div className="flex shrink-0 flex-col items-center gap-2">
            <div className="flex items-baseline gap-2 font-display text-3xl font-bold sm:text-5xl">
              <span className="text-rival-one">{s.alex}</span>
              <span className="text-lg text-muted-foreground sm:text-2xl">
                {"–"}
              </span>
              <span className="text-rival-two">{s.sam}</span>
            </div>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
              VS
            </span>
          </div>

          <CompetitorBlock side="sam" leading={s.leader === "sam"} />
        </div>

        {!s.started && (
          <div className="mt-8 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-border bg-secondary/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="size-1.5 rounded-full bg-muted-foreground" aria-hidden="true" />
              Not started · 0 of {s.total} played
            </span>
          </div>
        )}
      </div>
    </header>
  )
}
