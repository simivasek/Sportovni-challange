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
  notes: string // "" when not yet played
}

export const competitors: Record<RivalId, Competitor> = {
  alex: {
    id: "alex",
    name: "Jakub",
    handle: "@jakub",
    tagline: "Rychlost nade vše",
    initials: "J",
  },
  sam: {
    id: "sam",
    name: "Vaclav",
    handle: "@vaclav",
    tagline: "Technika a klid",
    initials: "V",
  },
}

// Season not started yet — every sport is scheduled but unplayed.
// No dates, results, winners, venues, or notes have been decided.
export const matches: Match[] = [
  { sport: "Discgolf", date: "07.21.2026", winner: "sam", score: "0:1", venue: "Ladronka", notes: "" },
  { sport: "Petanque", date: "08.10.2026", winner: null, score: "", venue: "Ořechovka", notes: "Přijď se pobavit https://www.beseda-orechovka.cz/" },
  { sport: "Footgolf", date: "", winner: null, score: "", venue: "", notes: "" },
  { sport: "Badminton", date: "", winner: null, score: "", venue: "", notes: "" },
  { sport: