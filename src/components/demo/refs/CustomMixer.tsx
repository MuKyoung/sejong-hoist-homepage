"use client";

/* 커스텀 믹서 — 섹션(영역)마다 3개 레퍼런스 스타일 중 하나를 골라 조합.
 * 선택은 localStorage에 저장되어 재방문 시 유지. 클라이언트 시연용. */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AREAS, AREA_LABEL, REGISTRY, type Area } from "./registry";
import { STYLE_META, type RefStyle } from "./data";
import RefSwitch from "./RefSwitch";

const STORAGE_KEY = "sejong-demo-custom-mix-v1";
const STYLES: RefStyle[] = ["mju", "ys", "shi"];
const STYLE_SHORT: Record<RefStyle, string> = { mju: "MJU", ys: "연세", shi: "삼성重" };
const STYLE_COLOR: Record<RefStyle, string> = { mju: "#16386F", ys: "#0E4A84", shi: "#101820" };

type Mix = Record<Area, RefStyle>;
const DEFAULT_MIX: Mix = {
  header: "shi", hero: "ys", about: "mju", business: "shi", projects: "ys", news: "mju",
};

export default function CustomMixer() {
  const [mix, setMix] = useState<Mix>(DEFAULT_MIX);
  const [open, setOpen] = useState(true);
  const [loaded, setLoaded] = useState(false);

  /* localStorage는 클라이언트 전용 — SSR 기본값으로 렌더 후 저장값을 1회 복원
     (하이드레이션 안전을 위한 표준 패턴이라 set-state-in-effect 예외 처리) */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<Mix>;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMix((m) => ({ ...m, ...saved }));
      }
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoaded(true);
  }, []);

  const update = (area: Area, style: RefStyle) => {
    setMix((m) => {
      const next = { ...m, [area]: style };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const applyAll = (style: RefStyle) => {
    const next = Object.fromEntries(AREAS.map((a) => [a, style])) as Mix;
    setMix(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  return (
    <>
      {/* 조합된 페이지 — 스타일 변경 시 해당 섹션만 리마운트되어 등장 연출 재생 */}
      {AREAS.map((area) => {
        const Comp = REGISTRY[area][mix[area]];
        return (
          <div key={area} className="relative">
            <Comp key={`${area}-${mix[area]}`} />
            {/* 패널이 열려 있을 때 섹션 코너에 현재 스타일 칩 표시 */}
            {open && loaded && area !== "header" && (
              <span className="absolute top-3 left-3 z-30 px-2.5 py-1 rounded-full text-[10.5px] font-bold text-white/90 pointer-events-none"
                style={{ background: "rgba(13,23,38,0.75)", backdropFilter: "blur(4px)" }}>
                {AREA_LABEL[area]} · {STYLE_SHORT[mix[area]]}
              </span>
            )}
          </div>
        );
      })}

      {/* ── 우측 컨트롤 dock ── */}
      <div className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-[80] flex items-start gap-2">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-2 w-11 h-11 rounded-full flex items-center justify-center text-white text-[17px] shadow-xl transition-transform hover:scale-105"
          style={{ background: "#16273C" }}
          aria-label={open ? "스타일 패널 닫기" : "스타일 패널 열기"}
        >
          {open ? "×" : "✎"}
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, x: 24, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 24, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-[288px] rounded-2xl overflow-hidden shadow-2xl"
              style={{ background: "rgba(13,23,38,0.96)", backdropFilter: "blur(12px)" }}
            >
              <div className="px-5 pt-5 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <p className="text-[14px] font-extrabold text-white">스타일 커스텀</p>
                <p className="mt-1 text-[11.5px] leading-[1.6] text-white/50">
                  섹션마다 마음에 드는 레퍼런스 스타일을 선택하세요. 선택은 자동 저장됩니다.
                </p>
              </div>

              <div className="px-5 py-4 flex flex-col gap-3.5 max-h-[46vh] overflow-y-auto">
                {AREAS.map((area) => (
                  <div key={area} className="flex items-center justify-between gap-3">
                    <span className="text-[12.5px] font-bold text-white/85 whitespace-nowrap">{AREA_LABEL[area]}</span>
                    <div className="flex rounded-full p-0.5" style={{ background: "rgba(255,255,255,0.1)" }}>
                      {STYLES.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => update(area, s)}
                          aria-pressed={mix[area] === s}
                          className="h-7 px-2.5 rounded-full text-[11px] font-bold transition-all"
                          style={mix[area] === s
                            ? { background: "#fff", color: STYLE_COLOR[s] }
                            : { color: "rgba(255,255,255,0.55)" }}
                        >
                          {STYLE_SHORT[s]}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-5 py-4 flex flex-col gap-2" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <p className="text-[11px] font-bold tracking-wide text-white/40 uppercase">시안 전체 적용</p>
                <div className="flex gap-1.5">
                  {STYLES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => applyAll(s)}
                      className="flex-1 h-9 rounded-lg text-[11.5px] font-bold text-white/85 hover:text-white transition-colors"
                      style={{ background: STYLE_COLOR[s] }}
                    >
                      {STYLE_SHORT[s]}
                    </button>
                  ))}
                </div>
                <p className="mt-1 text-[10.5px] leading-[1.6] text-white/35">
                  {STYLES.map((s) => `${STYLE_SHORT[s]} = ${STYLE_META[s].ref}`).join(" · ")}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <RefSwitch current="custom" />
    </>
  );
}
