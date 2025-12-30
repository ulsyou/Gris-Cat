import { faker } from '@faker-js/faker'
import { Box } from '@chakra-ui/react'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import React from 'react'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        boxWidth: 14,
        padding: 12,
        font: {
          size: 14,
        },
      },
    },
    title: {
      display: true,
      text: 'Monthly Order',
      font: {
        size: 20,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        font: {
          size: 12,
        },
        maxRotation: 45,
        minRotation: 45,
      },
    },
    y: {
      ticks: {
        font: {
          size: 12,
        },
      },
    },
  },
}

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Augest',
  'September',
  'October',
  'November',
  'December',
]

export const data = {
  labels,
  datasets: [
    {
      label: ' Orders',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 427 })),
      backgroundColor: '#dbb385',
    },
  ],
}

export default function BarChart() {
  return (
    <Box
      width="100%"
      minWidth={{ base: '300px', md: 'auto' }}
      height={{ base: '400px', md: '500px', lg: '600px' }}
    >
      <Bar options={options} data={data} />
    </Box>
  )
}
