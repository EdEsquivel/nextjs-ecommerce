/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">Page not found</p>
                // eslint-disable-next-line react/no-unescaped-entities
                <p className="text-gray-500 mb-8">Sorry, the page you're looking for doesn't exist.</p>
                <Link
                    href="/products"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}