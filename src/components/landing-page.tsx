import { useEffect, useRef, useState, type PointerEvent } from "react";

import {
  Check,
  X,
  Zap,
  Clock,
  TrendingUp,
  Leaf,
  ShieldCheck,
  Star,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import landing from "@/content/landing.json";
import heroBars from "@/assets/hero-bars.jpg";
import ebooks from "@/assets/ebooks-mockup.jpg";
import logoIsotipo from "@/assets/logo-isotipo.webp";
import logoWordmark from "@/assets/logo-wordmark.webp";
import bar1 from "@/assets/bar-1.jpg";
import bar2 from "@/assets/bar-2.jpg";
import bar3 from "@/assets/bar-3.jpg";
import bar4 from "@/assets/bar-4.jpg";
import bar5 from "@/assets/bar-5.jpg";
import bar6 from "@/assets/bar-6.jpg";
import garantia7 from "@/assets/garantia-7dias.png";
import bonus1 from "@/assets/bonus-1.webp";
import bonus2 from "@/assets/bonus-2.webp";
import bonus3 from "@/assets/bonus-3.webp";
import bonus4 from "@/assets/bonus-4.webp";
import bonus5 from "@/assets/bonus-5.webp";
import bonus6 from "@/assets/bonus-6.webp";
import certificateImg from "@/assets/certificate.png";
import packMockup from "@/assets/pack-mockup.png";
import testimonio1 from "@/assets/testimonios/t-231526.678.jpg";
import testimonio2 from "@/assets/testimonios/t-231642.153.jpg";
import testimonio3 from "@/assets/testimonios/t-231801.217.jpg";
import testimonio4 from "@/assets/testimonios/t-231859.647.jpg";
import testimonio5 from "@/assets/testimonios/t-232056.895.jpg";
import recipe1 from "@/assets/recipes/recipe-182126.394.webp";
import recipe2 from "@/assets/recipes/recipe-182308.416.webp";
import recipe3 from "@/assets/recipes/recipe-182544.478.webp";
import recipe4 from "@/assets/recipes/recipe-182638.802.webp";
import recipe5 from "@/assets/recipes/recipe-182731.664.webp";
import recipe6 from "@/assets/recipes/recipe-182814.543.webp";
import recipe7 from "@/assets/recipes/recipe-184413.585.webp";
import recipe8 from "@/assets/recipes/recipe-184507.634.webp";
import recipe9 from "@/assets/recipes/recipe-184551.446.webp";
import recipe10 from "@/assets/recipes/recipe-184631.748.webp";
import recipe11 from "@/assets/recipes/recipe-184719.313.webp";
import recipe12 from "@/assets/recipes/recipe-184828.040.webp";
import recipe13 from "@/assets/recipes/recipe-184923.867.webp";
import avatar1 from "@/assets/avatars/avatar-1.jpg";
import avatar2 from "@/assets/avatars/avatar-2.jpg";
import avatar3 from "@/assets/avatars/avatar-3.jpg";
import avatar4 from "@/assets/avatars/avatar-4.jpg";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

function AnimatedProgress({ target, label }: { target: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1600;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(Math.round(eased * target));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="mt-6">
      <div className="mb-1 flex justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span className="font-bold text-primary">{value}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-100 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

const heroAvatars = [avatar1, avatar2, avatar3, avatar4];
const testimonioImgs = [testimonio1, testimonio2, testimonio3, testimonio4, testimonio5];

const recipeMockups = [
  recipe1,
  recipe2,
  recipe3,
  recipe4,
  recipe5,
  recipe6,
  recipe7,
  recipe8,
  recipe9,
  recipe10,
  recipe11,
  recipe12,
  recipe13,
];

const images = {
  heroBars,
  ebooks,
  bar1,
  bar2,
  bar3,
  bar4,
  bar5,
  bar6,
  bonus1,
  bonus2,
  bonus3,
  bonus4,
  bonus5,
  bonus6,
} as const;

type ImageKey = keyof typeof images;

function img(key: string): string {
  const k = key as ImageKey;
  if (k in images) return images[k];
  return heroBars;
}

const benefitIcons = {
  clock: Clock,
  trendingUp: TrendingUp,
  leaf: Leaf,
} as const;



function HeroPrimaryCta({ href, label }: { href: string; label: string }) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [shift, setShift] = useState({ x: 0, y: 0 });
  const [over, setOver] = useState(false);

  function updateFromPoint(clientX: number, clientY: number) {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = Math.max(-1, Math.min(1, (clientX - (r.left + r.width / 2)) / (r.width / 2)));
    const ny = Math.max(-1, Math.min(1, (clientY - (r.top + r.height / 2)) / (r.height / 2)));
    setTilt({ rx: -ny * 6, ry: nx * 7 });
    setShift({ x: nx * 4, y: ny * 3 });
  }

  function resetTilt() {
    setTilt({ rx: 0, ry: 0 });
    setShift({ x: 0, y: 0 });
  }

  function onPointerMove(e: PointerEvent<HTMLSpanElement>) {
    if (!wrapRef.current) return;
    updateFromPoint(e.clientX, e.clientY);
  }

  function onPointerEnter() {
    setOver(true);
  }

  function onPointerDown(e: PointerEvent<HTMLSpanElement>) {
    setOver(true);
    updateFromPoint(e.clientX, e.clientY);
  }

  function onPointerLeave() {
    setOver(false);
    resetTilt();
  }

  const lift = over ? -3 : 0;
  const hoverScale = over ? 1.03 : 1;
  const ctaTransform = `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translate3d(${shift.x}px, ${shift.y + lift}px, 0) scale(${hoverScale})`;
  const labelTransform = `translate3d(${shift.x * 0.25}px, ${shift.y * 0.25}px, 8px)`;

  return (
    <span
      ref={wrapRef}
      className="group/cta relative inline-flex touch-manipulation"
      style={{ perspective: "720px" }}
      onPointerEnter={onPointerEnter}
      onPointerDown={onPointerDown}
      onPointerLeave={onPointerLeave}
      onPointerMove={onPointerMove}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute -inset-10 rounded-[2.75rem] blur-3xl transition-[opacity,background-color] duration-500 ${
          over ? "bg-accent/55 opacity-[0.72]" : "bg-primary/40 opacity-[0.5]"
        }`}
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute -inset-px rounded-full blur-md transition-colors duration-300 ${
          over ? "bg-accent/30 opacity-90" : "bg-white/25 opacity-70"
        }`}
      />
      <a
        href={href}
        className={`relative z-10 inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-[1.1rem] font-bold tracking-tight shadow-[0_10px_36px_-12px_oklch(0.32_0.06_50_/_0.4),var(--shadow-glow)] transition-[transform,box-shadow,background-color,border-color,color] duration-300 ease-out [transform-style:preserve-3d] will-change-transform active:scale-[0.98] motion-safe:animate-[hero-cta-bob_2.8s_ease-in-out_infinite] motion-reduce:animate-none sm:px-9 sm:py-5 ${
          over
            ? "border-accent/45 text-secondary shadow-[0_18px_44px_-12px_oklch(0.78_0.16_75_/_0.55)]"
            : "border-white/30 text-primary-foreground"
        }`}
        style={{
          background: over ? "var(--gradient-cta-accent)" : "var(--gradient-cta)",
          transform: ctaTransform,
        }}
      >
        <span className="relative flex items-center justify-center">
          <span
            aria-hidden
            className={`pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/[0.22] via-transparent to-primary-foreground/5 backdrop-blur-[4px] transition-opacity duration-300 ${over ? "opacity-75" : "opacity-100"}`}
          />
          <span
            className="relative z-10 flex items-center gap-3 font-display text-lg leading-none transition-[transform,color] duration-200 ease-out will-change-transform sm:text-xl"
            style={{ transform: labelTransform }}
          >
            {label}
            <ArrowRight
              className={`h-5 w-5 shrink-0 transition duration-300 sm:h-6 sm:w-6 ${over ? "translate-x-1.5 text-secondary" : ""}`}
            />
          </span>
        </span>
      </a>
    </span>
  );
}

export function LandingPage() {
  const priceHash = `#${landing.price.sectionId}`;
  const barCategories = landing.recetario.categories.map((cat) => ({
    title: cat.title,
    img: img(cat.image),
    items: cat.items,
  }));
  const bonuses = landing.bonusesSection.items.map((b) => ({
    n: b.n,
    title: b.title,
    desc: b.desc,
    value: b.value,
    img: img(b.image),
  }));
  const galleryImages = landing.gallery.imageKeys.map((k) => img(k));

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      "section, footer, [data-reveal]",
    );
    if (!targets.length) return;
    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("reveal-in"));
      return;
    }
    targets.forEach((el) => el.classList.add("reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="bg-secondary text-secondary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-1 px-4 sm:px-12 lg:px-16 py-2.5 text-center text-[11px] leading-snug font-medium sm:text-sm">
          <p className="flex items-center justify-center gap-1.5 flex-wrap text-balance">
            <Zap className="h-3.5 w-3.5 shrink-0 fill-citrus text-citrus" />
            <span>
              {landing.promoBar.beforeHighlight}
              <span className="text-citrus font-bold">{landing.promoBar.highlight}</span>
            </span>
          </p>
          <div className="font-bold tracking-wider text-citrus text-[10px] sm:text-sm">{landing.promoBar.secondLine}</div>
        </div>
      </div>

      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-12 lg:px-16 py-3 sm:py-4">
          <a href="#" className="flex items-center gap-2 sm:gap-3">
            <img
              src={logoIsotipo}
              alt={landing.brand.logoAlt}
              className="h-8 w-8 sm:h-11 sm:w-11 object-contain"
            />
            <span className="font-display text-[11px] sm:text-lg font-bold leading-tight tracking-tight text-secondary">
              {landing.brand.nameLine1}
              <br className="sm:hidden" />{" "}
              <span className="text-accent">{landing.brand.nameLine2}</span>
            </span>
          </a>
          <a
            href={priceHash}
            className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-foreground px-3 py-2 sm:px-5 sm:py-2.5 text-[11px] sm:text-sm font-semibold text-background transition hover:bg-primary whitespace-nowrap"
          >
            {landing.nav.buyNow}{" "}
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition group-hover:translate-x-0.5" />
          </a>
        </div>
      </header>

      <section className="relative">
        <div
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 0%, oklch(0.92 0.08 100) 0%, transparent 70%)",
          }}
        />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-8 sm:px-12 lg:px-16 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" /> {landing.hero.badge}
            </span>
            <h1 className="mt-5 font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {landing.hero.titleBefore}
              <span className="relative inline-block text-primary">
                {landing.hero.titleHighlight}
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path
                    d="M2 9C50 2 150 2 198 9"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              {landing.hero.titleMiddle}
              <em className="not-italic text-secondary">{landing.hero.titleEmphasis}</em>
              {landing.hero.titleAfter}
            </h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              {landing.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col items-start gap-4">
              <HeroPrimaryCta href={priceHash} label={landing.hero.ctaPrimary} />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {heroAvatars.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      width={32}
                      height={32}
                      loading="lazy"
                      className="h-7 w-7 rounded-full border-2 border-background object-cover"
                    />
                  ))}
                </div>
                <span>
                  <strong className="text-foreground">{landing.hero.socialProofBold}</strong>{" "}
                  {landing.hero.socialProofRest}
                </span>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" /> {landing.hero.trust1}
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-primary" /> {landing.hero.trust2}
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-primary" /> {landing.hero.trust3}
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-primary/30 via-accent/30 to-citrus/30 blur-3xl" />
            <img
              src={heroBars}
              alt={landing.hero.imageAlt}
              width={1280}
              height={1280}
              className="relative aspect-square w-full rounded-[2rem] object-cover shadow-[var(--shadow-soft)]"
            />
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-card p-4 shadow-[var(--shadow-soft)] ring-1 ring-border sm:block animate-float">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                {landing.hero.priceCardBeforeLabel}
              </div>
              <div className="font-display text-lg font-bold line-through text-muted-foreground">
                {landing.hero.priceCardBeforeAmount}
              </div>
              <div className="text-xs uppercase tracking-wider text-primary mt-1">
                {landing.hero.priceCardTodayLabel}
              </div>
              <div className="font-display text-2xl font-black text-primary">
                {landing.hero.priceCardTodayAmount}
              </div>
            </div>
            <div className="absolute -top-4 -right-4 rotate-6 rounded-2xl bg-citrus px-8 sm:px-12 lg:px-16 py-2 text-secondary font-display font-black shadow-lg animate-pulse-slow">
              {landing.hero.floatingBadge}
            </div>
          </div>
        </div>
      </section>

      <div className="border-y border-border bg-secondary py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-secondary-foreground/90 font-display text-lg">
          {[...Array(2)].flatMap((_, i) =>
            landing.marquee.items.map((t, j) => (
              <span key={`${i}-${j}`} className="flex items-center gap-12">
                <span>✦ {t}</span>
              </span>
            )),
          )}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-16 py-20">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {landing.comparison.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-5xl">
            {landing.comparison.headlineLine1}
            <br />
            {landing.comparison.headlineLine2Before}
            <span className="text-primary">{landing.comparison.headlineAccent}</span>
            {landing.comparison.headlineLine2After}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-muted p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-destructive/10 px-3 py-1 text-xs font-bold uppercase text-destructive">
              <X className="h-3.5 w-3.5" /> {landing.comparison.badTitle}
            </div>
            <ul className="mt-6 space-y-4 text-muted-foreground">
              {landing.comparison.badItems.map((t) => (
                <li key={t} className="flex gap-3">
                  <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative rounded-3xl border-2 border-primary bg-card p-8 shadow-[var(--shadow-glow)]">
            <div className="absolute -top-3 right-6 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase text-primary-foreground">
              {landing.comparison.goodPill}
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase text-primary">
              <Check className="h-3.5 w-3.5" /> {landing.comparison.goodTitle}
            </div>
            <ul className="mt-6 space-y-4">
              {landing.comparison.goodItems.map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-cream to-background py-20">
        <div className="mx-auto max-w-6xl px-8 sm:px-12 lg:px-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              {landing.recetario.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-5xl">
              {landing.recetario.title}
            </h2>
            <p className="mt-4 text-muted-foreground">{landing.recetario.subtitle}</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {barCategories.map((cat) => (
              <article
                key={cat.title}
                className="group overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)] ring-1 ring-border transition hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    loading="lazy"
                    width={768}
                    height={576}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold">{cat.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {cat.items.map((i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 -mx-8 sm:-mx-12 lg:-mx-20 relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused]">
              {[...recipeMockups, ...recipeMockups].map((src, i) => (
                <div
                  key={i}
                  className="w-48 sm:w-60 md:w-72 flex-shrink-0 aspect-square overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-soft)] ring-1 ring-border"
                >
                  <img
                    src={src}
                    alt={`${landing.recetario.recipeMockupAltPrefix} ${(i % recipeMockups.length) + 1}`}
                    loading="lazy"
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <HeroPrimaryCta href={priceHash} label={landing.recetario.cta} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-16 py-20">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="relative order-2 lg:order-1">
            <img
              src={ebooks}
              alt={landing.brownies.imageAlt}
              loading="lazy"
              width={1024}
              height={1024}
              className="rounded-3xl shadow-[var(--shadow-soft)]"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase text-secondary-foreground">
              {landing.brownies.badge}
            </span>
            <h2 className="mt-4 font-display text-3xl font-black sm:text-5xl">
              {landing.brownies.titleBefore}
              <span className="text-primary">{landing.brownies.titleAccent}</span>
            </h2>
            <p className="mt-4 text-muted-foreground">{landing.brownies.description}</p>
            <ul className="mt-6 space-y-3">
              {landing.brownies.bullets.map((t) => (
                <li key={t} className="flex gap-3 text-sm">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        className="relative py-20 overflow-hidden"
        style={{ background: "var(--gradient-warm)" }}
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-citrus px-4 py-1.5 text-sm font-black uppercase text-secondary sm:text-base">
              {landing.bonusesSection.badge}
            </span>
            <h2 className="mt-4 font-display text-4xl font-black sm:text-6xl">
              {landing.bonusesSection.title}
            </h2>
            <p className="mt-5 text-lg text-muted-foreground sm:text-xl">
              {landing.bonusesSection.introBefore}
              <strong className="text-foreground">{landing.bonusesSection.introStrong}</strong>
              {" valuados en "}
              <span className="font-bold text-destructive">$49 USD</span>
              {"."}
            </p>
            <p className="mt-2 text-lg text-muted-foreground sm:text-xl">
              Tuyos hoy sin costo extra.{" "}
              <span className="font-bold text-primary">
                Acceso inmediato a todo, ¡así de simple!
              </span>
            </p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {bonuses.map((b) => (
              <div
                key={b.n}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={b.img}
                    alt={b.title}
                    loading="lazy"
                    width={600}
                    height={600}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary font-display text-xl font-black">
                      {b.n}
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground line-through">{b.value}</div>
                      <div className="text-xs font-bold text-primary">
                        {landing.bonusesSection.valueFreeLabel}
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        <div
          className="absolute inset-0 -z-10 opacity-90"
          style={{ background: "var(--gradient-warm)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -top-32 -right-32 -z-10 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--gradient-cta)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-96 w-96 rounded-full opacity-25 blur-3xl"
          style={{ background: "var(--gradient-cta-accent)" }}
          aria-hidden="true"
        />
        <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
          <div className="rounded-[2rem] border border-border/60 bg-card/80 p-6 shadow-[var(--shadow-soft)] backdrop-blur-sm sm:p-10 lg:p-14">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div className="relative order-2 lg:order-1">
                <div
                  className="absolute -inset-4 -z-10 rounded-[2rem] opacity-40 blur-2xl"
                  style={{ background: "var(--gradient-cta)" }}
                  aria-hidden="true"
                />
                <div className="relative animate-float">
                  <img
                    src={certificateImg}
                    alt={landing.certificate.imageAlt}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="w-full rounded-2xl drop-shadow-2xl"
                  />
                </div>
                <div
                  className="absolute -bottom-4 -right-4 grid h-20 w-20 place-items-center rounded-full text-primary-foreground shadow-[var(--shadow-glow)] sm:h-24 sm:w-24"
                  style={{ background: "var(--gradient-cta-accent)" }}
                  aria-hidden="true"
                >
                  <span className="font-display text-xs font-black leading-tight text-center sm:text-sm">
                    BONO
                    <br />
                    EXTRA
                  </span>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary ring-1 ring-primary/20">
                  {landing.certificate.eyebrow}
                </div>
                <h2 className="mt-4 font-display text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                  {landing.certificate.title}
                </h2>
                <p className="mt-5 text-base text-muted-foreground sm:text-lg">
                  {landing.certificate.body}
                </p>
                <div className="mt-7 inline-flex flex-wrap items-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 px-5 py-3">
                  <span className="text-sm font-bold uppercase tracking-wide text-foreground">
                    {landing.certificate.valueBefore}
                  </span>
                  <span className="text-base font-bold text-destructive line-through">
                    {landing.certificate.valueAmount}
                  </span>
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-black uppercase text-primary-foreground">
                    {landing.certificate.valueAfter}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-16 py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {landing.benefits.map(({ icon, title, desc }) => {
            const Icon = benefitIcons[icon as keyof typeof benefitIcons] ?? Clock;
            return (
              <div key={title} className="rounded-3xl bg-card p-8 ring-1 ring-border">
                <div
                  className="grid h-14 w-14 place-items-center rounded-2xl text-primary-foreground"
                  style={{ background: "var(--gradient-cta)" }}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-secondary text-secondary-foreground py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest text-citrus">
              {landing.gallery.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-5xl">
              {landing.gallery.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-secondary-foreground/80">
              {landing.gallery.subtitle}
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {galleryImages.map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-2xl">
                <img
                  src={src}
                  alt={`${landing.gallery.imageAltPrefix} ${i + 1}`}
                  loading="lazy"
                  width={768}
                  height={768}
                  className="h-full w-full object-cover transition duration-500 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id={landing.price.sectionId} className="relative py-24">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, oklch(0.58 0.18 142 / 0.15) 0%, transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-4xl px-4">
          <div className="overflow-hidden rounded-[2.5rem] bg-card shadow-[var(--shadow-glow)] ring-1 ring-border">
            <div
              className="p-8 text-center text-primary-foreground sm:p-12"
              style={{ background: "var(--gradient-hero)" }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-citrus px-3 py-1 text-xs font-black uppercase text-secondary">
                {landing.price.badge}
              </span>
              <h2 className="mt-4 font-display text-3xl font-black leading-tight sm:text-5xl">
                {landing.price.titleLine1}
                <br />
                {landing.price.titleLine2}
              </h2>
              <p className="mt-4 text-primary-foreground/85">{landing.price.subtitle}</p>
              <div className="mt-8 flex justify-center">
                <img
                  src={packMockup}
                  alt="Mockup del pack completo: 8 ebooks de barras saludables, brownies y galletas"
                  width={1000}
                  height={800}
                  loading="lazy"
                  className="w-full max-w-2xl rounded-2xl shadow-2xl ring-1 ring-white/20"
                />
              </div>
            </div>

            <div className="p-8 sm:p-12">
              <ul className="grid gap-3 sm:grid-cols-2">
                {landing.price.includes.map((t) => (
                  <li key={t} className="flex gap-2 text-sm">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 rounded-3xl bg-muted p-8 text-center">
                <div className="text-sm uppercase tracking-widest text-muted-foreground">
                  {landing.price.beforeLabel}{" "}
                  <span className="line-through">{landing.price.beforeAmount}</span>
                </div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-primary">
                  {landing.price.discountLabel}
                </div>
                <div className="mt-3 font-display text-7xl font-black text-foreground sm:text-8xl">
                  {landing.price.amount}
                  <span className="text-2xl text-muted-foreground">
                    {landing.price.currencySuffix}
                  </span>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {landing.price.paymentNote}
                </div>
                <div className="mt-7 flex justify-center">
                  <HeroPrimaryCta href={landing.checkoutUrl} label={landing.price.cta} />
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-primary" /> {landing.price.secureLine}
                  </span>
                  <span>·</span>
                  <span>{landing.price.deliveryLine}</span>
                </div>
                <AnimatedProgress
                  target={parseInt(landing.price.progressPercent, 10) || 83}
                  label={landing.price.progressLabel}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-16 py-20">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {landing.testimonials.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-5xl">
            {landing.testimonials.title}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {landing.testimonials.items.map((t) => (
            <figure key={t.name} className="rounded-3xl bg-card p-7 ring-1 ring-border">
              <div className="flex gap-1 text-citrus">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-foreground">"{t.text}"</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-muted-foreground">
                — {t.name}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-14">
          <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })]}
            className="mx-auto max-w-5xl"
          >
            <CarouselContent>
              {testimonioImgs.map((src, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                  <div className="overflow-hidden rounded-2xl ring-1 ring-border bg-card shadow-[var(--shadow-soft)]">
                    <img
                      src={src}
                      alt={`Captura de testimonio real ${i + 1}`}
                      loading="lazy"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-8 sm:px-12 lg:px-16 pb-20">
        <div className="flex flex-col items-center gap-8 rounded-[2rem] bg-secondary p-8 text-secondary-foreground sm:p-12 text-center">
          <img
            src={garantia7}
            alt={landing.guarantee.imageAlt}
            className="h-40 w-40 object-contain drop-shadow-xl"
          />
          <div>
            <h3 className="font-display text-2xl font-black sm:text-3xl">
              {landing.guarantee.title}
            </h3>
            <p className="mt-3 text-secondary-foreground/85">{landing.guarantee.body}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-8 sm:px-12 lg:px-16 pb-20">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-black sm:text-4xl">{landing.faq.title}</h2>
        </div>
        <div className="space-y-3">
          {landing.faq.items.map((f, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-border bg-card p-5 open:shadow-[var(--shadow-soft)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {f.q}
                <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-muted text-primary transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="px-4 pb-24">
        <div
          className="mx-auto max-w-5xl rounded-[2.5rem] p-10 text-center sm:p-16"
          style={{ background: "var(--gradient-hero)" }}
        >
          <h2 className="font-display text-3xl font-black text-primary-foreground sm:text-5xl">
            {landing.finalCta.titleLine1}
            <br />
            {landing.finalCta.titleLine2}
          </h2>
          <p className="mt-4 text-primary-foreground/85">{landing.finalCta.subtitle}</p>
          <div className="mt-8 flex justify-center">
            <HeroPrimaryCta href={landing.checkoutUrl} label={landing.finalCta.button} />
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-secondary text-secondary-foreground/80">
        <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-16 py-10 text-center text-sm">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img
              src={logoIsotipo}
              alt={landing.brand.logoAlt}
              className="h-12 w-12 object-contain bg-cream rounded-full p-1"
            />
            <img
              src={logoWordmark}
              alt={landing.brand.logoAlt}
              className="h-9 w-auto object-contain bg-cream rounded-md px-2 py-1"
            />
          </div>
          <div className="space-y-3 text-xs leading-relaxed text-secondary-foreground/70">
            <p>
              <span className="font-semibold text-secondary-foreground">{landing.footer.disclaimerLabel}</span>{" "}
              {landing.footer.copyrightLine}
            </p>
            <p>
              <span className="font-semibold text-secondary-foreground">{landing.footer.metaPolicyLabel}</span>{" "}
              {landing.footer.metaPolicyText}
            </p>
            <p>{landing.footer.finePrint}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
