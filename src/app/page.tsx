import Hero from '@/components/home/Hero';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050505]">
      <Hero />
      
      {/* Featured Projects Section */}
      <section className="py-24 px-6 border-b border-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-label mb-2">Registry</p>
              <h2 className="text-2xl font-bold uppercase tracking-tight italic">Featured Nodes</h2>
            </div>
            <Link href="/projects" className="text-[10px] font-bold uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-colors">
              Access Full Directory →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#0c0c0c] border border-white/5 rounded-lg p-6 group hover:border-white/10 transition-all">
                <div className="h-40 bg-white/[0.01] border border-white/[0.03] rounded mb-6 flex items-center justify-center p-4">
                   <div className="w-full h-full bg-white/[0.02] rounded flex items-center justify-center border border-white/[0.03] group-hover:scale-[1.01] transition-transform">
                      <span className="text-gray-800 text-[10px] font-bold tracking-widest uppercase">Node_Data_{i}</span>
                   </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="px-1.5 py-0.5 text-[9px] font-bold bg-white/5 text-gray-400 rounded uppercase">Audit</span>
                    <span className="px-1.5 py-0.5 text-[9px] font-bold bg-blue-500/10 text-blue-500 rounded uppercase">LTS</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-200 uppercase tracking-tighter group-hover:text-white transition-colors">
                      SecureVault Core {i}
                    </h3>
                    <p className="text-gray-500 text-[11px] font-medium leading-normal mt-1 line-clamp-2">
                      A high-density vault node for cryptographic asset management and decentralized identity scaling.
                    </p>
                  </div>
                  <div className="pt-4 flex items-center justify-between border-t border-white/[0.03]">
                    <div className="flex -space-x-1">
                      {[1, 2, 3].map(u => (
                        <div key={u} className="w-5 h-5 rounded border border-[#050505] bg-white/5 flex items-center justify-center text-[8px] font-bold text-gray-600">
                          {u}
                        </div>
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-700 font-bold uppercase tracking-widest italic group-hover:text-blue-900 transition-colors">Verified Node</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Hackathons Preview */}
      <section className="py-24 px-6 bg-[#080808]/50 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
        <div className="max-w-6xl mx-auto">
           <div className="mb-16">
              <p className="text-label mb-2 text-center">Global Sprints</p>
              <h2 className="text-2xl font-bold uppercase tracking-tight text-center italic">Active Deployment Challenges</h2>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[1, 2].map(i => (
                <div key={i} className="flex flex-col md:flex-row bg-[#0c0c0c] border border-white/5 rounded-lg overflow-hidden hover:border-blue-500/30 transition-all duration-500 group">
                  <div className="md:w-1/4 bg-white/[0.02] flex flex-col items-center justify-center p-8 text-center border-r border-white/5">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-600 mb-2">ETA</span>
                    <span className="text-3xl font-black text-white italic">1{i}D</span>
                  </div>
                  <div className="md:w-3/4 p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold mb-2 uppercase tracking-tight text-gray-200 group-hover:text-blue-500 transition-colors italic">CyberShield Global {i}</h3>
                      <p className="text-[11px] text-gray-500 font-medium mb-6 uppercase tracking-tighter leading-snug">Coordinate with 500+ nodes in a global firewall sprint.</p>
                    </div>
                    <div className="flex items-center justify-between border-t border-white/[0.03] pt-6">
                      <div className="flex items-center space-x-2 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                        <span>Grant:</span>
                        <span className="text-blue-500">10,000 CP</span>
                      </div>
                      <button className="text-[9px] font-bold uppercase tracking-[0.2em] text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition-all">
                        Register Node
                      </button>
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      <section className="py-24 px-6 text-center">
         <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-bold uppercase tracking-tight mb-4">Integrate with the Network</h2>
            <p className="text-xs text-gray-500 uppercase tracking-tighter mb-8 italic">Submit your node data and join the next generation of secure innovation.</p>
            <div className="flex items-center justify-center space-x-4">
               <Link href="/login" className="btn-primary">Connect Identity</Link>
               <Link href="/about" className="btn-secondary">Technical Docs</Link>
            </div>
         </div>
      </section>
    </div>
  );
}
