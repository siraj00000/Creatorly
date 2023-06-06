import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Chart',
    },
  },
}


export function BarChart({ mcccData, scccData }: any) {
  const data = {
    labels: mcccData?.map((i: { endDate: string }) => i?.endDate?.split('T')[0]),
    datasets: [
      {
        label: 'Multi',
        data: mcccData?.map((i: { totalBudget: number }) => i.totalBudget),
        backgroundColor: 'rgb(48, 123, 192)',
      },
      {
        label: 'Single',
        data: scccData?.map((i: { totalBudget: number }) => i.totalBudget),
        backgroundColor: 'rgb(0, 2, 5)',
      },
    ],
  }

  return <Bar options={options} data={data} className='md:flex-1 w-full' />
}
