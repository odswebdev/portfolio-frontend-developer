import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, ChevronDown, SlidersHorizontal, Search } from "lucide-react";

// -----------------------------
// ВСПОМОГАТЕЛЬНЫЕ ДАННЫЕ И ТИПЫ
// -----------------------------
const TYPES = [
  { key: "all", label: "Все" },
  { key: "commercial", label: "Коммерческие" },
  { key: "pet", label: "Pet-проекты" },
  { key: "study", label: "Учебные" },
] as const;

const FORMATS = [
  { key: "landing", label: "Лендинги" },
  { key: "vizitka", label: "Визитки" },
  { key: "shop", label: "Магазины" },
  { key: "ticket", label: "Тикет-системы" },
  { key: "dashboard", label: "Dashboards" },
  { key: "mobile", label: "Мобильные" },
] as const;

const TECHS = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Framer Motion",
  "Redux",
  "Zustand",
  "Node.js",
  "Express",
  "MongoDB",
  "Firebase",
  "Vite",
];

const SORTS = [
  { key: "new", label: "Сначала новые" },
  { key: "old", label: "Сначала старые" },
  { key: "az", label: "По названию A→Z" },
  { key: "za", label: "По названию Z→A" },
];

// Пример данных проектов (замените своими)
const SAMPLE_PROJECTS = [
  {
    id: 1,
    title: "Ecom Pulse",
    type: "commercial",
    format: "shop",
    tech: ["Next.js", "TypeScript", "Tailwind", "Zustand"],
    date: "2025-06-10",
    image: "https://images.unsplash.com/photo-1557825835-70d97c4aa067?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "HelpDesk Lite",
    type: "pet",
    format: "ticket",
    tech: ["React", "Tailwind", "Firebase"],
    date: "2025-03-18",
    image: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Marketing OnePager",
    type: "commercial",
    format: "landing",
    tech: ["Vite", "React", "Tailwind"],
    date: "2024-11-02",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Pocket Tasks",
    type: "pet",
    format: "mobile",
    tech: ["React", "TypeScript", "Redux"],
    date: "2025-01-25",
    image: "https://images.unsplash.com/photo-1484807352052-23338990c6c6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Analytics Board",
    type: "commercial",
    format: "dashboard",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    date: "2025-05-04",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Personal Card",
    type: "study",
    format: "vizitka",
    tech: ["React", "Tailwind"],
    date: "2024-09-20",
    image: "https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1200&auto=format&fit=crop",
  },
] as const;

// -----------------------------
// УТИЛИТЫ
// -----------------------------
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

// -----------------------------
// ОСНОВНОЙ КОМПОНЕНТ
// -----------------------------
export default function ProjectGalleryWithFilters() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<(typeof TYPES)[number]["key"]>("all");
  const [formats, setFormats] = useState<Set<string>>(new Set());
  const [techs, setTechs] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<(typeof SORTS)[number]["key"]>("new");

  // UI состояния
  const [openDesktopPanel, setOpenDesktopPanel] = useState(false);
  const [openMobileSheet, setOpenMobileSheet] = useState(false);

  const filtered = useMemo(() => {
    let arr = [...SAMPLE_PROJECTS];

    // Поиск
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      arr = arr.filter((p) =>
        [p.title, p.type, p.format, ...p.tech].join(" ").toLowerCase().includes(q)
      );
    }

    // Тип
    if (type !== "all") {
      arr = arr.filter((p) => p.type === type);
    }

    // Форматы
    if (formats.size) {
      arr = arr.filter((p) => formats.has(p.format));
    }

    // Технологии (пересечение)
    if (techs.size) {
      arr = arr.filter((p) => p.tech.some((t) => techs.has(t)));
    }

    // Сортировка
    arr.sort((a, b) => {
      switch (sort) {
        case "old":
          return +new Date(a.date) - +new Date(b.date);
        case "az":
          return a.title.localeCompare(b.title);
        case "za":
          return b.title.localeCompare(a.title);
        case "new":
        default:
          return +new Date(b.date) - +new Date(a.date);
      }
    });

    return arr;
  }, [query, type, formats, techs, sort]);

  const toggleSet = (set: Set<string>, value: string) => {
    const n = new Set(set);
    n.has(value) ? n.delete(value) : n.add(value);
    return n;
  };

  const clearFilters = () => {
    setQuery("");
    setType("all");
    setFormats(new Set());
    setTechs(new Set());
    setSort("new");
  };

  // -----------------------------
  // РЕНДЕР
  // -----------------------------
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Заголовок + поиск */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Проекты</h1>
            <p className="text-sm text-slate-500">Фильтр: ПК — табы сверху + боковая панель. Мобила — нижняя панель.</p>
          </div>

          <div className="flex w-full md:w-auto items-center gap-2">
            <div className="relative flex-1 md:w-80">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по названию, стеку..."
                className="w-full rounded-2xl border border-slate-200 bg-white/70 backdrop-blur px-10 py-2 outline-none focus:ring-2 focus:ring-slate-300 shadow-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>

            {/* ПК: кнопка боковой панели */}
            <button
              onClick={() => setOpenDesktopPanel(true)}
              className="hidden md:inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-3 py-2 shadow-sm hover:shadow transition"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Расширенный фильтр
            </button>

            {/* Мобила: кнопка нижней панели */}
            <button
              onClick={() => setOpenMobileSheet(true)}
              className="md:hidden inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-3 py-2 shadow-sm hover:shadow transition"
            >
              <Filter className="h-4 w-4" />
              Фильтр
            </button>
          </div>
        </div>

        {/* ПК: ТАБЫ СВЕРХУ */}
        <div className="mt-6 space-y-3">
          {/* 1-я строка: типы */}
          <div className="flex flex-wrap items-center gap-2">
            {TYPES.map((t) => (
              <button
                key={t.key}
                onClick={() => setType(t.key)}
                className={cn(
                  "rounded-2xl px-4 py-2 text-sm shadow-sm border transition",
                  type === t.key
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white border-slate-200 hover:shadow"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* 2-я строка: форматы */}
          <div className="flex flex-wrap items-center gap-2">
            {FORMATS.map((f) => {
              const active = formats.has(f.key);
              return (
                <button
                  key={f.key}
                  onClick={() => setFormats((s) => toggleSet(s, f.key))}
                  className={cn(
                    "rounded-2xl px-4 py-2 text-sm shadow-sm border transition",
                    active
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white border-slate-200 hover:shadow"
                  )}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Сортировка */}
          <div className="flex items-center gap-2">
            <div className="text-sm text-slate-500">Сортировка:</div>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="appearance-none rounded-2xl border border-slate-200 bg-white/70 px-4 py-2 pr-8 text-sm shadow-sm focus:ring-2 focus:ring-slate-300"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>

            <button
              onClick={clearFilters}
              className="ml-auto rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm hover:shadow"
            >
              Сбросить
            </button>
          </div>
        </div>

        {/* Сетка проектов */}
        <motion.div
          layout
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filtered.map((p) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="relative">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-44 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold leading-tight">{p.title}</h3>
                    <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-[10px] uppercase tracking-wide text-slate-600">
                      {FORMATS.find((f) => f.key === p.format)?.label}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {formatDate(p.date)} • {TYPES.find((t) => t.key === p.type)?.label}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-slate-50 px-2 py-1 text-xs text-slate-600 border border-slate-200"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ПК: Боковая панель расширенного фильтра */}
      <AnimatePresence>
        {openDesktopPanel && (
          <motion.aside
            key="desktop-panel"
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 320, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="hidden md:block fixed right-0 top-0 h-full w-[320px] border-l border-slate-200 bg-white shadow-xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <div className="font-semibold">Расширенный фильтр</div>
              <button
                onClick={() => setOpenDesktopPanel(false)}
                className="rounded-full p-1 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 space-y-6 overflow-y-auto h-[calc(100%-64px)]">
              <section>
                <h4 className="text-sm font-medium mb-2">Форматы</h4>
                <div className="flex flex-wrap gap-2">
                  {FORMATS.map((f) => {
                    const active = formats.has(f.key);
                    return (
                      <button
                        key={f.key}
                        onClick={() => setFormats((s) => toggleSet(s, f.key))}
                        className={cn(
                          "rounded-2xl px-3 py-1.5 text-sm border",
                          active ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200"
                        )}
                      >
                        {f.label}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section>
                <h4 className="text-sm font-medium mb-2">Технологии</h4>
                <div className="flex flex-wrap gap-2">
                  {TECHS.map((t) => {
                    const active = techs.has(t);
                    return (
                      <button
                        key={t}
                        onClick={() => setTechs((s) => toggleSet(s, t))}
                        className={cn(
                          "rounded-full px-3 py-1.5 text-sm border",
                          active ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200"
                        )}
                      >
                        #{t}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section>
                <h4 className="text-sm font-medium mb-2">Сортировка</h4>
                <div className="flex flex-wrap gap-2">
                  {SORTS.map((s) => (
                    <button
                      key={s.key}
                      onClick={() => setSort(s.key as any)}
                      className={cn(
                        "rounded-2xl px-3 py-1.5 text-sm border",
                        sort === s.key ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </section>

              <div className="pt-2">
                <button
                  onClick={clearFilters}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm hover:shadow"
                >
                  Сбросить
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Мобила: Нижняя панель (sheet) */}
      <AnimatePresence>
        {openMobileSheet && (
          <>
            {/* Подложка */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 md:hidden"
              onClick={() => setOpenMobileSheet(false)}
            />

            {/* Само окно */}
            <motion.div
              key="sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 md:hidden rounded-t-3xl bg-white shadow-2xl"
            >
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <div className="font-semibold">Фильтры</div>
                <button
                  onClick={() => setOpenMobileSheet(false)}
                  className="rounded-full p-1 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4 space-y-6 max-h-[70vh] overflow-y-auto">
                <section>
                  <h4 className="text-sm font-medium mb-2">Тип</h4>
                  <div className="flex flex-wrap gap-2">
                    {TYPES.map((t) => (
                      <button
                        key={t.key}
                        onClick={() => setType(t.key)}
                        className={cn(
                          "rounded-2xl px-3 py-1.5 text-sm border",
                          type === t.key ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200"
                        )}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="text-sm font-medium mb-2">Форматы</h4>
                  <div className="flex flex-wrap gap-2">
                    {FORMATS.map((f) => {
                      const active = formats.has(f.key);
                      return (
                        <button
                          key={f.key}
                          onClick={() => setFormats((s) => toggleSet(s, f.key))}
                          className={cn(
                            "rounded-2xl px-3 py-1.5 text-sm border",
                            active ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200"
                          )}
                        >
                          {f.label}
                        </button>
                      );
                    })}
                  </div>
                </section>

                <section>
                  <h4 className="text-sm font-medium mb-2">Технологии</h4>
                  <div className="flex flex-wrap gap-2">
                    {TECHS.map((t) => {
                      const active = techs.has(t);
                      return (
                        <button
                          key={t}
                          onClick={() => setTechs((s) => toggleSet(s, t))}
                          className={cn(
                            "rounded-full px-3 py-1.5 text-sm border",
                            active ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200"
                          )}
                        >
                          #{t}
                        </button>
                      );
                    })}
                  </div>
                </section>

                <section>
                  <h4 className="text-sm font-medium mb-2">Сортировка</h4>
                  <div className="flex flex-wrap gap-2">
                    {SORTS.map((s) => (
                      <button
                        key={s.key}
                        onClick={() => setSort(s.key as any)}
                        className={cn(
                          "rounded-2xl px-3 py-1.5 text-sm border",
                          sort === s.key ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200"
                        )}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </section>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={clearFilters}
                    className="flex-1 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm hover:shadow"
                  >
                    Сбросить
                  </button>
                  <button
                    onClick={() => setOpenMobileSheet(false)}
                    className="flex-1 rounded-2xl bg-slate-900 text-white px-3 py-2 text-sm shadow-sm hover:shadow"
                  >
                    Применить
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}