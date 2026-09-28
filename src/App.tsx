import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Check,
  Camera,
  ChevronDown,
  Globe2,
  HardHat,
  Mail,
  Menu,
  PhoneCall,
  Settings2,
  ShieldCheck,
  Truck,
  Wrench,
  X,
  Zap,
} from 'lucide-react'
import { content, email, type Language } from './content'
import './App.css'

const serviceIcons = [Wrench, Settings2, Zap, Truck]

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand ${compact ? 'brand--compact' : ''}`}>
      <span className="brand-shield" aria-hidden="true">
        <Wrench className="brand-wrench brand-wrench--left" />
        <Wrench className="brand-wrench brand-wrench--right" />
        <Truck className="brand-truck" />
        <span>LSA</span>
      </span>
      <span className="brand-type">
        <strong>
          LSA<span>.</span>
        </strong>
        <span>SERVICE MÉCANIQUE MINIERS INC.</span>
      </span>
    </span>
  )
}

function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      return localStorage.getItem('lsa-language') === 'fr' ? 'fr' : 'en'
    } catch {
      return 'en'
    }
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const text = content[language]

  useEffect(() => {
    document.documentElement.lang = language
    document.title = text.pageTitle
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', text.metaDescription)
    try {
      localStorage.setItem('lsa-language', language)
    } catch {
      return
    }
  }, [language, text])

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const applicationUrl = `mailto:${email}?subject=${encodeURIComponent(text.applicationSubject)}`
  const emergencyUrl = `mailto:${email}?subject=${encodeURIComponent(text.emergencySubject)}`

  return (
    <>
      <a className="skip-link" href="#main">
        {text.skip}
      </a>
      <div className="utility-bar">
        <div className="container utility-inner">
          <span>{text.utility}</span>
          <span>
            <span className="status-dot" />
            {text.utilityRight}
          </span>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <a
            className="brand-link"
            href="#home"
            aria-label={text.home}
            onClick={() => setMenuOpen(false)}
          >
            <Brand />
          </a>
          <nav
            id="main-navigation"
            className={`navigation ${menuOpen ? 'navigation--open' : ''}`}
            aria-label={text.navigation}
          >
            <a href="#services" onClick={() => setMenuOpen(false)}>
              {text.nav.services}
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              {text.nav.about}
            </a>
            <a href="#careers" onClick={() => setMenuOpen(false)}>
              {text.nav.careers}
              <span className="hiring-dot" />
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              {text.nav.contact}
            </a>
            <a
              className="mobile-emergency"
              href="#contact"
              onClick={() => setMenuOpen(false)}
            >
              <PhoneCall size={15} />
              {text.emergency}
            </a>
          </nav>
          <div className="header-actions">
            <div
              className="language-toggle"
              role="group"
              aria-label={text.language}
            >
              <button
                type="button"
                lang="en"
                aria-label="English"
                aria-pressed={language === 'en'}
                onClick={() => setLanguage('en')}
              >
                EN
              </button>
              <span aria-hidden="true">/</span>
              <button
                type="button"
                lang="fr"
                aria-label="Français"
                aria-pressed={language === 'fr'}
                onClick={() => setLanguage('fr')}
              >
                FR
              </button>
            </div>
            <a className="emergency-button" href="#contact">
              <PhoneCall size={15} />
              <span>{text.emergency}</span>
              <ArrowUpRight size={15} />
            </a>
            <button
              ref={menuButton}
              className="menu-button"
              type="button"
              aria-label={menuOpen ? text.closeMenu : text.openMenu}
              aria-controls="main-navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <img
            className="hero-image"
            src="/mine.webp"
            srcSet="/mine-mobile.webp 1000w, /mine.webp 2200w"
            sizes="100vw"
            alt={text.hero.imageAlt}
            fetchPriority="high"
            width="2200"
            height="1467"
          />
          <div className="hero-shade" />
          <div className="container hero-content">
            <div className="eyebrow hero-eyebrow">
              <span />
              {text.hero.eyebrow}
            </div>
            <h1 id="hero-title">
              {text.hero.titleFirst}
              <br />
              <span>{text.hero.titleAccent}</span>
              <br />
              {text.hero.titleLast}
              <span className="amber-period">.</span>
            </h1>
            <p
              className="hero-translation"
              lang={language === 'en' ? 'fr' : 'en'}
            >
              {text.hero.translation}
            </p>
            <p className="hero-description">{text.hero.description}</p>
            <div className="hero-actions">
              <a className="button button--amber" href="#services">
                {text.hero.services}
                <ArrowUpRight size={18} />
              </a>
              <a className="button button--outline" href="#careers">
                {text.hero.careers}
                <ArrowRight size={17} />
              </a>
            </div>
          </div>
          <div className="container hero-bottom">
            <a className="hero-scroll" href="#services">
              <span>
                <ArrowDown size={16} />
              </span>
              {text.hero.scroll}
            </a>
            <div className="hero-caption">
              <span className="caption-line" />
              <div>
                <span>LSA / {text.hero.captionLabel}</span>
                <strong>{text.hero.caption}</strong>
              </div>
            </div>
          </div>
          <span className="hero-side-label" aria-hidden="true">
            MINING. MECHANICAL. LSA.
          </span>
        </section>
        <section className="credentials" aria-label={text.credentials.label}>
          <div className="container credentials-inner">
            <p>
              {text.credentials.intro}
              <strong>{text.credentials.introStrong}</strong>
            </p>
            {[Building2, BadgeCheck, ShieldCheck].map((Icon, index) => (
              <div
                className="credential"
                key={text.credentials.items[index].title}
              >
                <Icon strokeWidth={1.4} />
                <div>
                  <strong>{text.credentials.items[index].title}</strong>
                  <span>{text.credentials.items[index].detail}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section
          className="services section-space"
          id="services"
          aria-labelledby="services-title"
        >
          <div className="container">
            <div className="section-topline">
              <span className="eyebrow">
                <span className="section-marker" />
                {text.services.eyebrow}
              </span>
              <span className="section-index">01 / {text.services.index}</span>
            </div>
            <div className="section-heading">
              <h2 id="services-title">
                {text.services.title}
                <br />
                <span>{text.services.titleSecond}</span>
              </h2>
              <p>{text.services.description}</p>
            </div>
            <div className="services-grid">
              {text.services.items.map((service, index) => {
                const Icon = serviceIcons[index]
                return (
                  <article className="service" key={index}>
                    <div className="service-top">
                      <Icon strokeWidth={1.5} />
                      <span>0{index + 1}</span>
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <details className="service-details">
                      <summary>
                        {text.services.details}
                        <ChevronDown size={16} />
                      </summary>
                      <ul>
                        {service.details.map((detail) => (
                          <li key={detail}>
                            <Check size={13} />
                            {detail}
                          </li>
                        ))}
                      </ul>
                      <a
                        href={`mailto:${email}?subject=${encodeURIComponent(service.title)}`}
                      >
                        {text.services.inquire}
                        <ArrowUpRight size={14} />
                      </a>
                    </details>
                  </article>
                )
              })}
            </div>
            <div className="services-note">
              <span>
                <Globe2 size={17} />
                {text.services.note}
              </span>
              <a href="#contact">
                {text.services.contact}
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </section>
        <section
          className="about section-space"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="container">
            <div className="section-topline">
              <span className="eyebrow">
                <span className="section-marker" />
                {text.about.eyebrow}
              </span>
              <span className="section-index">02 / {text.about.index}</span>
            </div>
            <div className="about-intro">
              <h2 id="about-title">
                {text.about.title}
                <br />
                <span>{text.about.titleSecond}</span>
              </h2>
              <div>
                <p className="about-lead">{text.about.lead}</p>
                <p>{text.about.description}</p>
                <a className="text-link" href="#contact">
                  {text.about.cta}
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
            <div className="values-grid">
              {text.about.values.map((value, index) => {
                const Icon = [Wrench, ShieldCheck, HardHat][index]
                return (
                  <div className="value" key={value.title}>
                    <Icon strokeWidth={1.5} />
                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
        <section
          className="careers"
          id="careers"
          aria-labelledby="careers-title"
        >
          <div className="careers-photo">
            <img
              src="/workshop.webp"
              width="1200"
              height="800"
              alt={text.careers.imageAlt}
              loading="lazy"
            />
            <div className="careers-photo-overlay" />
            <div className="careers-photo-caption">
              <span className="eyebrow">{text.careers.photoLabel}</span>
              <p>
                {text.careers.photoTitle}
                <span>.</span>
              </p>
              <span className="photo-caption-small">
                LSA SERVICE MÉCANIQUE MINIERS INC.
              </span>
            </div>
          </div>
          <div className="careers-content">
            <span className="eyebrow">
              <span className="hiring-dot" />
              {text.careers.eyebrow}
            </span>
            <h2 id="careers-title">
              {text.careers.title}
              <br />
              <span>{text.careers.titleSecond}</span>
            </h2>
            <p className="career-roles">{text.careers.roles}</p>
            <p className="careers-description">{text.careers.description}</p>
            <h3>{text.careers.requirementsTitle}</h3>
            <ul className="requirements">
              {text.careers.requirements.map((requirement) => (
                <li key={requirement}>
                  <Check size={15} />
                  {requirement}
                </li>
              ))}
            </ul>
            <a className="application-link" href={applicationUrl}>
              <span className="application-icon">
                <Mail size={22} />
              </span>
              <span>
                <strong>{text.careers.apply}</strong>
                <span>{email}</span>
              </span>
              <ArrowUpRight size={22} />
            </a>
            <p className="application-note">{text.careers.note}</p>
          </div>
        </section>
        <section
          className="contact section-space"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="container">
            <div className="section-topline">
              <span className="eyebrow">
                <span className="section-marker" />
                {text.contact.eyebrow}
              </span>
              <span className="section-index">04 / {text.contact.index}</span>
            </div>
            <div className="contact-heading">
              <h2 id="contact-title">
                {text.contact.title}
                <br />
                <span>{text.contact.titleSecond}</span>
              </h2>
              <div>
                <p>{text.contact.description}</p>
                <a className="text-link" href={emergencyUrl}>
                  <PhoneCall size={16} />
                  {text.contact.emergency}
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
            <a className="contact-email" href={`mailto:${email}`}>
              <span>
                <Mail size={23} />
                {email}
              </span>
              <ArrowUpRight />
            </a>
            <div className="contact-bottom">
              <span>
                <Globe2 size={16} />
                {text.contact.bilingual}
              </span>
              <a
                href="https://www.instagram.com/lsaservicemecaniqueminiers/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Camera size={16} />
                {text.contact.social}
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container footer-top">
          <a className="brand-link" href="#home" aria-label={text.home}>
            <Brand compact />
          </a>
          <p>{text.footer.tagline}</p>
          <a className="back-to-top" href="#home">
            {text.footer.top}
            <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="container footer-bottom">
          <p>
            © {new Date().getFullYear()} LSA Service Mécanique Miniers Inc.{' '}
            {text.footer.rights}
          </p>
          <span>{text.footer.legal}</span>
        </div>
      </footer>
    </>
  )
}

export default App
