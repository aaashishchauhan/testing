
import React, { useState } from 'react';
import { Lab, Sample } from '../types';
import { PlusIcon, ViewListIcon, ViewSingleIcon } from './icons';
import SampleTubeCard from './SampleTubeCard';
import SingleTubeView from './SingleTubeView';

interface LabTestViewProps {
  lab: Lab;
  onSampleChange: (sampleId: string, field: keyof Sample, value: any) => void;
  onAddTube: () => void;
  onRemoveTube: (sampleId: string) => void;
}

const LabTestView: React.FC<LabTestViewProps> = ({ lab, onSampleChange, onAddTube, onRemoveTube }) => {
  const [viewMode, setViewMode] = useState<'list' | 'single'>('single');

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Samples for {lab.name}</h2>
        <div className="flex items-center gap-1 rounded-lg bg-slate-200 p-1" role="radiogroup" aria-label="View mode">
          <button 
            onClick={() => setViewMode('list')} 
            className={`px-2 py-1 rounded-md text-sm transition-colors ${viewMode === 'list' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:bg-slate-300'}`}
            aria-pressed={viewMode === 'list'}
            role="radio"
            aria-checked={viewMode === 'list'}
            aria-label="List View"
          >
            <ViewListIcon className="w-5 h-5" />
            <span className="sr-only">List View</span>
          </button>
          <button 
            onClick={() => setViewMode('single')} 
            className={`px-2 py-1 rounded-md text-sm transition-colors ${viewMode === 'single' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:bg-slate-300'}`}
            aria-pressed={viewMode === 'single'}
            role="radio"
            aria-checked={viewMode === 'single'}
            aria-label="Single View"
          >
            <ViewSingleIcon className="w-5 h-5" />
            <span className="sr-only">Single View</span>
          </button>
        </div>
      </div>
      
      {viewMode === 'list' ? (
        <div className="space-y-4">
          {lab.samples.map((sample, index) => (
            <SampleTubeCard
              key={sample.id}
              sample={sample}
              index={index}
              tests={lab.tests}
              canRemove={lab.samples.length > 1}
              onSampleChange={onSampleChange}
              onRemove={onRemoveTube}
            />
          ))}
        </div>
      ) : (
        <SingleTubeView 
          lab={lab}
          onSampleChange={onSampleChange}
          onRemoveTube={onRemoveTube}
        />
      )}

      <button 
        onClick={onAddTube}
        className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-red-300 text-red-600 font-bold rounded-lg hover:bg-red-50 hover:border-red-400 transition-colors"
      >
        <PlusIcon className="w-5 h-5" />
        Add Another Tube
      </button>
    </div>
  );
};

export default LabTestView;
