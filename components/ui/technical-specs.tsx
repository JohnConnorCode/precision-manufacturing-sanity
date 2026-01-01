'use client';

interface TechnicalSpec {
  label: string;
  value: string;
  unit: string;
}

interface TechnicalSpecsProps {
  specs: TechnicalSpec[];
}

export function TechnicalSpecs({ specs }: TechnicalSpecsProps) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 my-6">
      <h4 className="text-lg font-semibold text-tone-inverse mb-4">Technical Specifications</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {specs.map((spec, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-slate-700 last:border-b-0">
            <span className="text-slate-400 text-sm">{spec.label}</span>
            <span className="text-tone-inverse font-mono">
              <span className="text-blue-400 font-semibold">{spec.value}</span>
              {spec.unit && <span className="text-slate-500 ml-1">{spec.unit}</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}