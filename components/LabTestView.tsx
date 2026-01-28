
import React from 'react';
import { Lab, Sample } from '../types';
import { PlusIcon } from './icons';
import SampleTubeCard from './SampleTubeCard';

interface LabTestViewProps {
  lab: Lab;
  onSampleChange: (sampleId: string, field: keyof Sample, value: any) => void;
  onAddTube: () => void;
  onRemoveTube: (sampleId: string) => void;
}

const LabTestView: React.FC<LabTestViewProps> = ({ lab, onSampleChange, onAddTube, onRemoveTube }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Samples for {lab.name}</h2>
      </div>
      
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
