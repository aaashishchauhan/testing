
import React, { useState, useEffect } from 'react';
import { Lab, Sample, SPECIMEN_TYPES } from '../types';
import { ScanIcon, TrashIcon } from './icons';
import TubeTypeSelector from './TubeTypeSelector';
import ImageUploader from './ImageUploader';
import RealisticTube from './RealisticTube';

interface SingleTubeViewProps {
  lab: Lab;
  onSampleChange: (sampleId: string, field: keyof Sample, value: any) => void;
  onRemoveTube: (sampleId: string) => void;
}

const SingleTubeView: React.FC<SingleTubeViewProps> = ({ lab, onSampleChange, onRemoveTube }) => {
  const [selectedSampleId, setSelectedSampleId] = useState<string | undefined>(lab.samples[0]?.id);

  // Effect to reset selected sample if the lab changes or if the selected sample is removed
  useEffect(() => {
    const sampleExists = lab.samples.some(s => s.id === selectedSampleId);
    if (!sampleExists && lab.samples.length > 0) {
      setSelectedSampleId(lab.samples[0].id);
    } else if (lab.samples.length === 0) {
      setSelectedSampleId(undefined);
    }
  }, [lab.samples, selectedSampleId]);


  const selectedSample = lab.samples.find(s => s.id === selectedSampleId);
  const selectedIndex = lab.samples.findIndex(s => s.id === selectedSampleId);

  const handleFieldChange = <K extends keyof Sample>(field: K, value: Sample[K]) => {
    if (selectedSampleId) {
      onSampleChange(selectedSampleId, field, value);
    }
  };

  if (!selectedSample) {
    return <div className="text-center text-slate-500 py-10 bg-white rounded-lg shadow-sm">No samples available for this lab.</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* Left side: Visualization and Selector */}
        <div className="flex flex-col items-center gap-6 row-start-2 md:row-start-1">
          <div className="w-full">
            <label htmlFor="tube-selector" className="block text-sm font-bold text-slate-700 mb-2">
              Selected Tube
            </label>
            <select 
              id="tube-selector"
              value={selectedSampleId}
              onChange={(e) => setSelectedSampleId(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
            >
              {lab.samples.map((sample, index) => (
                <option key={sample.id} value={sample.id}>
                  Tube {index + 1} {sample.tubeType ? `(${sample.tubeType})` : ''}
                </option>
              ))}
            </select>
          </div>
          <RealisticTube tubeType={selectedSample.tubeType} />
        </div>

        {/* Right side: Form */}
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-800">Tube {selectedIndex + 1} Details</h3>
            {lab.samples.length > 1 && (
              <button 
                onClick={() => onRemoveTube(selectedSample.id)} 
                className="text-slate-500 hover:text-red-600 flex items-center gap-1.5 text-sm font-medium transition-colors"
                aria-label={`Remove Tube ${selectedIndex + 1}`}
              >
                <TrashIcon className="w-4 h-4" />
                Remove
              </button>
            )}
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-500 mb-2">Specimen Type</label>
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {SPECIMEN_TYPES.map(type => (
                  <button
                    key={type}
                    onClick={() => handleFieldChange('specimenType', type)}
                    className={`flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
                      selectedSample.specimenType === type
                        ? 'bg-slate-800 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {selectedSample.specimenType === 'Blood' && (
              <div>
                <label className="block text-sm font-semibold text-slate-500 mb-2">Sample Tube Type</label>
                <TubeTypeSelector 
                  selectedValue={selectedSample.tubeType}
                  onChange={(value) => handleFieldChange('tubeType', value)}
                />
              </div>
            )}
          </div>

          <hr className="border-slate-200" />

          <div className="space-y-6">
             <div>
              <label htmlFor={`barcode-${selectedSample.id}`} className="block text-sm font-bold text-slate-700 mb-2">
                Barcode ID
              </label>
              <div className="relative">
                <input
                  id={`barcode-${selectedSample.id}`}
                  type="text"
                  value={selectedSample.barcode}
                  onChange={(e) => handleFieldChange('barcode', e.target.value)}
                  disabled={selectedSample.isNba}
                  placeholder="Enter or scan barcode"
                  className="w-full pl-3 pr-10 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-slate-100 disabled:text-slate-500"
                />
                <button className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-800 disabled:cursor-not-allowed" disabled={selectedSample.isNba}>
                  <ScanIcon className="w-5 h-5" />
                </button>
              </div>
               <div className="flex items-center mt-3">
                <input
                  id={`nba-${selectedSample.id}`}
                  type="checkbox"
                  checked={selectedSample.isNba}
                  onChange={(e) => handleFieldChange('isNba', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <label htmlFor={`nba-${selectedSample.id}`} className="ml-3 block text-sm text-slate-700">
                  NBA (No Barcode Required)
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Proof of Collection</label>
              <ImageUploader 
                  imageUrl={selectedSample.proofOfCollection}
                  onChange={(dataUrl) => handleFieldChange('proofOfCollection', dataUrl)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTubeView;
