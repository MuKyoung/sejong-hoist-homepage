"use client";

import { useState, useTransition } from "react";
import type { Profile, Role } from "@/lib/supabase/types";
import { updateMemberRole } from "../actions";
import s from "@/components/admin/admin.module.css";

export default function MemberRow({ member, isSelf }: { member: Profile; isSelf: boolean }) {
  const [role, setRole] = useState<Role>(member.role);
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function change(next: Role) {
    setRole(next);
    setMsg(null);
    startTransition(async () => {
      const res = await updateMemberRole(member.id, next);
      if (res.error) {
        setMsg("실패");
        setRole(member.role);
      } else {
        setMsg("변경됨");
      }
    });
  }

  return (
    <tr>
      <td className={s.cellStrong}>
        {member.full_name || "-"}
        {isSelf && <span className={s.cellMuted}> (본인)</span>}
      </td>
      <td className={s.cellMuted}>{member.email}</td>
      <td className={s.cellMuted}>{member.created_at?.slice(0, 10)}</td>
      <td>
        <div className={s.rowActions}>
          <select
            className={`${s.select} ${s.selectSm}`}
            value={role}
            disabled={pending || isSelf}
            onChange={(e) => change(e.target.value as Role)}
            title={isSelf ? "본인 권한은 변경할 수 없습니다" : undefined}
          >
            <option value="admin">관리자</option>
            <option value="editor">편집자</option>
          </select>
          {msg && <span className={s.cellMuted}>{msg}</span>}
        </div>
      </td>
    </tr>
  );
}
