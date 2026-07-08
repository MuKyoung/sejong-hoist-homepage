import type { Metadata } from "next";
import PageHero from "@/components/subpage/PageHero";
import { COMPANY } from "@/data/site";
import s from "@/styles/subpage.module.css";

export const metadata: Metadata = {
  title: "개인정보처리방침 | (주)세종호이스트크레인",
  description: "(주)세종호이스트크레인 개인정보처리방침",
};

const SECTIONS = [
  {
    title: "1. 수집하는 개인정보 항목",
    body: "회사는 견적·문의 접수를 위해 성함, 회사명(선택), 연락처, 이메일을 수집합니다. 서비스 이용 과정에서 접속 기록 등이 자동으로 생성·수집될 수 있습니다.",
  },
  {
    title: "2. 개인정보의 수집·이용 목적",
    body: "수집한 개인정보는 견적·기술 문의에 대한 상담과 답변, 납품·시공 관련 연락 목적으로만 이용합니다.",
  },
  {
    title: "3. 보유 및 이용 기간",
    body: "문의 처리 완료 후 지체 없이 파기합니다. 다만 관계 법령에 따라 보존할 필요가 있는 경우 해당 기간 동안 보관합니다.",
  },
  {
    title: "4. 제3자 제공 및 처리 위탁",
    body: "회사는 이용자의 개인정보를 외부에 제공하거나 처리 위탁하지 않습니다. 법령에 근거한 요청이 있는 경우는 예외로 합니다.",
  },
  {
    title: "5. 이용자의 권리",
    body: "이용자는 언제든지 본인의 개인정보에 대한 열람·정정·삭제를 요청할 수 있습니다. 아래 연락처로 요청해 주시면 지체 없이 조치합니다.",
  },
  {
    title: "6. 개인정보 보호책임자",
    body: `(주)세종호이스트크레인 | TEL ${"044-865-0801"} | E-mail sj@sjhoist.com`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy Policy"
        title="개인정보처리방침"
        desc={`${COMPANY.name}는 이용자의 개인정보를 소중히 다룹니다.`}
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
