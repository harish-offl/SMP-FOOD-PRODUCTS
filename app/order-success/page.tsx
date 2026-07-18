'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Download, Package, ArrowRight } from 'lucide-react';
import { generateInvoice } from '@/utils/generateInvoice';

export default function OrderSuccessPage() {
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    const storedOrder = sessionStorage.getItem('smp_last_order');
    if (storedOrder) {
      setOrderData(JSON.parse(storedOrder));
    }
  }, []);

  const handleDownloadInvoice = () => {
    if (orderData) {
      generateInvoice(
        orderData.orderId,
        orderData.items,
        orderData.customerDetails,
        orderData.subtotal,
        orderData.deliveryCharge,
        orderData.total
      );
    }
  };

  if (!orderData) {
    return (
      <main className="min-h-screen bg-[#0E0E0F] pt-[4.5rem]">
        <div className="section-container flex min-h-[60vh] flex-col items-center justify-center text-center">
          <Package size={48} className="text-[#7A7A7A] mb-6" />
          <h1 className="heading-serif text-3xl text-white">No Recent Orders Found</h1>
          <Link href="/products" className="btn-primary mt-8">Continue Shopping</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0E0E0F] pt-[4.5rem]">
      <div className="section-container flex min-h-[80vh] items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl rounded-[2.5rem] bg-[#1E1E20] border border-white/[0.06] p-8 text-center sm:p-16"
        >
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#2E7D32]/10 text-[#2E7D32] mb-8">
            <CheckCircle2 size={48} />
          </div>

          <h1 className="heading-serif text-4xl text-white sm:text-5xl">Order Successful!</h1>
          <p className="mt-4 text-lg text-[#B8B8B8]">
            Thank you, {orderData.customerDetails.fullName}! Your order has been placed successfully.
          </p>

          <div className="mt-8 rounded-2xl bg-[#262628] border border-white/[0.06] p-6 text-left">
            <div className="flex justify-between items-center border-b border-white/[0.06] pb-4 mb-4">
              <span className="text-sm text-[#7A7A7A]">Order ID</span>
              <span className="font-bold text-white">{orderData.orderId}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/[0.06] pb-4 mb-4">
              <span className="text-sm text-[#7A7A7A]">Payment Method</span>
              <span className="font-bold text-white uppercase">{orderData.customerDetails.paymentMethod}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#7A7A7A]">Amount to Pay</span>
              <span className="text-xl font-bold text-[#D79B3A]">₹{orderData.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={handleDownloadInvoice}
              className="btn-secondary w-full sm:w-auto !px-8"
            >
              <Download size={18} />
              Download Invoice
            </button>
            <Link href="/products" className="btn-primary w-full sm:w-auto !px-8">
              Continue Shopping <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
