import Link from "next/link";
import Image from "next/image";
import s from "./TeamSection.module.css";

export default function TeamSection() {
  return (
    <section className={s.section} aria-label="Team Sejong">
      <div className="container">
        <div className={s.grid}>
          <div>
            <p className={s.eyebrow}>Team Sejong</p>
            <h2 className={s.headline}>
              모든 고민은 현장 안전과
              <br />
              품질에 대한 책임에서 시작합니다.
            </h2>
            <p className={s.body}>
              우리는 운반하역 현장에서 고객이 겪는 문제를 해결하기 위해 모여 있습니다.
              하나의 목표를 공유하며 함께 도전하고 성장합니다.
              믿을 수 있는 기술력과 빠른 A/S로 언제나 한 발 먼저 나아갑니다.
            </p>
            <Link href="/about" className={s.ghostBtn}>
              자세히 보기
            </Link>
          </div>

          <div className={s.visual}>
            <Image
              src="/images/sejong_1.png"
              alt="세종호이스트크레인 시공 현장"
              fill
              className={s.image}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
