import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h2 className="text-6xl font-bold text-white mb-4">404</h2>
        <h3 className="text-2xl font-bold text-white mb-4">Resource Not Found</h3>
        <p className="text-slate-400 mb-8">
          The technical article you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/resources">
          <Button className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500">
            Browse All Resources
          </Button>
        </Link>
      </div>
    </div>
  );
}
