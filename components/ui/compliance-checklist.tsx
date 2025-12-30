'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertCircle, ChevronDown, ChevronRight, Download, Search, TrendingUp } from 'lucide-react';
import { PremiumButton } from '@/components/ui/premium-button';
import AnimatedSection from '@/components/ui/animated-section';
import { usePrefersReducedMotion } from '@/lib/motion';

interface ChecklistItem {
  id: string;
  section: string;
  requirement: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'non-applicable';
  priority: 'high' | 'medium' | 'low';
  evidence?: string;
  notes?: string;
  dueDate?: string;
}

interface ChecklistSection {
  id: string;
  title: string;
  description: string;
  items: ChecklistItem[];
  progress: number;
}

const initialSections: ChecklistSection[] = [
  {
    id: 'context',
    title: '4. Context of the Organization',
    description: 'Understanding organizational context and stakeholder needs',
    progress: 0,
    items: [
      {
        id: '4.1.1',
        section: '4.1',
        requirement: 'Determine external and internal issues',
        description: 'Identify and document factors affecting QMS performance',
        status: 'not-started',
        priority: 'high'
      },
      {
        id: '4.2.1',
        section: '4.2',
        requirement: 'Identify interested parties',
        description: 'Determine stakeholders relevant to QMS',
        status: 'not-started',
        priority: 'high'
      },
      {
        id: '4.3.1',
        section: '4.3',
        requirement: 'Define QMS scope',
        description: 'Document boundaries and applicability of QMS',
        status: 'not-started',
        priority: 'high'
      }
    ]
  },
  {
    id: 'leadership',
    title: '5. Leadership',
    description: 'Leadership commitment and quality policy',
    progress: 0,
    items: [
      {
        id: '5.1.1',
        section: '5.1',
        requirement: 'Demonstrate leadership commitment',
        description: 'Top management accountability for QMS effectiveness',
        status: 'not-started',
        priority: 'high'
      },
      {
        id: '5.2.1',
        section: '5.2',
        requirement: 'Establish quality policy',
        description: 'Create and communicate quality policy',
        status: 'not-started',
        priority: 'high'
      },
      {
        id: '5.3.1',
        section: '5.3',
        requirement: 'Define roles and responsibilities',
        description: 'Assign and communicate organizational responsibilities',
        status: 'not-started',
        priority: 'high'
      }
    ]
  },
  {
    id: 'planning',
    title: '6. Planning',
    description: 'Risk management and quality objectives',
    progress: 0,
    items: [
      {
        id: '6.1.1',
        section: '6.1',
        requirement: 'Address risks and opportunities',
        description: 'Identify and manage QMS risks',
        status: 'not-started',
        priority: 'high'
      },
      {
        id: '6.2.1',
        section: '6.2',
        requirement: 'Establish quality objectives',
        description: 'Set measurable quality objectives at relevant levels',
        status: 'not-started',
        priority: 'high'
      },
      {
        id: '6.3.1',
        section: '6.3',
        requirement: 'Plan for changes',
        description: 'Manage QMS changes systematically',
        status: 'not-started',
        priority: 'medium'
      }
    ]
  },
  {
    id: 'support',
    title: '7. Support',
    description: 'Resources, competence, and documentation',
    progress: 0,
    items: [
      {
        id: '7.1.1',
        section: '7.1',
        requirement: 'Provide necessary resources',
        description: 'Ensure adequate resources for QMS',
        status: 'not-started',
        priority: 'high'
      },
      {
        id: '7.2.1',
        section: '7.2',
        requirement: 'Ensure personnel competence',
        description: 'Determine and maintain necessary competence',
        status: 'not-started',
        priority: 'high'
      },
      {
        id: '7.5.1',
        section: '7.5',
        requirement: 'Control documented information',
        description: 'Create, update, and control QMS documentation',
        status: 'not-started',
        priority: 'high'
      }
    ]
  },
  {
    id: 'operation',
    title: '8. Operation',
    description: 'Operational planning and control',
    progress: 0,
    items: [
      {
        id: '8.1.1',
        section: '8.1',
        requirement: 'Plan and control operations',
        description: 'Establish criteria for processes and products',
        status: 'not-started',
        priority: 'high'
      },
      {
        id: '8.2.1',
        section: '8.2',
        requirement: 'Determine product requirements',
        description: 'Review and communicate requirements',
        status: 'not-started',
        priority: 'high'
      },
      {
        id: '8.4.1',
        section: '8.4',
        requirement: 'Control external providers',
        description: 'Manage suppliers and outsourced processes',
        status: 'not-started',
        priority: 'high'
      },
      {
        id: '8.5.1',
        section: '8.5',
        requirement: 'Production control',
        description: 'Implement controlled production conditions',
        status: 'not-started',
        priority: 'high'
      },
      {
        id: '8.6.1',
        section: '8.6',
        requirement: 'Product release',
        description: 'Verify products meet requirements before release',
        status: 'not-started',
        priority: 'high'
      },
      {
        id: '8.7.1',
        section: '8.7',
        requirement: 'Control nonconforming outputs',
        description: 'Identify and control nonconforming products',
        status: 'not-started',
        priority: 'high'
      }
    ]
  },
  {
    id: 'evaluation',
    title: '9. Performance Evaluation',
    description: 'Monitoring, measurement, and improvement',
    progress: 0,
    items: [
      {
        id: '9.1.1',
        section: '9.1',
        requirement: 'Monitor and measure performance',
        description: 'Determine what to monitor and analyze',
        status: 'not-started',
        priority: 'high'
      },
      {
        id: '9.2.1',
        section: '9.2',
        requirement: 'Conduct internal audits',
        description: 'Plan and perform internal QMS audits',
        status: 'not-started',
        priority: 'high'
      },
      {
        id: '9.3.1',
        section: '9.3',
        requirement: 'Management review',
        description: 'Review QMS at planned intervals',
        status: 'not-started',
        priority: 'high'
      }
    ]
  },
  {
    id: 'improvement',
    title: '10. Improvement',
    description: 'Continuous improvement and corrective action',
    progress: 0,
    items: [
      {
        id: '10.2.1',
        section: '10.2',
        requirement: 'Nonconformity and corrective action',
        description: 'React to nonconformities and eliminate causes',
        status: 'not-started',
        priority: 'high'
      },
      {
        id: '10.3.1',
        section: '10.3',
        requirement: 'Continual improvement',
        description: 'Continuously improve QMS effectiveness',
        status: 'not-started',
        priority: 'high'
      }
    ]
  }
];

export default function ComplianceChecklist() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [sections, setSections] = useState<ChecklistSection[]>(initialSections);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['context']));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    // Calculate overall progress
    const totalItems = sections.reduce((acc, section) => acc + section.items.length, 0);
    const completedItems = sections.reduce((acc, section) =>
      acc + section.items.filter(item => item.status === 'completed').length, 0
    );
    const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
    setOverallProgress(progress);

    // Update section progress
    const updatedSections = sections.map(section => ({
      ...section,
      progress: section.items.length > 0
        ? Math.round((section.items.filter(item => item.status === 'completed').length / section.items.length) * 100)
        : 0
    }));

    if (JSON.stringify(updatedSections) !== JSON.stringify(sections)) {
      setSections(updatedSections);
    }
  }, [sections]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const updateItemStatus = (sectionId: string, itemId: string, status: ChecklistItem['status']) => {
    setSections(prev => prev.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          items: section.items.map(item =>
            item.id === itemId ? { ...item, status } : item
          )
        };
      }
      return section;
    }));
  };

  const getStatusColor = (status: ChecklistItem['status']) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/10';
      case 'in-progress': return 'text-yellow-400 bg-yellow-400/10';
      case 'not-started': return 'text-slate-400 bg-slate-400/10';
      case 'non-applicable': return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status: ChecklistItem['status']) => {
    switch (status) {
      case 'completed': return <Check className="w-4 h-4" />;
      case 'in-progress': return <AlertCircle className="w-4 h-4" />;
      case 'not-started': return <X className="w-4 h-4" />;
      case 'non-applicable': return <X className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: ChecklistItem['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
    }
  };

  const exportChecklist = () => {
    const data = {
      exportDate: new Date().toISOString(),
      overallProgress,
      sections: sections.map(section => ({
        ...section,
        items: section.items.map(item => ({
          ...item,
          lastUpdated: new Date().toISOString()
        }))
      }))
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AS9100D-Checklist-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredSections = sections.map(section => ({
    ...section,
    items: section.items.filter(item => {
      const matchesSearch = searchTerm === '' ||
        item.requirement.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || item.priority === filterPriority;
      return matchesSearch && matchesStatus && matchesPriority;
    })
  }));

  return (
    <div className="max-w-6xl mx-auto">
      <AnimatedSection>
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">AS9100D Compliance Tracker</h2>
                <p className="text-slate-400">Track your certification readiness</p>
              </div>
            </div>
            <div className="flex gap-2">
              <PremiumButton onClick={exportChecklist} variant="secondary">
                <Download className="w-4 h-4 mr-2" />
                Export
              </PremiumButton>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="bg-slate-800/50 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Overall Compliance Progress</h3>
                <p className="text-slate-400 text-sm">
                  {sections.reduce((acc, s) => acc + s.items.filter(i => i.status === 'completed').length, 0)} of {' '}
                  {sections.reduce((acc, s) => acc + s.items.length, 0)} requirements completed
                </p>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-3xl font-bold text-white">{overallProgress}%</span>
              </div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-600 to-emerald-600"
                initial={{ width: prefersReducedMotion ? `${overallProgress}%` : 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-600/50 focus:border-green-600"
                placeholder="Search requirements..."
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-600/50 focus:border-green-600"
            >
              <option value="all">All Status</option>
              <option value="not-started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="non-applicable">N/A</option>
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-600/50 focus:border-green-600"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Checklist Sections */}
          <div className="space-y-4">
            {filteredSections.map((section) => (
              <motion.div
                key={section.id}
                className="border border-slate-700 rounded-xl overflow-hidden"
                initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
              >
                <div
                  className="bg-slate-800/50 p-4 cursor-pointer hover:bg-slate-800/70 transition-colors"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {expandedSections.has(section.id) ? (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                        <p className="text-sm text-slate-400">{section.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm text-slate-400">Progress</div>
                        <div className="text-lg font-bold text-white">{section.progress}%</div>
                      </div>
                      <div className="w-24 bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-600 to-emerald-600"
                          style={{ width: `${section.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedSections.has(section.id) && section.items.length > 0 && (
                    <motion.div
                      initial={{ height: prefersReducedMotion ? 'auto' : 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: prefersReducedMotion ? 'auto' : 0 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                      className="border-t border-slate-700"
                    >
                      <div className="p-4 space-y-3">
                        {section.items.map((item) => (
                          <div
                            key={item.id}
                            className="bg-slate-800/30 rounded-lg p-4 hover:bg-slate-800/50 transition-colors"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="text-sm font-mono text-slate-500">{item.section}</span>
                                  <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(item.priority)}`}>
                                    {item.priority}
                                  </span>
                                </div>
                                <h4 className="font-medium text-white mb-1">{item.requirement}</h4>
                                <p className="text-sm text-slate-400">{item.description}</p>
                              </div>
                              <div className="flex items-center gap-2 ml-4">
                                {['not-started', 'in-progress', 'completed', 'non-applicable'].map(status => (
                                  <button
                                    key={status}
                                    onClick={() => updateItemStatus(section.id, item.id, status as any)}
                                    className={`p-2 rounded-lg transition-all ${
                                      item.status === status
                                        ? getStatusColor(status as any)
                                        : 'text-slate-600 hover:text-slate-400 hover:bg-slate-800'
                                    }`}
                                    title={status.replace('-', ' ')}
                                  >
                                    {getStatusIcon(status as any)}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: 'Not Started', status: 'not-started', color: 'slate' },
              { label: 'In Progress', status: 'in-progress', color: 'yellow' },
              { label: 'Completed', status: 'completed', color: 'green' },
              { label: 'N/A', status: 'non-applicable', color: 'gray' }
            ].map(stat => {
              const count = sections.reduce((acc, section) =>
                acc + section.items.filter(item => item.status === stat.status).length, 0
              );
              return (
                <div key={stat.status} className="bg-slate-800/30 rounded-lg p-4 text-center">
                  <div className={`text-2xl font-bold text-${stat.color}-400`}>{count}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}