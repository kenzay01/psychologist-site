// types/payment.ts

export interface PaymentData {
  formData: {
    name: string;
    phone: string;
    socialMedia: string;
    problem: string;
    partnerName: string;
    childName: string;
    childAge: string;
    experience: string;
    supervisionGoals: string;
  };
  selectedType: "consultation" | "supervision";
  selectedConsultationType: "individual" | "couple" | "child";
  selectedSupervisionType: "individual" | "group";
  selectedDate: string;
  selectedTime: string;
  price: number;
  duration: number;
  timestamp: number;
  invoiceId?: string; // Додаємо поле для invoiceId
}

export interface MonoPaymentRequest {
  amount: number; // Сума в копійках
  merchantPaymInfo: {
    reference: string;
    destination: string;
    comment?: string;
  };
  redirectUrl: string;
  webHookUrl: string;
  validity?: number; // Час дії в секундах
  paymentType?: "debit" | "hold";
}

export interface MonoPaymentResponse {
  invoiceId: string;
  pageUrl: string;
}

export interface MonoWebhookData {
  invoiceId: string;
  status:
    | "created"
    | "processing"
    | "hold"
    | "success"
    | "failure"
    | "reversed"
    | "expired";
  failureReason?: string;
  amount: number;
  ccy: number;
  finalAmount: number;
  createdDate: string;
  modifiedDate: string;
  reference: string;
  paymentInfo?: {
    maskedPan: string;
    approvalCode: string;
    rrn: string;
    tranId: string;
    terminal: string;
    bank: string;
    paymentSystem: string;
    country: string;
    fee: number;
  };
}

export interface MonoStatusResponse {
  status:
    | "created"
    | "processing"
    | "hold"
    | "success"
    | "failure"
    | "reversed"
    | "expired";
  failureReason?: string;
  amount: number;
  ccy: number;
  finalAmount: number;
  createdDate: string;
  modifiedDate: string;
  reference: string;
  paymentInfo?: {
    maskedPan: string;
    approvalCode: string;
    rrn: string;
    tranId: string;
    terminal: string;
    bank: string;
    paymentSystem: string;
    country: string;
    fee: number;
  };
}

export type PaymentStatus =
  | "created"
  | "processing"
  | "hold"
  | "success"
  | "failure"
  | "reversed"
  | "expired";
