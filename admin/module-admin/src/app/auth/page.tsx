import Auth from '@/components/forms/Auth'
import Link from 'next/link'

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function Page() {
  await delay(2000); // 2 saniye

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-8">Counter Page</h1>
      <Auth />
      <Link href="/" className="mt-8 text-blue hover:underline">
        Back to Home
      </Link>
    </main>
  )
}