import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DealEntryForm from './components/DealEntryForm';
import PipelineTracker from './components/PipelineTracker';
import ContactsManager from './components/ContactsManager';
import ForecastView from './components/ForecastView';
import TerritoryManager from './components/TerritoryManager';
import Settings from './components/Settings';
import { Search, Bell, User } from 'lucide-react'; 

function App() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const renderMainContent = () => {
        switch(activeTab) {
            case 'dashboard':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1">
                            <DealEntryForm onUpdate={() => setRefreshTrigger(t => t + 1)} />
                        </div>
                        <div className="lg:col-span-2">
                            <PipelineTracker key={refreshTrigger} />
                        </div>
                    </div>
                );
            case 'forecast':          
                return <ForecastView />;
            case 'contacts':
                return <ContactsManager />;
            case 'territory': 
                return <TerritoryManager />;
            case 'config': 
                return <Settings />;
            default: 
                return <ForecastView />;
        }
    };

    return (
        <div className="flex min-h-screen bg-[#121315] text-zinc-200 antialiased font-sans">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight capitalize">
                            {activeTab === 'config' ? 'System Configuration' : activeTab + ' Overview'}
                        </h1>
                    </div>
                    
                    <div className="flex items-center gap-4 self-end md:self-auto">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 text-zinc-500" size={16} />
                            <input 
                                type="text" 
                                placeholder="Search system vectors..." 
                                className="bg-[#0c0d0e] text-xs text-white pl-9 pr-4 py-2.5 rounded-xl w-60 border border-zinc-800 focus:outline-none focus:border-[#2be42b] transition-all"
                            />
                        </div>
                        
                        <button className="p-2.5 bg-[#0c0d0e] rounded-xl border border-zinc-800 text-zinc-400 hover:text-white transition-all">
                            <Bell size={16} />
                        </button>
                        
                        {/* Profile Avatar Widget Replaced with User Circle Icon */}
                        <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
                            <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#2be42b] shadow-md hover:border-[#2be42b] transition-all">
                                <User size={18} />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="animate-fade-in">
                    {renderMainContent()}
                </div>
            </main>
        </div>
    );
}

export default App;