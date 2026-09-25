import React from 'react';
import Link from 'next/link';

export default function BlotterCaseDetailsPage({ params }: { params: { id: string } }) {
  // Use EB-2025-000248 as mock if params.id isn't specifically formatted
  const caseId = "EB-2025-000248";

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-extrabold text-slate-800">{caseId}</h1>
          <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-semibold bg-red-100 text-red-600 border border-red-200">
            Open
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            Edit
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Add Action
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Print
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-lg shadow-sm border border-slate-200 transition-colors">
            <span className="text-slate-400 font-bold tracking-widest leading-none mt-[-4px]">...</span>
            More
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex gap-8">
          <button className="pb-4 pt-2 text-sm font-bold text-blue-600 border-b-2 border-blue-600">
            Case Details
          </button>
          <button className="pb-4 pt-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors">
            Person Details
          </button>
          <button className="pb-4 pt-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors">
            Actions & History
          </button>
          <button className="pb-4 pt-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors">
            Attachments
          </button>
          <button className="pb-4 pt-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors">
            Related Cases
          </button>
        </nav>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column (Wider) */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Case Information Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Case Information</h2>
            
            <div className="space-y-5">
              <div className="flex border-b border-slate-100 pb-5">
                <div className="w-1/3 text-sm font-medium text-slate-500">Case No.</div>
                <div className="w-2/3 text-sm font-medium text-slate-800">{caseId}</div>
              </div>
              
              <div className="flex border-b border-slate-100 pb-5">
                <div className="w-1/3 text-sm font-medium text-slate-500">Incident Type</div>
                <div className="w-2/3 text-sm font-medium text-slate-800">Theft</div>
              </div>
              
              <div className="flex border-b border-slate-100 pb-5">
                <div className="w-1/3 text-sm font-medium text-slate-500">Date Reported</div>
                <div className="w-2/3 text-sm font-medium text-slate-800">Sep 24, 2025 10:30 AM</div>
              </div>
              
              <div className="flex border-b border-slate-100 pb-5">
                <div className="w-1/3 text-sm font-medium text-slate-500">Barangay</div>
                <div className="w-2/3 text-sm font-medium text-slate-800">Irosin</div>
              </div>
              
              <div className="flex border-b border-slate-100 pb-5">
                <div className="w-1/3 text-sm font-medium text-slate-500">Reporting Officer</div>
                <div className="w-2/3 text-sm font-medium text-slate-800">PO1 Juan Dela Cruz</div>
              </div>
              
              <div className="flex border-b border-slate-100 pb-5 items-center">
                <div className="w-1/3 text-sm font-medium text-slate-500">Status</div>
                <div className="w-2/3">
                  <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-red-100 text-red-600 border border-red-200">
                    Open
                  </span>
                </div>
              </div>
              
              <div className="flex pt-1">
                <div className="w-1/3 text-sm font-medium text-slate-500">Description</div>
                <div className="w-2/3 text-sm font-medium text-slate-800 leading-relaxed">
                  The complainant reported that his cellphone was stolen while inside a public market.
                </div>
              </div>
            </div>
          </div>

          {/* Evidence / Attachments Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Evidence / Attachments</h2>
            
            <div className="flex flex-wrap gap-4">
              {/* Attachment 1 */}
              <div className="w-40 border border-slate-200 rounded-xl overflow-hidden group hover:shadow-md transition-shadow">
                <div className="h-28 bg-slate-100 relative">
                  <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=300&auto=format&fit=crop" alt="cellphone.jpg" className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <div className="text-sm font-semibold text-slate-700 truncate">cellphone.jpg</div>
                  <div className="text-xs text-slate-400 mt-1">2.4 MB</div>
                </div>
              </div>
              
              {/* Attachment 2 */}
              <div className="w-40 border border-slate-200 rounded-xl overflow-hidden group hover:shadow-md transition-shadow">
                <div className="h-28 bg-slate-100 p-4 flex items-center justify-center">
                   {/* Mock PDF icon/preview */}
                   <svg className="w-12 h-12 text-red-400" fill="currentColor" viewBox="0 0 24 24"><path d="M7 3v18h10V9l-6-6H7zm2 2h3v5h5v9H9V5zm7 5h-4V6.5L16 10z" /></svg>
                </div>
                <div className="p-3">
                  <div className="text-sm font-semibold text-slate-700 truncate">receipt.pdf</div>
                  <div className="text-xs text-slate-400 mt-1">1.2 MB</div>
                </div>
              </div>

              {/* Add Attachment Button */}
              <button className="w-40 border-2 border-dashed border-blue-200 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-blue-400 hover:bg-blue-50 transition-colors h-[178px]">
                <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                <span className="text-sm font-semibold text-blue-600">Add Attachment</span>
              </button>
            </div>
          </div>
          
        </div>

        {/* Right Column (Narrower) */}
        <div className="xl:col-span-1 space-y-6">
          
          {/* Involved Persons Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Involved Persons</h2>
            
            {/* Complainant */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-slate-800 mb-4">Complainant</h3>
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 shrink-0">
                    <img src="https://ui-avatars.com/api/?name=Juan+Santos&background=e2e8f0&color=475569" alt="Juan Santos" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">Juan Santos</div>
                    <div className="text-xs text-slate-500 mt-0.5">Male • 32 years old</div>
                    <div className="text-xs text-slate-500 mt-0.5">Contact: <span className="font-semibold text-slate-700">0912 345 6789</span></div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="px-4 py-1.5 border border-blue-200 text-blue-600 text-xs font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                  View Profile
                </button>
              </div>
            </div>

            <hr className="border-slate-100 my-6" />

            {/* Suspect */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 mb-4">Suspect</h3>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center text-slate-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-sm">Unknown</div>
                  <div className="text-xs text-slate-500 mt-0.5">N/A</div>
                </div>
              </div>
            </div>
            
          </div>

          {/* Location Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Location</h2>
            
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800">Irosin Public Market</div>
                <div className="text-xs text-slate-500 mt-0.5">Irosin, Sorsogon</div>
              </div>
            </div>
            
            <div className="w-full h-40 bg-slate-100 rounded-xl overflow-hidden relative border border-slate-200">
               {/* Mock Map Image */}
               <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" alt="Map" className="w-full h-full object-cover opacity-60" />
               <div className="absolute inset-0 flex items-center justify-center">
                 <svg className="w-8 h-8 text-red-500 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                 </svg>
               </div>
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  );
}
