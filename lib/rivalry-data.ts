export type RivalId = "alex" | "sam"

export type Competitor = {
  id: RivalId
  name: string
  handle: string
  tagline: string
  initials: string
}

export type Match = {
  sport: string
  date: string // ISO date, or "" when not yet played
  winner: RivalId | "draw" | null // null = not played yet
  score: string // "" when not yet played
  venue: string // "Místo konání" — "" when not yet decided
  venueUrl?: string
  notes: string // "" when not yet played
  photo?: string // path to a photo for this sport, if any
}

export const competitors: Record<RivalId, Competitor> = {
  alex: {
    id: "alex",
    name: "Jakub",
    handle: "@jakub",
    tagline: "",
    initials: "J",
  },
  sam: {
    id: "sam",
    name: "Vaclav",
    handle: "@vaclav",
    tagline: "",
    initials: "V",
  },
};

//O co hrajeme - Prohrávající bude připravovat snídani pro celou směnu na následujících deseti společných směnách těch dvou opičáků.
// No dates, results, winners, venues, or notes have been decided.
export const matches: Match[] = [
  {
    sport: "DiscGolf",
    date: "2026-07-21",
    winner: "sam",
    score: "0:1",
    venue: "Ladronka",
    venueUrl:  "https://www.discgolfpark.com/course/discgolfpark-ladronka/?utm_source=perplexity",
    notes: "První sport na zahřátí. 21.7.26",
    photo: "/photos/discgolf.jpg",},
  { sport: "Petanque", date: "", winner: null, score: "", venue: "Beseda Ořechovka", notes: "10.8.2026 od 13:00 Local" },
  { sport: "Footgolf", date: "", winner: null, score: "", venue: "", notes: "" },
  { sport: "Badminton", date: "", winner: null, score: "", venue: "", notes: "" },
  { sport: "Bowling", date: "", winner: null, score: "", venue: "", notes: "" },
  { sport: "Karting", date: "", winner: null, score: "", venue: "", notes: "" },
  { sport: "Adventure golf", date: "", winner: null, score: "", venue: "", notes: "" },
  { sport: "Nohejbal", date: "", winner: null, score: "", venue: "", notes: "" },
  { sport: "Squash", date: "", winner: null, score: "", venue: "", notes: "" },
  { sport: "Stolní tenis", date: "", winner: null, score: "", venue: "", notes: "" },
  { sport: "Tenis", date: "", winner: null, score: "", venue: "", notes: "" },
  { sport: "Wakeboarding", date: "", winner: null, score: "", venue: "", notes: "" },
  { sport: "Lezení", date: "", winner: null, score: "", venue: "", notes: "" },
  { sport: "Beach", date: "", winner: null, score: "", venue: "", notes: "" },
  { sport: "Veslování", date: "", winner: null, score: "", venue: "", notes: "" },
  { sport: "Kulečník", date: "", winner: null, score: "", venue: "", notes: "" },
  { sport: "Judo", date: "", winner: null, score: "", venue: "", notes: "" },
  { sport: "Šachy", date: "", winner: null, score: "", venue: "", notes: "" },
  { sport: "Šipky", date: "", winner: null, score: "", venue: "", notes: "" },
  { sport: "Piškvorky", date: "", winner: null, score: "", venue: "", notes: "" },
  { sport: "Pádel", date: "", winner: null, score: "", venue: "", notes: "" },
]

export type MatchRow = Match & {
  index: number
  played: boolean
  cumulativeAlex: number
  cumulativeSam: number
  rankingLabel: string
  rankingLeader: RivalId | null
}

// Enriches each match (chronological) with the running score/ranking after it.
// Unplayed matches leave the ranking blank until a result is recorded.
export function getMatchRows(): MatchRow[] {
  let alex = 0
  let sam = 0
  const first = competitors.alex.name.split(" ")[0]
  const second = competitors.sam.name.split(" ")[0]
  return matches.map((m, i) => {
    const played = m.winner !== null
    if (m.winner === "alex") alex++
    else if (m.winner === "sam") sam++
    const leader: RivalId | null = alex === sam ? null : alex > sam ? "alex" : "sam"
    const hi = Math.max(alex, sam)
    const lo = Math.min(alex, sam)
    const rankingLabel = !played
      ? "—"
      : leader === null
        ? `Level ${alex}-${sam}`
        : `${leader === "alex" ? first : second} leads ${hi}-${lo}`
    return {
      ...m,
      index: i + 1,
      played,
      cumulativeAlex: alex,
      cumulativeSam: sam,
      rankingLabel,
      rankingLeader: played ? leader : null,
    }
  })
}

export function getStandings() {
  let alex = 0
  let sam = 0
  let draws = 0
  let played = 0
  for (const m of matches) {
    if (m.winner === null) continue
    played++
    if (m.winner === "alex") alex++
    else if (m.winner === "sam") sam++
    else draws++
  }
  const decided = alex + sam
  return {
    alex,
    sam,
    draws,
    played,
    total: matches.length,
    started: played > 0,
    alexPct: decided === 0 ? 50 : Math.round((alex / decided) * 100),
    samPct: decided === 0 ? 50 : Math.round((sam / decided) * 100),
    leader: alex === sam ? null : alex > sam ? ("alex" as const) : ("sam" as const),
  }
}
