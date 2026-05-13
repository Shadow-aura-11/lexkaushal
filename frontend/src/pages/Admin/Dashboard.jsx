import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Calendar, MessageSquare, LogOut, 
  Search, Filter, ChevronRight, CheckCircle, XCircle, 
  Clock, Mail, Phone, ExternalLink, X, CalendarDays
} from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  const navigate = useNavigate();

  const fetchAppointments = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {
      const res = await axios.get('http://localhost:5001/api/admin/appointments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(res.data);
      setFilteredAppointments(res.data);
      setLoading(false);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [navigate]);

  // Apply Filters
  useEffect(() => {
    let result = appointments;

    if (searchTerm) {
      result = result.filter(a => 
        a.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.clientPhone.includes(searchTerm)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter(a => a.status === statusFilter);
    }

    if (dateFilter) {
      // Input date is YYYY-MM-DD, DB date is usually DD/MM/YYYY or similar based on my previous update
      // But SQLite DATEONLY stores YYYY-MM-DD. Let's check the match.
      result = result.filter(a => a.date === dateFilter || a.date.includes(dateFilter));
    }

    setFilteredAppointments(result);
  }, [searchTerm, statusFilter, dateFilter, appointments]);

  const updateStatus = async (id, newStatus) => {
    setUpdateLoading(true);
    const token = localStorage.getItem('adminToken');
    try {
      await axios.patch(`http://localhost:5001/api/admin/appointments/${id}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchAppointments();
      setSelectedAppointment(null);
    } catch (err) {
      alert("Failed to update status");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 font-poppins">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex font-poppins">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-900 text-white flex-shrink-0 hidden lg:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-playfair font-bold text-gold-500">Legal CMS</h2>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <div className="flex items-center space-x-3 p-3 bg-gold-500 text-navy-900 rounded-md font-semibold">
            <Calendar className="h-5 w-5" />
            <span>Consultations</span>
          </div>
          <div className="flex items-center space-x-3 p-3 hover:bg-white/5 rounded-md text-gray-400 cursor-pointer">
            <MessageSquare className="h-5 w-5" />
            <span>Messages</span>
          </div>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 p-3 w-full hover:bg-red-500/20 text-red-400 rounded-md transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col overflow-hidden relative">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8 z-20">
          <h1 className="text-xl font-bold text-navy-900">Booked Consultations</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search name, email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-gold-500 outline-none w-64"
              />
            </div>
          </div>
        </header>

        <div className="p-8 overflow-y-auto">
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center space-x-2 text-gray-500">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-wider">Filters:</span>
            </div>
            
            {/* Status Filter */}
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-gold-500 focus:border-gold-500 p-2.5 outline-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>

            {/* Date Filter */}
            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>

            {(statusFilter !== 'all' || dateFilter || searchTerm) && (
              <button 
                onClick={() => { setStatusFilter('all'); setDateFilter(''); setSearchTerm(''); }}
                className="text-xs text-red-500 font-bold hover:underline"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-gold-500">
              <p className="text-gray-400 text-sm uppercase tracking-wider">Filtered Bookings</p>
              <h3 className="text-3xl font-bold text-navy-900">{filteredAppointments.length}</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
              <p className="text-gray-400 text-sm uppercase tracking-wider">Total Pending</p>
              <h3 className="text-3xl font-bold text-navy-900">{appointments.filter(a => a.status === 'pending').length}</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
              <p className="text-gray-400 text-sm uppercase tracking-wider">Total Confirmed</p>
              <h3 className="text-3xl font-bold text-navy-900">{appointments.filter(a => a.status === 'confirmed').length}</h3>
            </div>
          </div>

          {/* Appointments Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-widest">
                    <th className="px-6 py-4 font-semibold">Client Name</th>
                    <th className="px-6 py-4 font-semibold">Contact Info</th>
                    <th className="px-6 py-4 font-semibold">Date & Time</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-10 text-center text-gray-500 italic">No matching consultations found.</td>
                    </tr>
                  ) : (
                    filteredAppointments.map((appointment) => (
                      <tr key={appointment.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setSelectedAppointment(appointment)}>
                        <td className="px-6 py-4">
                          <div className="font-bold text-navy-900">{appointment.clientName}</div>
                          <div className="text-xs text-gray-400">{appointment.practiceArea || 'General Consultation'}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-navy-900">{appointment.clientEmail}</div>
                          <div className="text-xs text-gray-400">{appointment.clientPhone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-navy-900 font-bold">{appointment.date}</div>
                          <div className="text-xs text-gold-600 font-bold uppercase">{appointment.timeSlot}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                            appointment.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                            appointment.status === 'cancelled' ? 'bg-red-100 text-red-700' : 
                            appointment.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {appointment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-navy-900 hover:text-gold-500 p-2">
                            <ChevronRight className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Appointment Details Modal */}
        <AnimatePresence>
          {selectedAppointment && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                onClick={() => setSelectedAppointment(null)}
                className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative z-10"
              >
                <div className="bg-navy-900 p-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-white text-2xl font-playfair font-bold">Consultation Details</h3>
                    <p className="text-gold-500 text-xs font-poppins uppercase tracking-widest mt-1">ID: #{selectedAppointment.id}</p>
                  </div>
                  <button onClick={() => setSelectedAppointment(null)} className="text-white hover:text-gold-500 transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-2 gap-8 mb-10">
                    <div>
                      <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Client Info</h4>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 text-navy-900">
                          <Users className="w-5 h-5 text-gold-500" />
                          <span className="font-bold">{selectedAppointment.clientName}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600 text-sm">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <span>{selectedAppointment.clientEmail}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600 text-sm">
                          <Phone className="w-5 h-5 text-gray-400" />
                          <span>{selectedAppointment.clientPhone}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Schedule</h4>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 text-navy-900">
                          <Calendar className="w-5 h-5 text-gold-500" />
                          <span className="font-bold">{selectedAppointment.date}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600 text-sm">
                          <Clock className="w-5 h-5 text-gray-400" />
                          <span>{selectedAppointment.timeSlot}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gold-600 text-sm">
                          <MessageSquare className="w-5 h-5 text-gold-500" />
                          <span className="font-bold">{selectedAppointment.practiceArea || 'General'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-10">
                    <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Case Description</h4>
                    <div className="bg-gray-50 p-4 rounded-xl text-gray-700 italic border border-gray-100 min-h-[80px] text-sm">
                      {selectedAppointment.purpose || "No description provided."}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-100">
                    <button 
                      onClick={() => updateStatus(selectedAppointment.id, 'confirmed')}
                      disabled={updateLoading}
                      className="flex-grow flex items-center justify-center space-x-2 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Confirm</span>
                    </button>
                    <button 
                      onClick={() => updateStatus(selectedAppointment.id, 'cancelled')}
                      disabled={updateLoading}
                      className="flex-grow flex items-center justify-center space-x-2 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-colors disabled:opacity-50"
                    >
                      <XCircle className="w-5 h-5" />
                      <span>Cancel</span>
                    </button>
                    <button 
                      onClick={() => updateStatus(selectedAppointment.id, 'completed')}
                      disabled={updateLoading}
                      className="flex-grow flex items-center justify-center space-x-2 bg-navy-900 text-white py-3 rounded-xl font-bold hover:bg-black transition-colors disabled:opacity-50"
                    >
                      <CheckCircle className="w-5 h-5 text-gold-500" />
                      <span>Completed</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;
