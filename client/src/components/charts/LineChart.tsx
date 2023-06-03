import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
)

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: false,
      labels: 'Revenue',
      text: 'Chart.js Line Chart',
    },
  },
}

export function LineChart({ totalBudgetByInterval }: any) {
  const data = {
    labels: totalBudgetByInterval?.map(
      (i: { endDate: string }) => i?.endDate?.split('T')[0],
    ),
    datasets: [
      {
        fill: true,
        label: 'Revenue',
        data: totalBudgetByInterval?.map(
          (i: { totalBudget: string }) => i.totalBudget,
        ),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }
  return <Line options={options} data={data} />
}
