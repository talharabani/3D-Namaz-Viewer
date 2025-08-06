import { useParams } from 'react-router-dom';
import { duasByCategory, duaCategories } from '../data/duas';

export default function DuaListScreen() {
  const { category } = useParams();
  const categoryInfo = duaCategories.find(cat => cat.key === category);
  const duas = duasByCategory[category] || [];

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#44403c] via-[#78716c] to-[#d6d3d1]">
      <div className="w-full max-w-3xl mx-auto py-8 px-2 md:px-4 relative">
        {/* Decorative SVG background */}
        <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none select-none">
          <div className="w-full h-full" style={{
            backgroundImage: `url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23956D37' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        <h1 className="text-2xl md:text-3xl font-heading text-brass font-bold mb-6 text-center drop-shadow">
          {categoryInfo ? categoryInfo.title : 'Duas'}
        </h1>
        {/* Handsome Checklist Card for aftersalah */}
        {category === 'aftersalah' && (
          <div className="relative max-w-xl mx-auto mb-8 p-6 rounded-3xl bg-gradient-to-br from-[#F5F5F5] via-[#fffbe6] to-[#f7ecd7] shadow-xl border border-wood group transition-all duration-200 hover:scale-105 hover:shadow-2xl">
            {/* Decorative floating icon */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center justify-center w-14 h-14 rounded-full bg-brass shadow-lg border-4 border-[#fffbe6] z-10">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="mt-8 text-xl md:text-2xl font-arabic text-brass text-center font-bold tracking-wide drop-shadow-sm">
              Daily Dhikr After Salah
            </div>
            <div className="text-sm text-wood italic text-center mb-2">
              Summary Checklist
            </div>
            <ul className="text-base text-mocha dark:text-darktext space-y-2 mt-2">
              {["Astaghfirullah ×3",
                "Allahumma Anta As-Salaam ×1",
                "SubhanAllah ×33",
                "Alhamdulillah ×33",
                "Allahu Akbar ×34",
                "Kalima Tawheed ×1–10",
                "Ayat-ul-Kursi ×1",
                "Ikhlas + Falaq + Nas ×1 each",
                "Allahumma Ajirni min an-Nar ×7 (Maghrib/Fajr)",
                "Dua for worship (O Allah help me...) ×1"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 pl-2">
                  <span className="inline-block w-5 h-5 rounded-full bg-brass text-white text-xs flex items-center justify-center shadow-sm">{idx+1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex flex-col gap-6">
          {duas.length === 0 ? (
            <div className="text-center text-wood text-lg">No Duas found for this category.</div>
          ) : (
            duas.map((dua, idx) => (
              <div key={idx} className="card flex flex-col gap-2 transition-transform cursor-pointer rounded-2xl group hover:bg-[#F5F5F5] hover:text-mocha active:bg-[#F5F5F5] active:text-mocha focus:bg-[#F5F5F5] focus:text-mocha hover:border-wood focus:border-wood active:border-wood hover:shadow-2xl focus:shadow-2xl active:shadow-2xl">
                <div className="text-lg md:text-xl font-arabic text-brass text-right leading-loose">{dua.arabic}</div>
                <div className="text-sm text-wood italic">{dua.transliteration}</div>
                <div className="text-base text-text dark:text-darktext">{dua.translation}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 