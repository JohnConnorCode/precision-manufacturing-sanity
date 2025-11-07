'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Thermometer, Zap, Weight, Shield, CheckCircle } from 'lucide-react';
import { PremiumButton } from '@/components/ui/premium-button';
import AnimatedSection from '@/components/ui/animated-section';

interface Material {
  id: string;
  name: string;
  category: 'aluminum' | 'titanium' | 'steel' | 'superalloy' | 'composite';
  grade: string;
  properties: {
    density: number; // kg/m³
    tensileStrength: number; // MPa
    yieldStrength: number; // MPa
    elasticModulus: number; // GPa
    thermalConductivity: number; // W/m·K
    thermalExpansion: number; // µm/m·K
    maxTemp: number; // °C
    corrosionResistance: 'Poor' | 'Fair' | 'Good' | 'Excellent';
    machinability: 'Difficult' | 'Moderate' | 'Good' | 'Excellent';
    cost: 'Low' | 'Medium' | 'High' | 'Very High';
  };
  applications: string[];
  advantages: string[];
  considerations: string[];
  aerospaceCertified: boolean;
}

const materials: Material[] = [
  {
    id: 'al-6061',
    name: 'Aluminum 6061-T6',
    category: 'aluminum',
    grade: '6061-T6',
    properties: {
      density: 2700,
      tensileStrength: 310,
      yieldStrength: 276,
      elasticModulus: 69,
      thermalConductivity: 167,
      thermalExpansion: 23.6,
      maxTemp: 200,
      corrosionResistance: 'Good',
      machinability: 'Excellent',
      cost: 'Low'
    },
    applications: ['Aircraft structures', 'Brackets', 'Frames', 'Non-critical components'],
    advantages: ['Excellent machinability', 'Good strength-to-weight', 'Weldable', 'Cost-effective'],
    considerations: ['Limited temperature range', 'Galvanic corrosion potential'],
    aerospaceCertified: true
  },
  {
    id: 'al-7075',
    name: 'Aluminum 7075-T6',
    category: 'aluminum',
    grade: '7075-T6',
    properties: {
      density: 2810,
      tensileStrength: 572,
      yieldStrength: 503,
      elasticModulus: 72,
      thermalConductivity: 130,
      thermalExpansion: 23.2,
      maxTemp: 175,
      corrosionResistance: 'Fair',
      machinability: 'Good',
      cost: 'Medium'
    },
    applications: ['Aircraft wings', 'Fuselage frames', 'High-stress components'],
    advantages: ['High strength', 'Good fatigue resistance', 'Lightweight'],
    considerations: ['Stress corrosion cracking', 'Poor weldability'],
    aerospaceCertified: true
  },
  {
    id: 'ti-6al4v',
    name: 'Titanium Ti-6Al-4V',
    category: 'titanium',
    grade: 'Grade 5',
    properties: {
      density: 4430,
      tensileStrength: 1100,
      yieldStrength: 1000,
      elasticModulus: 114,
      thermalConductivity: 7.2,
      thermalExpansion: 8.6,
      maxTemp: 400,
      corrosionResistance: 'Excellent',
      machinability: 'Moderate',
      cost: 'High'
    },
    applications: ['Engine components', 'Landing gear', 'Fasteners', 'Critical structures'],
    advantages: ['Excellent strength-to-weight', 'Corrosion resistant', 'Biocompatible'],
    considerations: ['Expensive', 'Difficult to machine', 'Work hardening'],
    aerospaceCertified: true
  },
  {
    id: 'inconel-718',
    name: 'Inconel 718',
    category: 'superalloy',
    grade: 'UNS N07718',
    properties: {
      density: 8220,
      tensileStrength: 1275,
      yieldStrength: 1035,
      elasticModulus: 200,
      thermalConductivity: 11.2,
      thermalExpansion: 13.0,
      maxTemp: 700,
      corrosionResistance: 'Excellent',
      machinability: 'Difficult',
      cost: 'Very High'
    },
    applications: ['Turbine blades', 'Engine hot sections', 'High-temp fasteners'],
    advantages: ['High temperature strength', 'Oxidation resistance', 'Creep resistance'],
    considerations: ['Very expensive', 'Difficult machining', 'Work hardening'],
    aerospaceCertified: true
  },
  {
    id: 'steel-4340',
    name: 'Steel 4340',
    category: 'steel',
    grade: '4340',
    properties: {
      density: 7850,
      tensileStrength: 1620,
      yieldStrength: 1460,
      elasticModulus: 205,
      thermalConductivity: 44.5,
      thermalExpansion: 12.3,
      maxTemp: 400,
      corrosionResistance: 'Poor',
      machinability: 'Good',
      cost: 'Medium'
    },
    applications: ['Landing gear', 'High-strength bolts', 'Shafts', 'Gears'],
    advantages: ['Very high strength', 'Good toughness', 'Heat treatable'],
    considerations: ['Heavy', 'Corrosion protection needed', 'Heat treatment required'],
    aerospaceCertified: true
  }
];

const categoryColors = {
  aluminum: 'from-slate-500 to-slate-600',
  titanium: 'from-purple-500 to-purple-600',
  steel: 'from-gray-500 to-gray-600',
  superalloy: 'from-orange-500 to-orange-600',
  composite: 'from-green-500 to-green-600'
};

export default function MaterialSelector() {
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'strength' | 'weight' | 'cost'>('name');
  const [requirements, setRequirements] = useState({
    minStrength: 0,
    maxTemp: 0,
    maxDensity: 10000,
    corrosionResistance: 'any',
    aerospaceCertified: false
  });

  const filteredMaterials = useMemo(() => {
    return materials
      .filter(material => {
        const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            material.grade.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
        const matchesStrength = material.properties.tensileStrength >= requirements.minStrength;
        const matchesTemp = material.properties.maxTemp >= requirements.maxTemp;
        const matchesDensity = material.properties.density <= requirements.maxDensity;
        const matchesCorrosion = requirements.corrosionResistance === 'any' ||
                                material.properties.corrosionResistance === requirements.corrosionResistance;
        const matchesCertification = !requirements.aerospaceCertified || material.aerospaceCertified;

        return matchesSearch && matchesCategory && matchesStrength &&
               matchesTemp && matchesDensity && matchesCorrosion && matchesCertification;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'strength':
            return b.properties.tensileStrength - a.properties.tensileStrength;
          case 'weight':
            return a.properties.density - b.properties.density;
          case 'cost': {
            const costOrder = { 'Low': 1, 'Medium': 2, 'High': 3, 'Very High': 4 };
            return costOrder[a.properties.cost] - costOrder[b.properties.cost];
          }
          default:
            return a.name.localeCompare(b.name);
        }
      });
  }, [searchTerm, selectedCategory, sortBy, requirements]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('name');
    setRequirements({
      minStrength: 0,
      maxTemp: 0,
      maxDensity: 10000,
      corrosionResistance: 'any',
      aerospaceCertified: false
    });
    setSelectedMaterial(null);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <AnimatedSection>
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Material Selection Tool</h2>
              <p className="text-slate-400">Find the optimal material for your aerospace application</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Filters Panel */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Search Materials</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600"
                    placeholder="Search by name or grade..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600"
                >
                  <option value="all">All Categories</option>
                  <option value="aluminum">Aluminum Alloys</option>
                  <option value="titanium">Titanium Alloys</option>
                  <option value="steel">Steel Alloys</option>
                  <option value="superalloy">Superalloys</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600"
                >
                  <option value="name">Name</option>
                  <option value="strength">Strength (High to Low)</option>
                  <option value="weight">Weight (Light to Heavy)</option>
                  <option value="cost">Cost (Low to High)</option>
                </select>
              </div>

              {/* Requirements */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Requirements</h3>

                <div>
                  <label className="block text-sm text-slate-300 mb-1">
                    Min. Tensile Strength: {requirements.minStrength} MPa
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="50"
                    value={requirements.minStrength}
                    onChange={(e) => setRequirements({...requirements, minStrength: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-1">
                    Min. Max Temperature: {requirements.maxTemp}°C
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="800"
                    step="25"
                    value={requirements.maxTemp}
                    onChange={(e) => setRequirements({...requirements, maxTemp: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-1">
                    Max. Density: {requirements.maxDensity} kg/m³
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="10000"
                    step="100"
                    value={requirements.maxDensity}
                    onChange={(e) => setRequirements({...requirements, maxDensity: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="aerospace-cert"
                    checked={requirements.aerospaceCertified}
                    onChange={(e) => setRequirements({...requirements, aerospaceCertified: e.target.checked})}
                    className="rounded border-slate-700 bg-slate-800 text-purple-600 focus:ring-purple-600"
                  />
                  <label htmlFor="aerospace-cert" className="text-sm text-slate-300">
                    Aerospace Certified Only
                  </label>
                </div>
              </div>

              <PremiumButton onClick={resetFilters} variant="secondary" className="w-full">
                Reset Filters
              </PremiumButton>
            </div>

            {/* Materials List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  Available Materials ({filteredMaterials.length})
                </h3>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredMaterials.map((material) => (
                  <motion.div
                    key={material.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedMaterial?.id === material.id
                        ? 'border-purple-600/50 bg-purple-600/10'
                        : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                    }`}
                    onClick={() => setSelectedMaterial(material)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${categoryColors[material.category]}`} />
                        <h4 className="font-semibold text-white">{material.name}</h4>
                        {material.aerospaceCertified && (
                          <span title="Aerospace Certified">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400">{material.grade}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-slate-400">Strength</div>
                        <div className="text-white">{material.properties.tensileStrength} MPa</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Density</div>
                        <div className="text-white">{material.properties.density} kg/m³</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Max Temp</div>
                        <div className="text-white">{material.properties.maxTemp}°C</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Material Details */}
          <AnimatePresence>
            {selectedMaterial && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 border-t border-slate-700 pt-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Properties */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Material Properties</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Weight className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-slate-400">Density</span>
                          </div>
                          <div className="text-white font-semibold">{selectedMaterial.properties.density} kg/m³</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Zap className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-slate-400">Tensile Strength</span>
                          </div>
                          <div className="text-white font-semibold">{selectedMaterial.properties.tensileStrength} MPa</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Thermometer className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-slate-400">Max Temperature</span>
                          </div>
                          <div className="text-white font-semibold">{selectedMaterial.properties.maxTemp}°C</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Shield className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-slate-400">Corrosion Resistance</span>
                          </div>
                          <div className="text-white font-semibold">{selectedMaterial.properties.corrosionResistance}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Applications & Considerations */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Applications & Considerations</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-green-400 font-medium mb-2">Typical Applications</h4>
                        <ul className="text-slate-300 text-sm space-y-1">
                          {selectedMaterial.applications.map((app, index) => (
                            <li key={index}>• {app}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-blue-400 font-medium mb-2">Advantages</h4>
                        <ul className="text-slate-300 text-sm space-y-1">
                          {selectedMaterial.advantages.map((adv, index) => (
                            <li key={index}>• {adv}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-yellow-400 font-medium mb-2">Considerations</h4>
                        <ul className="text-slate-300 text-sm space-y-1">
                          {selectedMaterial.considerations.map((con, index) => (
                            <li key={index}>• {con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </AnimatedSection>
    </div>
  );
}