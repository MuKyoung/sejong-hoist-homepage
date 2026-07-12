import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/subpage/PageHero";
import SubNav from "@/components/subpage/SubNav";
import ContactBand from "@/components/subpage/ContactBand";
import { NOTICE_CATEGORIES } from "@/data/site";
import { getNotices } from "@/lib/cms";
import s from "@/styles/subpage.module.css";

export const metadata: Metadata = {
  title: "공지사항 | (주)세종호이스트크레인",
  description: "세종호이스트크레인 납품 실적, 제품 소식, 회사 안내.",
};

const SUPPORT_NAV = [
  { label: "고객지원", href: "/support" },
  { label: "공지사항", href: "/support/notice" },
  { label: "견적 문의", href: "/support/inquiry" },
];

function badgeClass(category: string) {
  const tone = NOTICE_CATEGORIES[category] ?? "muted";
  if (tone === "tint") return s.badgeTint;
  if (tone === "navy") return s.badgeNavy;
  return s.badgeMuted;
}

export const revalidate = 300;

export default async function NoticePage() {
  const notices = await getNotices();
  return (
    <>
      <PageHero
        eyebrow="Notice"
        title="공지사항"
        desc="납품 실적과 제품·회사 소식을 전달합니다."
      />
      <SubNav items={SUPPORT_NAV} />

      <section className={`${s.section} ${s.sectionWhite}`}>
        <div className="container">
          <div className={s.noticeWrap}>
            <div className={s.noticeHead}>
              <span>번호</span>
              <span>분류</span>
              <span>제목</span>
              <span>날짜</span>
            </div>

            {notices.map((notice) => (
              <Link
                key={notice.id}
                href={`/support/notice/${notice.id}`}
                className={s.noticeRow}
              >
                <span className={s.noticeId}>{notice.id}</span>
                <span className={`${s.noticeBadge} ${s.noticeBadgeDesktop} ${badgeClass(notice.category)}`}>
                  {notice.category}
                </span>
                <div className={s.noticeTitleWrap}>
                  {notice.important && (
                    <span className={s.noticeImportant}>중요</span>
                  )}
                  <span className={s.noticeTitle}>{notice.title}</span>
                  <span className={`${s.noticeBadge} ${s.noticeBadgeMobile} ${badgeClass(notice.category)}`}>
                    {notice.category}
                  </span>
                </div>
                <span className={s.noticeDate}>{notice.date}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
