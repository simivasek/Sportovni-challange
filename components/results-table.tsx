import { competitors, getMatchRows, type MatchRow } from "@/lib/rivalry-data"

function formatDate(iso: string) {
  if (!iso) return "—"
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

// Splits text on URLs and renders them as clickable links, keeping the rest as plain text.
function renderNotes(notes: string) {
  if (!notes) return "—"

  const urlRegex = /(https?:\/\/[^\s]+)/g
  const parts = notes.split(urlRegex)

  return parts.map((part, i) =>
    urlRegex.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground underline underline-offset-2 hover:text-primary"
      >
        {part}
      </a>
    ) : (
      part
    ),
  )
}

function WinnerBadge({ winner }: { winner: MatchRow["winner"] }) {
  if (winner === null) {
    return (
      <span className="inline-flex items-center rounded-full border border-dashed border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
        Nezahájeno
      </span>
    )
  }
  if (winner === "draw") {
    return (
      <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
        Draw
      </span>
    )
  }
  const isOne = winner === "alex"
  const cls = isOne
    ? "bg-rival-one text-rival-one-foreground"
    : "bg-rival-two text-rival-two-foreground"
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}
    >
      {competitors[winner].name.split(" ")[0]}
    </span>
  )
}

function RankingBadge({ row }: { row: MatchRow }) {
  const tone =
    row.rankingLeader === "alex"
      ? "bg-rival-one/10 text-rival-one"
      : row.rankingLeader === "sam"
        ? "bg-rival-two/10 text-rival-two"
        : "bg-secondary text-muted-foreground"
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold tabular-nums ${tone}`}
    >
      {row.rankingLabel}
    </span>
  )
}

export function ResultsTable() {
  const rows = getMatchRows()
  const anyPlayed = rows.some((r) => r.played)

  return (
    <section
      aria-labelledby="results-heading"
      className="mx-auto mt-10 max-w-4xl px-4 pb-16"
    >
      <div className="flex items-center justify-between">
        <h2
          id="results-heading"
          className="font-display text-lg font-bold uppercase tracking-tight"
        >
          Results by Sport
        </h2>
        <span className="text-sm text-muted-foreground">
          {rows.length} sports
        </span>
      </div>

      {!anyPlayed && (
        <p className="mt-4 rounded-xl border border-dashed border-border bg-secondary/40 px-4 py-3 text-sm text-muted-foreground">
          The season has not started yet — no matches have been played. Dates,
          results, winners, and venues will appear here once the competition
          begins.
        </p>
      )}

      {/* Desktop / iPad: table (md and up) */}
      <div className="mt-4 hidden overflow-hidden rounded-xl border border-border bg-card md:block">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">
              Every sport in the rivalry between {competitors.alex.name} and{" "}
              {competitors.sam.name}, including date, result, winner, running
              ranking, venue, and notes. The season has not started yet.
            </caption>
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th scope="col" className="px-4 py-3 font-semibold">
                  Sport
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Date
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Result
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Winner
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Ranking After
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Místo konání
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => (
                <tr
                  key={m.sport}
                  className="border-b border-border align-top transition-colors last:border-0 hover:bg-secondary/50"
                >
                  <th
                    scope="row"
                    className="px-4 py-3 text-left font-medium text-foreground"
                  >
                    <span className="mr-2 text-xs tabular-nums text-muted-foreground">
                      {String(m.index).padStart(2, "0")}
                    </span>
                    {m.sport}
                  </th>
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                    {formatDate(m.date)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-foreground">
                    {m.score || <span className="text-muted-foreground">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <WinnerBadge winner={m.winner} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <RankingBadge row={m} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                    {m.venue || "—"}
                  </td>
                  <td className="min-w-[14rem] px-4 py-3 text-pretty text-muted-foreground">
                    {renderNotes(m.notes)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile: stacked cards (below md) */}
      <ul className="mt-4 flex flex-col gap-3 md:hidden">
        {rows.map((m) => (
          <li
            key={m.sport}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-baseline gap-2">
                <span className="text-xs tabular-nums text-muted-foreground">
                  {String(m.index).padStart(2, "0")}
                </span>
                <h3 className="font-display text-base font-bold leading-tight">
                  {m.sport}
                </h3>
              </div>
              <WinnerBadge winner={m.winner} />
            </div>

            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Date
                </dt>
                <dd className="mt-0.5 text-foreground">{formatDate(m.date)}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Result
                </dt>
                <dd className="mt-0.5 font-mono text-xs text-foreground">
                  {m.score || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Ranking After
                </dt>
                <dd className="mt-1">
                  <RankingBadge row={m} />
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Místo konání
                </dt>
                <dd className="mt-0.5 text-foreground">{m.venue || "—"}</dd>
              </div>
            </dl>

            <p className="mt-3 border-t border-border pt-3 text-pretty text-sm text-muted-foreground">
              {renderNotes(m.notes)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
