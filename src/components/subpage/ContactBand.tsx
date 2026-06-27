import Link from "next/link";
import { COMPANY } from "@/data/site";
import s from "./ContactBand.module.css";

export default function ContactBand() {
  return (
    <section className={s.section} aria-label="연락처">
      <div className="container">
        <div className={s.card}>
          <div>
            <p className={s.eyebrow}>Contact</p>
            <h2 className={s.headline}>프로젝트 상담이 필요하신가요?</h2>
            <p className={s.desc}>
              견적·기술 문의는 온라인 접수 또는 전화로 연락 주시면
              영업일 기준 신속히 답변드립니다.
            </p>
          </div>
          <div className={s.actions}>
            <a href={`tel:${COMPANY.tel.replace(/-/g, "")}`} className={s.phone}>
              {COMPANY.tel}
            </a>
            <Link href="/support/inquiry" className={s.btn}>
              견적 문의하기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
