import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LegalDocument } from '../types';
import { initialLegalDocuments } from '../data/mockData';
import {
  ShieldCheck,
  FileCheck2,
  ExternalLink,
  Copy,
  CheckCircle2,
  Calendar,
  Building2,
  Eye,
  X,
  Award,
  Stamp,
  Lock,
  Download,
} from 'lucide-react';

export const LegalCertificationsSection: React.FC = () => {
  const { siteSettings, showToast, isAdmin, currentUser, setView } = useApp();
  const [selectedDoc, setSelectedDoc] = useState<LegalDocument | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'trade_license' | 'tin' | 'bin_vat' | 'rjsc'>('all');

  const documents: LegalDocument[] = siteSettings.legalDocuments && siteSettings.legalDocuments.length > 0
    ? siteSettings.legalDocuments
    : initialLegalDocuments;

  const filteredDocs = activeFilter === 'all'
    ? documents
    : documents.filter((d) => d.documentType === activeFilter);

  const handleCopyNumber = (docNum: string, id: string) => {
    navigator.clipboard.writeText(docNum);
    setCopiedId(id);
    showToast(`ডকুমেন্ট নম্বর '${docNum}' কপি করা হয়েছে!`, 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getDocTypeBadge = (type: LegalDocument['documentType']) => {
    switch (type) {
      case 'trade_license':
        return { label: 'ট্রেড লাইসেন্স', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
      case 'tin':
        return { label: 'ই-টিআইএন সনদ', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' };
      case 'bin_vat':
        return { label: 'বিআইএন / ভ্যাট', color: 'bg-amber-500/10 text-amber-400 border-amber-500/30' };
      case 'rjsc':
        return { label: 'কোম্পানি নিবন্ধন', color: 'bg-purple-500/10 text-purple-400 border-purple-500/30' };
      default:
        return { label: 'সরকারি সনদ', color: 'bg-slate-500/10 text-slate-300 border-slate-500/30' };
    }
  };

  return (
    <section id="certifications" className="py-16 sm:py-20 bg-gradient-to-b from-[#091124] via-[#0B1530] to-[#080E20] border-t border-slate-800/80 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>১০০% বৈধ ও গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            সরকারি কাগজপত্র ও <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">বৈধতা যাচাইকরণ পোর্টাল</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            গ্রাহকের আস্থা ও শতভাগ বিশ্বাসযোগ্যতা নিশ্চিত করতে আমাদের ট্রেড লাইসেন্স, ই-টিআইএন (TIN), মূসক/ভ্যাট (BIN) ও কোম্পানি রেজিস্ট্রেশন সনদ উন্মুক্ত রাখা হয়েছে। প্রতিটি সনদ সংশ্লিষ্ট সরকারি ডাটাবেসে অনলাইনে যাচাইযোগ্য।
          </p>

          {/* Quick Stats Grid */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3 bg-slate-900/80 rounded-2xl border border-emerald-500/20 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>ট্রেড লাইসেন্স</span>
              </div>
              <div className="text-xs text-slate-300 font-mono">সিটি কর্পোরেশন অনুমোদিত</div>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-2xl border border-blue-500/20 shadow-sm">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>ই-টিআইএন সনদ</span>
              </div>
              <div className="text-xs text-slate-300 font-mono">এনবিআর ভেরিফাইড করদাতা</div>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-2xl border border-amber-500/20 shadow-sm">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>বিআইএন / ভ্যাট</span>
              </div>
              <div className="text-xs text-slate-300 font-mono">নিয়মিত মূসক প্রদানকারী</div>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-2xl border border-purple-500/20 shadow-sm">
              <div className="flex items-center gap-2 text-purple-400 text-xs font-bold mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>RJSC কোম্পানি</span>
              </div>
              <div className="text-xs text-slate-300 font-mono">বাণিজ্য মন্ত্রণালয় নিবন্ধিত</div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'all', label: 'সকল সনদ ও কাগজপত্র' },
            { id: 'trade_license', label: 'ট্রেড লাইসেন্স' },
            { id: 'tin', label: 'ই-টিআইএন সনদ' },
            { id: 'bin_vat', label: 'বিআইএন / ভ্যাট' },
            { id: 'rjsc', label: 'কোম্পানি সনদ' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-md shadow-emerald-500/20 scale-105'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}

          {isAdmin && currentUser?.role === 'admin' && (
            <button
              onClick={() => setView('admin-dashboard')}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>⚙️ অ্যাডমিন থেকে ম্যানেজ করুন</span>
            </button>
          )}
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDocs.map((doc) => {
            const badge = getDocTypeBadge(doc.documentType);
            const isCopied = copiedId === doc.id;

            return (
              <div
                key={doc.id}
                className="group relative bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/40 rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col justify-between"
              >
                {/* Official seal watermark in corner */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-25 transition-opacity pointer-events-none">
                  <Award className="w-24 h-24 text-emerald-400" />
                </div>

                <div className="space-y-4">
                  {/* Badge & Verification Status */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${badge.color}`}>
                      {badge.label}
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-black">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      ভেরিফাইড ও সক্রিয়
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {doc.description}
                    </p>
                  </div>

                  {/* Details Card */}
                  <div className="p-3.5 bg-slate-950/70 rounded-2xl border border-slate-800/90 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">সনদ / লাইসেন্স নম্বর:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-amber-300 text-sm">{doc.documentNumber}</span>
                        <button
                          onClick={() => handleCopyNumber(doc.documentNumber, doc.id)}
                          className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
                          title="নম্বর কপি করুন"
                        >
                          {isCopied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">ইস্যুকারী কর্তৃপক্ষ:</span>
                      <span className="font-medium text-slate-200 text-right">{doc.issuingAuthority}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">ইস্যুর তারিখ / মেয়াদ:</span>
                      <span className="font-medium text-slate-300">{doc.issueDate} {doc.expiryDate ? `• (${doc.expiryDate})` : ''}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-semibold">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>এনবিআর ও সরকারি সার্ভারে তালিকাভুক্ত</span>
                  </div>

                  <button
                    onClick={() => setSelectedDoc(doc)}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>সনদপত্র দেখুন</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Certificate Viewer Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 to-[#0A1227] border border-emerald-500/40 rounded-3xl p-6 sm:p-7 shadow-[0_0_50px_rgba(16,185,129,0.25)] text-slate-100 max-h-[92vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedDoc(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-5 pr-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">{selectedDoc.title}</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    অফিশিয়াল
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">{selectedDoc.issuingAuthority}</p>
              </div>
            </div>

            {/* Document Scan & Official Border Wrapper */}
            <div className="relative bg-slate-950 p-4 rounded-2xl border-2 border-emerald-500/30 overflow-hidden mb-5">
              
              {/* Document Certificate Frame */}
              <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                <img
                  src={selectedDoc.fileUrl}
                  alt={selectedDoc.title}
                  className="w-full h-64 sm:h-80 object-cover object-center filter contrast-105 opacity-90"
                />

                {/* Verification Overlay Stamp */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-5">
                  <div className="bg-slate-950/90 backdrop-blur-md p-4 rounded-2xl border border-emerald-500/40 shadow-xl space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">সনদ নম্বর:</span>
                      <span className="text-sm font-black font-mono text-amber-400">{selectedDoc.documentNumber}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">কর্তৃপক্ষ:</span>
                      <span className="text-slate-200 font-semibold">{selectedDoc.issuingAuthority}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">কার্যকারিতা:</span>
                      <span className="text-emerald-400 font-bold">অনুমোদিত ও নবায়নকৃত</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Watermark badge */}
              <div className="absolute top-8 right-8 bg-emerald-600/90 text-slate-950 font-black px-3 py-1 rounded-full text-[11px] shadow-lg flex items-center gap-1 border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                VERIFIED DOCUMENT
              </div>
            </div>

            {/* Description note */}
            <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed mb-5">
              <span className="font-bold text-amber-400">আইনি নিশ্চয়তা:</span> {selectedDoc.description} সকল কার্যক্রম গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের ভোক্তা অধিকার সংরক্ষণ আইন ও ডিজিটাল নিরাপত্তা বিধিমালা অনুযায়ী পরিচালিত হচ্ছে।
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => handleCopyNumber(selectedDoc.documentNumber, selectedDoc.id)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Copy className="w-4 h-4" />
                <span>লাইসেন্স নম্বর কপি</span>
              </button>

              <button
                onClick={() => setSelectedDoc(null)}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                বন্ধ করুন
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
