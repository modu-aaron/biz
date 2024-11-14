const ListTable = ({ headers, body }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {headers.map((header) => (
            <th
              key={header.value}
              scope="col"
              className="px-4 py-2 text-center text-sm font-semibold text-gray-900"
            >
              {header.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y text-center divide-gray-200">
        {body.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-50">
            {headers.map((header) => (
              <td
                key={header.value}
                className={`px-4 py-4 text-sm ${
                  header.value === "ptSeq"
                    ? "font-medium text-indigo-600"
                    : "text-[#333]"
                }`}
              >
                {typeof row[header.value] === "object" ? (
                  <span
                    className={`inline-flex items-center rounded-full bg-${
                      row[header.value].color
                    }-50 px-2 py-1 text-xs font-medium text-${
                      row[header.value].color
                    }-700 ring-1 ring-inset ring-${
                      row[header.value].color
                    }-600/20`}
                  >
                    {row[header.value].value}
                  </span>
                ) : (
                  row[header.value]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListTable;
