import { LabelsDoughnut } from '../cmps/LabelsDoughnut.jsx'
import { LabelsLineChart } from '../cmps/LabelsLineChart.jsx'

export function ToyDashboard() {
  return (
    <section className="toy-dashboard">
      <LabelsDoughnut />
      <LabelsLineChart />
    </section>
  )
}
