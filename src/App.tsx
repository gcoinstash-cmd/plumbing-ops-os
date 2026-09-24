import React, { useState } from 'react';
import { 
  Droplets, 
  Activity, 
  ShieldAlert, 
  Wrench, 
  Radio, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Camera, 
  Flame, 
  AlertTriangle, 
  ChevronRight,
  Gauge,
  PhoneCall,
  Lock
} from 'lucide-react';
import { AdminPortalModal } from './components/AdminPortalModal';

interface Ticket {
  id: string;
  client: string;
  location: string;
  issue: string;
  severity: 'CRITICAL' | 'ELEVATED' | 'ROUTINE';
  psi: number;
  assignedUnit: string;
  status: 'DISPATCHED' | 'EN ROUTE' | 'ISOLATING' | 'RESOLVED';
  time: string;
}

interface Inspection {
  id: string;
  property: string;
  scopeType: string;
  pipeMaterial: string;
  depthFt: number;
  blockagePct: number;
  verdict: 'CLEAR' | 'HYDRO-JET REQUIRED' | 'TRENCHLESS REPAIR';
}

export const App: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'dispatch' | 'scoping' | 'backflow'>('dispatch');
  const [selectedTicket, setSelectedTicket] = useState<string>('PL-8821');

  const tickets: Ticket[] = [
    {
      id: 'PL-8821',
      client: 'Kona Wharf Seafood Grill',
      location: 'Pier 14 Commercial Pier, Austin TX',
      issue: '4" Main Line Grease Obstruction & Commercial Kitchen Floor Drain Backup',
      severity: 'CRITICAL',
      psi: 68,
      assignedUnit: 'UNIT 04 (Master Tech Morales)',
      status: 'EN ROUTE',
      time: '04 min response'
    },
    {
      id: 'PL-8822',
      client: 'Highland Medical Pavilions',
      location: '3800 Medical Center Dr, Bldg B',
      issue: 'Backflow Preventer Pressure Drop (RPZ Assembly Relief Valve Tripped)',
      severity: 'ELEVATED',
      psi: 52,
      assignedUnit: 'UNIT 02 (Cert Specialist Chen)',
      status: 'DISPATCHED',
      time: '12 min response'
    },
    {
      id: 'PL-8823',
      client: 'Residences at Lake Austin',
      location: '1204 Scenic Overlook Way',
      issue: 'Sub-Slab High Pressure Supply Line Leak Detected via Acoustic Hydrophone',
      severity: 'CRITICAL',
      psi: 82,
      assignedUnit: 'UNIT 07 (Leak Detection Rig)',
      status: 'ISOLATING',
      time: 'On-Site'
    },
    {
      id: 'PL-8824',
      client: 'Benchmark Distribution Hub',
      location: '900 Logistics Way, Round Rock',
      issue: 'Fire Suppression Dual-Check Valve Quarterly Hydrostatic Verification',
      severity: 'ROUTINE',
      psi: 110,
      assignedUnit: 'UNIT 09 (Commercial Fleet)',
      status: 'RESOLVED',
      time: 'Completed'
    }
  ];

  const inspections: Inspection[] = [
    {
      id: 'CAM-401',
      property: 'Northwest Tech Campus (Building 4)',
      scopeType: 'Main Sewer Lateral CCTV',
      pipeMaterial: 'Schedule 40 PVC (6" dia)',
      depthFt: 8.5,
      blockagePct: 15,
      verdict: 'CLEAR'
    },
    {
      id: 'CAM-402',
      property: 'The Driskill Commercial Kitchens',
      scopeType: 'Culinary Grease Interceptor Run',
      pipeMaterial: 'Cast Iron (4" dia)',
      depthFt: 5.2,
      blockagePct: 85,
      verdict: 'HYDRO-JET REQUIRED'
    },
    {
      id: 'CAM-403',
      property: 'Oakmont Heritage Condominiums',
      scopeType: 'Under-Foundation Sanitary Stack',
      pipeMaterial: 'Clay Vitrified (8" dia)',
      depthFt: 11.0,
      blockagePct: 60,
      verdict: 'TRENCHLESS REPAIR'
    }
  ];

  return (
    <div className="min-h-screen bg-[#080B0E] text-slate-100 font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* HUD Telemetry Top Bar */}
      <header className="sticky top-0 z-40 bg-[#080B0E]/90 backdrop-blur-md border-b border-cyan-500/20 px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-black tracking-tight text-white">HYDROFORCE</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-bold uppercase">
                  OPS OS v1.0
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400">Commercial Hydraulic Dispatch & Backflow Rig</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4 px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 font-mono text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Gauge className="w-3.5 h-3.5" /> PSI: 64.2 AVG
              </span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Activity className="w-3.5 h-3.5 animate-pulse" /> 4 FLEETS LIVE
              </span>
            </div>

            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/50 text-xs font-mono font-bold tracking-wider transition-all"
            >
              <Lock className="w-3.5 h-3.5" />
              [ HYDRAULIC PASS ]
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
        {/* Hero Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c141d] via-[#090e14] to-[#06090d] border border-cyan-500/20 p-6 md:p-10 shadow-2xl">
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5" /> 24/7 Commercial Emergency Hydraulic Protocol
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              Instant Leak Isolation. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400">
                Heavy Industrial Hydro-Jetting.
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed">
              Full-stack operating system for enterprise plumbing contractors, high-rise facility managers, and mechanical roll-up agencies. Geocoded van dispatch, backflow compliance logs, and sub-slab acoustic diagnostic scopes.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button 
                onClick={() => setIsAdminOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono tracking-wider transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" /> DISPATCH EMERGENCY FLEET
              </button>
              <button 
                onClick={() => setActiveTab('scoping')}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs border border-white/10 transition-colors flex items-center gap-2"
              >
                <Camera className="w-4 h-4 text-cyan-400" /> CCTV Scoping Portal
              </button>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 font-mono text-xs">
          <button
            onClick={() => setActiveTab('dispatch')}
            className={`px-4 py-2 rounded-lg transition-all font-bold ${
              activeTab === 'dispatch'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            01 // Emergency Dispatch Tickets
          </button>
          <button
            onClick={() => setActiveTab('scoping')}
            className={`px-4 py-2 rounded-lg transition-all font-bold ${
              activeTab === 'scoping'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            02 // CCTV Scoping Telemetry
          </button>
          <button
            onClick={() => setActiveTab('backflow')}
            className={`px-4 py-2 rounded-lg transition-all font-bold ${
              activeTab === 'backflow'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            03 // Certified Backflow Vault
          </button>
        </div>

        {/* Tab 1: Dispatch */}
        {activeTab === 'dispatch' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400">Live Hydraulic Queues</h3>
                <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 animate-pulse" /> GPS Polling Active
                </span>
              </div>

              <div className="space-y-3">
                {tickets.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTicket(t.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      selectedTicket === t.id
                        ? 'bg-[#0f1722] border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                        : 'bg-[#0a0f15] border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-cyan-400">{t.id}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                          t.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                          t.severity === 'ELEVATED' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {t.severity}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" /> {t.time}
                      </span>
                    </div>

                    <div className="pt-3">
                      <h4 className="text-base font-bold text-white">{t.client}</h4>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-500" /> {t.location}
                      </p>
                      <p className="text-xs text-cyan-200/80 mt-2 bg-black/30 p-2.5 rounded-xl border border-white/5">
                        {t.issue}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs font-mono pt-3 border-t border-white/5">
                      <span className="text-slate-400">{t.assignedUnit}</span>
                      <span className="text-cyan-400 font-bold">{t.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Telemetry Sidebar */}
            <div className="space-y-6">
              <div className="bg-[#0b1117] border border-cyan-500/20 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-cyan-400" /> Pressure & Valve Telemetry
                </h3>
                
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Target Line:</span>
                    <span className="text-cyan-300 font-bold">{selectedTicket}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Hydrostatic Pressure:</span>
                    <span className="text-white font-bold">68.4 PSI (Nominal)</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Main Backflow Valve:</span>
                    <span className="text-emerald-400 font-bold">SEALED / 100%</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Hot Water Recirc:</span>
                    <span className="text-amber-400 font-bold">135°F (Active)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase text-slate-400">SLA Response Counter</div>
                  <div className="w-full bg-black/60 rounded-full h-2.5 overflow-hidden border border-white/5">
                    <div className="bg-gradient-to-r from-cyan-500 to-teal-400 h-2.5 rounded-full w-[82%]" />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>Target: &lt; 15 mins</span>
                    <span className="text-cyan-400">Elapsed: 04m 12s</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold tracking-wider transition-colors"
                >
                  MANAGE DISPATCH ROSTER
                </button>
              </div>

              <div className="bg-[#0b1117] border border-white/10 rounded-2xl p-6 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Vehicle Inventory Quick-Check</h4>
                <div className="space-y-2 text-xs font-mono text-slate-300">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>4,000 PSI Hydro-Jet Trailer:</span>
                    <span className="text-emerald-400">STAGED</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Ridgid SeeSnake 200ft Reel:</span>
                    <span className="text-emerald-400">STAGED</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>ProPress XL Copper Tool:</span>
                    <span className="text-emerald-400">STAGED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Scoping Telemetry */}
        {activeTab === 'scoping' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Underground CCTV Scope Diagnostics</h3>
                <p className="text-xs text-slate-400 font-mono">Ultra-HD Pan & Tilt Sonde Pipeline Inspections</p>
              </div>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-mono text-xs font-bold hover:bg-cyan-400 transition-colors"
              >
                + NEW VIDEO REEL UPLOAD
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {inspections.map((insp) => (
                <div key={insp.id} className="bg-[#0b1117] border border-cyan-500/20 rounded-2xl p-5 space-y-4">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-cyan-400 font-bold">{insp.id}</span>
                    <span className="text-slate-400">{insp.depthFt} ft below grade</span>
                  </div>

                  {/* Mock CCTV Camera Viewer */}
                  <div className="relative aspect-video rounded-xl bg-black border border-cyan-500/30 overflow-hidden flex items-center justify-center group">
                    <div className="absolute inset-0 bg-radial from-cyan-950/20 to-black/90 pointer-events-none" />
                    <Camera className="w-8 h-8 text-cyan-500/40 group-hover:text-cyan-400 transition-colors" />
                    <div className="absolute top-2 left-2 text-[10px] font-mono text-cyan-300 bg-black/60 px-2 py-0.5 rounded border border-cyan-500/20">
                      REC ● 1080p 60fps
                    </div>
                    <div className="absolute bottom-2 right-2 text-[10px] font-mono text-slate-400 bg-black/60 px-2 py-0.5 rounded">
                      SONDE: 512 Hz
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white">{insp.property}</h4>
                    <p className="text-xs font-mono text-slate-400 mt-1">{insp.pipeMaterial}</p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-white/5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Blockage Factor:</span>
                      <span className={insp.blockagePct > 50 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                        {insp.blockagePct}%
                      </span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Action:</span>
                      <span className="text-cyan-300 font-bold">{insp.verdict}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Backflow Vault */}
        {activeTab === 'backflow' && (
          <div className="bg-[#0b1117] border border-cyan-500/20 rounded-2xl p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">Commercial Backflow Certification Registry</h3>
                <p className="text-xs text-slate-400 font-mono">State-Mandated Annual Cross-Connection Prevention Log</p>
              </div>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-mono text-xs font-bold hover:bg-cyan-400 transition-colors"
              >
                SUBMIT STATE REGULATORY FORM
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase">
                    <th className="py-3 px-4">Serial / Tag</th>
                    <th className="py-3 px-4">Facility Name</th>
                    <th className="py-3 px-4">Assembly Type</th>
                    <th className="py-3 px-4">Differential Pressure</th>
                    <th className="py-3 px-4">Next Inspection</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  <tr className="hover:bg-white/5">
                    <td className="py-3 px-4 text-cyan-400 font-bold">RPZ-2026-9901</td>
                    <td className="py-3 px-4 font-sans font-bold text-white">Omni Barton Creek Resort</td>
                    <td className="py-3 px-4">Watts 909 RPZ (3")</td>
                    <td className="py-3 px-4 text-emerald-400">8.4 PSID (Pass)</td>
                    <td className="py-3 px-4 text-slate-400">2027-04-15</td>
                    <td className="py-3 px-4 text-right">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">CERTIFIED</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="py-3 px-4 text-cyan-400 font-bold">RPZ-2026-8842</td>
                    <td className="py-3 px-4 font-sans font-bold text-white">St. David's Emergency Wing</td>
                    <td className="py-3 px-4">Febco 860 RPBA (4")</td>
                    <td className="py-3 px-4 text-emerald-400">9.1 PSID (Pass)</td>
                    <td className="py-3 px-4 text-slate-400">2027-02-10</td>
                    <td className="py-3 px-4 text-right">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">CERTIFIED</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="py-3 px-4 text-cyan-400 font-bold">DCV-2026-7731</td>
                    <td className="py-3 px-4 font-sans font-bold text-white">Domain Luxury Lofts</td>
                    <td className="py-3 px-4">Wilkins 350 Double Check (6")</td>
                    <td className="py-3 px-4 text-rose-400">2.1 PSID (Check #1 Leak)</td>
                    <td className="py-3 px-4 text-slate-400">URGENT</td>
                    <td className="py-3 px-4 text-right">
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">SERVICE REQ</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Admin Modal */}
      <AdminPortalModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
};

export default App;
