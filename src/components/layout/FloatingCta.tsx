import Link from "next/link";
import s from "./FloatingCta.module.css";

export default function FloatingCta() {
  return (
    <Link href="/support/inquiry" className={s.fab}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      견적 문의
    </Link>
  );
}
