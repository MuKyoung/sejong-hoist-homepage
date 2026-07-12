/**
 * CMS 데이터 레이어 — Supabase가 설정되어 있으면 DB(공개 행)를 읽고,
 * 아니면 site.ts의 정적 데이터로 폴백한다. 공개 페이지는 이 모듈만 사용.
 * (revalidate 주기 + 관리자 저장 시 revalidatePath로 자동 반영)
 */
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createPublicClient } from "@/lib/supabase/public";
import { NOTICES, PORTFOLIO } from "@/data/site";

export type CmsNotice = {
  id: number;
  date: string; // "YYYY.MM.DD"
  category: string;
  title: string;
  important: boolean;
  body?: string | null;
};

export type CmsPortfolioItem = {
  slug: string;
  src: string;
  gallery: string[];
  title: string;
  client: string;
  category: string;
  industry: string;
  capacity: string;
  capacityBucket: string;
  year: string;
  location: string;
  period: string;
  scope: string[];
  description: string;
  specs: { label: string; value: string }[];
};

const toDot = (iso: string) => {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())}`;
};

const STATIC_NOTICES: CmsNotice[] = NOTICES.map((n) => ({
  id: n.id,
  date: n.date,
  category: n.category,
  title: n.title,
  important: n.important,
}));

export async function getNotices(): Promise<CmsNotice[]> {
  if (!isSupabaseConfigured) return STATIC_NOTICES;
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("notices")
      .select("id, category, title, body, is_important, published_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false });
    if (error || !data || data.length === 0) return STATIC_NOTICES;
    return data.map((row) => ({
      id: row.id,
      date: toDot(row.published_at),
      category: row.category,
      title: row.title,
      important: row.is_important,
      body: row.body,
    }));
  } catch {
    return STATIC_NOTICES;
  }
}

export async function getNoticeById(id: number): Promise<CmsNotice | undefined> {
  const notices = await getNotices();
  return notices.find((n) => n.id === id);
}

export async function getPortfolioList(): Promise<CmsPortfolioItem[]> {
  if (!isSupabaseConfigured) return PORTFOLIO;
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("portfolio")
      .select(
        "slug, src, gallery, title, client, category, industry, capacity, capacity_bucket, year, location, period, scope, description, specs",
      )
      .eq("is_published", true)
      .order("created_at", { ascending: false });
    if (error || !data || data.length === 0) return PORTFOLIO;
    return data.map((row) => ({
      slug: row.slug,
      src: row.src ?? "/images/pf-gantry350.jpg",
      gallery: row.gallery ?? [],
      title: row.title,
      client: row.client ?? "",
      category: row.category ?? "",
      industry: row.industry ?? "",
      capacity: row.capacity ?? "",
      capacityBucket: row.capacity_bucket ?? "",
      year: row.year ?? "",
      location: row.location ?? "",
      period: row.period ?? "",
      scope: row.scope ?? [],
      description: row.description ?? "",
      specs: (row.specs as { label: string; value: string }[]) ?? [],
    }));
  } catch {
    return PORTFOLIO;
  }
}

export async function getPortfolioItem(slug: string): Promise<CmsPortfolioItem | undefined> {
  const items = await getPortfolioList();
  return items.find((item) => item.slug === slug);
}
