"use client";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Download,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { LabProject, Locale, LocalizedText, MediaAsset, Project, SiteContent } from "@/types/site";

const text = (value: LocalizedText, locale: Locale) => value[locale];

function resumeHref(content: SiteContent, locale: Locale) {
  if (content.resume.mode === "hidden") return undefined;
  if (content.resume.mode === "localized") return content.resume[locale];
  return content.resume.shared;
}

function Media({ media, locale, eager = false, hero = false }: { media: MediaAsset; locale: Locale; eager?: boolean; hero?: boolean }) {
  if (media.type === "video") {
    return (
      <video
        className="media-element"
        src={media.src}
        poster={media.poster}
        controls={!hero}
        autoPlay={hero}
        loop={hero}
        muted
        playsInline
        preload={hero ? "auto" : "metadata"}
        aria-label={text(media.alt, locale)}
        style={{ objectPosition: media.objectPosition }}
      />
    );
  }

  return (
    // User-provided media can have arbitrary dimensions, so the reusable renderer cannot use static image metadata.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="media-element"
      src={media.src}
      alt={text(media.alt, locale)}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      style={{ objectPosition: media.objectPosition }}
    />
  );
}

function WorkCard({ project, locale }: { project: Project; locale: Locale }) {
  return (
    <article className="work-card">
      <div className="work-media">
        <Media media={project.media} locale={locale} />
      </div>
      <div className="work-meta">
        <span><span className="meta-mark" aria-hidden="true">✦</span>{text(project.meta, locale)}</span>
        <span>{project.year}</span>
      </div>
      <h3>{text(project.title, locale)}</h3>
      <p>{text(project.summary, locale)}</p>
    </article>
  );
}

function LabCard({ project, locale, delay }: { project: LabProject; locale: Locale; delay: number }) {
  const span = project.layout?.span ?? "single";
  const aspect = project.layout?.mediaAspect ?? "four-three";
  return (
    <div className={`lab-item span-${span} aspect-${aspect} reveal-on-scroll reveal-lab`} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>
      <article className={`lab-card ${project.presentation}`}>
        <div className="lab-frame">
          <div className="lab-media"><Media media={project.media} locale={locale} /></div>
        </div>
        <div className="lab-caption">
          <h3>{text(project.title, locale)}</h3>
          <p>{text(project.summary, locale)}</p>
          <span className="lab-meta">{text(project.meta, locale)} · {project.year}</span>
        </div>
      </article>
    </div>
  );
}

type Tone = "default" | "accent" | "muted";

function Statement({ content, locale }: { content: SiteContent["about"]; locale: Locale }) {
  const source = text(content.statement, locale);
  const marks = [
    ...(content.accentPhrases ?? []).map((phrase) => ({ phrase: text(phrase, locale), tone: "accent" as Tone })),
    ...(content.mutedPhrases ?? []).map((phrase) => ({ phrase: text(phrase, locale), tone: "muted" as Tone })),
  ].filter(({ phrase }) => phrase.length > 0);

  const parts: Array<{ value: string; tone: Tone }> = [{ value: source, tone: "default" }];
  for (const mark of marks) {
    for (let index = 0; index < parts.length; index += 1) {
      const part = parts[index];
      if (part.tone !== "default") continue;
      const offset = part.value.indexOf(mark.phrase);
      if (offset < 0) continue;
      parts.splice(index, 1,
        { value: part.value.slice(0, offset), tone: "default" },
        { value: mark.phrase, tone: mark.tone },
        { value: part.value.slice(offset + mark.phrase.length), tone: "default" },
      );
      break;
    }
  }

  return (
    <>
      {parts.filter(({ value }) => value).map((part, index) => (
        <span className={part.tone === "default" ? undefined : `statement-${part.tone}`} key={`${part.value}-${index}`}>{part.value}</span>
      ))}
    </>
  );
}

export function PortfolioSite({ content }: { content: SiteContent }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [compactHeader, setCompactHeader] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeSection, setActiveSection] = useState("work");
  const [labIndex, setLabIndex] = useState(0);
  const siteRoot = useRef<HTMLDivElement>(null);
  const heroSection = useRef<HTMLElement>(null);
  const headerSentinel = useRef<HTMLSpanElement>(null);
  const labRail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const localeKey = `${content.preferences.storageKey}-locale`;
    const themeKey = `${content.preferences.storageKey}-theme`;
    const storedLocale = window.localStorage.getItem(localeKey) as Locale | null;
    const storedTheme = window.localStorage.getItem(themeKey);
    const nextLocale = storedLocale === "zh" || storedLocale === "en"
      ? storedLocale
      : content.preferences.defaultLocale === "browser"
        ? navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en"
        : content.preferences.defaultLocale;
    const nextDark = storedTheme
      ? storedTheme === "dark"
      : content.preferences.defaultTheme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
        : content.preferences.defaultTheme === "dark";
    // Browser preferences are only available after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocale(nextLocale);
    setDark(nextDark);
  }, [content.preferences]);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    document.documentElement.dataset.locale = locale;
    document.documentElement.classList.toggle("dark", dark);
    window.localStorage.setItem(`${content.preferences.storageKey}-locale`, locale);
    window.localStorage.setItem(`${content.preferences.storageKey}-theme`, dark ? "dark" : "light");
  }, [content.preferences.storageKey, locale, dark]);

  useEffect(() => {
    const sentinel = headerSentinel.current;
    const hero = heroSection.current;
    if (!sentinel || !hero) return;

    const compactObserver = new IntersectionObserver(([entry]) => {
      setCompactHeader(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    const heroObserver = new IntersectionObserver(([entry]) => {
      setShowTop(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    }, { threshold: 0 });
    compactObserver.observe(sentinel);
    heroObserver.observe(hero);
    return () => {
      compactObserver.disconnect();
      heroObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const root = siteRoot.current;
    if (!root) return;
    const sections = root.querySelectorAll<HTMLElement>("#work, #lab, #about");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActiveSection(entry.target.id);
    }, { rootMargin: "-38% 0px -60% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [content.lab.length]);

  useEffect(() => {
    const root = siteRoot.current;
    if (!root) return;
    const items = root.querySelectorAll<HTMLElement>(".reveal-on-scroll");
    root.classList.add("motion-ready");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -25% 0px", threshold: 0 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [content.work.length, content.lab.length]);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", close);
    document.body.classList.add("menu-locked");
    return () => {
      document.removeEventListener("keydown", close);
      document.body.classList.remove("menu-locked");
    };
  }, [menuOpen]);

  const paletteStyle = useMemo(() => {
    const palette = dark ? content.palette.dark : content.palette.light;
    return {
      "--background": palette.background,
      "--foreground": palette.foreground,
      "--muted": palette.muted,
      "--muted-foreground": palette.mutedForeground,
      "--border": palette.border,
      "--accent": palette.accent,
      "--accent-foreground": palette.accentForeground,
      "--dark-band": palette.darkBand,
      "--dark-band-foreground": palette.darkBandForeground,
    } as CSSProperties;
  }, [content.palette, dark]);

  const resume = resumeHref(content, locale);
  const navItems = [
    { id: "work", label: content.navigation.work, href: "#work" },
    ...(content.lab.length ? [{ id: "lab", label: content.navigation.lab, href: "#lab" }] : []),
    { id: "about", label: content.navigation.about, href: "#about" },
  ];
  const activeIndex = Math.max(0, navItems.findIndex(({ id }) => id === activeSection));
  const goLab = (direction: -1 | 1) => {
    const rail = labRail.current;
    if (!rail || !content.lab.length) return;
    const next = Math.max(0, Math.min(content.lab.length - 1, labIndex + direction));
    setLabIndex(next);
    rail.children[next]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <div className="site" style={paletteStyle} ref={siteRoot}>
      <header className={`header-shell${compactHeader ? " compact" : ""}${menuOpen ? " menu-open" : ""}`}>
        <div className="header-frame">
          <div className="header-bar">
            <a className="brand" href="#top" onClick={() => setMenuOpen(false)}><span aria-hidden="true">✦</span><span>{text(content.person.name, locale)}{locale === "en" ? "." : "。"}</span></a>
            <nav className="desktop-nav" aria-label="Primary" data-active={activeIndex}>
              <span className="nav-indicator" aria-hidden="true" />
              {navItems.map(({ id, label, href }) => <a className={id === activeSection ? "active" : undefined} href={href} key={href}><span>{text(label, locale)}</span></a>)}
            </nav>
            <div className="header-actions">
              <button className="round-control locale-control" onClick={() => setLocale(locale === "en" ? "zh" : "en")} aria-label={locale === "en" ? "切换为中文" : "Switch to English"}>
                {locale === "en" ? "中" : "EN"}
              </button>
              <button className="round-control" onClick={() => setDark(!dark)} aria-label={text(dark ? content.navigation.themeLight : content.navigation.themeDark, locale)}>
                {dark ? <Moon size={16} /> : <Sun size={16} />}
              </button>
              <a className="say-hi desktop-only" href={`mailto:${content.person.email}`}>{text(content.navigation.sayHi, locale)} <span aria-hidden="true">👋</span></a>
              <button className="menu-control" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={text(menuOpen ? content.navigation.close : content.navigation.menu, locale)}>
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
        {menuOpen && (
          <nav className="mobile-menu" aria-label="Mobile">
            {navItems.map(({ label, href }) => <a href={href} onClick={() => setMenuOpen(false)} key={href}>{text(label, locale)}</a>)}
            {resume && <a href={resume} onClick={() => setMenuOpen(false)}>{text(content.navigation.resume, locale)}</a>}
            <a className="mobile-say-hi" href={`mailto:${content.person.email}`} onClick={() => setMenuOpen(false)}>{text(content.navigation.sayHi, locale)} <ArrowUpRight size={18} /></a>
          </nav>
        )}
      </header>

      <main>
        <section className="hero" id="top" ref={heroSection}>
          <span className="header-sentinel" ref={headerSentinel} aria-hidden="true" />
          <div className="hero-media">
            <Media media={content.hero} locale={locale} eager hero />
            <span className="hero-overlay" style={{ background: `rgba(0,0,0,${content.hero.overlay})` }} />
          </div>
          <div className="hero-content">
            <h1>
              <span><span className="hero-line-text">{text(content.person.name, locale)}{locale === "en" ? "." : "。"}</span></span>
              <span className="hero-role"><span className="hero-line-text">{text(content.person.role, locale)}</span></span>
            </h1>
            <p>{text(content.person.support, locale)}</p>
            <div className="hero-actions">
              <a className="hero-primary" href="#work">{text(content.sections.viewWork, locale)} <ArrowDown size={17} /></a>
              <a className="hero-secondary" href="#about">{text(content.sections.aboutMe, locale)}</a>
            </div>
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="section-inner work-inner">
            <div className="work-heading reveal-on-scroll reveal-heading">
              <div><span className="eyebrow">{text(content.sections.portfolioLabel, locale)}</span><h2>{text(content.sections.selectedWork, locale)}</h2></div>
              <p>{text(content.sections.workIntro, locale)}</p>
            </div>
            <div className={`work-grid work-layout-${content.layout.work}`}>
              {content.work.map((project, index) => (
                <div className={`work-item span-${project.layout?.span ?? "single"} aspect-${project.layout?.mediaAspect ?? "four-three"} reveal-on-scroll reveal-work`} style={{ "--reveal-delay": `${(index % 2) * 100}ms` } as CSSProperties} key={project.slug}>
                  <WorkCard project={project} locale={locale} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {content.lab.length > 0 && (
          <section className="lab-section" id="lab">
            <div className="section-inner lab-inner">
              <div className="lab-heading reveal-on-scroll reveal-heading">
                <div><span className="eyebrow">{text(content.navigation.lab, locale)}</span><h2><span>{text(content.sections.labTitle, locale)}</span><span>{text(content.sections.labAccent, locale)}</span></h2></div>
                <p>{text(content.sections.labIntro, locale)}</p>
              </div>
              <div className={`lab-rail lab-layout-${content.layout.lab}`} ref={labRail} onScroll={(event) => {
                const node = event.currentTarget;
                const card = node.firstElementChild as HTMLElement | null;
                if (card) setLabIndex(Math.round(node.scrollLeft / (card.offsetWidth + 20)));
              }}>
                {content.lab.map((project, index) => <LabCard key={project.slug} project={project} locale={locale} delay={(index % 3) * 100} />)}
              </div>
              <div className="lab-controls">
                <button onClick={() => goLab(-1)} disabled={labIndex === 0} aria-label="Previous"><ArrowLeft size={17} /></button>
                <div className="lab-dots" aria-hidden="true">{content.lab.map((project, index) => <span key={project.slug} className={index === labIndex ? "active" : ""} />)}</div>
                <button onClick={() => goLab(1)} disabled={labIndex >= content.lab.length - 1} aria-label="Next"><ArrowRight size={17} /></button>
              </div>
            </div>
          </section>
        )}

        <section className="about-section" id="about">
          <div className="section-inner about-inner reveal-on-scroll reveal-heading">
            <span className="eyebrow about-label">{text(content.sections.aboutLabel, locale)}</span>
            <div className="about-grid">
              <div className="about-statement">
                <h2><Statement content={content.about} locale={locale} /></h2>
              </div>
              <div className="about-copy">
                <div className="about-actions">
                  {resume && <a className="resume-button" href={resume} download>{text(content.sections.downloadResume, locale)} <Download size={15} /></a>}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="section-inner footer-inner">
          <a className="hello reveal-on-scroll reveal-footer" href={`mailto:${content.person.email}`}><span>{text(content.sections.sayHello, locale)}</span><ArrowUpRight /></a>
          <div className="footer-details">
            <div><span>{text(content.sections.email, locale)}</span><a href={`mailto:${content.person.email}`}>{content.person.email}</a></div>
            <div><span>{text(content.sections.elsewhere, locale)}</span><div>{content.contact.socials.map((social) => <a href={social.href} target="_blank" rel="noreferrer" key={social.href}>{social.label}</a>)}</div></div>
            <div><span>{text(content.sections.basedIn, locale)}</span><strong>{text(content.person.location, locale)}</strong></div>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} {content.contact.copyrightName}</span><span>{text(content.contact.credit, locale)}</span></div>
        </div>
      </footer>

      <button className={`scroll-top${showTop ? " visible" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label={text(content.sections.scrollTop, locale)}><ArrowUp size={19} /></button>
    </div>
  );
}
