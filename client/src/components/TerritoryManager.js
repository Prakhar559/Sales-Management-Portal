import React, { useEffect, useState } from 'react';
import { fetchTerritories, registerTerritory } from '../services/api';
import { Globe, MapPin, UserCheck } from 'lucide-react';

const TerritoryManager = () => {
    const [territories, setTerritories] = useState([]);
    const [newRegion, setNewRegion] = useState({ regionName: '', leadName: '' });

    const loadData = async () => {
        try {
            const { data } = await fetchTerritories();
            setTerritories(data);
        } catch (err) {
            console.error("Error loading territory assets:", err);
        }
    };

    useEffect(() => { loadData(); }, []);

    const handleAssign = async (e) => {
        e.preventDefault();
        try {
            await registerTerritory(newRegion);
            setNewRegion({ regionName: '', leadName: '' });
            loadData();
        } catch (err) {
            console.error("Territory assignment rejected:", err);
        }
    };

    return (
        <div className="space-y-6 text-zinc-200">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#2be42b] rounded-full inline-block"></span>
                Territory Assignment Portal
            </h2>
            
            {/* Assignment Input Form - Matte Black & Neon Accents */}
            <form onSubmit={handleAssign} className="bg-[#0c0d0e] p-6 rounded-2xl border border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                    <label className="block text-[11px] text-zinc-500 font-medium uppercase mb-1.5 px-1">Region Name</label>
                    <input 
                        type="text" 
                        placeholder="e.g. South Zone Operations" 
                        value={newRegion.regionName}
                        onChange={(e) => setNewRegion({...newRegion, regionName: e.target.value})}
                        className="w-full bg-[#121315] p-3 text-xs rounded-xl border border-zinc-800 text-white focus:outline-none focus:border-[#2be42b] transition-all" 
                        required
                    />
                </div>
                <div>
                    <label className="block text-[11px] text-zinc-500 font-medium uppercase mb-1.5 px-1">Assigned Account Lead</label>
                    <input 
                        type="text" 
                        placeholder="e.g. Director Name" 
                        value={newRegion.leadName}
                        onChange={(e) => setNewRegion({...newRegion, leadName: e.target.value})}
                        className="w-full bg-[#121315] p-3 text-xs rounded-xl border border-zinc-800 text-white focus:outline-none focus:border-[#2be42b] transition-all" 
                        required
                    />
                </div>
                <button type="submit" className="bg-[#2be42b] text-black hover:bg-[#24ca24] py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#2be42b]/10 transition-all">
                    <MapPin size={14}/> <span>Assign Territory</span>
                </button>
            </form>

            {/* Dynamic Active Territories List */}
            <div className="grid grid-cols-1 gap-4">
                {territories.length > 0 ? (
                    territories.map(r => (
                        <div key={r._id} className="bg-[#0c0d0e] p-5 rounded-2xl border border-zinc-800 flex items-center justify-between hover:border-zinc-700 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#2be42b]">
                                    <Globe size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-base text-white tracking-tight">{r.regionName}</h3>
                                    <p className="text-zinc-500 text-xs flex items-center gap-1 mt-0.5">
                                        <UserCheck size={12} className="text-zinc-600" /> 
                                        <span>Assigned Lead: {r.leadName}</span>
                                    </p>
                                </div>
                            </div>
                            <span className="px-3 py-1 bg-[#173a1d] border border-[#23532b] rounded-full text-[10px] font-mono text-[#2be42b] font-bold">
                                {r.status || "Active Operational Vector"}
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="p-12 text-center text-zinc-500 text-xs border border-dashed border-zinc-800 rounded-2xl italic">
                        No active sector paths verified in this dashboard layer.
                    </div>
                )}
            </div>
        </div>
    );
};

export default TerritoryManager;