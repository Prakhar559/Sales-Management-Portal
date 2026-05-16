import React, { useState, useEffect } from 'react';
import { fetchSettings, updateSettings } from '../services/api';
import { Shield, Eye, Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
    const [config, setConfig] = useState({
        allowAutomaticReminders: true,
        restrictDiscountApprovals: true,
        defaultTerritoryView: 'Global'
    });

    useEffect(() => {
        const loadConfig = async () => {
            try {
                const { data } = await fetchSettings();
                setConfig(data);
            } catch (err) {
                console.error("Configuration Vector Load Error:", err);
            }
        };
        loadConfig();
    }, []);

    const handleToggle = async (field) => {
        const updatedConfig = { ...config, [field]: !config[field] };
        setConfig(updatedConfig);
        try {
            await updateSettings(updatedConfig);
        } catch (err) {
            console.error("Configuration Update Failed:", err);
        }
    };

    const handleSelectChange = async (e) => {
        const updatedConfig = { ...config, defaultTerritoryView: e.target.value };
        setConfig(updatedConfig);
        try {
            await updateSettings(updatedConfig);
        } catch (err) {
            console.error("Configuration Update Failed:", err);
        }
    };

    return (
        <div className="w-full max-w-4xl space-y-6 text-zinc-200 animate-fade-in">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <SettingsIcon size={18} className="text-[#2be42b]" />
                System Configuration & Controls
            </h2>
            
            <div className="bg-[#0c0d0e] rounded-2xl p-6 border border-zinc-800 space-y-6">
                
                
                <div className="flex justify-between items-center border-b border-zinc-900 pb-6">
                    <div className="flex gap-4 items-start">
                        <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl text-[#2be42b] mt-0.5">
                            <SettingsIcon size={16} />
                        </div>
                        <div>
                            <p className="font-bold text-white text-sm">Automated Account Renewals</p>
                            <p className="text-xs text-zinc-500">Trigger system reminders for upcoming account cycles automatically.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => handleToggle('allowAutomaticReminders')}
                        className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${config.allowAutomaticReminders ? 'bg-[#2be42b]' : 'bg-zinc-800'}`}
                    >
                        <div className={`w-4 h-4 bg-white rounded-full transition-all absolute ${config.allowAutomaticReminders ? 'left-7 bg-black' : 'left-1'}`}></div>
                    </button>
                </div>

                
                <div className="flex justify-between items-center border-b border-zinc-900 pb-6">
                    <div className="flex gap-4 items-start">
                        <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl text-[#2be42b] mt-0.5">
                            <Shield size={16} />
                        </div>
                        <div>
                            <p className="font-bold text-white text-sm">Strict Discount Verification</p>
                            <p className="text-xs text-zinc-500">Enforce mandatory security checks on deal pricing overrides.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => handleToggle('restrictDiscountApprovals')}
                        className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${config.restrictDiscountApprovals ? 'bg-[#2be42b]' : 'bg-zinc-800'}`}
                    >
                        <div className={`w-4 h-4 bg-white rounded-full transition-all absolute ${config.restrictDiscountApprovals ? 'left-7 bg-black' : 'left-1'}`}></div>
                    </button>
                </div>

                
                <div className="flex justify-between items-center pt-2">
                    <div className="flex gap-4 items-start">
                        <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl text-[#2be42b] mt-0.5">
                            <Eye size={16} />
                        </div>
                        <div>
                            <p className="font-bold text-white text-sm">Default Territory Matrix Scope</p>
                            <p className="text-xs text-zinc-500">Configure global dashboard default region indexing limits.</p>
                        </div>
                    </div>
                    <select 
                        className="bg-[#121315] border border-zinc-800 text-xs rounded-xl p-2.5 font-bold text-zinc-300 focus:outline-none focus:border-[#2be42b]"
                        value={config.defaultTerritoryView}
                        onChange={handleSelectChange}
                    >
                        <option value="Global">Global Asset View</option>
                        <option value="Regional">Regional Node View</option>
                        <option value="Local">Local Cluster View</option>
                    </select>
                </div>

            </div>
        </div>
    );
};

export default Settings;