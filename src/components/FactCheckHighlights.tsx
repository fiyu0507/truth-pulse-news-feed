
import React from 'react';

interface FactCheckItemProps {
  claim: string;
  verdict: 'true' | 'false' | 'misleading';
  summary: string;
  date: string;
}

const FactCheckItem = ({ claim, verdict, summary, date }: FactCheckItemProps) => {
  const getVerdictStyles = () => {
    switch (verdict) {
      case 'true':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'false':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'misleading':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getVerdictIcon = () => {
    switch (verdict) {
      case 'true':
        return '✓';
      case 'false':
        return '✕';
      case 'misleading':
        return '⚠️';
      default:
        return '?';
    }
  };

  const getVerdictLabel = () => {
    switch (verdict) {
      case 'true':
        return 'TRUE';
      case 'false':
        return 'FALSE';
      case 'misleading':
        return 'MISLEADING';
      default:
        return 'UNKNOWN';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getVerdictStyles()}`}>
          <span>{getVerdictIcon()}</span>
          <span>{getVerdictLabel()}</span>
        </div>
        <span className="text-xs text-gray-500">{date}</span>
      </div>
      
      <h4 className="font-medium text-gray-900 mb-2 text-sm leading-tight">
        {claim}
      </h4>
      
      <p className="text-gray-600 text-sm mb-3">
        {summary}
      </p>
      
      <a href="/fact-check" className="text-blue-800 hover:text-blue-900 text-sm font-medium">
        Read Full Analysis →
      </a>
    </div>
  );
};

const factChecks = [
  {
    claim: "City spending on infrastructure increased by 30% this year",
    verdict: 'true' as const,
    summary: "Budget documents confirm infrastructure spending rose from $45M to $58.5M.",
    date: "2 days ago"
  },
  {
    claim: "New traffic lights will reduce commute times by 50%",
    verdict: 'misleading' as const,
    summary: "While traffic flow improves, 50% reduction applies only to specific intersections during peak hours.",
    date: "3 days ago"
  },
  {
    claim: "Local unemployment rate is at historic low of 2%",
    verdict: 'false' as const,
    summary: "Current unemployment rate is 3.2%, not 2%. The 2% figure was from a different metropolitan area.",
    date: "5 days ago"
  }
];

export const FactCheckHighlights = () => {
  return (
    <section className="sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Fact Check Highlights</h2>
        <a href="/fact-check" className="text-blue-800 hover:text-blue-900 font-medium text-sm">
          View All →
        </a>
      </div>
      
      <div className="space-y-4">
        {factChecks.map((factCheck, index) => (
          <FactCheckItem key={index} {...factCheck} />
        ))}
      </div>
    </section>
  );
};
