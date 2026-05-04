import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';
import { 
  ChevronRight, ArrowLeft, TrendingUp, Users, BookOpen, 
  Award, Search, Filter, Download, MoreHorizontal, LayoutDashboard, Database
} from 'lucide-react';
import { cn, formatPercent } from './lib/utils';
import { INITIAL_DATA, MODULE_NAMES, PROGRAMS, RAW_SAMPLES, type TrainerData, type ModuleScore } from './types';

export default function App() {
  const [selectedTrainer, setSelectedTrainer] = useState<TrainerData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedMonth, setSelectedMonth] = useState<string>('All');
  const [selectedDay, setSelectedDay] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'raw'>('overview');

  const filteredData = INITIAL_DATA.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.program.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = selectedProgram === 'All' || t.program === selectedProgram;
    
    // Date Range logic: e.g. "03 - 05 April 2026"
    const matchesYear = selectedYear === 'All' || t.dateRange.includes(selectedYear);
    const matchesMonth = selectedMonth === 'All' || t.dateRange.toLowerCase().includes(selectedMonth.toLowerCase());
    const matchesDay = selectedDay === 'All' || t.dateRange.includes(selectedDay.padStart(2, '0'));

    return matchesSearch && matchesProgram && matchesYear && matchesMonth && matchesDay;
  });

  const averageLgi = filteredData.length > 0 
    ? filteredData.reduce((acc, curr) => acc + curr.total.lgi, 0) / filteredData.length 
    : 0;
  
  const bestTrainer = filteredData.length > 0 
    ? [...filteredData].sort((a, b) => b.total.lgi - a.total.lgi)[0]
    : null;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      {/* Sidebar / Navigation */}
      <nav className="fixed top-0 left-0 h-screen w-20 bg-white border-r border-slate-200 flex flex-col items-center py-8 z-50">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center mb-12 shadow-indigo-200 shadow-lg">
          <LayoutDashboard className="text-white w-6 h-6" />
        </div>
        <div className="flex flex-col gap-8">
          <button 
            onClick={() => { setSelectedTrainer(null); setActiveTab('overview'); }}
            className={cn("p-3 rounded-xl transition-all", activeTab === 'overview' ? "bg-indigo-50 text-indigo-600" : "text-slate-400 hover:text-slate-600")}
          >
            <LayoutDashboard className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={cn("p-3 rounded-xl transition-all", activeTab === 'analytics' ? "bg-indigo-50 text-indigo-600" : "text-slate-400 hover:text-slate-600")}
          >
            <TrendingUp className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setActiveTab('raw')}
            className={cn("p-3 rounded-xl transition-all", activeTab === 'raw' ? "bg-indigo-50 text-indigo-600" : "text-slate-400 hover:text-slate-600")}
          >
            <Database className="w-6 h-6" />
          </button>
          <button className="p-3 rounded-xl text-slate-400 hover:text-slate-600">
            <Users className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <main className="pl-20 pt-6 pb-12 pr-6 max-w-[1600px] mx-auto">
        <AnimatePresence mode="wait">
          {!selectedTrainer ? (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
                <div>
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase leading-none">LGI Analytics</h1>
                  <p className="text-slate-500 mt-2 font-bold text-xs uppercase tracking-widest">
                    Performance Tracking: <span className="text-indigo-600">{selectedProgram === 'All' ? 'All Operations' : `${selectedProgram} Cluster`}</span>
                  </p>
                </div>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm mr-2">
                       {['overview', 'analytics', 'raw'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab as any)}
                          className={cn(
                            "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                            activeTab === tab 
                              ? "bg-indigo-600 text-white shadow-lg" 
                              : "text-slate-400 hover:text-slate-600"
                          )}
                        >
                          {tab === 'raw' ? 'Data Raw' : tab}
                        </button>
                      ))}
                    </div>

                    <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
                      <select 
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="bg-transparent text-[10px] font-black uppercase tracking-widest px-3 py-1 focus:outline-none cursor-pointer text-slate-600"
                      >
                        <option value="All">Year</option>
                        <option value="2026">2026</option>
                        <option value="2025">2025</option>
                      </select>
                      <div className="w-px h-4 bg-slate-200 self-center"></div>
                      <select 
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="bg-transparent text-[10px] font-black uppercase tracking-widest px-3 py-1 focus:outline-none cursor-pointer text-slate-600"
                      >
                        <option value="All">Month</option>
                        {['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'].map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                      <div className="w-px h-4 bg-slate-200 self-center"></div>
                      <select 
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(e.target.value)}
                        className="bg-transparent text-[10px] font-black uppercase tracking-widest px-3 py-1 focus:outline-none cursor-pointer text-slate-600"
                      >
                        <option value="All">Date</option>
                        {Array.from({length: 31}, (_, i) => (i + 1).toString()).map(d => (
                          <option key={d} value={d}>{d.padStart(2, '0')}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
                      <select 
                        value={selectedProgram}
                        onChange={(e) => setSelectedProgram(e.target.value)}
                        className="bg-transparent text-[10px] font-black uppercase tracking-widest px-4 py-1 focus:outline-none cursor-pointer text-slate-600"
                      >
                        <option value="All">All Programs</option>
                        {PROGRAMS.map(p => (
                          <option key={p} value={p}>{p} Cluster</option>
                        ))}
                      </select>
                    </div>
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="SEARCH TRAINER..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black tracking-widest focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all w-64 shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              {activeTab === 'overview' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                  title="Avg. LGI Overall" 
                  value={formatPercent(averageLgi)} 
                  icon={TrendingUp} 
                  trend={averageLgi > 50 ? "+2.4%" : "-1.2%"} 
                  trendUp={averageLgi > 50} 
                  subtext="Across filtered data"
                />
                <StatCard 
                  title="Total Trainers" 
                  value={filteredData.length.toString()} 
                  icon={Users} 
                  subtext="Active in selection"
                />
                <StatCard 
                  title="Active Program" 
                  value={selectedProgram} 
                  icon={BookOpen} 
                  subtext="Focus program"
                />
                <StatCard 
                  title="Top Performer" 
                  value={bestTrainer ? bestTrainer.name.split(' ')[0] : 'N/A'} 
                  icon={Award} 
                  subtext={bestTrainer ? `LGI: ${formatPercent(bestTrainer.total.lgi)}` : 'No data'}
                />
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* LGI Performance Chart */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-slate-900 tracking-tight">Trainer LGI Performance</h2>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded">Overall Index</span>
                  </div>
                  <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="name" 
                          fontSize={10} 
                          axisLine={false} 
                          tickLine={false} 
                          tickFormatter={(val) => val.split(' ')[0]} 
                          dy={10}
                        />
                        <YAxis axisLine={false} tickLine={false} fontSize={10} tickFormatter={(val) => `${val}%`} />
                        <Tooltip 
                          cursor={{ fill: '#f8fafc' }}
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="total.lgi" name="LGI %" radius={[4, 4, 0, 0]}>
                          {filteredData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.total.lgi > 50 ? '#4f46e5' : '#f43f5e'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Feedback Score Chart */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-slate-900 tracking-tight">Training Feedback Score</h2>
                    <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest bg-sky-50 px-2 py-1 rounded">CSAT / Satisfaction</span>
                  </div>
                  <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="name" 
                          fontSize={10} 
                          axisLine={false} 
                          tickLine={false} 
                          tickFormatter={(val) => val.split(' ')[0]} 
                          dy={10}
                        />
                        <YAxis domain={[0, 100]} axisLine={false} tickLine={false} fontSize={10} />
                        <Tooltip 
                          cursor={{ fill: '#f8fafc' }}
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="feedbackScore" name="Feedback Score" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">Trainer Detailed Performance</h2>
                  <button className="text-sm text-indigo-600 font-black uppercase tracking-widest hover:text-indigo-700 transition-colors">View All Programs</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                        <th className="px-6 py-4">Periode</th>
                        <th className="px-6 py-4">Trainer Name</th>
                        <th className="px-6 py-4 text-center">Pre Total</th>
                        <th className="px-6 py-4 text-center">Post Total</th>
                        <th className="px-6 py-4 text-center">LGI Score</th>
                        <th className="px-6 py-4 text-center">Feedback</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredData.map((trainer) => (
                        <tr 
                          key={trainer.id} 
                          className="group hover:bg-slate-50 transition-all cursor-pointer"
                          onClick={() => setSelectedTrainer(trainer)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-slate-500 uppercase">{trainer.periode}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-[10px] bg-slate-900 text-white flex items-center justify-center text-xs font-black shadow-sm">
                                {trainer.name.charAt(0)}
                              </div>
                              <span className="text-sm font-black text-slate-900 uppercase tracking-tight">{trainer.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-slate-400 text-center">{trainer.total.pre.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-slate-400 text-center">{trainer.total.post.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className={cn(
                              "text-sm font-black",
                              trainer.total.lgi > 50 ? "text-emerald-500" : "text-slate-900"
                            )}>
                              {formatPercent(trainer.total.lgi)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className="text-sm font-black text-sky-500">{trainer.feedbackScore}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={cn(
                              "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                              trainer.total.lgi > 50 ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                            )}>
                              {trainer.total.lgi > 50 ? 'High Gain' : 'Normal'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all inline" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm h-[600px] flex flex-col">
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Performance Analytics</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Comparative trainer metrics</p>
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={filteredData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="name" 
                        fontSize={10} 
                        axisLine={false} 
                        tickLine={false}
                        tick={{ fill: '#64748b', fontWeight: 800 }}
                      />
                      <YAxis axisLine={false} tickLine={false} fontSize={10} domain={[0, 100]} />
                      <Tooltip 
                        cursor={{ fill: '#f8fafc' }}
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                      />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', paddingTop: '20px' }} />
                      <Bar dataKey="total.lgi" name="LGI Score" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="passRate" name="Pass Rate" fill="#10b981" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="feedbackScore" name="Feedback Score" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'raw' && (
            <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Raw Training Data</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Granular database of all training results</p>
                </div>
                <button className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-600 transition-all">
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                      <th className="px-6 py-5">TGL</th>
                      <th className="px-6 py-5">NAMA</th>
                      <th className="px-6 py-5">NIK</th>
                      <th className="px-6 py-5">PROG</th>
                      <th className="px-6 py-5">MATERI</th>
                      <th className="px-6 py-5">TRAINER</th>
                      <th className="px-6 py-5 text-center">PRE</th>
                      <th className="px-6 py-5 text-center">POST</th>
                      <th className="px-6 py-5 text-center">LGI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {RAW_SAMPLES.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-[10px] font-bold text-slate-500 uppercase">{row.tgl}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-[10px] font-black text-slate-900 uppercase">{row.nama}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-[10px] font-bold text-slate-400">{row.nik}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-[10px] font-bold text-indigo-600 uppercase">{row.prog}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-[10px] font-bold text-slate-600 uppercase">{row.materi}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-[10px] font-bold text-slate-900 uppercase">{row.trainer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-[11px] font-bold text-slate-400 text-center">{row.pre.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-[11px] font-bold text-slate-400 text-center">{row.post.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className={cn(
                            "text-[11px] font-black px-2 py-1 rounded",
                            row.lgi > 0.6 ? "text-emerald-600 bg-emerald-50" : "text-slate-900 bg-slate-100"
                          )}>
                            {(row.lgi * 100).toFixed(2)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
            </motion.div>
          ) : (
            <motion.div 
              key="trainer-detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-8 pb-20"
            >
              {/* Professional Dashboard Header */}
              <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -mr-32 -mt-32"></div>
                
                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                  <div className="relative group">
                    <div className="w-40 h-40 rounded-[32px] overflow-hidden border-4 border-white shadow-xl bg-slate-100 ring-1 ring-slate-200 transition-transform duration-500 group-hover:scale-[1.02]">
                      <img 
                        src={selectedTrainer.avatarUrl} 
                        alt="" 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <button 
                      onClick={() => setSelectedTrainer(null)}
                      className="absolute -top-3 -left-3 p-3 bg-white border border-slate-200 rounded-2xl shadow-lg text-slate-500 hover:text-indigo-600 hover:border-indigo-100 transition-all group"
                    >
                      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="flex-1 space-y-4 text-center md:text-left">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start mb-2">
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ring-indigo-100">
                          {selectedTrainer.program} Specialist
                        </span>
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                          Periode: {selectedTrainer.periode}
                        </span>
                      </div>
                      <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-none tracking-tight uppercase">
                        {selectedTrainer.name}
                      </h1>
                      <p className="text-indigo-600 font-bold uppercase tracking-widest text-sm mt-3">{selectedTrainer.position}</p>
                    </div>

                    <div className="flex flex-wrap gap-x-8 gap-y-2 justify-center md:justify-start pt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">NIK: <span className="text-slate-900">{selectedTrainer.nik}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Base: <span className="text-slate-900 font-bold">{selectedTrainer.homebase}</span></span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 md:pt-0">
                    <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center gap-3 shadow-xl">
                      <Download className="w-5 h-5" />
                      Export Report
                    </button>
                  </div>
                </div>
              </div>

              {/* Analytics Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Core Performance Metrics */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Hero Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center group">
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">LGI Score</span>
                      <div className="text-4xl font-black text-indigo-600 mb-1">{formatPercent(selectedTrainer.total.lgi)}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Progression Index</div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center group">
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Feedback Score</span>
                      <div className="text-4xl font-black text-sky-500 mb-1">{selectedTrainer.feedbackScore}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Participant CSAT</div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center group">
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Pass Rate</span>
                      <div className="text-4xl font-black text-emerald-500 mb-1">{formatPercent(selectedTrainer.passRate)}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Certification Rate</div>
                    </div>
                  </div>

                  {/* Module Breakdown Table */}
                  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-8 flex items-center gap-3">
                      <LayoutDashboard className="w-5 h-5 text-indigo-600" />
                      Module Performance Mapping
                    </h3>
                    <div className="space-y-6">
                      {MODULE_NAMES.map(m => (
                        <div key={m} className="space-y-2">
                          <div className="flex justify-between items-end text-sm">
                            <span className="font-bold text-slate-700">{m}</span>
                            <div className="flex gap-4 text-[11px] font-bold">
                              <span className="text-slate-400">PRE: {selectedTrainer.modules[m].pre}</span>
                              <span className="text-indigo-600">POST: {selectedTrainer.modules[m].post}</span>
                              <span className="text-emerald-500">LGI: {formatPercent(selectedTrainer.modules[m].lgi)}</span>
                            </div>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden flex gap-0.5">
                             <div className="h-full bg-slate-200" style={{ width: `${selectedTrainer.modules[m].pre}%` }}></div>
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${selectedTrainer.modules[m].post - selectedTrainer.modules[m].pre}%` }}
                               className="h-full bg-indigo-500"
                             ></motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trainer Capability Evaluation (Bar Chart version - from Gambar 2) */}
                  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-10">
                      <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                        <Award className="w-5 h-5 text-indigo-600" />
                        Trainer Capability Evaluation
                      </h3>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50 px-3 py-1 rounded-full">Performance Attributes</span>
                    </div>
                    <div className="h-[320px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                          data={[
                            { name: 'Knowledge', val: selectedTrainer.capabilities.knowledge },
                            { name: 'Effective Communication', val: selectedTrainer.capabilities.communication },
                            { name: 'Active Learning', val: selectedTrainer.capabilities.activeLearning },
                            { name: 'Time Management', val: selectedTrainer.capabilities.timeManagement },
                            { name: 'Pass Rate', val: selectedTrainer.passRate },
                            { name: 'Satisfaction', val: selectedTrainer.capabilities.satisfaction },
                            { name: 'Utility Tools', val: selectedTrainer.capabilities.utilityTools },
                          ]}
                          margin={{ top: 20, right: 20, left: 0, bottom: 40 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis 
                            dataKey="name" 
                            fontSize={9} 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#64748b', fontWeight: 800 }}
                            interval={0}
                            angle={-20}
                            textAnchor="end"
                            dy={10}
                          />
                          <YAxis 
                            domain={[0, 100]} 
                            fontSize={9} 
                            axisLine={false} 
                            tickLine={false} 
                            tickFormatter={(val) => `${val}%`}
                            tick={{ fill: '#94a3b8' }}
                          />
                          <Tooltip 
                            cursor={{ fill: '#f8fafc' }}
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                            labelStyle={{ fontWeight: 900, marginBottom: '4px', textTransform: 'uppercase', fontSize: '10px' }}
                          />
                          <Bar 
                            dataKey="val" 
                            name="Score %" 
                            radius={[6, 6, 0, 0]}
                            barSize={32}
                          >
                            {[
                              '#4f46e5', // Knowledge
                              '#6366f1', // Communication
                              '#818cf8', // Learning
                              '#4f46e5', // Time
                              '#10b981', // Pass Rate (Emerald)
                              '#6366f1', // Satisfaction
                              '#818cf8'  // Tools
                            ].map((color, index) => (
                              <Cell key={`cell-${index}`} fill={color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Right Column: Capability Insights */}
                <div className="space-y-8">
                  {/* Radar Chart Analysis */}
                  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-6">Capability Radar</h3>
                    <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[
                          { name: 'Knowledge', val: selectedTrainer.capabilities.knowledge },
                          { name: 'Communication', val: selectedTrainer.capabilities.communication },
                          { name: 'Active Learn.', val: selectedTrainer.capabilities.activeLearning },
                          { name: 'Time Mgt.', val: selectedTrainer.capabilities.timeManagement },
                          { name: 'CSAT', val: selectedTrainer.capabilities.satisfaction },
                          { name: 'Tools', val: selectedTrainer.capabilities.utilityTools },
                        ]}>
                          <PolarGrid stroke="#f1f5f9" />
                          <PolarAngleAxis dataKey="name" fontSize={9} fontClass="font-bold" />
                          <Radar name="Competence" dataKey="val" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Feedback Narrative */}
                  <div className="bg-indigo-600 p-8 rounded-[32px] text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
                    <MoreHorizontal className="absolute -bottom-4 -right-4 w-32 h-32 text-indigo-500 opacity-20 rotate-12 transition-transform duration-700 group-hover:scale-125" />
                    <span className="block text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-4">Participant Voice</span>
                    <blockquote className="text-sm font-bold italic leading-relaxed relative z-10">
                      "{selectedTrainer.feedbackText}"
                    </blockquote>
                    <div className="mt-8 pt-6 border-t border-indigo-500 flex justify-between items-center relative z-10">
                      <span className="text-[10px] font-black uppercase text-indigo-200">Confidence Score</span>
                      <span className="text-lg font-black">A+</span>
                    </div>
                  </div>

                  {/* SWAT Analysis Style Insights */}
                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Trainer SWOT Insights</h4>
                    <div className="space-y-4">
                       <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                          <span className="text-[9px] font-black text-emerald-600 uppercase mb-1 block">Main Strength</span>
                          <p className="text-xs font-bold text-emerald-900 leading-tight">{selectedTrainer.strengths}</p>
                       </div>
                       <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100">
                          <span className="text-[9px] font-black text-rose-600 uppercase mb-1 block">Action Needed</span>
                          <p className="text-xs font-bold text-rose-900 leading-tight">{selectedTrainer.weaknesses}</p>
                       </div>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend, trendUp, subtext }: { 
  title: string, value: string, icon: any, trend?: string, trendUp?: boolean, subtext?: string 
}) {
  return (
    <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-slate-900 rounded-2xl shadow-lg shadow-slate-200">
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend && (
          <span className={cn(
            "text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest",
            trendUp ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          )}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-slate-400 text-[10px] font-black mb-1 uppercase tracking-[0.2em]">{title}</h3>
        <p className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">{value}</p>
        {subtext && <p className="text-indigo-600/60 text-[10px] font-bold uppercase tracking-widest mt-3">{subtext}</p>}
      </div>
    </div>
  );
}