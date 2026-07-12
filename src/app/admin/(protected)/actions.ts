"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { InquiryStatus, Role } from "@/lib/supabase/types";

type ActionResult = { ok?: true; error?: string };

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

/* ── Inquiries ─────────────────────────────────────────── */
export async function updateInquiry(
  id: number,
  status: InquiryStatus,
  adminNote: string,
): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("inquiries")
    .update({
      status,
      admin_note: adminNote.trim() || null,
      handled_by: user?.id ?? null,
      handled_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
  return { ok: true };
}

export async function deleteInquiry(id: number): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("inquiries").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
  return { ok: true };
}

/* ── Notices (posts) ───────────────────────────────────── */
export type NoticeInput = {
  id?: number;
  category: string;
  title: string;
  body: string;
  is_important: boolean;
  is_published: boolean;
};

/** 공지 변경 시 공개 페이지까지 즉시 재생성 */
function revalidateNoticePages() {
  revalidatePath("/admin/posts");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/en");
  revalidatePath("/support/notice");
  revalidatePath("/support/notice/[id]", "page");
}

export async function saveNotice(input: NoticeInput): Promise<ActionResult> {
  const supabase = await createClient();
  const title = input.title.trim();
  if (!title) return { error: "제목을 입력하세요." };

  const row = {
    category: input.category,
    title,
    body: input.body.trim() || null,
    is_important: input.is_important,
    is_published: input.is_published,
  };

  const { error } = input.id
    ? await supabase.from("notices").update(row).eq("id", input.id)
    : await supabase.from("notices").insert(row);

  if (error) return { error: error.message };
  revalidateNoticePages();
  return { ok: true };
}

export async function deleteNotice(id: number): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("notices").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidateNoticePages();
  return { ok: true };
}

/* ── Portfolio (시공사례) ─────────────────────────────── */
export type PortfolioInput = {
  id?: number;
  slug: string;
  title: string;
  client: string;
  industry: string;
  capacity: string;
  capacity_bucket: string;
  category: string;
  year: string;
  location: string;
  period: string;
  scope: string[];
  description: string;
  specs: { label: string; value: string }[];
  src: string;
  gallery: string[];
  is_published: boolean;
};

function revalidatePortfolioPages(slug: string) {
  revalidatePath("/admin/portfolio");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/en");
  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${slug}`);
}

export async function savePortfolioItem(input: PortfolioInput): Promise<ActionResult> {
  const supabase = await createClient();
  const title = input.title.trim();
  const slug = input.slug.trim();
  if (!title) return { error: "제목을 입력하세요." };
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { error: "슬러그는 영문 소문자·숫자·하이픈만 사용할 수 있습니다." };
  }

  const row = {
    slug,
    title,
    client: input.client.trim() || null,
    industry: input.industry.trim() || null,
    capacity: input.capacity.trim() || null,
    capacity_bucket: input.capacity_bucket.trim() || null,
    category: input.category.trim() || null,
    year: input.year.trim() || null,
    location: input.location.trim() || null,
    period: input.period.trim() || null,
    scope: input.scope,
    description: input.description.trim() || null,
    specs: input.specs,
    src: input.src.trim() || null,
    gallery: input.gallery,
    is_published: input.is_published,
  };

  const { error } = input.id
    ? await supabase.from("portfolio").update(row).eq("id", input.id)
    : await supabase.from("portfolio").insert(row);

  if (error) return { error: error.message };
  revalidatePortfolioPages(slug);
  return { ok: true };
}

export async function deletePortfolioItem(id: number, slug: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("portfolio").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePortfolioPages(slug);
  return { ok: true };
}

/* ── Members (roles) — admin only (RLS enforces) ───────── */
export async function updateMemberRole(id: string, role: Role): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("profiles").update({ role }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/members");
  return { ok: true };
}
