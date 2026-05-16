import React, { useEffect, useState, useCallback } from 'react';
import { fetchPipeline, purgeRecord, approveDiscount } from '../services/api';
import { CheckCircle, Trash2, ShieldAlert } from 'lucide-react';

const PipelineTracker = ({ key }) => {
    const [pipeline, setPipeline] = useState([]);

    const loadMetrics = useCallback(async () => {
        try {
            const { data } = await fetchPipeline();
            setPipeline(data);
        } catch (err) {
            console.error("Pipeline sync error", err);
        }
    }, []);

    useEffect(() => { 
        loadMetrics(); 
    }, [loadMetrics, key]);

    const handlePurge = async (id) => {
        if (window.confirm("Are you sure you want to remove this record from the active directory?")) {
            await purgeRecord(id);
            loadMetrics();
        }
    };

    const handleApprove = async (id) => {
        try {
            await approveDiscount(id);
            loadMetrics(); 
        } catch (err) {
            console.error("Discount approval failed", err);
        }
    };

    return (
        <div className="space-y-4">
            
            <div className="flex justify-between items-center bg-[#0c0d0e] p-4 rounded-xl border border-zinc-800">
                <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Active Sales Pipeline</h2>
                <span className="text-xs bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-[#2be42b] font-mono">
                    Total Deals: {pipeline.length}
                </span>
            </div>
            
            
            <div className="overflow-hidden border border-zinc-800 rounded-2xl bg-[#0c0d0e]">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-800 bg-[#121315] text-zinc-500 uppercase text-[10px] tracking-wider font-bold">
                            <th className="p-4">Deal Details</th>
                            <th className="p-4">Client Reference</th>
                            <th className="p-4">Valuation</th>
                            <th className="p-4">Discount Risk</th>
                            <th className="p-4">Stage</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs text-zinc-300 divide-y divide-zinc-900">
                        {pipeline.length > 0 ? (
                            pipeline.map((item) => (
                                <tr key={item._id} className="hover:bg-zinc-900/40 transition-all">
                                    
                                    <td className="p-4 font-bold text-white tracking-tight">{item.dealName}</td>
                                    
                                
                                    <td className="p-4 text-zinc-400">{item.clientReference}</td>
                                    
                                    
                                    <td className="p-4 font-mono font-bold text-[#2be42b]">
                                        ${Number(item.valuation).toLocaleString()}
                                    </td>
                                    
                                    
                                    <td className="p-4">
                                        {item.discountRequested > 0 ? (
                                            <div className="flex items-center gap-2">
                                                <span className="text-zinc-400 font-medium">{item.discountRequested}%</span>
                                                {item.isDiscountApproved ? (
                                                    <span className="text-[10px] bg-[#173a1d] text-[#2be42b] border border-[#23532b] px-1.5 py-0.5 rounded-md font-bold">Approved</span>
                                                ) : (
                                                    <button 
                                                        onClick={() => handleApprove(item._id)}
                                                        className="text-[10px] bg-rose-950/40 text-rose-400 border border-rose-900 px-1.5 py-0.5 rounded-md font-bold flex items-center gap-1 hover:bg-rose-900 hover:text-white transition-all"
                                                    >
                                                        <ShieldAlert size={10} /> Approve?
                                                    </button>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-zinc-600">—</span>
                                        )}
                                    </td>
                                    
                                    
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                                            item.pipelineStage === 'Closed-Won' 
                                                ? 'bg-[#173a1d] text-[#2be42b] border-[#23532b]' 
                                                : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                                        }`}>
                                            {item.pipelineStage}
                                        </span>
                                    </td>
                                    
                                    
                                    <td className="p-4 text-right">
                                        <button 
                                            onClick={() => handlePurge(item._id)} 
                                            className="text-zinc-600 hover:text-rose-500 p-1 rounded-lg hover:bg-zinc-900 transition-all"
                                            title="Purge Record"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="p-12 text-center text-zinc-600 italic">
                                    No transaction logs available in this dashboard vector.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PipelineTracker;