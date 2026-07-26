import { Trophy, Handshake, Flag } from "lucide-react"
import { competitors, getStandings } from "@/lib/rivalry-data"

export function RankingSummary() {
  const s = getStandings()
  const leaderName =
    s.leader === null ? "Dead heat" : competitors[s.leader].name
  const lead = Math.abs(s.alex - s.sam)

  return (
    <section
      aria-labelledby="ranking-heading"
      className="mx-auto mt-10 max-w-4xl px-4"
    >
      <div className="flex items-center justify-between">
        <h2
          id="ranking-heading"
          className="font-display text-lg font-bold uppercase tracking-tight"
        >
          Ongoing Ranking
        </h2>
        <span className="text-sm text-muted-foreground">
          {s.played} of {s.total} played
        </span>
      </div>

      {/* Win share bar */}
      <div className="mt-4 rounded-xl border border-border bg-card p-5">
        <div className="mb-3 flex items-center justify-between text-sm font-semibold">
          <span className="text-rival-one">
            {competitors.alex.name.split(" ")[0]} · {s.alexPct}%
          </span>
          <span className="text-rival-two">
            {s.samPct}% · {competitors.sam.name.split(" ")[0]}
          </span>
        </div>
        <div
          className="flex h-3 w-full overflow-hidden rounded-full bg-secondary"
          role="img"
          aria-label={`Jakub has won ${s.alexPct} percent and Vaclav has won ${s.samPct} percent of decided matches`}
        >
          <div
            className="h-full bg-rival-one"
            style={{ width: `${s.alexPct}%` }}
          />
          <div
            className="h-full bg-rival-two"
            style={{ width: `${s.samPct}%` }}
          />
        </div>
        <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Trophy className="size-4 text-rival-one" aria-hidden="true" />
          {!s.started ? (
            <span>
              The competition <strong>hasn&apos;t started yet</strong> — both
              rivals begin level at <strong className="text-foreground">0:0</strong>.
            </span>
          ) : s.leader === null ? (
            <span>
              The rivals are locked in a <strong>dead heat</strong>.
            </span>
          ) : (
            <span>
              <strong className="text-foreground">{leaderName}</strong> leads by{" "}
              <strong className="text-foreground">
                {lead} {lead === 1 ? "win" : "wins"}
              </strong>
              .
            </span>
          )}
        </p>
      </div>

      {/* Total score summary cards */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          label={`${competitors.alex.name.split(" ")[0]} wins`}
          value={s.alex}
          accent="one"
          icon={<Trophy className="size-4" aria-hidden="true" />}
        />
        <StatCard
          label={`${competitors.sam.name.split(" ")[0]} wins`}
          value={s.sam}
          accent="two"
          icon={<Trophy className="size-4" aria-hidden="true" />}
        />
        <StatCard
          label="Draws"
          value={s.draws}
          icon={<Handshake className="size-4" aria-hidden="true" />}
        />
        <StatCard
          label="Sports"
          value={s.total}
          icon={<Flag className="size-4" aria-hidden="true" />}
        />
      </div>
    </section>
  )
}

function StatCard({
  label,
  value,
  accent,
  icon,
}: {
  label: string
  value: number
  accent?: "one" | "two"
  icon: React.ReactNode
}) {
  const valueColor =
    accent === "one"
      ? "text-rival-one"
      : accent === "two"
        ? "text-rival-two"
        : "text-foreground"
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <p className={`mt-2 font-display text-3xl font-bold ${valueColor}`}>
        {value}
      </p>
    </div>
  )
}
