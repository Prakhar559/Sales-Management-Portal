import React from 'react';
import { LayoutDashboard, Users, BarChart3, Target, Settings } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
        { id: 'forecast', label: 'Sales Analytics', icon: <BarChart3 size={18} /> },
        { id: 'contacts', label: 'Customers', icon: <Users size={18} /> },
        { id: 'territory', label: 'Territory Metrics', icon: <Target size={18} /> },
        { id: 'config', label: 'Configuration', icon: <Settings size={18} /> },
    ];

    return (
        <div className="w-64 bg-[#0c0d0e] h-screen p-5 flex flex-col justify-between border-r border-[#191b1d]">
            <div>
            
                <div className="text-white font-black text-xl tracking-wider mb-8 flex items-center gap-2 px-2">
                    <div className="w-6 h-6 rounded-full border-2 border-[#2be42b] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#2be42b]"></div>
                    </div>
                    <span>SALESSYNC</span>
                </div>

                
                <nav className="space-y-1.5">
                    {menuItems.map(item => {
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`flex items-center justify-between w-full p-3 rounded-xl text-sm font-medium transition-all ${
                                    isActive
                                        ? 'bg-[#2be42b] text-black shadow-lg shadow-[#2be42b]/20 font-bold'
                                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    {item.icon}
                                    <span>{item.label}</span>
                                </div>
                            </button>
                        );
                    })}
                </nav>
            </div>

            
            <div className="bg-[#173a1d] border border-[#23532b] p-4 rounded-2xl text-white">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold tracking-wide text-zinc-300">Monthly Goal</span>
                </div>
                <p className="text-[11px] text-zinc-300 leading-snug">
                    You've reached <span className="text-[#2be42b] font-bold">78%</span> of your sales target this month.
                </p>
                <div className="w-full bg-zinc-900 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-[#2be42b] h-full rounded-full" style={{ width: '78%' }}></div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;