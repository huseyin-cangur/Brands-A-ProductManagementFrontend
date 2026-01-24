import { OrderStatus } from "./OrderStatus";

export const OrderStatusColor: Record<OrderStatus, "success" | "warning" | "error" | "info"> = {
  [OrderStatus.Created]: "info",
  [OrderStatus.PaymentPending]: "warning",
  [OrderStatus.Paid]: "success",
  [OrderStatus.Preparing]: "info",
  [OrderStatus.Shipped]: "info",
  [OrderStatus.Delivered]: "success",
  [OrderStatus.PaymentFailed]: "error",
  [OrderStatus.Cancelled]: "error",
  [OrderStatus.Refunded]: "warning"
};