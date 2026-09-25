import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between">
      {/* Header / Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/30 text-white">
              EB
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight text-white">E-Blotter System</h1>
              <p className="text-xs text-slate-400">Barangay & Police Incident Management</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/api/health" 
              className="text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
            >
              System Online
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-16 flex-1 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/40 border border-blue-700/50 text-blue-300 text-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          Official Blotter Recording Portal
        </div>

        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-4xl">
          Unified Digital Incident & <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">
            Blotter Management Platform
          </span>
        </h2>

        <p className="text-slate-400 text-lg max-w-2xl mb-12">
          Streamlining incident reporting, person history tracking, and inter-barangay police coordination with secure role-based access control.
        </p>

        {/* Portal Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl text-left">
          {/* Barangay Portal Card */}
          <div className="p-8 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-blue-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center text-2xl font-bold mb-6 group-hover:scale-110 transition-transform">
                🏛️
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Barangay Officers Portal</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Log local incidents, record blotter entries, manage involved persons, and track barangay-level case resolutions.
              </p>
            </div>
            <Link
              href="/barangay/admin/login"
              className="w-full text-center py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-600/30 transition-all"
            >
              Sign In to Barangay Portal →
            </Link>
          </div>

          {/* Police HQ Portal Card */}
          <div className="p-8 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-indigo-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-2xl font-bold mb-6 group-hover:scale-110 transition-transform">
                🛡️
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Police HQ Portal</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Centralized monitoring across all 28 barangays, incident analytics, user access management, and official audit exports.
              </p>
            </div>
            <Link
              href="/police/admin/login"
              className="w-full text-center py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 transition-all"
            >
              Sign In to Police Portal →
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        E-Blotter Incident Management System &copy; {new Date().getFullYear()} — Secure Supabase Backend Active
      </footer>
    </div>
  );
}
