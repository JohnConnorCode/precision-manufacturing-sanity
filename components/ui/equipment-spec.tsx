'use client';

import { Settings } from 'lucide-react';
import Image from 'next/image';

interface EquipmentSpecification {
  parameter: string;
  value: string;
  unit?: string;
  tolerance?: string;
}

interface EquipmentSpecProps {
  equipmentName: string;
  manufacturer?: string;
  model?: string;
  image?: { url: string; alt: string; caption?: string };
  specifications: EquipmentSpecification[];
  applications?: string;
  advantages?: string;
}

export function EquipmentSpec({
  equipmentName,
  manufacturer,
  model,
  image,
  specifications,
  applications,
  advantages,
}: EquipmentSpecProps) {
  return (
    <div className="my-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden border border-slate-700">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center">
            <Settings className="w-6 h-6 text-tone-inverse" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-tone-inverse">{equipmentName}</h3>
            {(manufacturer || model) && (
              <p className="text-blue-400 font-medium">
                {[manufacturer, model].filter(Boolean).join(' - ')}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Image */}
      {image && image.url && (
        <div className="relative w-full h-64">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover"
          />
          {image.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-sm text-tone-inverse">{image.caption}</p>
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        {/* Specifications Table */}
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="px-4 py-2 text-sm font-semibold text-blue-400 uppercase">Parameter</th>
                <th className="px-4 py-2 text-sm font-semibold text-blue-400 uppercase">Value</th>
                <th className="px-4 py-2 text-sm font-semibold text-blue-400 uppercase">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {specifications.map((spec, index) => (
                <tr key={index} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-2 text-sm font-medium text-tone-inverse">{spec.parameter}</td>
                  <td className="px-4 py-2 text-sm text-slate-300">
                    {spec.value} {spec.unit && <span className="text-slate-500">({spec.unit})</span>}
                  </td>
                  <td className="px-4 py-2 text-sm text-slate-400">{spec.tolerance || '—'}</td>
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

        {/* Advantages */}
        {advantages && (
          <div className="p-3 bg-green-900/20 border border-green-700/30 rounded">
            <h4 className="text-sm font-semibold text-green-400 uppercase mb-1">Advantages</h4>
            <p className="text-slate-300 text-sm">{advantages}</p>
          </div>
        )}
      </div>
    </div>
  );
}
