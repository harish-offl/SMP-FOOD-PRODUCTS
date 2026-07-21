import type { CartItem } from '@/types';
import { formatPrice } from '@/data/products';

const SMP_WHATSAPP_NUMBER = '917845934370';

export function generateWhatsAppOrderUrl(
  items: CartItem[],
  subtotal: number,
  deliveryCharge: number,
  total: number,
  customerName?: string,
  customerPhone?: string,
  address?: string,
  paymentMethod?: string
): string {
  const orderId = `SMP-${Date.now().toString(36).toUpperCase()}`;

  let message = `Hello SMP Food Products,\n\nI would like to place an order.\n\n`;

  if (customerName) message += `Customer Name: ${customerName}\n`;
  if (customerPhone) message += `Phone: ${customerPhone}\n`;
  message += `\nOrder Details:\n\n`;

  items.forEach((item, index) => {
    const price = item.variant ? item.variant.salePrice : item.product.salePrice;
    const weight = item.variant ? item.variant.weight : item.product.weight;
    message += `${index + 1}. ${item.product.name}\n`;
    message += `   Variant: ${weight}\n`;
    message += `   Quantity: ${item.quantity}\n`;
    message += `   Price: ${formatPrice(price * item.quantity)}\n\n`;
  });

  message += `Subtotal: ${formatPrice(subtotal)}\n`;
  message += `Delivery Charge: ${deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}\n`;
  message += `Grand Total: ${formatPrice(total)}\n`;

  if (address) message += `\nDelivery Address:\n${address}\n`;
  if (paymentMethod) message += `\nPayment Preference: ${paymentMethod}\n`;
  message += `\nOrder Reference: ${orderId}\n`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${SMP_WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

export function generateSingleProductWhatsAppUrl(
  productName: string,
  variant: string,
  price: number,
  quantity: number = 1
): string {
  const message = `Hello SMP Food Products,\n\nI am interested in ordering:\n\nProduct: ${productName}\nVariant: ${variant}\nQuantity: ${quantity}\nPrice: ${formatPrice(price * quantity)}\n\nPlease share availability and delivery details.\n\nThank you!`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${SMP_WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

export function getWhatsAppChatUrl(): string {
  const message = encodeURIComponent('Hello SMP Food Products! I would like to know more about your products.');
  return `https://wa.me/${SMP_WHATSAPP_NUMBER}?text=${message}`;
}
