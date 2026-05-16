import React, { useState } from 'react';
import { registerDeal } from '../services/api';

const DealEntryForm = ({ onUpdate }) => {
    const [dealData, setDealData] = useState({
        dealName: '', 
        valuation: '', 
        clientReference: '', 
        pipelineStage: 'Lead',
        discountRequested: '',
        customerFeedback: ''
    });

    const handleSubmission = async (e) => {
        e.preventDefault();
        try {
            await registerDeal({ 
                ...dealData, 
                valuation: Number(dealData.valuation),
                discountRequested: Number(dealData.discountRequested) || 0,
                ownerId: "REP_001" 
            });
            setDealData({ 
                dealName: '', 
                valuation: '', 
                clientReference: '', 
                pipelineStage: 'Lead',
                discountRequested: '',
                customerFeedback: ''
            });
            onUpdate(); 
        } catch (err) {
            console.error("Deal logging failed", err);
        }
    };

    return (
        <form onSubmit={handleSubmission} className="bg-[#0c0d0e] p-6 rounded-2xl border border-zinc-800 shadow-2xl text-white">
            <h3 className="text-lg font-bold mb-5 text-white tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#2be42b] rounded-full inline-block"></span>
                Log New Opportunity
            </h3>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-[11px] text-zinc-500 font-medium uppercase mb-1.5 px-1">Opportunity Name</label>
                    <input 
                        type="text" placeholder="e.g. Enterprise Cloud Infrastructure" 
                        value={dealData.dealName}
                        onChange={(e) => setDealData({...dealData, dealName: e.target.value})}
                        className="w-full bg-[#121315] p-3 text-xs rounded-xl border border-zinc-800 text-white focus:outline-none focus:border-[#2be42b] transition-all"
                        required
                    />
                </div>

                <div>
                    <label className="block text-[11px] text-zinc-500 font-medium uppercase mb-1.5 px-1">Estimated Valuation ($)</label>
                    <input 
                        type="number" placeholder="e.g. 50000" 
                        value={dealData.valuation}
                        onChange={(e) => setDealData({...dealData, valuation: e.target.value})}
                        className="w-full bg-[#121315] p-3 text-xs rounded-xl border border-zinc-800 text-white focus:outline-none focus:border-[#2be42b] transition-all"
                        required
                    />
                </div>

                <div>
                    <label className="block text-[11px] text-zinc-500 font-medium uppercase mb-1.5 px-1">Client Reference</label>
                    <input 
                        type="text" placeholder="e.g. Nexus Tech Corp" 
                        value={dealData.clientReference}
                        onChange={(e) => setDealData({...dealData, clientReference: e.target.value})}
                        className="w-full bg-[#121315] p-3 text-xs rounded-xl border border-zinc-800 text-white focus:outline-none focus:border-[#2be42b] transition-all"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[11px] text-zinc-500 font-medium uppercase mb-1.5 px-1">Discount % (Manager Story)</label>
                        <input 
                            type="number" placeholder="e.g. 15" 
                            value={dealData.discountRequested}
                            onChange={(e) => setDealData({...dealData, discountRequested: e.target.value})}
                            className="w-full bg-[#121315] p-3 text-xs rounded-xl border border-zinc-800 text-white focus:outline-none focus:border-[#2be42b] transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] text-zinc-500 font-medium uppercase mb-1.5 px-1">Pipeline Stage</label>
                        <select 
                            value={dealData.pipelineStage}
                            onChange={(e) => setDealData({...dealData, pipelineStage: e.target.value})}
                            className="w-full bg-[#121315] p-3 text-xs rounded-xl border border-zinc-800 text-white focus:outline-none focus:border-[#2be42b] transition-all appearance-none"
                        >
                            <option value="Lead">New Lead</option>
                            <option value="Discovery">Discovery Phase</option>
                            <option value="Negotiation">In Negotiation</option>
                            <option value="Closed-Won">Deal Won</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-[11px] text-zinc-500 font-medium uppercase mb-1.5 px-1">Client Feedback (Product Story)</label>
                    <input 
                        type="text" placeholder="Any initial comments or product feature needs..." 
                        value={dealData.customerFeedback}
                        onChange={(e) => setDealData({...dealData, customerFeedback: e.target.value})}
                        className="w-full bg-[#121315] p-3 text-xs rounded-xl border border-zinc-800 text-white focus:outline-none focus:border-[#2be42b] transition-all"
                    />
                </div>

                <button type="submit" className="w-full bg-[#2be42b] text-black hover:bg-[#24ca24] py-3.5 rounded-xl font-bold text-xs shadow-lg shadow-[#2be42b]/10 transition-all mt-2">
                    Submit Opportunity
                </button>
            </div>
        </form>
    );
};

export default DealEntryForm;