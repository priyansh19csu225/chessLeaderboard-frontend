import { PlayerTableProps } from 'interfaces'

const PlayersTable: React.FC<PlayerTableProps> = ({
  players,
  setPlayerName
}) => {
  return (
    <div className="overflow-x-auto rounded">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr className="bg-gray-900 text-white">
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              Rank
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              Player
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              Rating
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700 text-gray-400">
          {players.map((row, index) => (
            <tr
              key={row.id}
              className="odd:bg-gray-900 even:bg-gray-800 cursor-pointer hover:bg-gray-600"
              onClick={() => setPlayerName(row.username)}
            >
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="font-bold text-orange-500">{row.title}</span>{' '}
                {row.username}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {row.perfs.classical.progress > 0 ? (
                  <span className="text-green-500 font-bold">
                    &#8593;&nbsp;
                  </span>
                ) : (
                  <span className="text-red-500 font-bold">&#8595;&nbsp;</span>
                )}
                {row.perfs.classical.rating}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PlayersTable
