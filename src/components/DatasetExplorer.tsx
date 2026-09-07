import React, { useState } from 'react';
import { Dataset } from '../types';
import { KAGGLE_DATASETS } from '../data/datasets';
import { 
  Database, 
  ExternalLink, 
  Code2, 
  Copy, 
  Check, 
  Sparkles, 
  Zap, 
  GraduationCap, 
  Sun, 
  Rocket, 
  Activity, 
  Table, 
  FileText, 
  ArrowRight,
  HelpCircle,
  Download
} from 'lucide-react';

interface DatasetExplorerProps {
  onSelectDatasetForSubmission: (datasetId: string) => void;
}

export const DatasetExplorer: React.FC<DatasetExplorerProps> = ({
  onSelectDatasetForSubmission
}) => {
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>(KAGGLE_DATASETS[0].id);
  const [selectedLibrary, setSelectedLibrary] = useState<'matplotlib' | 'seaborn' | 'plotly'>('matplotlib');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showSampleData, setShowSampleData] = useState<boolean>(false);
  const [csvDownloaded, setCsvDownloaded] = useState<boolean>(false);

  const currentDataset = KAGGLE_DATASETS.find(d => d.id === selectedDatasetId) || KAGGLE_DATASETS[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return Zap;
      case 'GraduationCap': return GraduationCap;
      case 'Sun': return Sun;
      case 'Rocket': return Rocket;
      case 'Activity': return Activity;
      default: return Database;
    }
  };

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleDownloadSampleCsv = (dataset: Dataset) => {
    if (!dataset.sampleRows || dataset.sampleRows.length === 0) return;
    const headers = Object.keys(dataset.sampleRows[0]);
    const csvRows = [
      headers.join(','),
      ...dataset.sampleRows.map(row => headers.map(h => JSON.stringify(row[h] ?? '')).join(','))
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${dataset.id}_sample.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setCsvDownloaded(true);
    setTimeout(() => setCsvDownloaded(false), 3000);
  };

  const currentStarter = currentDataset.pythonStarters.find(s => s.library === selectedLibrary) 
    || currentDataset.pythonStarters[0];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Database className="w-4 h-4" />
            Curated Kaggle Benchmarks
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Select Your Challenge Dataset
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Choose from 5 industry-grade engineering datasets. Every dataset includes pre-tested Python visualization starters for <strong className="text-indigo-300">Matplotlib</strong>, <strong className="text-sky-300">Seaborn</strong>, and <strong className="text-emerald-300">Plotly</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300">
          <Code2 className="w-4 h-4 text-emerald-400" />
          <span>Python 3.10+ / Jupyter Compatible</span>
        </div>
      </div>

      {/* Dataset Picker Cards (Grid of 5) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {KAGGLE_DATASETS.map((ds) => {
          const Icon = getIcon(ds.iconName);
          const isSelected = ds.id === selectedDatasetId;
          return (
            <button
              key={ds.id}
              id={`dataset-card-${ds.id}`}
              onClick={() => {
                setSelectedDatasetId(ds.id);
                // Keep selected library if possible
              }}
              className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 shadow-md shadow-indigo-500/20 ring-1 ring-indigo-500/50'
                  : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400">
                    {ds.fileSize}
                  </span>
                </div>
                <h3 className={`text-xs font-bold line-clamp-2 mb-1 ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                  {ds.title}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {ds.category}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-mono">{ds.recordCount.split(' ')[0]} rows</span>
                {isSelected ? (
                  <span className="text-indigo-400 font-bold flex items-center gap-0.5">Active</span>
                ) : (
                  <span className="text-slate-400 group-hover:text-slate-300">View</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Deep-Dive on Active Dataset */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
        
        {/* Dataset Header Bar */}
        <div className="p-6 border-b border-slate-800/80 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/30">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                  {currentDataset.category}
                </span>
                <span className="text-xs text-slate-400">
                  {currentDataset.recordCount} • {currentDataset.fileSize}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {currentDataset.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                {currentDataset.description}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <a
                href={currentDataset.kaggleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors"
              >
                <span>View on Kaggle</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => handleDownloadSampleCsv(currentDataset)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              >
                {csvDownloaded ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Downloaded Sample</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Sample CSV</span>
                  </>
                )}
              </button>

              <button
                id="choose-dataset-submit-btn"
                onClick={() => onSelectDatasetForSubmission(currentDataset.id)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 active:scale-95 transition-all cursor-pointer"
              >
                <span>Use This Dataset to Submit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Suggested Analytical Inquiries */}
          <div className="mt-5 pt-4 border-t border-slate-800/80">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              Key Research Questions to Explore for Judges:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-slate-300">
              {currentDataset.suggestedQuestions.map((q, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono mt-0.5">#{idx + 1}</span>
                  <p className="leading-snug text-slate-300">{q}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Python Starter Code Suite (Emphasizing Matplotlib, Seaborn, Plotly) */}
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-bold text-white">
                  Ready-to-Use Python Starter Code
                </h4>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/20">
                  Recommended for Submission
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Copy and run this script locally in VS Code or Google Colab to produce your baseline submission figure.
              </p>
            </div>

            {/* Library Selector Pill Group */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
              {(['matplotlib', 'seaborn', 'plotly'] as const).map((lib) => {
                const isLibActive = selectedLibrary === lib;
                return (
                  <button
                    key={lib}
                    id={`lib-tab-${lib}`}
                    onClick={() => setSelectedLibrary(lib)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isLibActive
                        ? lib === 'matplotlib'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : lib === 'seaborn'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-purple-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {lib}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Starter Details */}
          {currentStarter && (
            <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
              <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{currentStarter.title}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-400 hidden sm:inline">{currentStarter.description}</span>
                </div>

                <button
                  id={`copy-python-code-btn-${selectedLibrary}`}
                  onClick={() => handleCopyCode(currentStarter.code, 99)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-colors cursor-pointer"
                >
                  {copiedIndex === 99 ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Python Script</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Editor Preview */}
              <div className="p-4 overflow-x-auto max-h-80 text-xs font-mono text-slate-300 leading-relaxed bg-[#0a0f1d]">
                <pre className="selection:bg-indigo-500/30">
                  <code>{currentStarter.code}</code>
                </pre>
              </div>

              <div className="px-4 py-2 bg-slate-900/50 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-mono">Dependencies:</span>
                  <code className="bg-slate-800 px-1.5 py-0.5 rounded text-indigo-300 font-mono">
                    pip install pandas {selectedLibrary}
                  </code>
                </div>
                <span>Export format: PNG / JPG 300 DPI for best judge score</span>
              </div>
            </div>
          )}

          {/* Toggle Sample Data Rows Preview */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <button
              id="toggle-sample-data-table-btn"
              onClick={() => setShowSampleData(!showSampleData)}
              className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
            >
              <Table className="w-4 h-4" />
              <span>{showSampleData ? 'Hide' : 'Inspect'} Sample Data Preview ({currentDataset.columns.length} Columns)</span>
            </button>

            {showSampleData && (
              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
                <div className="overflow-x-auto max-h-72">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-900 border-b border-slate-800 text-slate-300">
                        {currentDataset.columns.map((col, idx) => (
                          <th key={idx} className="p-2.5 font-bold whitespace-nowrap">
                            <div>{col.name}</div>
                            <span className="text-[10px] text-slate-400 font-mono font-normal">
                              ({col.type})
                            </span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                      {currentDataset.sampleRows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-900/50 text-slate-300">
                          {currentDataset.columns.map((col, cIdx) => (
                            <td key={cIdx} className="p-2.5 whitespace-nowrap">
                              {String(row[col.name] ?? '-')}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
