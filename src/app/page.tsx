"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaBookOpen } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: number;
  publishedYear: number;
}

export default function Home() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/books"
      );

      // Assuming API returns an array of books directly
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAdd = () => {
    router.push("/posts");
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/v1/books/${id}`
      );
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleUpdate = (id: string) => {
    router.push(`/update/${id}`);
  };

  const handleView = (id: string) => {
    router.push(`/view/${id}`);
  };

  return (
    <div className="bg-white p-8 overflow-auto flex flex-col">
      <div className="flex justify-end mb-8">
        <button
          className="flex items-center space-x-2 bg-teal-700 text-white px-5 py-2 rounded-md hover:bg-teal-600 transition font-semibold"
          onClick={handleAdd}
        >
          <FaPlus />
          <span>Add Book</span>
        </button>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex-grow">
        <h2 className="text-lg text-black font-semibold mb-6 border-b border-gray-300 pb-2">
          Books
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300 border-separate border-spacing-y-3">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-black font-bold border-b border-gray-200">Title</th>
                <th className="px-4 py-2 text-left text-black font-bold border-b border-gray-200">Author</th>
                <th className="px-4 py-2 text-left text-black font-bold border-b border-gray-200">ISBN</th>
                <th className="px-4 py-2 text-left text-black font-bold border-b border-gray-200">Published Year</th>
                <th className="px-4 py-2 text-left text-black font-bold border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id} className="hover:bg-gray-50 text-black">
                  <td className="px-4 py-2 border-b border-gray-200">{book.title}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{book.author}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{book.isbn}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{book.publishedYear}</td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    <div className="flex space-x-4">
                      <FaBookOpen onClick={() => handleView(book._id)} className="text-teal-600 cursor-pointer" />
                      <FiEdit onClick={() => handleUpdate(book._id)} className="text-teal-600 cursor-pointer" />
                      <RiDeleteBin6Line onClick={() => handleDelete(book._id)} className="text-red-600 cursor-pointer" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
