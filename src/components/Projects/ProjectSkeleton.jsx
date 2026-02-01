export default function ProjectSkeleton() {
  return (
    <div className="rounded-2xl shadow-md border border-gray-200 overflow-hidden">
      {/* Изображение */}
      <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />

      {/* Контент */}
      <div className="p-4 space-y-3">
        <div className="h-4 w-2/3 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
        <div className="h-3 w-full rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
        <div className="h-3 w-1/2 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />

        <div className="flex gap-2">
          <div className="h-5 w-10 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
          <div className="h-5 w-14 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
