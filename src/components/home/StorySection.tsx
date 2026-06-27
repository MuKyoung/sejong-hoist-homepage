import Link from "next/link";
import s from "./StorySection.module.css";

const PILLS = [
  "Wire Hoist",
  "Chain Hoist",
  "Crane",
  "Explosion-Proof",
  "Hoist & Crane",
  "천장크레인",
  "갠트리크레인",
  "그라브크레인",
];

export default function StorySection() {
  const doubled = [...PILLS, ...PILLS];

  return (
    <section className={s.section} aria-label="Our Story">
      <div className="container">
        <div className={s.grid}>
          <div>
            <p className={s.eyebrow}>Our Story</p>
            <p className={s.sectionLabel}>Our Story</p>
            <h2 className={s.headline}>
              현장의 모든 순간, 하중과 안전을
              <br />
              설계와 제작으로 풀어내고자 합니다.
            </h2>

            <div className={s.productBlock}>
              <p className={s.productBadge}>NO.1 운반하역기계 전문 제조</p>
              <p className={s.productName}>Wire Hoist</p>

              <div className={s.pillTrack}>
                <div className={s.pillRow}>
                  {doubled.map((pill, i) => (
                    <span
                      key={`${pill}-${i}`}
                      className={`${s.pill} ${i === 0 ? s.pillActive : ""}`}
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              <Link href="/business" className={s.ghostBtn}>
                제품 보기
              </Link>
            </div>
          </div>

          <div className={s.visual}>
            <video
              autoPlay
              muted
              loop
              playsInline
              className={s.video}
            >
              <source src="/videos/4763-179741146_medium.mp4" type="video/mp4" />
            </video>
            <div className={s.visualOverlay} />
          </div>
        </div>
      </div>
    </section>
  );
}
