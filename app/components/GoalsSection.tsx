import { useMemo, useState, useEffect, useRef } from "react";
import { CheckCircle2, Target, TrendingUp, ShieldCheck, Users, Hospital, HeartHandshake, Rocket, MapPin, Globe, ArrowRight } from "lucide-react";
import Image from "next/image";

// Defined locally to fix missing import error
export interface BusinessGoals {
  title: string;
  objectives: string[];
}

interface GoalsSectionProps {
  goals: BusinessGoals;
  variant?: 'default' | 'bento' | 'split' | 'centered' | 'immersive';
}

const formatAxisLabel = (value: number) => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return Math.round(value).toLocaleString('en-US');
};

const GoalsSection = ({ goals, variant = 'default' }: GoalsSectionProps) => {
  // Start at index 1 (2025)
  const [activeStage, setActiveStage] = useState(1);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const [chartRevealed, setChartRevealed] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);

  useEffect(() => {
    const target = chartContainerRef.current;
    if (!target) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const isOnScreen = entries.some((entry) => entry.isIntersecting);
        if (isOnScreen) {
          setChartRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!chartRevealed) return undefined;
    const timer = setTimeout(() => setDetailsVisible(true), 700);
    return () => clearTimeout(timer);
  }, [chartRevealed]);

  const trajectory = useMemo(() => ([
    {
      year: "2024",
      title: "Foundation",
      description: "Establishing core research partnerships and securing initial IRB approvals for data collection.",
      hospitals: 0,
      activeUsers: 0,
      parentsHelped: 0,
      parentSupport: "Research phase.",
      icon: ShieldCheck
    },
    {
      year: "2025",
      title: "Pilot Launch",
      description: "Initial deployment in 1 partner Level II NICU to validate clinical accuracy and user experience.",
      hospitals: 1,
      activeUsers: 12,
      parentsHelped: 30,
      parentSupport: "Concierge support for first pilot NICU.",
      icon: Rocket
    },
    {
      year: "2026",
      title: "Early Adoption",
      description: "Expansion to 3 additional community NICUs to gather diverse clinical data and refine algorithms.",
      hospitals: 4,
      activeUsers: 45,
      parentsHelped: 150,
      parentSupport: "Automated insights and localized support.",
      icon: TrendingUp
    },
    {
      year: "2030",
      title: "Regional Expansion",
      description: "Adoption by 15 regional hospitals, integrating with existing nurse call systems and workflows.",
      hospitals: 15,
      activeUsers: 250,
      parentsHelped: 1200,
      parentSupport: "App-based updates for parents.",
      icon: MapPin
    },
    {
      year: "2050",
      title: "Standard of Care",
      description: "Standard of care in 60+ NICUs across the state, with full EHR integration.",
      hospitals: 60,
      activeUsers: 1800,
      parentsHelped: 15000,
      parentSupport: "Full app ecosystem integration.",
      icon: Target
    },
  ] as const), []);

  const { chartSeries, helperGuides } = useMemo(() => {
    // --- CONFIGURATION ---
    const verticalPadding = 15; // 15% padding at top
    const availableHeight = 100 - verticalPadding;

    // Ordinal Spacing (Even Spacing)
    const totalPoints = trajectory.length;
    const scaleX = (index: number) => {
      return (index / (totalPoints - 1)) * 100;
    };

    const extremes = trajectory.reduce(
      (acc, stage) => {
        acc.max = Math.max(acc.max, stage.activeUsers);
        acc.min = Math.min(acc.min, stage.activeUsers);
        return acc;
      },
      { max: Number.NEGATIVE_INFINITY, min: Number.POSITIVE_INFINITY }
    );

    const logMin = Math.log10(extremes.min + 10);
    const logMax = Math.log10(extremes.max + 10);
    const logSpan = Math.max(0.0001, logMax - logMin);

    const scaleY = (val: number) => {
      const logVal = Math.log10(val + 10);
      const normalized = (logVal - logMin) / logSpan;
      return 100 - (normalized * availableHeight);
    };

    const buildSeries = (
      id: string,
      description: string,
      valueSelector: (stage: typeof trajectory[number]) => number,
      stroke: string,
    ) => ({
      id,
      description,
      points: trajectory.map((stage, index) => ({
        x: scaleX(index),
        y: scaleY(valueSelector(stage)),
        year: stage.year,
        value: valueSelector(stage),
        index,
      })),
      stroke,
    });

    const series = [
      buildSeries("Active Users", "Clinicians & staff using Hush", (stage) => stage.activeUsers, "#3b82f6"),
    ];

    const guideStops = [0, 0.25, 0.5, 0.75, 1];
    const helperGuides = guideStops.map((ratio, idx) => {
      const logValue = logMin + ratio * logSpan;
      const rawValue = Math.max(0, Math.pow(10, logValue) - 10);
      return {
        id: `guide-${idx}`,
        top: 100 - (ratio * availableHeight),
        label: formatAxisLabel(rawValue),
      };
    });

    return { chartSeries: series, helperGuides };
  }, [trajectory]);

  const buildPath = (points: { x: number; y: number }[]) =>
    points
      .map((point, idx) => `${idx === 0 ? "M" : "L"} ${point.x} ${point.y}`)
      .join(" ");

  const interactionPoints = chartSeries[0]?.points || [];

  // Current stage for the bottom detail section
  const currentStage = trajectory[activeStage];

  // Bento Variant
  if (variant === 'bento') {
    return (
      <section id="goals" className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-3 rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-8 text-white flex flex-col justify-center items-center text-center shadow-lg shadow-black/25">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>{goals.title}</h2>
          <p className="max-w-2xl text-white/80">Our mission is to transform neonatal care through technology.</p>
        </div>

        {goals.objectives.map((objective, i) => (
          <div key={objective} className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 flex flex-col gap-4 hover:border-blue-300/30 transition-colors shadow-md shadow-black/20">
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-blue-200">
              {i % 3 === 0 ? <Target size={20} /> : i % 3 === 1 ? <TrendingUp size={20} /> : <ShieldCheck size={20} />}
            </div>
            <p className="text-white/85 font-medium">{objective}</p>
          </div>
        ))}

        <div className="md:col-span-3 rounded-3xl border border-white/10 bg-white/[0.08] backdrop-blur-2xl p-8 shadow-xl shadow-black/30">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Growth Trajectory</h3>
                <p className="text-xs text-white/60">Solving NICU challenges through scalable adoption</p>
              </div>
              <div className="flex flex-wrap gap-3 text-[0.6rem] uppercase tracking-wider">
                {chartSeries.map((series) => (
                  <span key={series.id} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                    {/* Legend Indicator - Primary Blue */}
                    <span className="inline-flex h-2 w-2 rounded-full" style={{ background: "#3b82f6" }} aria-hidden />
                    <span className="text-white/70">{series.id}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* CHART CONTAINER */}
            <div className="relative w-full rounded-2xl border border-white/15 bg-gradient-to-b from-blue-500/10 to-transparent backdrop-blur-xl p-4 md:p-8 pb-32 shadow-2xl hidden md:block overflow-visible">

              <div className="relative w-full h-[450px] select-none overflow-visible" ref={chartContainerRef}>

                {/* HTML LAYER: Grid Lines */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  {helperGuides.map((guide) => (
                    <div key={guide.id} className="absolute w-full flex items-center" style={{ top: `${guide.top}%` }}>
                      <div className="w-full border-t border-dashed border-white/10" />
                      <span className="absolute left-0 -translate-y-[140%] text-[10px] font-medium text-white/30 pl-1">
                        {guide.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* SVG LAYER: Lines & Areas */}
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="absolute inset-0 w-full h-full z-10 overflow-visible pointer-events-none"
                >
                  <defs>
                    {/* Growing Animation Clip Path */}
                    <clipPath id="chart-grow-clip">
                      <rect
                        x="0"
                        y="0"
                        width={chartRevealed ? "100%" : "0%"}
                        height="100%"
                        style={{ transition: "width 1400ms cubic-bezier(0.19, 1, 0.22, 1)" }}
                      />
                    </clipPath>

                    {/* Gradient Definitions */}
                    {chartSeries.map((series, index) => (
                      <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
                      </linearGradient>
                    ))}
                  </defs>

                  {/* Group wrapped in ClipPath for Growth Animation */}
                  <g clipPath="url(#chart-grow-clip)">
                    {/* Areas (Primary Blue) */}
                    {chartSeries.map((series, index) => {
                      const areaPath = `M ${series.points[0].x} 100 L ${series.points.map(p => `${p.x} ${p.y}`).join(" L ")} L ${series.points[series.points.length - 1].x} 100 Z`;
                      return (
                        <path
                          key={`area-${index}`}
                          d={areaPath}
                          fill={`url(#gradient-${index})`}
                          className="transition-all duration-500"
                        />
                      );
                    })}

                    {/* Lines (Primary Blue Stroke) */}
                    {chartSeries.map((series, index) => (
                      <path
                        key={`line-${index}`}
                        d={buildPath(series.points)}
                        fill="none"
                        stroke={series.stroke}
                        strokeWidth="1.6"
                        vectorEffect="non-scaling-stroke"
                        className="transition-all duration-500"
                      />
                    ))}
                  </g>

                  {/* Vertical Indicator Line */}
                  {(() => {
                    const idx = hoveredYear !== null ? hoveredYear : activeStage;
                    const point = interactionPoints[idx];
                    if (!point) return null;
                    return (
                      <line
                        x1={point.x}
                        x2={point.x}
                        y1="0"
                        y2="100"
                        stroke="rgba(96,165,250,0.4)"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                        vectorEffect="non-scaling-stroke"
                        className="transition-all duration-300"
                      />
                    );
                  })()}
                </svg>

                {/* HTML LAYER: Interactive Dots, Labels, Tooltips */}
                <div className="absolute inset-0 z-20">
                  {interactionPoints.map((point, index) => {
                    const isActive = activeStage === index;
                    const isHovered = hoveredYear === index;
                    const currentData = trajectory[index];
                    const isKeyYear = point.year === "2025";

                    // Logic to determine popup position to avoid clipping
                    const isLeftAligned = index < 2;
                    const isRightAligned = index > 3;

                    // Determine Dot Styling
                    const baseSize = isKeyYear ? "w-4 h-4" : "w-2 h-2";
                    const activeSize = isKeyYear ? "w-4 h-4 ring-2 ring-blue-500/50" : "w-3 h-3 ring-2 ring-blue-400/30";

                    return (
                      <div
                        key={`point-${index}`}
                        className={`absolute group transition-opacity duration-700 delay-500 ${detailsVisible ? 'opacity-100' : 'opacity-0'}`}
                        style={{ left: `${point.x}%`, top: 0, bottom: 0, width: '1px' }}
                      >

                        {/* --- FLOATING POPUP --- */}
                        {detailsVisible && isActive && (
                          <div className={`absolute bottom-[20%] z-50 animate-in fade-in slide-in-from-bottom-4 duration-300 ${isLeftAligned ? 'left-4 origin-bottom-left' : isRightAligned ? 'right-4 origin-bottom-right' : 'left-1/2 -translate-x-1/2 origin-bottom'}`}>
                            <div className={`relative bg-[#0b172a]/95 backdrop-blur-xl border rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] p-5 w-[300px] overflow-hidden ${isKeyYear ? 'border-blue-400/40 shadow-blue-500/20' : 'border-white/10'}`}>

                              {/* Glowing effect for key year */}
                              {isKeyYear && <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-blue-500/20 blur-[60px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />}

                              {/* Header inside Popup */}
                              <div className="relative flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${isKeyYear ? 'bg-blue-600 shadow-blue-500/30' : 'bg-white/10 border border-white/10'}`}>
                                  <currentData.icon className={`w-5 h-5 ${isKeyYear ? 'text-white' : 'text-blue-200'}`} />
                                </div>
                                <div>
                                  <h4 className="text-lg font-bold text-white leading-tight">{currentData.title}</h4>
                                  <p className="text-[10px] text-white/50 font-medium tracking-wide uppercase mt-0.5">{point.year} Milestone</p>
                                </div>
                              </div>

                              {/* Stats Grid inside Popup */}
                              <div className="relative grid grid-cols-2 gap-2 mb-4">
                                {/* Users */}
                                <div className="bg-white/5 rounded-lg p-2.5 border border-white/5 hover:bg-white/10 transition-colors">
                                  <div className="flex items-center gap-1.5 mb-1">
                                    <Users className="w-3 h-3 text-blue-400" />
                                    <span className="text-[9px] text-white/50 uppercase font-semibold">Users</span>
                                  </div>
                                  <span className="text-lg font-bold text-white block leading-none">
                                    {currentData.activeUsers > 0 ? currentData.activeUsers.toLocaleString('en-US') : "-"}
                                  </span>
                                </div>

                                {/* Hospitals */}
                                <div className="bg-white/5 rounded-lg p-2.5 border border-white/5 hover:bg-white/10 transition-colors">
                                  <div className="flex items-center gap-1.5 mb-1">
                                    <Hospital className="w-3 h-3 text-blue-400" />
                                    <span className="text-[9px] text-white/50 uppercase font-semibold">Hospitals</span>
                                  </div>
                                  <span className="text-lg font-bold text-white block leading-none">
                                    {currentData.hospitals > 0 ? currentData.hospitals.toLocaleString('en-US') : "-"}
                                  </span>
                                </div>

                                {/* Parents Helped (Full Width) */}
                                <div className="col-span-2 bg-white/5 rounded-lg p-2.5 border border-white/5 hover:bg-white/10 transition-colors flex items-center justify-between">
                                  <div className="flex items-center gap-1.5">
                                    <HeartHandshake className="w-3 h-3 text-blue-400" />
                                    <span className="text-[9px] text-white/50 uppercase font-semibold">Parents Helped</span>
                                  </div>
                                  <span className="text-lg font-bold text-white leading-none">
                                    {currentData.parentsHelped > 0 ? currentData.parentsHelped.toLocaleString('en-US') : "-"}
                                  </span>
                                </div>
                              </div>

                              {/* Small Goal / Focus Section */}
                              {currentData.parentSupport && (
                                <div className="relative flex items-start gap-2 pt-3 border-t border-white/10">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                                  <p className="text-[10px] text-white/60 leading-tight">
                                    <span className="text-blue-200/80 font-medium">Goal: </span>
                                    {currentData.parentSupport}
                                  </p>
                                </div>
                              )}

                              {/* Connector Arrow */}
                              <div className={`absolute -bottom-1.5 w-3 h-3 bg-[#0b172a] border-r border-b rotate-45 ${isKeyYear ? 'border-blue-400/40' : 'border-white/10'} ${isLeftAligned ? 'left-5' : isRightAligned ? 'right-5' : 'left-1/2 -translate-x-1/2'}`}></div>
                            </div>
                          </div>
                        )}

                        {/* X-Axis Label */}
                        <button
                          onClick={() => setActiveStage(index)}
                          onMouseEnter={() => setHoveredYear(index)}
                          onMouseLeave={() => setHoveredYear(null)}
                          className={`absolute bottom-[-30px] -translate-x-1/2 text-xs font-medium transition-colors duration-200 py-1 px-2 rounded-md ${isActive || isKeyYear
                            ? 'text-blue-300 bg-blue-500/10'
                            : 'text-white/40 hover:text-white/70'
                            }`}
                        >
                          {point.year}
                        </button>

                        {/* Interaction Dots */}
                        {chartSeries.map((series) => {
                          const seriesPoint = series.points[index];
                          return (
                            <div
                              key={`dot-${series.id}-${index}`}
                              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300"
                              style={{ top: `${seriesPoint.y}%`, left: 0 }}
                            >
                              <div
                                className={`rounded-full border transition-all duration-300 flex items-center justify-center 
                                  ${isActive || isHovered ? `${activeSize} border-white bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]` : `${baseSize} border-transparent ${isKeyYear ? 'bg-blue-500 border-white/80 border animate-pulse' : 'bg-blue-500/50'}`}
                                 `}
                              >
                                {isKeyYear && <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm" />}
                              </div>
                            </div>
                          )
                        })}

                        {/* Hover Hit Area */}
                        <div
                          className="absolute -left-4 w-8 h-full bg-transparent cursor-pointer"
                          onClick={() => setActiveStage(index)}
                          onMouseEnter={() => setHoveredYear(index)}
                          onMouseLeave={() => setHoveredYear(null)}
                        />
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* X-Axis Title */}
              <div className="absolute bottom-6 left-0 w-full text-center pointer-events-none">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-semibold">Year</span>
              </div>

            </div>
          </div>

          {/* --- BOTTOM DESCRIPTION SECTION --- */}
          <div className="md:col-span-3 rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-8 shadow-lg shadow-black/25 mt-4 hidden md:block">
            <div
              key={activeStage}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-500"
            >
              {/* Left: Title & Header */}
              <div className="lg:col-span-1 space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/20">
                    {currentStage.year} Milestone
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  {currentStage.title}
                </h3>
                <div className="flex items-center gap-3 mt-4 text-blue-200/60 text-sm">
                  <currentStage.icon className="w-5 h-5 text-blue-400" />
                  <span className="uppercase tracking-wide text-xs font-semibold">Stage Focus</span>
                </div>
              </div>

              {/* Right: Description & Detail */}
              <div className="lg:col-span-2 flex flex-col justify-center">
                <p className="text-lg text-white/80 leading-relaxed font-light">
                  {currentStage.description}
                </p>

                {currentStage.parentSupport && (
                  <div className="mt-4 flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="mt-1 bg-blue-500/20 p-1.5 rounded-full">
                      <ArrowRight className="w-3 h-3 text-blue-400" />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-blue-200/50 font-bold mb-0.5">Primary Objective</span>
                      <span className="text-sm text-blue-100/90">{currentStage.parentSupport}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* --- MOBILE GOALS VIEW (Timeline) --- */}
          <div className="md:col-span-3 md:hidden flex flex-col gap-6 mt-4">
            {trajectory.map((stage, index) => (
              <div key={stage.year} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                    <stage.icon className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{stage.year}</span>
                    <h3 className="text-xl font-bold text-white">{stage.title}</h3>
                  </div>
                </div>

                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  {stage.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Users className="w-3 h-3 text-blue-400" />
                      <span className="text-[9px] text-white/50 uppercase font-semibold">Users</span>
                    </div>
                    <span className="text-lg font-bold text-white block leading-none">
                      {stage.activeUsers > 0 ? stage.activeUsers.toLocaleString('en-US') : "-"}
                    </span>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Hospital className="w-3 h-3 text-blue-400" />
                      <span className="text-[9px] text-white/50 uppercase font-semibold">Hospitals</span>
                    </div>
                    <span className="text-lg font-bold text-white block leading-none">
                      {stage.hospitals > 0 ? stage.hospitals.toLocaleString('en-US') : "-"}
                    </span>
                  </div>
                </div>

                {stage.parentSupport && (
                  <div className="flex items-start gap-2 pt-3 border-t border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-white/70">
                      <span className="text-blue-200/80 font-medium">Goal: </span>
                      {stage.parentSupport}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  }

  // Centered Variant
  if (variant === 'centered') {
    return (
      <section id="goals" className="py-20 px-6 bg-white/5 rounded-[3rem] my-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>{goals.title}</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
        </div>
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.objectives.map((objective) => (
            <div key={objective} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
              <CheckCircle2 className="mt-1 h-5 w-5 text-blue-400 shrink-0" />
              <span className="text-lg text-white/80">{objective}</span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Default / Split
  return (
    <section id="goals" className="rounded-[26px] px-10 py-12 bg-[#071a2d]">
      <div className="space-y-12 text-white">
        <div className="flex flex-col lg:flex-row-reverse gap-12">
          <div className="lg:w-1/3 space-y-6">
            <div className="text-blue-400 text-sm font-semibold tracking-wide uppercase">Impact metrics</div>
            <h2
              className="text-3xl text-blue-100"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {goals.title}
            </h2>
            {/* Goals Image */}
            <div className="aspect-square w-full rounded-2xl border border-white/10 bg-white/5 relative overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2670&auto=format&fit=crop"
                alt="Mother and Child"
                fill
                className="object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#071a2d]/90" />
            </div>
          </div>

          <div className="lg:w-2/3">
            <ul className="space-y-3 text-base text-white/75">
              {goals.objectives.map((objective) => (
                <li
                  key={objective}
                  className="flex items-start gap-3 rounded-[18px] border border-[#15324f]/60 bg-[#0a2239] p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-blue-400 shrink-0" />
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;