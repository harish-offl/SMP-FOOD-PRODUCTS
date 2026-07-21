'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

function CheckCircle2(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#0E0E0F] pt-[4.5rem]">
      {/* Header */}
      <div className="bg-[#171717] py-16 lg:py-20 text-center border-b border-white/[0.06]">
        <div className="section-container">
          <h1 className="heading-serif text-4xl text-white sm:text-5xl">Get In Touch</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[#7A7A7A]">
            Have a question about our products, want to place a bulk order, or interested in a partnership? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="section-container py-16 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-[1fr,1.5fr] items-start">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="heading-serif text-3xl text-white">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#7B3F21]/20 text-[#D79B3A]">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Call / WhatsApp</h3>
                  <p className="mt-1 text-[#B8B8B8]">+91 78459 34370</p>
                  <p className="text-xs text-[#7A7A7A] mt-1">Mon - Sat, 9:00 AM - 6:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#7B3F21]/20 text-[#D79B3A]">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Email Us</h3>
                  <a href="mailto:info@smpfoods.com" className="mt-1 block text-[#B8B8B8] hover:text-[#D79B3A] transition">info@smpfoods.com</a>
                  <a href="mailto:support@smpfoods.com" className="block text-[#B8B8B8] hover:text-[#D79B3A] transition">support@smpfoods.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#7B3F21]/20 text-[#D79B3A]">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Headquarters</h3>
                  <p className="mt-1 text-[#B8B8B8] leading-relaxed">
                    SMP Food Products,<br/>
                    Manufacturing Unit,<br/>
                    Tamil Nadu, India
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-10 aspect-[4/3] w-full rounded-3xl overflow-hidden bg-[#1E1E20] border border-white/[0.06] flex items-center justify-center">
              <p className="text-sm font-semibold text-[#7A7A7A]">Interactive Map Placeholder</p>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-[2.5rem] bg-[#1E1E20] p-8 sm:p-12 border border-white/[0.06]">
            <h2 className="heading-serif text-3xl text-white mb-8">Send a Message</h2>
            
            {success && (
              <div className="mb-8 rounded-xl bg-[#2E7D32]/10 p-4 text-[#2E7D32] flex items-center gap-3">
                <CheckCircle2 size={20} />
                <p className="text-sm font-semibold">Message sent successfully! We'll get back to you soon.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white">Full Name *</label>
                  <input required className="w-full rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-[#7A7A7A] focus:border-[#D79B3A] focus:outline-none focus:ring-1 focus:ring-[#D79B3A] transition" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white">Phone Number *</label>
                  <input required type="tel" className="w-full rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-[#7A7A7A] focus:border-[#D79B3A] focus:outline-none focus:ring-1 focus:ring-[#D79B3A] transition" />
                </div>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white">Email Address *</label>
                  <input required type="email" className="w-full rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-[#7A7A7A] focus:border-[#D79B3A] focus:outline-none focus:ring-1 focus:ring-[#D79B3A] transition" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white">Enquiry Type *</label>
                  <select required className="w-full rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3 text-sm text-white focus:border-[#D79B3A] focus:outline-none focus:ring-1 focus:ring-[#D79B3A] transition">
                    <option value="" className="bg-[#1E1E20]">Select an option</option>
                    <option value="product" className="bg-[#1E1E20]">Product Enquiry</option>
                    <option value="bulk" className="bg-[#1E1E20]">Bulk Order</option>
                    <option value="distributor" className="bg-[#1E1E20]">Distributor Enquiry</option>
                    <option value="support" className="bg-[#1E1E20]">Customer Support</option>
                    <option value="other" className="bg-[#1E1E20]">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-white">Message *</label>
                <textarea required rows={5} className="w-full rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-[#7A7A7A] focus:border-[#D79B3A] focus:outline-none focus:ring-1 focus:ring-[#D79B3A] resize-none transition"></textarea>
              </div>

              <button disabled={isSubmitting} type="submit" className="btn-primary w-full !py-4 disabled:opacity-70">
                {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={18} className="ml-2" />
              </button>
              
              <p className="text-xs text-[#7A7A7A] text-center mt-4">
                By submitting this form, you agree to our Privacy Policy and Terms of Service.
              </p>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}
