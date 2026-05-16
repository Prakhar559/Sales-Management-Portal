import React, { useEffect, useState } from 'react';
import { fetchContacts, registerContact } from '../services/api';
import { UserPlus, Mail, Building2 } from 'lucide-react';

const ContactsManager = () => {
    const [contacts, setContacts] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', company: '' });

    const loadContacts = async () => {
        try {
            const { data } = await fetchContacts();
            setContacts(data);
        } catch (err) {
            console.error("Error loading contacts:", err);
        }
    };

    useEffect(() => { loadContacts(); }, []);

    const handleAddContact = async (e) => {
        e.preventDefault();
        try {
            await registerContact(formData);
            setFormData({ name: '', email: '', company: '' });
            loadContacts();
        } catch (err) {
            console.error("Error adding contact:", err);
        }
    };

    return (
        <div className="space-y-6">
            
            <form onSubmit={handleAddContact} className="bg-[#0c0d0e] p-6 rounded-2xl border border-zinc-800 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <input 
                    type="text" 
                    placeholder="Contact Name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-[#121315] p-3 text-xs rounded-xl border border-zinc-800 text-white focus:outline-none focus:border-[#2be42b] transition-all" 
                    required
                />
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-[#121315] p-3 text-xs rounded-xl border border-zinc-800 text-white focus:outline-none focus:border-[#2be42b] transition-all" 
                    required
                />
                <input 
                    type="text" 
                    placeholder="Company Name" 
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="bg-[#121315] p-3 text-xs rounded-xl border border-zinc-800 text-white focus:outline-none focus:border-[#2be42b] transition-all" 
                    required
                />
                <button type="submit" className="bg-[#2be42b] text-black hover:bg-[#24ca24] py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#2be42b]/10 transition-all">
                    <UserPlus size={14}/> <span>Add Customer</span>
                </button>
            </form>

        
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contacts.length > 0 ? (
                    contacts.map(c => (
                        <div key={c._id} className="bg-[#0c0d0e] p-5 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 font-bold text-xs">
                                        {c.name.charAt(0).toUpperCase()}
                                    </div>
                                    <h3 className="font-bold text-base text-white tracking-tight">{c.name}</h3>
                                </div>
                                <div className="text-zinc-400 text-xs space-y-2 pt-1">
                                    <p className="flex items-center gap-2 bg-[#121315] px-3 py-2 rounded-xl border border-[#191b1d]">
                                        <Building2 size={12} className="text-zinc-500" /> 
                                        <span>{c.company}</span>
                                    </p>
                                    <p className="flex items-center gap-2 bg-[#121315] px-3 py-2 rounded-xl border border-[#191b1d]">
                                        <Mail size={12} className="text-zinc-500" /> 
                                        <span className="truncate">{c.email}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full p-12 text-center text-zinc-500 text-xs border border-dashed border-zinc-800 rounded-2xl italic">
                        No customers found in the active directory.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactsManager;