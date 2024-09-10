import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const DataTable = ({
  columns,
  data,
  onRowClick,
  onEditClick,
  onDeleteClick,
  disableRowClick = false,
}) => {
  return (
    <div className="flex justify-center">
      <table className="table-auto w-4/5 border m-12 shadow-2xl">
        <thead className="bg-gray-400">
          <tr>
            {columns.map((column) => (
              <th key={column.id} className="px-4 py-2 border">
                {column.label}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item._id}
              className="px-12 hover:bg-gray-100 cursor-pointer"
              onClick={!disableRowClick ? () => onRowClick(item) : null}
            >
              {columns.map((column) => (
                <td key={column.id} className="px-4 py-2 border">
                  {column.format
                    ? column.format(item[column.id])
                    : item[column.id]}
                </td>
              ))}
              <td className="px-4 py-2 border">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditClick(item);
                  }}
                  className="bg-yellow-400 text-black py-1 px-2 rounded mr-2"
                >
                  <CiEdit />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteClick(item._id);
                  }}
                  className="bg-red-500 text-black py-1 px-2 rounded"
                >
                  <MdDeleteOutline />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
