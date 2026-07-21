'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/store/CartContext';
import { formatPrice } from '@/data/products';
import { generateWhatsAppOrderUrl } from '@/utils/whatsapp';
import { ShieldCheck } from 'lucide-react';
import type { OrderFormData } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getDeliveryCharge, getTotal, clearCart } = useCart();
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    phone: '',
    alternatePhone: '',
    email: '',
    houseNumber: '',
    street: '',
    landmark: '',
    city: '',
    district: '',
    state: '',
    postalCode: '',
    deliveryInstructions: '',
    paymentMethod: 'whatsapp',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = getSubtotal();
  const deliveryCharge = getDeliveryCharge();
  const total = getTotal();

  if (items.length === 0) {
    if (typeof window !== 'undefined') router.push('/cart');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (method: OrderFormData['paymentMethod']) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `SMP-${Date.now().toString(36).toUpperCase()}`;

      const orderDetails = {
        orderId,
        items,
        customerDetails: formData,
        subtotal,
        deliveryCharge,
        total,
        date: new Date().toISOString()
      };

      sessionStorage.setItem('smp_last_order', JSON.stringify(orderDetails));

      if (formData.paymentMethod === 'whatsapp' || formData.paymentMethod === 'cod') {
        const fullAddress = `${formData.houseNumber}, ${formData.street}, ${formData.landmark ? formData.landmark + ', ' : ''}${formData.city}, ${formData.district}, ${formData.state} - ${formData.postalCode}`;
        const whatsappUrl = generateWhatsAppOrderUrl(
          items,
          subtotal,
          deliveryCharge,
          total,
          formData.fullName,
          formData.phone,
          fullAddress,
          formData.paymentMethod === 'whatsapp' ? 'WhatsApp Order' : 'Cash on Delivery'
        );

        window.open(whatsappUrl, '_blank');
      }

      clearCart();
      router.push('/order-success');
    }, 1000);
  };

  const inputClasses = "w-full rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-[#7A7A7A] focus:border-[#7B3F21] focus:outline-none focus:ring-1 focus:ring-[#7B3F21] transition";

  const paymentMethods = [
    { value: 'whatsapp' as const, label: 'Order via WhatsApp' },
    { value: 'cod' as const, label: 'Cash on Delivery' },
    { value: 'upi' as const, label: 'UPI / Online Payment (Coming Soon)' },
  ];

  return (
    <main className="min-h-screen bg-[#0E0E0F] pt-[4.5rem]">
      <div className="bg-[#171717] py-8 border-b border-white/[0.06]">
        <div className="section-container">
          <h1 className="heading-serif text-3xl text-white">Checkout</h1>
        </div>
      </div>

      <div className="section-container py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr),minmax(360px,450px)] lg:gap-12">

          {/* Checkout Form */}
          <div>
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">

              {/* Contact Info */}
              <div className="rounded-3xl border border-white/[0.06] bg-[#1E1E20] p-5 sm:p-8">
                <h2 className="text-xl font-bold text-white mb-6">Contact Information</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-semibold text-white">Full Name *</label>
                    <input required name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter your full name" className={inputClasses} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white">Phone Number *</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 98765 43210" className={inputClasses} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white">Email Address *</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="you@example.com" className={inputClasses} />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="rounded-3xl border border-white/[0.06] bg-[#1E1E20] p-5 sm:p-8">
                <h2 className="text-xl font-bold text-white mb-6">Delivery Address</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white">House/Flat No. *</label>
                    <input required name="houseNumber" value={formData.houseNumber} onChange={handleInputChange} placeholder="123" className={inputClasses} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white">Street/Area *</label>
                    <input required name="street" value={formData.street} onChange={handleInputChange} placeholder="Main Street" className={inputClasses} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-semibold text-white">Landmark (Optional)</label>
                    <input name="landmark" value={formData.landmark} onChange={handleInputChange} placeholder="Near City Mall" className={inputClasses} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white">City *</label>
                    <input required name="city" value={formData.city} onChange={handleInputChange} placeholder="Chennai" className={inputClasses} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white">Postal Code *</label>
                    <input required name="postalCode" value={formData.postalCode} onChange={handleInputChange} placeholder="600001" className={inputClasses} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white">District *</label>
                    <input required name="district" value={formData.district} onChange={handleInputChange} placeholder="Chennai" className={inputClasses} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white">State *</label>
                    <select required name="state" value={formData.state} onChange={handleInputChange} className={`${inputClasses} appearance-none`}>
                      <option value="">Select State</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Telangana">Telangana</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="rounded-3xl border border-white/[0.06] bg-[#1E1E20] p-5 sm:p-8">
                <h2 className="text-xl font-bold text-white mb-6">Payment Method</h2>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.value}
                      type="button"
                      onClick={() => handlePaymentMethodChange(method.value)}
                      className={`flex min-h-14 w-full items-center justify-between rounded-xl border-2 p-3 text-left transition sm:p-4 ${
                        formData.paymentMethod === method.value
                          ? 'border-[#7B3F21] bg-[#7B3F21]/10'
                          : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]'
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                          formData.paymentMethod === method.value ? 'border-[#7B3F21]' : 'border-[#7A7A7A]'
                        }`}>
                          {formData.paymentMethod === method.value && (
                            <div className="h-2.5 w-2.5 rounded-full bg-[#7B3F21]"></div>
                          )}
                        </div>
                        <span className="text-sm font-semibold text-white sm:text-base">{method.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </form>
          </div>

          {/* Order Summary Sticky */}
          <div>
            <div className="sticky top-28 rounded-3xl border border-white/[0.06] bg-[#1E1E20] p-5 sm:p-8">
              <h2 className="heading-serif text-2xl text-white">Order Details</h2>

              <div className="mt-6 space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {items.map((item, idx) => {
                  const price = item.variant ? item.variant.salePrice : item.product.salePrice;
                  return (
                    <div key={idx} className="flex gap-3 border-b border-white/[0.06] pb-4 sm:gap-4">
                      <div className="h-16 w-16 shrink-0 rounded-lg bg-[#262628] p-1">
                        <img src={item.product.images[0]} alt="" className="h-full w-full object-contain" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <p className="text-sm font-bold text-white">{item.product.name}</p>
                        <p className="text-xs text-[#7A7A7A]">Qty: {item.quantity} × {item.variant ? item.variant.weight : item.product.weight}</p>
                      </div>
                      <div className="flex shrink-0 items-center text-xs font-bold text-white sm:text-sm">
                        {formatPrice(price * item.quantity)}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between text-[#B8B8B8]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#B8B8B8]">
                  <span>Delivery Charge</span>
                  <span className="font-semibold text-white">
                    {deliveryCharge === 0 ? <span className="text-[#2E7D32]">FREE</span> : formatPrice(deliveryCharge)}
                  </span>
                </div>
                <div className="my-4 border-t border-white/[0.06]"></div>
                <div className="flex justify-between text-lg">
                  <span className="font-bold text-white">Grand Total</span>
                  <span className="font-bold text-[#D79B3A]">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="btn-primary mt-8 w-full !py-4 !text-base shadow-md disabled:opacity-70"
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#7A7A7A]">
                <ShieldCheck size={16} className="text-[#2E7D32]" />
                <span>Secure and Encrypted Checkout</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
