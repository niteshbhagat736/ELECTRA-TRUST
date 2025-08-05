export default function ApprovalTable({ voters, onApprove, onDelete, isDarkMode }) {
  if (voters.length === 0) {
    return <p className="text-center text-gray-500">No submissions yet or loading...</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border text-sm">
        <thead className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}>
          <tr>
            {[
              "Name",
              "Email",
              "Country",
              "Reason",
              "Images",
              "Start Date",
              "End Date",
              "Status",
              "Actions"
            ].map((h) => (
              <th key={h} className="border px-4 py-2 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {voters.map((voter) => (
            <tr key={voter._id} className="text-center">
              <td className="border px-4 py-2">{voter.name}</td>
              <td className="border px-4 py-2">{voter.email}</td>
              <td className="border px-4 py-2">{voter.country}</td>
              <td className="border px-4 py-2">
                {voter.reason?.length > 200 ? (
                  <span>
                    {voter.reason.slice(0, 200)}...
                    <button className="text-blue-600 ml-1 underline" onClick={() => alert(voter.reason)}>more</button>
                  </span>
                ) : (
                  voter.reason
                )}
              </td>
              <td className="border px-4 py-2">
                {Array.isArray(voter.images) && voter.images.length > 0 ? (
                  <div className="flex flex-col items-center space-y-1">
                    <a
                      href={voter.images[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View
                    </a>
                    <span className="text-xs">1 / {voter.images.length}</span>
                  </div>
                ) : (
                  "No image"
                )}
              </td>
              <td className="border px-4 py-2">
                {voter.start_date ? new Date(voter.start_date).toLocaleDateString() : "N/A"}
              </td>
              <td className="border px-4 py-2">
                {voter.end_date ? new Date(voter.end_date).toLocaleDateString() : "N/A"}
              </td>
              <td className="border px-4 py-2">
                {voter.isApproved ? (
                  <span className="text-green-600 font-semibold">Approved</span>
                ) : (
                  <span className="text-yellow-500 font-semibold">Pending</span>
                )}
              </td>
              <td className="border px-4 py-2 space-y-1 flex flex-col items-center">
                {!voter.isApproved && (
                  <button
                    onClick={() => onApprove(voter._id)}
                    className="bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded-md"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => onDelete(voter._id)}
                  className="bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
