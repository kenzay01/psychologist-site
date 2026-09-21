import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Сторінку не знайдено. Перевірте адресу або поверніться на головну.
      </p>
      <Link
        href="/uk"
        className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
      >
        На головну
      </Link>
    </main>
  );
}
