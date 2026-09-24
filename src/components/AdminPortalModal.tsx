import React, { useState } from 'react';
import { ShieldCheck, Key, Lock, ArrowRight, CheckCircle, Database, Server, Cpu } from 'lucide-react';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose }) => {
  const [passkey, setPasskey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleBypass = () => {
    setPasskey('plumbing2026');
    setIsAuthenticated(true);
    setError(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkey === 'plumbing2026') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#0b1016] border border-cyan-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="flex items-center justify-between pb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                HydroForce Operations Gateway
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Turnkey Admin
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Hydraulic Pressure & Dispatch Control</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-sm font-mono px-3 py-1 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
          >
            ESC
          </button>
        </div>

        {!isAuthenticated ? (
          <div className="py-6 space-y-6">
            <div className="bg-cyan-950/30 border border-cyan-500/20 rounded-xl p-4 flex items-start gap-3">
              <Key className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-cyan-300">Auditor Passkey Bypass</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Click the instant passkey button below to auto-inject credentials and inspect live hydraulic telemetries, backflow certification logs, and commercial hydro-jetting rosters.
                </p>
                <button
                  type="button"
                  onClick={handleBypass}
                  className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-cyan-500 text-slate-950 text-xs font-mono font-bold tracking-wider hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
                >
                  <Lock className="w-3.5 h-3.5" />
                  [ AUTO-FILL PLUMBING PASS ]
                </button>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Emergency Dispatch Passkey
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                    placeholder="Enter passkey (e.g. plumbing2026)"
                    className="w-full bg-[#080c10] border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-cyan-400 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 bottom-2 px-4 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5"
                  >
                    Enter <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                {error && (
                  <p className="text-rose-400 text-xs mt-2 font-mono">Invalid credentials. Use passkey: plumbing2026</p>
                )}
              </div>
            </form>
          </div>
        ) : (
          <div className="py-6 space-y-6">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <div>
                  <h4 className="text-sm font-semibold text-emerald-300">HydroForce Master Access Granted</h4>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">Session: PLUMB-DISPATCH-TX-2026</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold">
                ROOT DISPATCH
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-[#080c10] rounded-xl border border-white/5 text-center">
                <Database className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                <div className="text-lg font-bold font-mono text-white">4 Tables</div>
                <div className="text-[10px] text-slate-400 uppercase font-mono">Supabase SQL</div>
              </div>
              <div className="p-3 bg-[#080c10] rounded-xl border border-white/5 text-center">
                <Server className="w-4 h-4 text-teal-400 mx-auto mb-1" />
                <div className="text-lg font-bold font-mono text-white">42 PSI</div>
                <div className="text-[10px] text-slate-400 uppercase font-mono">Telemetry Baseline</div>
              </div>
              <div className="p-3 bg-[#080c10] rounded-xl border border-white/5 text-center">
                <Cpu className="w-4 h-4 text-sky-400 mx-auto mb-1" />
                <div className="text-lg font-bold font-mono text-white">100%</div>
                <div className="text-[10px] text-slate-400 uppercase font-mono">RLS Security</div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Database Schema Verification</div>
              <div className="text-xs font-mono text-cyan-300 space-y-1">
                <div>• emergency_tickets (Burst pipe triage, geocoded dispatch, shutoff valve telemetry)</div>
                <div>• commercial_backflow (Annual certified RPZ backflow preventer logs)</div>
                <div>• hydro_inspections (CCTV camera line scoping, root intrusion & descaling)</div>
                <div>• technician_units (Master plumber vans, inventory loadout, GPS status)</div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsAuthenticated(false);
                setPasskey('');
              }}
              className="w-full py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              Lock Terminal & Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
