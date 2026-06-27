import Link from "next/link";
import s from "./InquiryBannerSection.module.css";

export default function InquiryBannerSection() {
  return (
    <section className={s.section} aria-label="견적 문의">
      <div className="container">
        <div className={s.card}>
          <div>
            <p className={s.eyebrow}>Contact</p>
            <h2 className={s.headline}>
              (주)세종호이스트크레인과
              <br />
              함께 프로젝트를 시작하세요.
            </h2>
            <div className={s.badge}>
              <span className={s.badgeDot} aria-hidden />
              견적 접수 중
            </div>
          </div>
          <Link href="/support/inquiry" className={s.link}>
            견적 문의하기
          </Link>
        </div>
      </div>
    </section>
  );
}
