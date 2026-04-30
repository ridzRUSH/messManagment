// API Types for Mess Management System Frontend
// Generated from backend route responses

// ====================
// AUTH INTERFACES
// ====================

export type UserRole = "STUDENT" | "CARE_TAKER" | "MESS_SECRETARY" | "MESS_SUPERVISOR" | "WARDEN";
export type StaffRole = "COOK" | "MESS_SECRETARY" | "CARE_TAKER" | "WARDEN" | "MESS_SUPERVISOR";

export const ROLES = {
  STUDENT: "STUDENT",
  MESS_SECRETARY: "MESS_SECRETARY",
  CARE_TAKER: "CARE_TAKER",
  MESS_SUPERVISOR: "MESS_SUPERVISOR",
  WARDEN: "WARDEN",
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export interface LoginRequest {
  email: string;
  role: UserRole;
}

export interface OTPVerifyRequest {
  otp: string;
  token: string;
  role: UserRole;
}

export interface AuthResponse {
  message: string;
  token: string;
  role: UserRole;
  user?: UserData;
}

export interface UserData {
  student_id?: number;
  staff_id?: number;
  name: string;
  email: string;
  hostel_id?: number;
  room_no?: string;
  role?: UserRole;
}

// ====================
// MESS CARD INTERFACES
// ====================

export interface MessCardViewResponse {
  month: string;
  year: string;
  intervals: any[];
  summary: MessCardSummary;
}

export interface MessCardSummary {
  [key: string]: any;
}

export interface YearlyBillResponse {
  year: number;
  totalAmount: number;
  billCount: number;
}

export interface MonthlyBillResponse {
  success: boolean;
  bills: any[];
}

// ====================
// FEEDBACK INTERFACES
// ====================

export interface FeedbackRequest {
  food_rating: number;
  hygiene_rating: number;
  comments?: string;
}

export interface FeedbackResponse {
  success: boolean;
  message: string;
}

export interface FeedbackData {
  feedback_id: number;
  student_id: number;
  date: string;
  food_rating: number;
  hygiene_rating: number;
  comments?: string;
}

// ====================
// SUBSCRIPTION INTERFACES
// ====================

export interface SubscriptionRequest {
  item_name: string;
  cost: number;
  start_date: string;
  end_date: string;
}

// ====================
// SPECIAL MEAL INTERFACES
// ====================

export interface SpecialMealRequest {
  hostel_id: number;
  date: string;
  meal_name: string;
  total_cost: number;
  total_plates: number;
}

export interface JoinSpecialMealRequest {
  special_id: number;
}

export interface SpecialMealData {
  special_id: number;
  hostel_id: number;
  date: string;
  meal_name: string;
  total_cost: number;
  total_plates: number;
}

// ====================
// MESS SECRETARY INTERFACES
// ====================

export interface RationConsumptionRequest {
  hostel_id: number;
  date: string;
  normal_expense: number;
}

export interface WeeklyExpenseRequest {
  hostel_id: number;
  date: string;
  normal_expense: number;
}

export interface AddSpecialMealStudentRequest {
  student_id: number;
  plates_taken: number;
}

// ====================
// CARE TAKER INTERFACES
// ====================

export interface AddStudentRequest {
  name: string;
  email: string;
  hostel_id: number;
}

export interface StudentData {
  student_id: number;
  hostel_id: number;
  name: string;
  email: string;
  room_no?: string;
  hostel_name?: string;
}

export interface AddMessCardRequest {
  student_id: number;
}

export interface AddExpenseRequest {
  date: string;
  normal_expense: number;
}

export interface ExpenseData {
  expense_id: number;
  hostel_id: number;
  date: string;
  normal_expense: number;
}

// ====================
// WARDEN INTERFACES
// ====================

export interface StaffRequest {
  name: string;
  email: string;
  role: StaffRole;
  hostel_id: number;
}

export interface StaffData extends StaffRequest {
  staff_id: number;
}

export interface MessSummary {
  total_students: number;
  active_cards: number;
  closed_cards: number;
  total_cards: number;
}

export interface MessCard {
  card_id: number;
  student_id: number;
  status: "ACTIVE" | "CLOSED";
  open_date: string;
  close_date?: string;
  student_name: string;
  student_email: string;
  room_no?: string;
}

export interface UpdateEmailConfigRequest {
  email: string;
  smtp_host?: string;
  smtp_port?: number;
  password?: string;
  is_active?: boolean;
}

// ====================
// GENERIC INTERFACES
// ====================

export interface ErrorResponse {
  error?: string;
  success?: boolean;
  message?: string;
}

export interface SuccessResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

// ====================
// HOSTEL INTERFACES
// ====================

export interface HostelData {
  hostel_id: number;
  hostel_name: string;
  location: string;
}

// ====================
// MENU INTERFACES
// ====================

export interface MenuData {
  menu_id: number;
  hostel_id: number;
  date: string;
  day_of_week: string;
  meal_type: string;
  items: string;
}

// ====================
// BILL INTERFACES
// ====================

export interface BillData {
  bill_id: number;
  student_id: number;
  month: number;
  year: number;
  normal_amount: number;
  special_amount: number;
  subscription_amount: number;
  total_amount: number;
  payment_status: string;
}

// ====================
// PAYMENT INTERFACES
// ====================

export interface PaymentData {
  payment_id: number;
  bill_id: number;
  amount: number;
  payment_date: string;
  status: string;
}

// ====================
// OTP INTERFACES
// ====================

export interface OTPData {
  otp_id: number;
  email: string;
  otp_code: string;
  expires_at: string;
  is_verified: boolean;
  created_at: string;
}

// ====================
// EMAIL CONFIG INTERFACES
// ====================

export interface EmailConfigData {
  config_id: number;
  hostel_id: number;
  email: string;
  password: string;
  smtp_host: string;
  smtp_port: number;
  is_active: boolean;
}