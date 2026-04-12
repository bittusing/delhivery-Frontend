import React, { useState, useEffect, useCallback } from "react";
import {
  HelpCircle,
  Plus,
  Search,
  ChevronDown,
  Info,
  X,
  Mail,
  RotateCcw,
  AlertCircle,
  ArrowUpDown,
  Loader2,
  Clock,
  CheckCircle2,
  History,
  Send,
  MessageSquare
} from "lucide-react";
import { useSupport } from "../hooks/useSupport";

const SupportPage = () => {
  const {
    tickets,
    loading,
    error,
    fetchTickets,
    createTicket,
    fetchCategories,
    categories
  } = useSupport();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("open");
  const [searchTerm, setSearchTerm] = useState("");
  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: '',
    description: '',
    relatedOrderId: '',
    priority: 'medium'
  });

  const shipmentIssues = [
    "Reattempt or Delay in delivery / consignee pickup / return",
    "Firstmile / Seller Pickup related issues",
    "Shipment not delivered (need POD) / Fake remark",
    "Self collect / drop",
    "Damage / Missing / Mismatch",
    "Updated shipment details",
    "Cancel delivery / pickup",
    "Claims / Finance (disputes, remittance, bank details, etc.)",
    "Protect VAS",
    "Channel Integration",
    "Behaviour complaint against staff"
  ];

  const otherIssues = ["Tech Support", "Account"];

  useEffect(() => {
    fetchTickets({ status: activeTab });
    fetchCategories();
  }, [activeTab, fetchTickets, fetchCategories]);

  const handleCreateTicket = async () => {
    if (!newTicket.category || !newTicket.description || !newTicket.subject) {
      alert("Please fill in the required fields");
      return;
    }

    try {
      await createTicket(newTicket);
      setIsModalOpen(false);
      setNewTicket({
        subject: '',
        category: '',
        description: '',
        relatedOrderId: '',
        priority: 'medium'
      });
      fetchTickets({ status: activeTab });
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open': return <Clock className="w-4 h-4 text-orange-500" />;
      case 'resolved': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'closed': return <History className="w-4 h-4 text-gray-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen font-sans text-[#1a2b4b]">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Support</h1>
          <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 h-10 rounded-lg text-sm font-medium shadow-sm cursor-pointer hover:bg-gray-50">
            Learn More <HelpCircle className="w-5 h-5 text-[#4c6ef5] fill-[#4c6ef5]/10" />
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1d6ff2] text-white rounded-lg font-bold text-sm hover:bg-blue-700 shadow-sm transition-all"
        >
          <Plus className="w-5 h-5 stroke-[3]" /> Raise a ticket
        </button>
      </div>

      {/* Primary Tab Navigation */}
      <div className="flex gap-10 border-b border-gray-200 mb-4">
        {["open", "resolved", "closed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-bold transition-all relative capitalize ${activeTab === tab ? "text-blue-600" : "text-gray-500 hover:text-[#1a2b4b]"
              }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Review Notice */}
      <div className="flex items-center gap-2 text-gray-400 text-[13px] font-medium mb-4">
        <AlertCircle className="w-4 h-4" />
        Below tickets are currently being reviewed by our client support agents.
      </div>

      {/* Filters */}
      <div className="flex items-center mb-4 gap-4">
        <div className="flex items-center">
          <div className="flex items-center h-10 gap-2 px-4 border border-r-0 border-gray-200 rounded-l-lg bg-white text-xs font-bold cursor-pointer text-[#1a2b4b]">
            Ticket Id <ChevronDown className="w-4 h-4" />
          </div>
          <div className="relative flex items-center bg-[#f8f9fb] border border-gray-200 rounded-r-lg focus-within:border-blue-400 transition-all h-10">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent pl-4 pr-10 py-2.5 text-sm w-64 focus:outline-none placeholder:text-gray-500 font-medium"
              placeholder="Search by ticket id"
            />
            <Search className="absolute right-3 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Table Structure */}
      <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#e9ecef] text-[11px] uppercase text-gray-700 font-black border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Ticket details</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <ArrowUpDown className="w-3 h-3" /> Category
                </div>
              </th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <ArrowUpDown className="w-3 h-3" /> Last Updated
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="h-[400px] text-center">
                  <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto" />
                  <p className="mt-4 text-gray-500 font-medium">Loading your tickets...</p>
                </td>
              </tr>
            ) : tickets.length > 0 ? (
              tickets.filter(t => t.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase())).map((ticket) => (
                <tr key={ticket._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-blue-600 group-hover:underline">#{ticket.ticketNumber}</div>
                    <div className="text-[13px] text-[#1a2b4b] font-semibold mt-1 truncate max-w-xs">{ticket.subject}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(ticket.status)}
                      <span className="text-[12px] font-bold uppercase tracking-wider">{ticket.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[13px] font-bold text-gray-700">{ticket.category}</div>
                    <div className="text-[11px] text-gray-400 font-medium capitalize">{ticket.priority} Priority</div>
                  </td>
                  <td className="px-6 py-4 text-[12px] font-bold text-gray-500">
                    {formatDate(ticket.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-[12px] font-bold text-gray-500">
                    {formatDate(ticket.updatedAt)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="h-[400px] text-center">
                  <div className="max-w-xs mx-auto">
                    <MessageSquare className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-500 font-bold text-lg">No tickets found</p>
                    <p className="text-gray-400 text-sm mt-2">Looks like you don't have any {activeTab} support tickets at the moment.</p>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="mt-6 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold text-sm hover:bg-blue-100 transition-colors"
                    >
                      Raise a new ticket
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* RAISE A TICKET MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all p-4">
          <div className="bg-white w-full max-w-[800px] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100 bg-gray-50/30">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-black text-[#1a2b4b]">Raise a ticket</h2>
                <div className="hidden sm:flex items-center gap-2 bg-white border border-gray-200 px-4 py-1.5 rounded-lg text-sm font-bold text-blue-600 cursor-pointer shadow-sm">
                  Support Guide <HelpCircle className="w-4 h-4" />
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="bg-white p-2 rounded-full border border-gray-200 text-gray-400 hover:text-gray-900 shadow-sm transition-all hover:rotate-90">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto flex-grow space-y-8">
              <section>
                <h3 className="text-lg font-extrabold text-[#1a2b4b] mb-4">What category does your issue fall into?</h3>

                <div className="flex flex-wrap gap-2.5">
                  {[...shipmentIssues, ...otherIssues].map((issue, idx) => (
                    <button
                      key={idx}
                      onClick={() => setNewTicket(prev => ({ ...prev, category: issue }))}
                      className={`px-4 py-3 border text-[13px] font-bold transition-all text-left rounded-xl flex items-center gap-2 ${newTicket.category === issue
                          ? "bg-blue-600 border-blue-600 text-white shadow-md transform scale-105"
                          : "bg-white border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50/30"
                        }`}
                    >
                      {newTicket.category === issue && <CheckCircle2 className="w-4 h-4" />}
                      {issue}
                    </button>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-lg font-extrabold text-[#1a2b4b]">Tell us more details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Subject *</label>
                    <input
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all font-semibold"
                      placeholder="Briefly describe the issue"
                      value={newTicket.subject}
                      onChange={(e) => setNewTicket(prev => ({ ...prev, subject: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Related Order / AWB (Optional)</label>
                    <input
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all font-semibold"
                      placeholder="e.g. ORD123 or AWB789"
                      value={newTicket.relatedOrderId}
                      onChange={(e) => setNewTicket(prev => ({ ...prev, relatedOrderId: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Detailed Description *</label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all font-semibold resize-none"
                    placeholder="Provide as much detail as possible to help us solve your issue faster..."
                    value={newTicket.description}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, description: e.target.value }))}
                  ></textarea>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Priority</label>
                  <div className="flex gap-4">
                    {['low', 'medium', 'high'].map(p => (
                      <button
                        key={p}
                        onClick={() => setNewTicket(prev => ({ ...prev, priority: p }))}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border transition-all ${newTicket.priority === p
                            ? (p === 'high' ? 'bg-red-500 border-red-500 text-white' : p === 'medium' ? 'bg-orange-500 border-orange-500 text-white' : 'bg-blue-600 border-blue-600 text-white')
                            : 'bg-white text-gray-400 hover:border-gray-400'
                          }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-6 border-t border-gray-100 bg-gray-50/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600 rounded cursor-pointer border-gray-300" />
                  </div>
                  <span className="text-[13px] font-bold text-gray-800">Email notifications</span>
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </label>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 text-[13px] font-bold text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Discard
                </button>
                <button
                  onClick={handleCreateTicket}
                  disabled={loading}
                  className="flex-grow sm:flex-grow-0 flex items-center justify-center gap-2 px-8 py-3 bg-[#1d6ff2] text-white rounded-xl font-black text-[14px] hover:bg-blue-700 shadow-lg hover:shadow-blue-200 transition-all disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
                  Submit Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportPage;