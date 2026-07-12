"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Role } from "@/lib/supabase/types";
import { signOut } from "@/app/admin/(protected)/actions";
import s from "./admin.module.css";

type NavItem = { label: string; href: string; adminOnly?: boolean };

const NAV: NavItem[] = [
  { label: "대시보드", href: "/admin" },
  { label: "문의 관리", href: "/admin/inquiries" },
  { label: "게시물 관리", href: "/admin/posts" },
  { label: "시공사례 관리", href: "/admin/portfolio" },
  { label: "회원 관리", href: "/admin/members", adminOnly: true },
];

const TITLES: Record<string, string> = {
  "/admin": "대시보드",
  "/admin/inquiries": "문의 관리",
  "/admin/posts": "게시물 관리",
  "/admin/portfolio": "시공사례 관리",
  "/admin/members": "회원 관리",
};

export default function AdminShell({
  role,
  name,
  children,
}: {
  role: Role;
  name: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "/admin";
  const items = NAV.filter((n) => !n.adminOnly || role === "admin");
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
  const title = TITLES[pathname] ?? "대시보드";

  return (
    <div className={s.shell}>
      <aside className={s.sidebar}>
        <div className={s.brand}>
          <span className={s.brandMark}>SJ</span>
          Sejong CMS
        </div>
        <nav className={s.navGroup} aria-label="관리자 메뉴">
          <span className={s.navLabel}>관리</span>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${s.navLink} ${isActive(item.href) ? s.navLinkActive : ""}`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={s.sidebarFoot}>
          <Link href="/" className={s.navLink} target="_blank">
            사이트 보기 ↗
          </Link>
          <form action={signOut}>
            <button type="submit" className={s.navLink} style={{ width: "100%", textAlign: "left", background: "none", border: "none" }}>
              로그아웃
            </button>
          </form>
        </div>
      </aside>

      <div className={s.main}>
        <header className={s.topbar}>
          <span className={s.topTitle}>{title}</span>
          <span className={s.topUser}>
            <span className={s.topUserName}>{name}</span>
            <span className={`${s.badge} ${s.badgeRole}`}>
              {role === "admin" ? "관리자" : "편집자"}
            </span>
          </span>
        </header>

        <nav className={s.mobileNav} aria-label="관리자 메뉴 (모바일)">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${s.mobileNavLink} ${isActive(item.href) ? s.mobileNavLinkActive : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <main className={s.content}>{children}</main>
      </div>
    </div>
  );
}
