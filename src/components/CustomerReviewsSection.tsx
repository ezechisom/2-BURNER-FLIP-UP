import React from 'react';
import { Star, MessageSquareQuote } from 'lucide-react';
import { ReviewItem } from '../types';

interface CustomerReviewsSectionProps {
  reviews: ReviewItem[];
}

export const CustomerReviewsSection: React.FC<CustomerReviewsSectionProps> = ({ reviews }) => {
  return (
    <section id="reviews-section" className="py-14 sm:py-20 px-4 bg-slate-50 text-slate-900 border-b border-blue-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-blue-600 font-mono text-xs uppercase tracking-widest font-bold block mb-2">
            Verified Experiences
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            WHAT OUR CUSTOMERS ARE SAYING
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Authentic customer feedback and buyer experiences.
          </p>
        </div>

        {/* Review Cards Grid */}
        <div className={`grid grid-cols-1 ${reviews.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'} gap-6`}>
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all shadow-sm group relative"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-3 text-amber-500">
                  {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <div className="text-slate-600 text-xs sm:text-sm italic leading-relaxed mb-6 flex items-start gap-2">
                  <MessageSquareQuote className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
                  <span>"{rev.content}"</span>
                </div>
              </div>

              {/* Author & Location */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {rev.author}
                  </h4>
                  <span className="text-[11px] text-slate-500 block">
                    {rev.location}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Note on configuration */}
        <div className="mt-8 text-center text-xs text-slate-500">
          Reviews are maintained in real-time from our customer satisfaction registry.
        </div>

      </div>
    </section>
  );
};
