import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Sparkles, CalendarDays } from 'lucide-react';
import { articles } from '../../data/articles';

const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export const BlogPage: React.FC = () => {
  return (
    <div className="text-left font-sans">
      {/* HERO (Corporate Dark Navy #07182F) */}
      <section className="relative bg-[#07182F] text-white pt-24 pb-14 sm:pt-28 sm:pb-16 overflow-hidden border-b border-white/10">
        <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-[#168BFF]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>eBizEarn Insights</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
            Ideas for people who{' '}
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5D67B] to-[#D4AF37] bg-clip-text text-transparent">
              earn online.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl mx-auto font-normal">
            Sharp, honest analysis of the gig economy, micro-tasks, and the future of digital work —
            written from the front lines of verified earning.
          </p>
        </div>
      </section>

      {/* ARTICLE GRID */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="group bg-white rounded-card border border-brand-border shadow-card overflow-hidden hover:shadow-floating hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={article.coverImage}
                  alt={article.coverAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#07182F]/85 backdrop-blur text-[11px] font-bold text-[#D4AF37] border border-[#D4AF37]/30">
                  {article.category}
                </span>
              </div>

              <div className="p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-3 text-[11px] text-brand-muted font-medium">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {formatDate(article.publishedAt)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readMinutes} min read
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-brand-text leading-snug group-hover:text-[#168BFF] transition-colors">
                  {article.title}
                </h2>

                <p className="text-xs sm:text-sm text-brand-secondaryText leading-relaxed line-clamp-3">
                  {article.dek}
                </p>

                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#168BFF] pt-1">
                  Read article
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {articles.length === 0 && (
          <p className="text-center text-sm text-brand-muted py-16">
            New insights are on the way. Check back soon.
          </p>
        )}
      </section>
    </div>
  );
};
