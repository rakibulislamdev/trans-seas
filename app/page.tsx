import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <Link
        href="/dashboard"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Home page is under development. Click here to view the Dashboard
      </Link>
    </main>
  );
}
