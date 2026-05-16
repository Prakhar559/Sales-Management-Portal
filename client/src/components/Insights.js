import React, { useEffect, useState } from 'react';
import { fetchPipeline } from '../services/api';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Lightbulb, TrendingUp, ShieldAlert, BarChart3 } from 'lucide-react';

const Insights = () => {
    const [pipelineData, setPipelineData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPipelineData = async () => {
            try {
                const { data } = await fetchPipeline();
                setPipelineData(data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to sync insights charts", err);
                setLoading(false);
            }
        };
        getPipelineData();
    }, []);

    
    const stageBreakdown = [
        { name: 'New Lead', value: pipelineData.filter(t => t.pipelineStage === 'Lead').reduce((a, b) => a + (b.valuation || 0), 0) },
        { name: 'Discovery', value: pipelineData.filter(t => t.pipelineStage === 'Discovery').reduce((a, b) => a + (b.valuation || 0), 0) },
        { name: 'Negotiation', value: pipelineData.filter(t => t.pipelineStage === 'Negotiation').reduce((a, b) => a + (b.valuation || 0), 0) },
        { name: 'Closed-Won', value: pipelineData.filter(t => t.pipelineStage === 'Closed-Won').reduce((a, b) => a + (b.valuation || 0), 0) },
    ].filter(item => item.value > 0);

    
    const NEON_COLORS = ['#1d3b24', '#1f532d', '#268a3e', '#2be42b']; 

    
    const totalPipelineVol = pipelineData.reduce((sum, item) => sum + (item.valuation || 0), 0);
    const pendingDiscountsCount = pipelineData.filter(item => item.discountRequested > 0 && !item.isDiscountApproved).length;

    if (loading) return <div className="text-zinc-500 text-xs italic p-8">Compiling active directory data asset...</div>;

    return (
        <div className="w-full space-y-8 animate-fade-in text-zinc-200">
            
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0c0d0e] p-6 rounded-2xl border border-zinc-800 flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-[#2be42b]">
                        <Lightbulb size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-xs uppercase text-zinc-400 tracking-wider mb-1">Pipeline Volume</p>
                        <p className="text-xl font-black text-white">${totalPipelineVol.toLocaleString()}</p>
                        <span className="text-[11px] text-zinc-500 block mt-1">Gross total market value</span>
                    </div>
                </div>

                <div className="bg-[#0c0d0e] p-6 rounded-2xl border border-zinc-800 flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-[#2be42b]">
                        <TrendingUp size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-xs uppercase text-zinc-400 tracking-wider mb-1">Conversion Target</p>
                        <p className="text-xl font-black text-white">78% Reached</p>
                        <span className="text-[11px] text-[#2be42b]">Consistent growth pacing</span>
                    </div>
                </div>

                <div className="bg-[#0c0d0e] p-6 rounded-2xl border border-zinc-800 flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-rose-500">
                        <ShieldAlert size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-xs uppercase text-zinc-400 tracking-wider mb-1">Manager Action Required</p>
                        <p className="text-xl font-black text-white">{pendingDiscountsCount} Pending</p>
                        <span className="text-[11px] text-zinc-500 block mt-1">Discount reviews outstanding</span>
                    </div>
                </div>
            </div>

            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                
                <div className="bg-[#0c0d0e] p-6 rounded-2xl border border-zinc-800">
                    <div className="flex items-center gap-2 mb-6">
                        <BarChart3 size={16} className="text-[#2be42b]" />
                        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Pipeline Stage Distribution</h3>
                    </div>
                    <div className="h-64 text-xs">
                        {stageBreakdown.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie 
                                        data={stageBreakdown} 
                                        innerRadius={65} 
                                        outerRadius={85} 
                                        paddingAngle={4} 
                                        dataKey="value"
                                    >
                                        {stageBreakdown.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={NEON_COLORS[index % NEON_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#121315', borderColor: '#27272a', borderRadius: '12px', color: '#fff' }}
                                        formatter={(value) => [`$${value.toLocaleString()}`, 'Volume']}
                                    />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-zinc-600 italic">No stage metrics logged yet.</div>
                        )}
                    </div>
                </div>


                <div className="bg-[#0c0d0e] p-6 rounded-2xl border border-zinc-800">
                    <div className="flex items-center gap-2 mb-6">
                        <BarChart3 size={16} className="text-[#2be42b]" />
                        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Deal Value Vector Comparison</h3>
                    </div>
                    <div className="h-64 text-xs">
                        {stageBreakdown.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stageBreakdown}>
                                    <XAxis dataKey="name" stroke="#71717a" tickLine={false} fontSize={11} />
                                    <YAxis stroke="#71717a" tickLine={false} fontSize={11} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#121315', borderColor: '#27272a', borderRadius: '12px', color: '#fff' }}
                                        formatter={(value) => [`$${value.toLocaleString()}`, 'Valuation']}
                                    />
                                    <Bar dataKey="value" fill="#2be42b" radius={[6, 6, 0, 0]} maxBarSize={45} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-zinc-600 italic">No conversion data assets recorded.</div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Insights;