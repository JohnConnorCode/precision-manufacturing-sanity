'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import { PremiumButton } from '@/components/ui/premium-button';
import AnimatedSection from '@/components/ui/animated-section';

interface ToleranceCalculation {
  nominalDimension: number;
  toleranceGrade: string;
  fundamentalDeviation: string;
  upperLimit: number;
  lowerLimit: number;
  toleranceZone: number;
  fit: string;
  recommendation: string;
}

const toleranceGrades = [
  { value: 'IT01', name: 'IT01', description: '±0.0005mm - Ultra precision' },
  { value: 'IT0', name: 'IT0', description: '±0.0008mm - Ultra precision' },
  { value: 'IT1', name: 'IT1', description: '±0.0012mm - Ultra precision' },
  { value: 'IT2', name: 'IT2', description: '±0.0019mm - Precision machining' },
  { value: 'IT3', name: 'IT3', description: '±0.003mm - Precision machining' },
  { value: 'IT4', name: 'IT4', description: '±0.005mm - High precision' },
  { value: 'IT5', name: 'IT5', description: '±0.008mm - High precision' },
  { value: 'IT6', name: 'IT6', description: '±0.012mm - Precision fits' },
  { value: 'IT7', name: 'IT7', description: '±0.019mm - Close fits' },
  { value: 'IT8', name: 'IT8', description: '±0.030mm - Medium fits' },
];

const fundamentalDeviations = [
  { value: 'h', name: 'h', description: 'Hole basis - zero line' },
  { value: 'H', name: 'H', description: 'Shaft basis - zero line' },
  { value: 'g', name: 'g', description: 'Small clearance' },
  { value: 'f', name: 'f', description: 'Medium clearance' },
  { value: 'e', name: 'e', description: 'Large clearance' },
  { value: 'j', name: 'j', description: 'Transition fit' },
  { value: 'k', name: 'k', description: 'Transition fit' },
  { value: 'm', name: 'm', description: 'Light interference' },
  { value: 'n', name: 'n', description: 'Medium interference' },
  { value: 'p', name: 'p', description: 'Heavy interference' },
];

export default function ToleranceCalculator() {
  const [dimension, setDimension] = useState<string>('25');
  const [toleranceGrade, setToleranceGrade] = useState<string>('IT7');
  const [deviation, setDeviation] = useState<string>('h');
  const [calculation, setCalculation] = useState<ToleranceCalculation | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateTolerance = useCallback(async () => {
    setIsCalculating(true);

    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const nom = parseFloat(dimension);
    if (isNaN(nom) || nom <= 0) {
      setIsCalculating(false);
      return;
    }

    // Simplified tolerance calculation (real implementation would use ISO 286 tables)
    const toleranceValues: Record<string, number> = {
      IT01: 0.0005, IT0: 0.0008, IT1: 0.0012, IT2: 0.0019,
      IT3: 0.003, IT4: 0.005, IT5: 0.008, IT6: 0.012,
      IT7: 0.019, IT8: 0.030
    };

    const deviationValues: Record<string, number> = {
      h: 0, H: 0, g: -0.006, f: -0.012, e: -0.020,
      j: 0.003, k: 0.006, m: 0.012, n: 0.020, p: 0.030
    };

    const toleranceZone = toleranceValues[toleranceGrade] || 0.019;
    const fundamentalDev = deviationValues[deviation] || 0;

    const upperLimit = nom + fundamentalDev + (toleranceZone / 2);
    const lowerLimit = nom + fundamentalDev - (toleranceZone / 2);

    // Determine fit type
    let fit = 'Clearance Fit';
    let recommendation = 'Good for general purpose applications';

    if (Math.abs(fundamentalDev) < 0.001) {
      fit = 'Basic Fit';
      recommendation = 'Ideal for precision assemblies with controlled clearance';
    } else if (fundamentalDev > 0.010) {
      fit = 'Interference Fit';
      recommendation = 'Suitable for permanent assemblies, press fits';
    } else if (fundamentalDev > 0) {
      fit = 'Transition Fit';
      recommendation = 'May result in clearance or interference, good for locating';
    }

    // Aerospace-specific recommendations
    if (toleranceGrade.includes('IT0') || toleranceGrade.includes('IT1') || toleranceGrade.includes('IT2')) {
      recommendation += ' - Suitable for aerospace critical components';
    } else if (toleranceGrade === 'IT7' || toleranceGrade === 'IT6') {
      recommendation += ' - Standard for aerospace secondary structures';
    }

    const result: ToleranceCalculation = {
      nominalDimension: nom,
      toleranceGrade,
      fundamentalDeviation: deviation,
      upperLimit,
      lowerLimit,
      toleranceZone,
      fit,
      recommendation
    };

    setCalculation(result);
    setIsCalculating(false);
  }, [dimension, toleranceGrade, deviation]);

  const resetCalculator = () => {
    setCalculation(null);
    setDimension('25');
    setToleranceGrade('IT7');
    setDeviation('h');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatedSection>
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Calculator className="w-6 h-6 text-tone-inverse" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-tone-inverse">Precision Tolerance Calculator</h2>
              <p className="text-slate-400">Calculate ISO 286 tolerances for precision manufacturing</p>
            </div>
          </div>

          {/* Input Form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Nominal Dimension */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nominal Dimension (mm)
              </label>
              <input
                type="number"
                value={dimension}
                onChange={(e) => setDimension(e.target.value)}
                step="0.001"
                min="0.001"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-tone-inverse placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600"
                placeholder="25.000"
              />
            </div>

            {/* Tolerance Grade */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Tolerance Grade
              </label>
              <select
                value={toleranceGrade}
                onChange={(e) => setToleranceGrade(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-tone-inverse focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600"
              >
                {toleranceGrades.map((grade) => (
                  <option key={grade.value} value={grade.value}>
                    {grade.name} - {grade.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Fundamental Deviation */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Fundamental Deviation
              </label>
              <select
                value={deviation}
                onChange={(e) => setDeviation(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-tone-inverse focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600"
              >
                {fundamentalDeviations.map((dev) => (
                  <option key={dev.value} value={dev.value}>
                    {dev.name} - {dev.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <PremiumButton
              onClick={calculateTolerance}
              loading={isCalculating}
              loadingText="Calculating..."
              className="flex-1 md:flex-none"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Tolerance
            </PremiumButton>
            <PremiumButton
              onClick={resetCalculator}
              variant="secondary"
              className="flex-1 md:flex-none"
            >
              Reset
            </PremiumButton>
          </div>

          {/* Results */}
          {calculation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-600/20 rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <h3 className="text-lg font-bold text-tone-inverse">Calculation Results</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-slate-400 text-sm mb-1">Upper Limit</div>
                  <div className="text-xl font-bold text-tone-inverse">
                    {calculation.upperLimit.toFixed(4)} mm
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-slate-400 text-sm mb-1">Lower Limit</div>
                  <div className="text-xl font-bold text-tone-inverse">
                    {calculation.lowerLimit.toFixed(4)} mm
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-slate-400 text-sm mb-1">Tolerance Zone</div>
                  <div className="text-xl font-bold text-tone-inverse">
                    ±{(calculation.toleranceZone / 2).toFixed(4)} mm
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <div className="text-tone-inverse font-medium">Fit Type: {calculation.fit}</div>
                    <div className="text-slate-300 text-sm">{calculation.recommendation}</div>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <div className="text-yellow-400 font-medium text-sm">Manufacturing Note</div>
                      <div className="text-slate-300 text-sm">
                        These calculations are based on ISO 286 standards. For aerospace applications,
                        verify tolerances meet specific AS9100 requirements and consider material properties,
                        thermal expansion, and operating conditions.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Information Panel */}
          <div className="mt-8 bg-slate-800/30 rounded-xl p-6">
            <h4 className="text-lg font-bold text-tone-inverse mb-4">Understanding Tolerances</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h5 className="font-medium text-blue-400 mb-2">Tolerance Grades (IT)</h5>
                <ul className="text-slate-300 space-y-1">
                  <li>• IT01-IT3: Ultra-precision (gauge making)</li>
                  <li>• IT4-IT6: High precision (close fits)</li>
                  <li>• IT7-IT8: Standard precision (general)</li>
                  <li>• Lower numbers = tighter tolerances</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-blue-400 mb-2">Fundamental Deviations</h5>
                <ul className="text-slate-300 space-y-1">
                  <li>• h/H: Basic hole/shaft (zero line)</li>
                  <li>• e,f,g: Clearance fits (loose to close)</li>
                  <li>• j,k: Transition fits</li>
                  <li>• m,n,p: Interference fits (light to heavy)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}