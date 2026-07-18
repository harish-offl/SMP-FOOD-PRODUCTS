'use client';

import { Code2, MonitorSmartphone, Palette, ShoppingCart, Cpu, Zap, Mail, ExternalLink } from 'lucide-react';

export default function DevelopersPage() {
  return (
    <main className="min-h-screen bg-[#0E0E0F] pt-[4.5rem]">
      {/* Header */}
      <div className="bg-[#171717] py-16 lg:py-24 text-center relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#D79B3A] via-transparent to-transparent"></div>
        <div className="section-container relative z-10">
          <p className="text-[#D79B3A] font-bold uppercase tracking-widest text-sm mb-4">Website Development Team</p>
          <h1 className="heading-serif text-4xl text-white sm:text-5xl">The Minds Behind The Screen</h1>
          <p className="mx-auto mt-6 max-w-2xl text-[#B8B8B8] leading-relaxed">
            Designed and developed with precision, care, and modern technology to provide SMP Foods with a premium digital presence and robust e-commerce capabilities.
          </p>
        </div>
      </div>

      <div className="section-container py-16 lg:py-24">
        <div className="mx-auto max-w-4xl">
          
          {/* Developer Card */}
          <div className="relative rounded-[2.5rem] bg-[#1E1E20] p-8 sm:p-12 border border-white/[0.06] overflow-hidden">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#D79B3A]/5 blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center md:items-start">
              
              {/* Avatar / Initials */}
              <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-[#D79B3A] to-[#7B3F21] text-5xl font-bold text-white shadow-lg">
                A
              </div>
              
              {/* Info */}
              <div className="text-center md:text-left flex-1">
                <h2 className="heading-serif text-3xl text-white">Annamalai</h2>
                <p className="mt-2 inline-flex rounded-full bg-[#D79B3A]/10 px-4 py-1 text-sm font-semibold text-[#D79B3A] border border-[#D79B3A]/20">
                  Lead Full-Stack Developer & UI/UX Designer
                </p>
                
                <p className="mt-6 text-[#B8B8B8] leading-relaxed">
                  Developed the complete project architecture, responsive frontend experience, state management, e-commerce functionality, brand interface system, and overall website optimization for SMP Food Products.
                </p>

                {/* Contact Links */}
                <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
                  <a href="mailto:annamalaiharish@gmail.com" className="flex items-center gap-2 rounded-xl bg-[#D79B3A]/10 px-5 py-2.5 text-sm font-semibold text-[#D79B3A] border border-[#D79B3A]/20 transition hover:bg-[#D79B3A] hover:text-[#0E0E0F]">
                    <Mail size={16} /> Email
                  </a>
                  <a href="#" className="flex items-center gap-2 rounded-xl border border-white/[0.06] px-5 py-2.5 text-sm font-semibold text-[#B8B8B8] transition hover:bg-[#262628] hover:text-white">
                    <ExternalLink size={16} /> Portfolio
                  </a>
                  <a href="#" className="flex items-center gap-2 rounded-xl border border-white/[0.06] px-5 py-2.5 text-sm font-semibold text-[#B8B8B8] transition hover:bg-[#262628] hover:text-white">
                    <ExternalLink size={16} /> LinkedIn
                  </a>
                  <a href="#" className="flex items-center gap-2 rounded-xl border border-white/[0.06] px-5 py-2.5 text-sm font-semibold text-[#B8B8B8] transition hover:bg-[#262628] hover:text-white">
                    <ExternalLink size={16} /> GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack & Responsibilities */}
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Cpu size={20} className="text-[#D79B3A]" /> Technology Stack
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 rounded-xl bg-[#1E1E20] p-4 border border-white/[0.06]">
                  <Code2 size={18} className="text-[#7A7A7A]" />
                  <span className="font-medium text-white">Next.js & React</span>
                </li>
                <li className="flex items-center gap-3 rounded-xl bg-[#1E1E20] p-4 border border-white/[0.06]">
                  <Palette size={18} className="text-[#7A7A7A]" />
                  <span className="font-medium text-white">Tailwind CSS & Framer Motion</span>
                </li>
                <li className="flex items-center gap-3 rounded-xl bg-[#1E1E20] p-4 border border-white/[0.06]">
                  <Zap size={18} className="text-[#7A7A7A]" />
                  <span className="font-medium text-white">TypeScript</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <MonitorSmartphone size={20} className="text-[#D79B3A]" /> Key Responsibilities
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 rounded-xl bg-[#1E1E20] p-4 border border-white/[0.06]">
                  <Palette size={18} className="text-[#7A7A7A]" />
                  <span className="font-medium text-white">UI/UX Design & Branding Integration</span>
                </li>
                <li className="flex items-center gap-3 rounded-xl bg-[#1E1E20] p-4 border border-white/[0.06]">
                  <ShoppingCart size={18} className="text-[#7A7A7A]" />
                  <span className="font-medium text-white">E-commerce Cart & WhatsApp Checkout</span>
                </li>
                <li className="flex items-center gap-3 rounded-xl bg-[#1E1E20] p-4 border border-white/[0.06]">
                  <MonitorSmartphone size={18} className="text-[#7A7A7A]" />
                  <span className="font-medium text-white">Responsive Web Architecture</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 text-center text-sm font-medium text-[#7A7A7A]">
            Designed and Developed with care for SMP Foods.
          </div>

        </div>
      </div>
    </main>
  );
}
