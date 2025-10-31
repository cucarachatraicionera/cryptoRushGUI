import React from 'react';

const DistributionSection: React.FC = () => {
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const half = circumference / 2;

  return (
    <section id="distribution" className="py-24">
      <div className="container mx-auto px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-sora font-semibold tracking-tight text-white">
            How Profit Distribution Works
          </h2>
          <p className="mt-2 text-sm md:text-base text-crypto-muted">
            Crypto Rush allocates <span className="text-crypto-neon font-medium">50% of total trading profits</span> to{" "}
            <span className="text-crypto-neon font-medium">access-NFT holders</span> and <span className="text-crypto-cyan font-medium">50%</span>{" "}
            to the project for operations and growth.
          </p>
        </div>

        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Donut chart */}
          <div className="mx-auto flex h-56 w-56 items-center justify-center rounded-3xl bg-crypto-surface/40 p-6 ring-1 ring-crypto-surface">
            <svg
              width="220"
              height="220"
              viewBox="0 0 220 220"
              role="img"
              aria-label="Donut chart showing 50% to holders and 50% to the project."
            >
              <g transform="translate(110,110) rotate(-90)">
                {/* track */}
                <circle r={radius} cx="0" cy="0" stroke="#1f2937" strokeWidth="18" fill="none" />
                {/* holders 50% */}
                <circle
                  r={radius}
                  cx="0"
                  cy="0"
                  stroke="#22F7AE"
                  strokeWidth="18"
                  fill="none"
                  strokeDasharray={`${half} ${circumference}`}
                  strokeDashoffset={0}
                  strokeLinecap="round"
                />
                {/* project 50% */}
                <circle
                  r={radius}
                  cx="0"
                  cy="0"
                  stroke="#27D3F8"
                  strokeWidth="18"
                  fill="none"
                  strokeDasharray={`${half} ${circumference}`}
                  strokeDashoffset={-half}
                  strokeLinecap="round"
                />
              </g>
              <text x="50%" y="50%" textAnchor="middle" dy="8" className="fill-white text-xl font-semibold">
                50 / 50
              </text>
            </svg>
          </div>

          {/* Text + cards */}
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-crypto-surface bg-crypto-surface/40 p-5">
                <h3 className="text-lg font-semibold text-white">Holders (50%)</h3>
                <p className="mt-1 text-sm text-slate-300">
                  Distributed proportionally to access-NFT holders on a scheduled cadence (see dashboard).
                </p>
              </div>
              <div className="rounded-2xl border border-crypto-surface bg-crypto-surface/40 p-5">
                <h3 className="text-lg font-semibold text-white">Project (50%)</h3>
                <p className="mt-1 text-sm text-slate-300">
                  Funds operations, audits, liquidity, R&amp;D, and community growth.
                </p>
              </div>
            </div>

            <a
              href="#"
              className="inline-flex items-center justify-center rounded-xl border border-crypto-neon/40 px-4 py-2 text-sm font-medium text-crypto-neon transition hover:border-crypto-neon hover:text-emerald-200"
            >
              View Whitepaper
            </a>
            <p className="text-xs text-crypto-muted">
              *Total NFT supply and exact distribution details are published in the whitepaper.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DistributionSection;