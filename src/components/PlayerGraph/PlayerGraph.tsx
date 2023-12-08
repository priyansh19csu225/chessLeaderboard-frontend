import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
} from 'chart.js'
import { PlayerGraphProps } from 'interfaces'

ChartJS.register(
  CategoryScale,
  LinearScale,
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
        text: 'Past 30 days rating record'
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    }
  }
}

const PlayerGraph: React.FC<PlayerGraphProps> = ({ data }) => {
  const labels = Array.from({ length: data.length }, (_, index) => index + 1)
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Rating',
        data: data,
        backgroundColor: 'rgba(119,52,169,0)',
        pointRadius: 2,
        fill: true,
        borderColor: '#d048b6',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: '#d048b6',
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: '#d048b6',
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15
      }
    ]
  }

  return (
    <div className="w-11/12 mt-5 mb-2 bg-gray-900 shadow-2xl text-white rounded-lg p-4 ">
      <Line data={chartData} options={optionsLine} />
    </div>
  )
}

export default PlayerGraph
