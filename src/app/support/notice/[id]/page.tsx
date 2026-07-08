import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/subpage/PageHero";
import SubNav from "@/components/subpage/SubNav";
import ContactBand from "@/components/subpage/ContactBand";
import { NOTICES, NOTICE_CATEGORIES } from "@/data/site";
import s from "@/styles/subpage.module.css";

type Props = { params: Promise<{ id: string }> };

const DETAIL: Record<number, { desc: string }> = {
  4: {
    desc: "국내 최대급 겐트리 크랩 크레인 350TON의 제작·설치를 완료하고 한국승강기안전공단 안전인증(적합)을 취득했습니다. 350/50TON·250/50TON 그라브 크레인을 포함해 설치 크레인 전수가 안전인증에 합격했습니다.",
  },
  3: {
    desc: "LS ELECTRIC 부산사업장에 Double Girder 30TON 크레인 5대를 제작·설치했습니다. 같은 현장에 5TON 2대, 3TON 1대 크레인도 함께 납품했습니다.",
  },
  2: {
    desc: "위험 Zone 1·2 환경에 대응하는 방폭형 Single Girder 3TON 호이스트 라인업을 확대했습니다.",
  },
  1: {
    desc: "사이트 내 견적문의 페이지를 통해 24시간 온라인 문의 접수가 가능합니다. 영업일 기준 1일 이내 답변드립니다.",
  },
};

const SUPPORT_NAV = [
  { label: "고객지원", href: "/support" },
  { label: "공지사항", href: "/support/notice" },
  { label: "견적 문의", href: "/support/inquiry" },
];

export function generateStaticParams() {
  return NOTICES.map((n) => ({ id: String(n.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const notice = NOTICES.find((n) => n.id === Number(id));
  if (!notice) return { title: "공지사항" };
  return { title: `${notice.title} | 공지사항` };
}

function badgeClass(category: string) {
  const tone = NOTICE_CATEGORIES[category] ?? "muted";
  if (tone === "tint") return s.badgeTint;
  if (tone === "navy") return s.badgeNavy;
  return s.badgeMuted;
}

export default async function NoticeDetailPage({ params }: Props) {
  const { id } = await params;
  const notice = NOTICES.find((n) => n.id === Number(id));
  if (!notice) notFound();

  const detail = DETAIL[notice.id];

  return (
    <>
      <PageHero eyebrow="Notice" title={notice.title} desc={notice.date} />
      <SubNav items={SUPPORT_NAV} />

      <section className={`${s.section} ${s.sectionWhite}`}>
        <div className="container">
          <p className={s.breadcrumb}>
            <Link href="/support/notice">공지사항</Link>
            {" / "}
            {notice.title}
          </p>

          <article style={{ maxWidth: 720 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
              <span className={`${s.noticeBadge} ${badgeClass(notice.category)}`}>
                {notice.category}
              </span>
              {notice.important && (
                <span className={s.noticeImportant}>중요</span>
              )}
              <span className={s.noticeDate}>{notice.date}</span>
            </div>

            <p className={s.body}>{detail?.desc ?? notice.title}</p>

            <div style={{ marginTop: 40 }}>
              <Link href="/support/notice" className={s.ghostBtn}>
                목록으로
              </Link>
            </div>
          </article>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
