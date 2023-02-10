export default function Ranking({ children: ranking }) {
  return (
    <div className="mt-4">
      <h2 className="text-center font-semibold mb-4">Classificação</h2>

      <div className="flex items-center justify-center font-mono">
        <table>
          <thead>
            <tr>
              <th className="w-10">&nbsp;</th>
              <th className="w-48">&nbsp;</th>
              <th className="w-10">P</th>
              <th className="w-10">V</th>
              <th className="w-10">E</th>
              <th className="w-10">D</th>
              <th className="w-10">GP</th>
              <th className="w-10">GC</th>
              <th className="w-10">S</th>
            </tr>
          </thead>

          <tbody>
            {ranking.map((item, index) => {
              const { teamName, imageUrl, data } = item;

              const backgroundColorClass = index % 2 === 0 ? 'bg-gray-100' : '';

              const {
                balanceGoals,
                defeats,
                draws,
                goalsScored,
                goalsTaken,
                points,
                victories,
              } = data;

              return (
                <tr
                  key={teamName}
                  className={`h-8 text-center ${backgroundColorClass}`}
                >
                  <td>{(index + 1).toString().padStart(2, '0')}</td>

                  <td className="flex flex-row items-center justify-start space-x-4">
                    <img
                      className="my-1"
                      src={`./img/${imageUrl}`}
                      alt={teamName}
                      width={25}
                      height={25}
                    />
                    <span>{teamName}</span>
                  </td>

                  <td>{points}</td>
                  <td>{victories}</td>
                  <td>{draws}</td>
                  <td>{defeats}</td>
                  <td>{goalsScored}</td>
                  <td>{goalsTaken}</td>
                  <td>{balanceGoals}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
