import type { Metadata } from "next";
import PageHero from "@/components/subpage/PageHero";
import { COMPANY } from "@/data/site";
import s from "@/styles/subpage.module.css";

export const metadata: Metadata = {
  title: "이용약관 | (주)세종호이스트크레인",
  description: "(주)세종호이스트크레인 웹사이트 이용약관",
};

const SECTIONS = [
  {
    title: "제1조 (목적)",
    body: "본 약관은 (주)세종호이스트크레인(이하 \"회사\")이 운영하는 웹사이트의 이용 조건과 절차를 규정함을 목적으로 합니다.",
  },
  {
    title: "제2조 (제공 서비스)",
    body: "회사는 웹사이트를 통해 회사 및 제품 소개, 시공사례, 기술·인증 정보 제공, 온라인 견적·문의 접수 서비스를 제공합니다.",
  },
  {
    title: "제3조 (저작권)",
    body: "웹사이트에 게시된 사진, 도면, 인증서, 문서 등 모든 콘텐츠의 저작권은 회사에 있으며, 사전 동의 없는 무단 복제·배포를 금합니다.",
  },
  {
    title: "제4조 (책임의 한계)",
    body: "웹사이트에 게시된 제품 사양과 시공 정보는 참고용이며, 실제 계약 조건은 개별 견적과 계약서에 따릅니다.",
  },
  {
    title: "제5조 (문의)",
    body: `약관에 대한 문의는 TEL ${"044-865-0801"} 또는 E-mail sj@sjhoist.com 으로 연락해 주시기 바랍니다.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms of Use"
        title="이용약관"
        desc={`${COMPANY.name} 웹사이트 이용에 관한 약관입니다.`}
      />

      <section className={`${s.section} ${s.sectionWhite}`}>
        <div className="container">
          <article className={s.legalWrap}>
            {SECTIONS.map((sec) => (
              <div key={sec.title} className={s.legalBlock}>
                <h2 className={s.legalTitle}>{sec.title}</h2>
                <p className={s.body}>{sec.body}</p>
              </div>
            ))}
            <p className={s.legalDate}>시행일: 2026년 7월 1일</p>
          </article>
        </div>
      </section>
    </>
  );
}
