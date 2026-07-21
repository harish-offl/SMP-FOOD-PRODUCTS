import jsPDF from 'jspdf';
import 'jspdf-autotable';
import type { CartItem, OrderFormData } from '@/types';
import { formatPrice } from '@/data/products';

export function generateInvoice(
  orderId: string,
  items: CartItem[],
  customerDetails: OrderFormData,
  subtotal: number,
  deliveryCharge: number,
  total: number
) {
  // Initialize PDF
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  // Colors based on SMP Logo (brown)
  const primaryColor: [number, number, number] = [122, 47, 31];
  const textColor: [number, number, number] = [44, 33, 27];
  const mutedColor: [number, number, number] = [111, 98, 89];

  // Title / Logo Area
  doc.setFontSize(24);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('SMP FOOD PRODUCTS', 14, 22);
  
  doc.setFontSize(10);
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text('Grown By Nature', 14, 28);
  
  // Company Details
  doc.setFontSize(9);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text('Tamil Nadu, India', 14, 40);
  doc.text('Phone: +91 78459 34370', 14, 45);
  doc.text('Email: info@smpfoods.com', 14, 50);

  // Invoice Details (Right Side)
  doc.setFontSize(18);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('INVOICE', 196, 22, { align: 'right' });
  
  doc.setFontSize(10);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text(`Order ID: ${orderId}`, 196, 32, { align: 'right' });
  doc.text(`Date: ${date}`, 196, 38, { align: 'right' });
  doc.text(`Status: Pending Payment`, 196, 44, { align: 'right' });

  // Bill To Section
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Bill To:', 14, 65);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(customerDetails.fullName, 14, 72);
  doc.text(`Phone: ${customerDetails.phone}`, 14, 78);
  doc.text(customerDetails.email, 14, 84);
  
  const addressLines = [
    customerDetails.houseNumber,
    customerDetails.street,
    customerDetails.landmark,
    `${customerDetails.city}, ${customerDetails.district}`,
    `${customerDetails.state} - ${customerDetails.postalCode}`
  ].filter(Boolean).join(', ');
  
  const splitAddress = doc.splitTextToSize(addressLines, 80);
  doc.text(splitAddress, 14, 90);

  // Table Data Preparation
  const tableData = items.map((item, index) => {
    const price = item.variant ? item.variant.salePrice : item.product.salePrice;
    const weight = item.variant ? item.variant.weight : item.product.weight;
    return [
      index + 1,
      `${item.product.name} (${weight})`,
      formatPrice(price).replace('₹', 'Rs.'), // jspdf default font might struggle with ₹
      item.quantity,
      formatPrice(price * item.quantity).replace('₹', 'Rs.')
    ];
  });

  // Table
  // @ts-ignore (jspdf-autotable plugin typings)
  doc.autoTable({
    startY: 110,
    head: [['#', 'Product Description', 'Unit Price', 'Qty', 'Total']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    styles: {
      fontSize: 9,
      cellPadding: 4,
    },
    columnStyles: {
      0: { cellWidth: 15 },
      1: { cellWidth: 80 },
      2: { cellWidth: 35, halign: 'right' },
      3: { cellWidth: 20, halign: 'center' },
      4: { cellWidth: 40, halign: 'right' },
    },
  });

  // @ts-ignore
  const finalY = doc.lastAutoTable.finalY + 10;

  // Totals Area (Right aligned)
  const totalsX = 140;
  doc.setFontSize(10);
  
  doc.text('Subtotal:', totalsX, finalY);
  doc.text(formatPrice(subtotal).replace('₹', 'Rs.'), 196, finalY, { align: 'right' });

  doc.text('Delivery Fee:', totalsX, finalY + 7);
  const delChargeStr = deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge).replace('₹', 'Rs.');
  doc.text(delChargeStr, 196, finalY + 7, { align: 'right' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('Grand Total:', totalsX, finalY + 16);
  doc.text(formatPrice(total).replace('₹', 'Rs.'), 196, finalY + 16, { align: 'right' });

  // Payment Method Info
  doc.setFontSize(10);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.setFont('helvetica', 'normal');
  doc.text(`Payment Method: ${customerDetails.paymentMethod.toUpperCase().replace('_', ' ')}`, 14, finalY + 16);

  // Footer
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(10);
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text('Thank you for shopping with SMP Food Products!', 105, pageHeight - 20, { align: 'center' });
  doc.text('For any queries, contact info@smpfoods.com or WhatsApp +91 78459 34370', 105, pageHeight - 15, { align: 'center' });

  // Save PDF
  doc.save(`Invoice_${orderId}.pdf`);
}
