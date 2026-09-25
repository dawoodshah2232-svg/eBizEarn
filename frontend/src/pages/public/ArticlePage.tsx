import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, CalendarDays, User, CheckCircle2, ExternalLink } from 'lucide-react';
import { getArticle, type ArticleBlock } from '../../data/articles';

const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

/** Renders one typed content block of an article. */
const BlockRenderer: React.FC<{ block: ArticleBlock }> = ({ block }) => {
  switch (block.type) {
    case 'lead':
      return (
        <p className="text-base sm:text-lg text-brand-text leading-relaxed font-medium">
          {block.text}
        </p>
      );
    case 'paragraph':
      return (
        <p className="text-sm sm:text-base text-brand-secondaryText leading-relaxed">
          {block.text}
        </p>
      );
    case 'heading':
      return (
        <h2 className="text-lg sm:text-xl font-extrabold text-brand-text tracking-tight pt-4">
          {block.text}
        </h2>
      );
    case 'quote':
      return (
        <blockquote className="border-l-4 border-[#D4AF37] bg-[#D4AF37]/5 rounded-r-xl pl-5 pr-4 py-4 my-2">
          <p className="text-sm sm:text-base font-bold text-brand-text leading-relaxed">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.cite && (
            <cite className="block mt-2 text-xs text-brand-muted not-italic">
              {block.cite}
            </cite>
          )}
        </blockquote>
      );
    case 'list':
      return (
        <ul className="space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <span className="text-sm sm:text-base text-brand-secondaryText leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
};

export const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticle(slug) : undefined;

  // SEO: per-article title, meta description, and Article JSON-LD (no helmet dep).
  useEffect(() => {
    if (!article) return;
    const prevTitle = document.title;
    document.title = `${article.title} — eBizEarn Insights`;

    const ensureMeta = (name: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
      return el;
    };
    const prevDescription = document
      .querySelector('meta[name="description"]')
      ?.getAttribute('content');
    ensureMeta('description', article.metaDescription);

    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.id = 'article-jsonld';
    ld.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.metaDescription,
      image: article.coverImage,
      datePublished: article.publishedAt,
      author: { '@type': 'Organization', name: 'eBizEarn' },
    });
    document.head.appendChild(ld);

    return () => {
      document.title = prevTitle;
      const desc = document.querySelector('meta[name="description"]');
      if (desc && prevDescription) desc.setAttribute('content', prevDescription);
      document.getElementById('article-jsonld')?.remove();
    };
  }, [article]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="text-left font-sans">
      {/* HERO (Corporate Dark Navy #07182F, gold accent) */}
      <section className="relative bg-[#07182F] text-white pt-24 pb-10 sm:pt-28 sm:pb-12 overflow-hidden border-b border-white/10">
        <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-[#168BFF]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All insights
          </Link>

          <span className="inline-flex px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-xs font-bold text-[#D4AF37]">
            {article.category}
          </span>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            {article.dek}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-400 font-medium">
            <span className="inline-flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#D4AF37]" />
              {article.author} · {article.authorRole}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-[#D4AF37]" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              {article.readMinutes} min read
            </span>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="bg-[#F7F9FC] py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <figure className="rounded-card overflow-hidden border border-brand-border shadow-card mb-8 sm:mb-10">
            <img
              src={article.coverImage}
              alt={article.coverAlt}
              className="w-full aspect-[16/9] object-cover"
            />
          </figure>

          <article className="space-y-5 sm:space-y-6">
            {article.blocks.map((block, i) => (
              <BlockRenderer key={i} block={block} />
            ))}
          </article>

          {/* SOURCES */}
          <div className="mt-10 pt-8 border-t border-brand-border">
            <h3 className="text-sm font-extrabold text-brand-text uppercase tracking-wider mb-4">
              Sources
            </h3>
            <ul className="space-y-2.5">
              {article.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-xs text-brand-secondaryText hover:text-[#168BFF] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    <span className="underline underline-offset-2 decoration-brand-border">
                      {s.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-10 rounded-card bg-[#07182F] border border-white/10 p-6 sm:p-8 text-center space-y-4 overflow-hidden relative">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-lg sm:text-xl font-extrabold text-white relative">
              Earn on tasks that value{' '}
              <span className="text-[#D4AF37]">verified work.</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed relative max-w-xl mx-auto">
              Join eBizEarn as a contributor — complete real tasks for real brands,
              get verified, and get paid. Free to join.
            </p>
            <Link
              to="/signup/contributor"
              className="relative inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#F5D67B] text-[#07182F] font-bold text-xs sm:text-sm rounded-xl shadow-xl hover:scale-105 transition-all"
            >
              <span>Start Earning Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
