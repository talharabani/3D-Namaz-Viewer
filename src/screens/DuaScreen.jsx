import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import duaCategories from '../data/duas';

export default function DuaScreen() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredCategories = duaCategories.filter(cat =>
    cat.title.toLowerCase().includes(search.toLowerCase()) ||
    (cat.description && cat.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#44403c] via-[#78716c] to-[#d6d3d1]">
      <div className="w-full max-w-4xl mx-auto py-8 px-2 md:px-4 relative">
        {/* Decorative SVG background */}
        <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none select-none">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23956D37' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        <h1 className="text-3xl md:text-4xl font-heading text-brass font-bold mb-8 text-center drop-shadow">Dua Categories</h1>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search Dua category..."
          className="w-full max-w-md rounded-xl border border-brass/40 bg-[#F5F5F5] px-4 py-2 text-mocha focus:outline-none focus:ring-2 focus:ring-brass placeholder:text-wood shadow"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredCategories.length === 0 ? (
          <div className="col-span-full text-center text-wood text-lg">No categories found.</div>
        ) : (
          filteredCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => navigate(`/duas/${encodeURIComponent(cat.key)}`)}
              className="card text-center transition-transform cursor-pointer rounded-2xl group flex flex-col items-center justify-center hover:bg-[#F5F5F5] hover:text-mocha active:bg-[#F5F5F5] active:text-mocha focus:bg-[#F5F5F5] focus:text-mocha hover:scale-105 active:scale-100 hover:border-wood focus:border-wood active:border-wood hover:shadow-2xl focus:shadow-2xl active:shadow-2xl"
              aria-label={`View ${cat.title}`}
            >
              <span className="text-xl md:text-2xl font-bold text-brass mb-2 text-center drop-shadow">{cat.title}</span>
              <span className="text-sm text-wood opacity-80 text-center">{cat.description}</span>
            </button>
          ))
        )}
      </div>
    </div>
    </div>
  );
} 