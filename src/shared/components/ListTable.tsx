const ListTable = ({ headers, body, type = "row" }) => {
  const renderCellContent = (row, header) => {
    const cellData = row[header.value];
    if (!cellData) return "-";

    switch (cellData.type) {
      case "input":
        return (
          <input
            type="text"
            value={cellData.value}
            onChange={cellData.onChange}
            className={`text-center min-w-10 py-1 border border-gray-200 rounded-sm`}
          />
        );
      case "checkbox":
        return (
          <input
            type="checkbox"
            checked={cellData.value}
            onChange={cellData.onChange}
            className="text-center min-w-10 py-1 border border-gray-200 rounded-sm"
          />
        );
      case "link":
        return (
          <a className="text-[#0078ff]" href={cellData.link}>
            {cellData.value}
          </a>
        );
      case "button":
        return (
          <button
            onClick={cellData.onClick}
            className={`${cellData.className} border px-4 py-1 rounded-sm`}
          >
            {cellData.value}
          </button>
        );
      case "string":
        return <div className={`${cellData.className}`}>{cellData.value}</div>;
      case "dropdown":
        return (
          <select
            value={cellData.value}
            onChange={(e) => cellData.onChange(e.target.value)}
            className="text-center min-w-10 py-1 border border-gray-200 rounded-sm"
          >
            {cellData.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        );
      default:
        return cellData.value;
    }
  };

  const renderHeader = (header) => {
    const { value, name, checked } = header;

    switch (value) {
      case "checkbox":
        return (
          <input
            type="checkbox"
            checked={checked}
            onChange={header.onChange}
            className="text-center min-w-10 py-1 border border-gray-200 rounded-sm"
          />
        );
      default:
        return name;
    }
  };

  if (body.length === 0) {
    return (
      <div className="flex items-center justify-center h-16 text-sm text-gray-400">
        데이터가 없습니다.
      </div>
    );
  }

  if (type === "row") {
    return (
      <div className="w-full overflow-x-auto">
        <table className="min-w-full whitespace-nowrap divide-y rounded-sm divide-gray-100">
          <thead className="bg-[#0078ff] bg-opacity-5">
            <tr>
              {headers.map((header) => (
                <th
                  key={header.value}
                  scope="row"
                  className="px-4 py-3 text-center text-xs sm:text-sm font-semibold text-[#333]"
                >
                  {renderHeader(header)}
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
                    className="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm"
                  >
                    {renderCellContent(row, header)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (type === "col") {
    return (
      <div className="w-full overflow-x-auto">
        <table className="min-w-full whitespace-nowrap divide-y rounded-sm divide-gray-100">
          {/* <thead className="bg-[#0078ff] bg-opacity-5">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-center text-xs sm:text-sm font-semibold text-[#333]"
              >
                구분
              </th>
              {body.map((header, rowIndex) => (
                <th
                  key={`header-${rowIndex}`}
                  scope="col"
                  className="px-4 py-3 text-center text-xs sm:text-sm font-semibold text-[#333]"
                >
                  {header.name}
                </th>
              ))}
            </tr>
          </thead> */}
          <tbody className="divide-y text-center divide-gray-200">
            {headers.map((header) => (
              <tr key={header.value} className="hover:bg-gray-50">
                <td className="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm font-semibold text-[#333]">
                  {header.name}
                </td>
                {body.map((row, rowIndex) => (
                  <td
                    key={`cell-${rowIndex}-${header.value}`}
                    className="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm"
                  >
                    {renderCellContent(row, header)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};
export default ListTable;
