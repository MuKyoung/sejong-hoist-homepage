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
  revalidatePath("/admin/posts");
  revalidatePath("/admin");
  return { ok: true };
}

export async function deleteNotice(id: number): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("notices").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/posts");
  revalidatePath("/admin");
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
