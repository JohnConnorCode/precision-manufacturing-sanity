'use client';

import { Beaker } from 'lucide-react';

interface MaterialProperty {
  property: string;
  value: string;
  unit?: string;
  testMethod?: string;
}

interface MaterialDataProps {
  materialName: string;
  grade?: string;
  description: string;
  properties: MaterialProperty[];
  applications?: string;
  machiningConsiderations?: string;
}

export function MaterialData({
  materialName,
  grade,
  description,
  properties,
  applications,
  machiningConsiderations,
}: MaterialDataProps) {
  return (
    <div className="my-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 border border-slate-700">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
          <Beaker className="w-6 h-6 text-tone-inverse" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-tone-inverse">{materialName}</h3>
          {grade && (
            <p className="text-blue-400 font-medium">{grade}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-300 mb-4">{description}</p>

      {/* Properties Table */}
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="px-4 py-2 text-sm font-semibold text-blue-400 uppercase">Property</th>
              <th className="px-4 py-2 text-sm font-semibold text-blue-400 uppercase">Value</th>
              <th className="px-4 py-2 text-sm font-semibold text-blue-400 uppercase">Test Method</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {properties.map((prop, index) => (
              <tr key={index} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-4 py-2 text-sm font-medium text-tone-inverse">{prop.property}</td>
                <td className="px-4 py-2 text-sm text-slate-300">
                  {prop.value} {prop.unit && <span className="text-slate-500">({prop.unit})</span>}
                </td>
                <td className="px-4 py-2 text-sm text-slate-400">{prop.testMethod || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Applications */}
      {applications && (
        <div className="mb-3">
          <h4 className="text-sm font-semibold text-blue-400 uppercase mb-1">Applications</h4>
          <p className="text-slate-300 text-sm">{applications}</p>
        </div>
      )}

      {/* Machining Considerations */}
      {machiningConsiderations && (
        <div className="p-3 bg-yellow-900/20 border border-yellow-700/30 rounded">
          <h4 className="text-sm font-semibold text-yellow-400 uppercase mb-1">Machining Considerations</h4>
          <p className="text-slate-300 text-sm">{machiningConsiderations}</p>
        </div>
      )}
    </div>
  );
}
