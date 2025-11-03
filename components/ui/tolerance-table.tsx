'use client';

interface ToleranceTableProps {
  title: string;
  description?: string;
  headers: string[];
  rows: Array<{ cells: string[] }>;
}

export function ToleranceTable({ title, description, headers, rows }: ToleranceTableProps) {
  return (
    <div className="my-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 border border-slate-700">
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      {description && (
        <p className="text-slate-400 mb-4">{description}</p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-700">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-sm font-semibold text-blue-400 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-slate-800/50 transition-colors">
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`px-4 py-3 text-sm ${
                      cellIndex === 0
                        ? 'font-medium text-white'
                        : 'text-slate-300'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
