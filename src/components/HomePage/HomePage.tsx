import React, { useState, useEffect, useCallback } from 'react'
import PlayersTable from '../PlayersTable/PlayersTable'
import { useSnackbar } from 'react-simple-snackbar'
import { Player } from 'interfaces'
import PlayerGraph from 'components/PlayerGraph/PlayerGraph'
import PlayerBarChart from 'components/PlayersBarChart/PlayersBarChart'

const HomePage: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]) // Initialize players as an empty array of Player type
  const [openSnackbar, closeSnackbar] = useSnackbar()
  const [rating_history, setRatingHistory] = useState<number[]>()
  const [playerName, setPlayerName] = useState<string>('')
  const [currentRatings, setCurrentRatings] = useState<number[]>()
  const [chartLabels, setChartLabels] = useState<string[]>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/top-players')
        if (response.ok) {
          const data = await response.json()
          setPlayers(data.users) // Assuming the fetched data is an array of players matching the Player interface
        } else {
          const errorMsg = await response.json()
          openSnackbar(errorMsg.detail)
        }
      } catch (error) {
        openSnackbar(`Error fetching data:'${error}`)
        // Handle error or set a default state for players if the fetch fails
      }
    }

    fetchPlayers()
  }, [])

  useEffect(() => {
    if (!players) return
    const { current_ratings, chart_labels } = players.reduce(
      (acc, player) => {
        acc.current_ratings.push(player.perfs.classical.rating)
        acc.chart_labels.push(player.username)
        return acc
      },
      { current_ratings: [], chart_labels: [] } as {
        current_ratings: number[]
        chart_labels: string[]
      }
    )
    setCurrentRatings(current_ratings)
    setChartLabels(chart_labels)
  }, [players, setCurrentRatings, setChartLabels])

  const handleCsvFileDownLoad = () => {
    setLoading(true)
    const fetchCsvFile = async () => {
      try {
        const response = await fetch(
          'http://127.0.0.1:8000/players/rating-history-csv'
        )
        if (response.ok) {
          const csvData = await response.blob()

          // Create a Blob URL for the downloaded file
          const blobUrl = URL.createObjectURL(csvData)

          // Create an anchor element
          const downloadLink = document.createElement('a')
          downloadLink.href = blobUrl
          downloadLink.download = 'rating-history.csv'

          // Append the anchor element to the body
          document.body.appendChild(downloadLink)

          // Simulate click to trigger download
          downloadLink.click()

          // Clean up - remove the anchor element and revoke the Blob URL
          document.body.removeChild(downloadLink)
          URL.revokeObjectURL(blobUrl)
        } else {
          const errorMsg = await response.json()
          openSnackbar(errorMsg.detail)
        }
      } catch (error) {
        openSnackbar(`Error fetching data:'${error}`)
        // Handle error or set a default state for players if the fetch fails
      } finally {
        setLoading(false)
      }
    }

    fetchCsvFile()
  }

  const handlePlayer30Ratings = useCallback(() => {
    const fetchPlayerRating = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/player/${playerName}/rating-history`
        )
        if (response.ok) {
          const data = await response.json()
          setRatingHistory(data) // Assuming the fetched data is an array of players matching the Player interface
        } else {
          const errorMsg = await response.json()
          openSnackbar(errorMsg.detail)
        }
      } catch (error) {
        openSnackbar(`Error fetching data:'${error}`)
        // Handle error or set a default state for players if the fetch fails
      }
    }

    fetchPlayerRating()
  }, [playerName])

  useEffect(() => {
    if (playerName) handlePlayer30Ratings()
  }, [playerName, handlePlayer30Ratings])

  return (
    <div className="w-full flex items-center justify-between block bg-gray-900 p-5 space-x-6">
      <div className="w-3/6 p-5">
        <div className="flex justify-between items-baseline ">
          <h1 className="text-3xl font-bold mb-4 text-gray-400">
            Classical top 50 players
          </h1>
          <button
            onClick={handleCsvFileDownLoad}
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? (
              <div role="status">
                <svg
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              'Download CSV'
            )}
          </button>
        </div>
        <PlayersTable players={players} setPlayerName={setPlayerName} />
      </div>
      <div className="w-2/4 fixed top-0 right-0 bottom-4 rounded bg-gray-800 text-white flex flex-col justify-center items-center px-6 py-8 h-screen">
        {rating_history && currentRatings ? (
          <>
            <PlayerGraph data={rating_history} />
            <PlayerBarChart data={currentRatings} xLabels={chartLabels} />
          </>
        ) : (
          <h2 className="text-5xl font-bold mb-4">
            <center>
              Click on any <br /> row to <br /> display charts
            </center>
          </h2>
        )}
      </div>
    </div>
  )
}

export default HomePage
