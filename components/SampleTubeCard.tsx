
import React from 'react';
import { Sample, SpecimenType, Test, SPECIMEN_TYPES } from '../types';
import { ScanIcon, TrashIcon } from './icons';
import TubeTypeSelector from './TubeTypeSelector';
import ImageUploader from './ImageUploader';

interface SampleTubeCardProps {
  sample: Sample;
  index: number;
  tests: Test[];
  canRemove: boolean;
  onSampleChange: (sampleId: string, field: keyof Sample, value: any) => void;
  onRemove: (sampleId: string) => void;
}

const SampleTubeCard: React.FC<SampleTubeCardProps> = ({ sample, index, tests, canRemove, onSampleChange, onRemove }) => {
  const handleFieldChange = <K extends keyof Sample>(field: K, value: Sample[K]) => {
    onSampleChange(sample.id, field, value);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-6">
      <div className="flex justify-between items-start pb-4 border-b border-slate-200">
        <div>
          <h3 className="text-lg font-bold text-slate-700">Tube {index + 1}</h3>
           <ul className="mt-2 list-none text-slate-600 space-y-1 text-sm">
            {tests.map(test => (
              <li key={test.id} className="flex items-center">
                <svg className="w-2 h-2 mr-2 text-red-300 flex-shrink-0" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="4"/>
                </svg>
                <span>{test.name}</span>
              </li>
            ))}
          </ul>
        </div>
        {canRemove && (
             <button onClick={() => onRemove(sample.id)} className="text-slate-400 hover:text-red-600 flex-shrink-0 ml-4 transition-colors" aria-label={`Remove Tube ${index + 1}`}>
                <TrashIcon className="w-5 h-5" />
             </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Specimen Type</label>
        <div className="flex flex-wrap gap-2">
          {SPECIMEN_TYPES.map(type => (
            <button
              key={type}
              onClick={() => handleFieldChange('specimenType', type)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                sample.specimenType === type
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {sample.specimenType === 'Blood' && (
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Sample Tube Type</label>
          <TubeTypeSelector 
            selectedValue={sample.tubeType}
            onChange={(value) => handleFieldChange('tubeType', value)}
          />
        </div>
      )}

      <hr className="border-slate-200" />

      <div>
        <label htmlFor={`barcode-${sample.id}`} className="block text-sm font-bold text-slate-700 mb-2">
          Barcode ID
        </label>
        <div className="relative">
          <input
            id={`barcode-${sample.id}`}
            type="text"
            value={sample.barcode}
            onChange={(e) => handleFieldChange('barcode', e.target.value)}
            disabled={sample.isNba}
            placeholder="Enter or scan barcode"
            className="w-full pl-3 pr-10 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-slate-100 disabled:text-slate-500"
          />
          <button
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-800 disabled:cursor-not-allowed"
            disabled={sample.isNba}
          >
            <ScanIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center mt-3">
          <input
            id={`nba-${sample.id}`}
            type="checkbox"
            checked={sample.isNba}
            onChange={(e) => handleFieldChange('isNba', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
          />
          <label htmlFor={`nba-${sample.id}`} className="ml-3 block text-sm text-slate-700">
            NBA (No Barcode Required)
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Proof of Collection</label>
        <ImageUploader 
            imageUrl={sample.proofOfCollection}
            onChange={(dataUrl) => handleFieldChange('proofOfCollection', dataUrl)}
        />
      </div>
    </div>
  );
};

export default SampleTubeCard;
