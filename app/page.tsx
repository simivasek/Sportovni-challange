import { RivalryHeader } from "@/components/rivalry-header"
import { RankingSummary } from "@/components/ranking-summary"
import { ResultsTable } from "@/components/results-table"

export default function Page() {
  return (
    <main className="min-h-dvh bg-background">
      <RivalryHeader />
      <RankingSummary />
      <ResultsTable />
    </main>
  )
}
