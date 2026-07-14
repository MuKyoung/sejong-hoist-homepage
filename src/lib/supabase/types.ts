export type Role = "admin" | "editor";

export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: Role;
  created_at: string;
};

export type InquiryStatus = "new" | "in_progress" | "done" | "archived";

export type Inquiry = {
  id: number;
  name: string;
  company: string | null;
  phone: string | null;
  email: string | null;
  product_category: string | null;
  message: string;
  status: InquiryStatus;
  admin_note: string | null;
  handled_by: string | null;
  handled_at: string | null;
  created_at: string;
  /** storage 'inquiry-files' 버킷의 object path 목록 (스키마 갱신 전 행은 null 가능) */
  attachments: string[] | null;
};

export type Notice = {
  id: number;
  category: string;
  title: string;
  body: string | null;
  is_important: boolean;
  is_published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
};

export const INQUIRY_STATUS_LABEL: Record<InquiryStatus, string> = {
  new: "신규",
  in_progress: "처리중",
  done: "완료",
  archived: "보관",
};

export const NOTICE_CATEGORY_OPTIONS = ["회사소식", "납품실적", "제품", "채용", "기술"] as const;
