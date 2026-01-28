
import React, { useState, useMemo } from 'react';
import { Lab, Patient, Sample } from './types';
import Header from './components/Header';
import LabTestView from './components/LabTestView';
import { CheckIcon, UserIcon } from './components/icons';

// --- MOCK DATA ---
const mockPatient: Patient = {
  id: 'P001',
  name: 'Pratik Pansare',
};

const initialLabs: Lab[] = [
  {
    id: 'L01',
    name: 'Thyrocare',
    tests: [{ id: 'T01', name: 'Random Blood Sugar (Glucose)' }],
    samples: [
      {
        id: 'S01',
        specimenType: 'Blood',
        tubeType: 'EDTA',
        barcode: 'FG769926',
        isNba: false,
        proofOfCollection: null,
      },
    ],
  },
  {
    id: 'L02',
    name: 'Metropolis',
    tests: [{ id: 'T02', name: 'Complete Blood Count (CBC)' }, {id: 'T03', name: 'Lipid Profile'}],
    samples: [
       {
        id: 'S02',
        specimenType: 'Blood',
        tubeType: 'SST',
        barcode: '',
        isNba: false,
        proofOfCollection: null,
      },
    ],
  },
  {
    id: 'L03',
    name: 'Dr. Lal PathLabs',
    tests: [{ id: 'T04', name: 'Urine Culture' }],
    samples: [
      {
        id: 'S03',
        specimenType: 'Urine',
        tubeType: null,
        barcode: '',
        isNba: true,
        proofOfCollection: null,
      }
    ],
  },
];

const App: React.FC = () => {
  const [patient] = useState<Patient>(mockPatient);
  const [labs, setLabs] = useState<Lab[]>(initialLabs);
  const [activeLabId, setActiveLabId] = useState<string>(initialLabs[0].id);

  const activeLab = useMemo(() => labs.find(lab => lab.id === activeLabId), [labs, activeLabId]);

  const handleSampleChange = (sampleId: string, field: keyof Sample, value: any) => {
    setLabs(prevLabs =>
      prevLabs.map(lab =>
        lab.id === activeLabId
          ? {
              ...lab,
              samples: lab.samples.map(sample =>
                sample.id === sampleId ? { ...sample, [field]: value } : sample
              ),
            }
          : lab
      )
    );
  };

  const handleAddTube = () => {
    const newSample: Sample = {
      id: `S${Date.now()}`,
      specimenType: 'Blood',
      tubeType: null,
      barcode: '',
      isNba: false,
      proofOfCollection: null,
    };

    setLabs(prevLabs =>
      prevLabs.map(lab =>
        lab.id === activeLabId ? { ...lab, samples: [...lab.samples, newSample] } : lab
      )
    );
  };

  const handleRemoveTube = (sampleId: string) => {
    setLabs(prevLabs =>
      prevLabs.map(lab =>
        lab.id === activeLabId
          ? { ...lab, samples: lab.samples.filter(sample => sample.id !== sampleId) }
          : lab
      )
    );
  };

  const handleSubmit = () => {
    alert('Collection Submitted!\n\n' + JSON.stringify(labs, null, 2));
  };
  
  const isLabComplete = (lab: Lab): boolean => {
    return lab.samples.every(s => (s.barcode || s.isNba) && s.proofOfCollection);
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans flex flex-col">
      <Header />
      <main className="flex-grow p-4 pb-24">
        <div className="max-w-md mx-auto">
          {labs.length > 1 && (
              <div className="mb-4">
                <h2 className="text-lg font-bold text-slate-800">{patient.name}</h2>
              </div>
          )}
          
          <div className="-mx-4 mb-4">
            <div className="flex space-x-2 pb-2 overflow-x-auto px-4 no-scrollbar">
              {labs.map(lab => (
                <button
                  key={lab.id}
                  onClick={() => setActiveLabId(lab.id)}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeLabId === lab.id
                      ? 'bg-red-100 text-red-700 ring-2 ring-red-300'
                      : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {lab.name} ({lab.tests.length})
                  {isLabComplete(lab) && <CheckIcon className="w-4 h-4 text-green-500" />}
                </button>
              ))}
            </div>
          </div>

          {activeLab && (
            <LabTestView
              lab={activeLab}
              onSampleChange={handleSampleChange}
              onAddTube={handleAddTube}
              onRemoveTube={handleRemoveTube}
            />
          )}
        </div>
      </main>

      <footer className="sticky bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] p-4">
        <div className="max-w-md mx-auto">
            <button
              onClick={handleSubmit}
              className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-200"
            >
              Submit Collection
            </button>
        </div>
      </footer>
    </div>
  );
};

export default App;