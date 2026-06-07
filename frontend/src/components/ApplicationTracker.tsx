import { useState, FormEvent } from 'react';
import { Application } from '../types';
import { INITIAL_APPLICATIONS } from '../data';
import { Plus, ChevronLeft, ChevronRight, CheckSquare, Eye, Trash, Sparkles, MapPin, Notebook, X, Calendar } from 'lucide-react';

interface ApplicationTrackerProps {
  applications: Application[];
  onUpdateApplications: (apps: Application[]) => void;
}

const STAGES = [
  { id: 'applied', label: 'Applied' },
  { id: 'first_interview', label: 'First Interview' },
  { id: 'technical', label: 'Technical Assessment' },
  { id: 'final', label: 'Final Interview' },
  { id: 'offer', label: 'Offer Received' }
] as const;

export default function ApplicationTracker({ applications, onUpdateApplications }: ApplicationTrackerProps) {
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newLocation, setNewLocation] = useState('Remote');
  const [notesDraft, setNotesDraft] = useState('');

  // Handle stage moving
  const handleMove = (appId: string, direction: 'left' | 'right') => {
    onUpdateApplications(applications.map(app => {
      if (app.id !== appId) return app;
      
      const currentIdx = STAGES.findIndex(s => s.id === app.stage);
      let nextIdx = currentIdx;
      
      if (direction === 'left' && currentIdx > 0) nextIdx -= 1;
      if (direction === 'right' && currentIdx < STAGES.length - 1) nextIdx += 1;
      
      const nextStage = STAGES[nextIdx].id;
      return { 
        ...app, 
        stage: nextStage,
        dateUpdated: new Date().toISOString().split('T')[0]
      };
    }));
  };

  // Delete card
  const handleDelete = (appId: string) => {
    onUpdateApplications(applications.filter(app => app.id !== appId));
    if (selectedApp?.id === appId) {
      setSelectedApp(null);
    }
  };

  // Save notes updates
  const handleSaveNotes = () => {
    if (!selectedApp) return;
    onUpdateApplications(applications.map(app => 
      app.id === selectedApp.id ? { ...app, notes: notesDraft } : app
    ));
    setSelectedApp(prev => prev ? { ...prev, notes: notesDraft } : null);
  };

  // Add custom manual application
  const handleAddSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newCompany) return;

    const newApp: Application = {
      id: `app-${Date.now()}`,
      title: newTitle,
      company: newCompany,
      location: newLocation,
      stage: 'applied',
      dateUpdated: new Date().toISOString().split('T')[0],
      notes: 'Added manually to Dhurandhar Application Tracker.',
      matchScore: Math.floor(Math.random() * 20) + 75 // Random high matching score for mock UI
    };

    onUpdateApplications([newApp, ...applications]);
    setNewTitle('');
    setNewCompany('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      {/* Header toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-left">
          <h2 className="font-sans text-2xl font-bold text-zinc-900">Application Pipeline Tracker</h2>
          <p className="text-zinc-500 text-sm mt-1">Track every contact stage, log interview briefs, and maintain organized job records.</p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-lg font-sans text-xs font-bold tracking-wider uppercase transition-all shadow-xs flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Job Entry
        </button>
      </div>

      {/* Manual Input Dropdown */}
      {isAdding && (
        <form onSubmit={handleAddSubmit} className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-end text-left">
          <div>
            <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wide block mb-1">Position Title *</label>
            <input
              type="text"
              placeholder="e.g. AI Product Designer"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full text-xs bg-zinc-50 border border-zinc-200 p-2.5 rounded-lg focus:ring-1 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wide block mb-1">Company *</label>
            <input
              type="text"
              placeholder="e.g. Anthropic"
              value={newCompany}
              onChange={(e) => setNewCompany(e.target.value)}
              className="w-full text-xs bg-zinc-50 border border-zinc-200 p-2.5 rounded-lg focus:ring-1 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wide block mb-1">Location Environment</label>
            <input
              type="text"
              placeholder="e.g. San Francisco, Hybrid"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              className="w-full text-xs bg-zinc-50 border border-zinc-200 p-2.5 rounded-lg focus:ring-1 focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary-hover text-white py-2.5 text-xs font-bold uppercase rounded-lg cursor-pointer"
            >
              Add Entry
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-3 mt-1 py-1 rounded-lg text-xs font-bold cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Grid Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start select-none">
        {STAGES.map((col) => {
          const stageApps = applications.filter(app => app.stage === col.id);
          
          return (
            <div key={col.id} className="bg-zinc-100/60 border border-zinc-200/50 p-4 rounded-xl min-h-[580px] flex flex-col">
              {/* Column Title */}
              <div className="flex justify-between items-center mb-4 border-b border-zinc-200/50 pb-2">
                <h3 className="font-sans text-[12px] font-bold text-zinc-700 uppercase tracking-widest leading-none">
                  {col.label}
                </h3>
                <span className="bg-zinc-200 text-zinc-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {stageApps.length}
                </span>
              </div>

              {/* Column App Cards */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-0.5">
                {stageApps.map((app) => (
                  <div
                    key={app.id}
                    className="bg-white p-3.5 rounded-xl border border-zinc-200/60 shadow-xs hover:border-zinc-300 transition-all text-left space-y-3 relative group"
                  >
                    {/* Upper identity */}
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] uppercase font-bold text-primary font-mono tracking-wider">
                          {app.company}
                        </span>
                        
                        {/* Interactive columns shifter controls */}
                        <div className="flex gap-0.5 opacity-40 group-hover:opacity-100 transition-all">
                          <button
                            onClick={() => handleMove(app.id, 'left')}
                            className="p-1 hover:bg-zinc-100 text-zinc-600 rounded cursor-pointer"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMove(app.id, 'right')}
                            className="p-1 hover:bg-zinc-100 text-zinc-600 rounded cursor-pointer"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      
                      <h4 className="font-bold text-zinc-800 text-xs mt-1 font-sans">
                        {app.title}
                      </h4>
                      
                      <div className="flex items-center gap-1 text-[10px] text-zinc-400 mt-2">
                        <MapPin className="w-3 h-3" />
                        <span>{app.location}</span>
                      </div>
                    </div>

                    {/* Bottom actions */}
                    <div className="flex justify-between items-center pt-2 border-t border-zinc-100">
                      {app.matchScore && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-primary">
                          {app.matchScore}% ID
                        </span>
                      )}
                      
                      <div className="flex gap-1.5 ml-auto">
                        <button
                          onClick={() => {
                            setSelectedApp(app);
                            setNotesDraft(app.notes || '');
                          }}
                          className="p-1 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800 rounded transition-all cursor-pointer"
                        >
                          <Notebook className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="p-1 hover:bg-zinc-100 text-zinc-400 hover:text-red-500 rounded transition-all cursor-pointer"
                        >
                          <Trash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {stageApps.length === 0 && (
                  <div className="text-[10px] text-zinc-400 border border-dashed border-zinc-200 py-8 text-center italic font-sans select-none rounded-xl">
                    No active entries
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Side notebook detail modal overlay/popover drawer */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-xs z-50 flex justify-end">
          <div className="w-full max-w-md bg-white border-l h-full shadow-2xl flex flex-col justify-between text-left p-6 animate-slide-left">
            <div className="space-y-6">
              {/* Drawer header */}
              <div className="flex justify-between items-start pb-4 border-b">
                <div>
                  <span className="text-[10px] uppercase font-extrabold text-primary tracking-widest">{selectedApp.company}</span>
                  <h3 className="font-sans text-lg font-bold text-zinc-900 mt-1">{selectedApp.title}</h3>
                  <p className="text-zinc-500 text-xs flex items-center gap-1 mt-1 font-sans">
                    <Calendar className="w-3.5 h-3.5" /> Updated: {selectedApp.dateUpdated}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-1 hover:bg-zinc-100 text-zinc-400 hover:text-zinc-800 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Match scoring */}
              {selectedApp.matchScore && (
                <div className="p-3.5 bg-primary/5 rounded-xl border border-primary/10 flex items-center justify-between text-left">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-800 font-sans">Semantic Match Rating</h4>
                    <p className="text-[11px] text-zinc-500 font-sans mt-0.5">Calculated by Dhurandhar ATS neural matching index.</p>
                  </div>
                  <span className="px-3 py-1 bg-white border border-primary text-primary text-xs font-bold font-sans rounded-full">
                    {selectedApp.matchScore}% Match
                  </span>
                </div>
              )}

              {/* Bullet notes section */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wide block">Application Logs & Prep Notes</label>
                <textarea
                  rows={10}
                  value={notesDraft}
                  onChange={(e) => setNotesDraft(e.target.value)}
                  placeholder="Record your preparation strategies, contact lists, recruiter interview questions, etc."
                  className="w-full text-xs bg-zinc-50 border border-zinc-200 p-3 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none font-sans"
                />
              </div>
            </div>

            {/* Save notes */}
            <div className="border-t pt-4 flex gap-3">
              <button
                onClick={handleSaveNotes}
                className="flex-1 bg-primary hover:bg-primary-hover text-white py-3 rounded-lg text-xs font-bold uppercase cursor-pointer"
              >
                Save Preparation Notes
              </button>
              <button
                onClick={() => setSelectedApp(null)}
                className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-4 rounded-lg text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
