import s from "./PageHero.module.css";

type Props = {
  eyebrow: string;
  title: string;
  desc?: string;
};

export default function PageHero({ eyebrow, title, desc }: Props) {
  return (
    <header className={s.pageHero}>
      <div className="container">
        <p className={s.eyebrow}>{eyebrow}</p>
        <h1 className={s.title}>{title}</h1>
        {desc && <p className={s.desc}>{desc}</p>}
      </div>
    </header>
  );
}
