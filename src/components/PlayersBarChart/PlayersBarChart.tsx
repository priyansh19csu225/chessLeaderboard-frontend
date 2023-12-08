import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  BarElement
} from 'chart.js'
import { PlayerGraphProps } from 'interfaces'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip
)

const optionsLine = {
  scales: {
    y: {
      title: {
        display: true,
        text: 'Rating'
      },
      min: 2150,
      max: 2600,
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    },
    x: {
      title: {
        display: true,
        text: 'All 50 players'
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    }
  }
}

const PlayerBarChart: React.FC<PlayerGraphProps> = ({ data, xLabels }) => {
  const chartData = {
    labels: xLabels,
    datasets: [
      {
        label: 'Rating',
        data: data,
        backgroundColor: '#d048b6',
        pointRadius: 2,
        fill: true,
        borderColor: '#d048b6',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        barThickness: 4
      }
    ]
  }

  return (
    <div className="w-11/12 bg-gray-900 shadow-2xl text-white rounded-lg p-4">
      <Bar data={chartData} options={optionsLine} />
    </div>
  )
}

export default PlayerBarChart
