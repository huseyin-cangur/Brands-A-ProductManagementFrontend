import { OrderStatus } from "./OrderStatus";

export const OrderStatusTR: Record<OrderStatus, string> = {
  [OrderStatus.Created]: "Oluşturuldu",
  [OrderStatus.PaymentPending]: "Ödeme Bekleniyor",
  [OrderStatus.Paid]: "Ödeme Alındı",
  [OrderStatus.Preparing]: "Hazırlanıyor",
  [OrderStatus.Shipped]: "Kargoya Verildi",
  [OrderStatus.Delivered]: "Teslim Edildi",
  [OrderStatus.PaymentFailed]: "Ödeme Başarısız",
  [OrderStatus.Cancelled]: "İptal Edildi",
  [OrderStatus.Refunded]: "İade Edildi"
};