// next
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <Link
      href="/"
      className="flex h-screen w-screen flex-col items-center justify-center"
    >
      <div className="max-w-lg p-4 text-center">
        <h1 className="pb-2 text-xl font-bold">404 Not Found</h1>
        <p>
          Sorry, but the page you are looking for does not exist. Click anywhere
          to go home.
        </p>
      </div>
    </Link>
  );
}
