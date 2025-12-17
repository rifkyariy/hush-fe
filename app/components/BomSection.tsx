import Image from "next/image";
import type { BillOfMaterials } from "../lib/content";

interface BomSectionProps {
  data: BillOfMaterials;
  variant?: 'default' | 'bento' | 'split' | 'centered' | 'immersive';
}

const BomSection = ({ data, variant = 'default' }: BomSectionProps) => {

  // Bento Variant
  if (variant === 'bento') {
    return (
      <section id="bom" className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-3 rounded-3xl bg-blue-900 p-8 text-white flex flex-col md:flex-row items-center justify-between border border-white/10">
          <div>
            <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>{data.title}</h2>
            <p className="text-blue-200">Transparent hardware costs.</p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <p className="text-xs uppercase tracking-widest text-blue-300">Total Budget</p>
            <p className="text-4xl font-bold text-white">{data.totalEstimatedBudget}</p>
          </div>
        </div>
        {data.items.map((item) => (
          <div key={item.part} className="rounded-3xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between hover:border-blue-500/50 transition-colors">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">{item.part}</h3>
              <p className="text-xs text-white/50 mb-4">{item.spec || "Standard Spec"}</p>
            </div>
            <div className="flex justify-between items-end border-t border-white/10 pt-4">
              <div className="text-xs text-white/40">
                Qty: <span className="text-white">{item.qty}</span>
              </div>
              <div className="text-lg font-bold text-blue-300">
                {item.totalCost} <span className="text-xs font-normal text-white/40">{data.currency}</span>
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }

  // Centered Variant
  if (variant === 'centered') {
    return (
      <section id="bom" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>{data.title}</h2>
          <div className="inline-block px-6 py-2 rounded-full bg-blue-500/20 border border-blue-500/50 text-blue-300 font-bold">
            Total: {data.totalEstimatedBudget}
          </div>
        </div>
        <div className="max-w-4xl mx-auto bg-white/5 rounded-3xl overflow-hidden border border-white/10">
          <table className="w-full text-left text-sm text-white/80">
            <thead className="bg-white/5">
              <tr className="text-xs uppercase tracking-wider text-white/50">
                <th className="py-4 px-6">Component</th>
                <th className="py-4 px-6 hidden sm:table-cell">Specification</th>
                <th className="py-4 px-6 text-center">Qty</th>
                <th className="py-4 px-6 text-right">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.items.map((item) => (
                <tr key={item.part} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-medium text-white">{item.part}</td>
                  <td className="py-4 px-6 hidden sm:table-cell text-white/50">{item.spec || "—"}</td>
                  <td className="py-4 px-6 text-center">{item.qty}</td>
                  <td className="py-4 px-6 text-right font-bold text-blue-300">{item.totalCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  // Default / Split
  return (
    <section id="bom" className="section-frame rounded-[26px] px-10 py-12">
      <div className="space-y-12 text-white">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3 space-y-6">
            <div className="ornament-divider">Hardware plan</div>
            <h2
              className="text-3xl text-gild-300"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {data.title}
            </h2>
            <p className="text-sm text-white/70">
              Transparent budgeting keeps pilots predictable and accelerates procurement.
            </p>
            {/* BOM Image */}
            <div className="aspect-[4/3] w-full rounded-2xl border border-white/10 bg-white/5 relative overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
                alt="Hardware Components"
                fill
                className="object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#071a2d]/90" />
            </div>
            <div className="rounded-[18px] border border-[#15324f]/60 bg-[#071a2d] px-6 py-4 text-center lg:text-left">
              <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Total Estimated Budget</p>
              <p className="text-2xl text-gild-300 font-bold">{data.totalEstimatedBudget}</p>
            </div>
          </div>

          <div className="lg:w-2/3 overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10 text-left text-sm text-white/80">
              <caption className="sr-only">Detailed list of hardware components required for the Hush ecosystem</caption>
              <thead>
                <tr className="text-xs uppercase tracking-[0.3em] text-white/50">
                  <th className="py-3 pr-4">Part</th>
                  <th className="py-3 pr-4">Spec</th>
                  <th className="py-3 pr-4">Qty</th>
                  <th className="py-3 pr-4">Price ({data.currency})</th>
                  <th className="py-3">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.items.map((item) => (
                  <tr key={item.part}>
                    <td className="py-3 pr-4 font-medium text-white">{item.part}</td>
                    <td className="py-3 pr-4">{item.spec || "—"}</td>
                    <td className="py-3 pr-4">{item.qty}</td>
                    <td className="py-3 pr-4">{item.price}</td>
                    <td className="py-3">{item.totalCost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BomSection;
