'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
}

export default function ViewBookPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      console.log('Fetching book with ID:', id);
      try {
        const res = await fetch(`https://book-management-api-jvxp.onrender.com/api/v1/books/${id}`);
        if (!res.ok) {
          const errorData = await res.json();
          console.error('API Error:', errorData);
          throw new Error('Failed to fetch book');
        }
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error('Fetch error:', err);
        alert('Could not load book.');
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  const handleEdit = (id:string) => {
    router.push(`/update/${id}`)
  }

  return (
    <div className="min-h-screen p-8 bg-white text-black">
      <button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 border rounded-md hover:text-teal-600"
      >
        &larr; Back to Books
      </button>

      {book && (
        <div className="border border-gray-200 p-6 rounded-md bg-white text-black shadow-md w-fit space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-3xl font-bold">{book.title}</p>
              <p className="text-gray-700"><strong>by</strong> {book.author}</p>
            </div>
            <button
              onClick={() =>  handleEdit(book.id)}
              className="ml-auto px-4 py-1 bg-teal-500 text-white rounded hover:bg-teal-400"
            >
              Edit
            </button>
          </div>
          <p>
            <strong>ISBN<br /></strong>
            <span className="bg-teal-500 text-white px-4 py-1 rounded-2xl">{book.isbn}</span>
          </p>
          <p>
            <strong>Published Year<br /></strong>
            <span>{book.publishedYear}</span>
          </p>
          <p className="text-xs text-gray-500 pt-4 border-t">
            <strong>Book ID:</strong> {String(id)}
          </p>
        </div>
      )}
    </div>
  );
}
