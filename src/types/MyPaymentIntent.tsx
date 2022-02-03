import { PaymentIntent } from "@stripe/stripe-js";
export interface Datum {
  id: string;
  object: string;
  amount: number;
  amount_captured: number;
  amount_refunded: number;
  application: null;
  application_fee: null;
  application_fee_amount: null;
  balance_transaction: string;
  billing_details: BillingDetails;
  calculated_statement_descriptor: string;
  captured: boolean;
  created: number;
  currency: string;
  customer: null;
  description: string;
  destination: null;
  dispute: null;
  disputed: boolean;
  failure_code: null;
  failure_message: null;
  invoice: null;
  livemode: boolean;
  metadata: Metadata;
  on_behalf_of: null;
  order: null;
  outcome: Outcome;
  paid: boolean;
  payment_intent: string;
  payment_method: string;
  payment_method_details: PaymentMethodDetails;
  receipt_email: string;
  receipt_number: null;
  receipt_url: string;
  refunded: boolean;
  refunds: PaymentIntentCharge;
  review: null;
  shipping: null;
  source: null;
  source_transfer: null;
  statement_descriptor: null;
  statement_descriptor_suffix: null;
  status: string;
  transfer_data: null;
  transfer_group: null;
}

export interface PaymentIntentCharge {
  object: string;
  data: Array<Datum[]>;
  has_more: boolean;
  url: string;
  total_count?: number;
}

export interface BillingDetails {
  address: Address;
  email: string;
  name: string;
  phone: null;
}

export interface Address {
  city: null;
  country: null;
  line1: null;
  line2: null;
  postal_code: string;
  state: null;
}

export interface Metadata {
  _id: string;
  title: string;
  notes: string;
  readOnly: string;
  allDay: string;
  createdAt: Date;
  updatedAt: Date;
  startDate: Date;
  endDate: Date;
  meetLimit: string;
  teacherID: string;
  meetID: string;
}

export interface Outcome {
  network_status: string;
  reason: null;
  risk_level: string;
  risk_score: number;
  seller_message: string;
  type: string;
}

export interface PaymentMethodDetails {
  card: Card;
  type: string;
}

export interface Card {
  brand: string;
  checks: Checks;
  country: string;
  exp_month: number;
  exp_year: number;
  fingerprint: string;
  funding: string;
  installments: null;
  last4: string;
  network: string;
  three_d_secure: null;
  wallet: null;
}

export interface Checks {
  address_line1_check: null;
  address_postal_code_check: string;
  cvc_check: string;
}

export interface MyPaymentIntent extends PaymentIntent {
  _id: string;
  appointmentId: string;
  studentId: string;
  refunded: boolean;
  charges: PaymentIntentCharge;
}
