"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdateBook() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    publishedYear: "",
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`https://book-management-api-jvxp.onrender.com/api/v1/books/${id}`);
        if (!res.ok) throw new Error("Failed to fetch book");
        const data = await res.json();
        setFormData({
          title: data.title,
          author: data.author,
          isbn: String(data.isbn),
          publishedYear: String(data.publishedYear),
        });
      } catch (err) {
        console.error(err);
        alert("Could not load book.");
      }
    };

    if (id) fetchBook();
  }, [id]);

  const handleClick = () => {
    router.push("/");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://book-management-api-jvxp.onrender.com/api/v1/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          isbn: Number(formData.isbn),
          publishedYear: Number(formData.publishedYear),
        }),
      });

      if (!res.ok) throw new Error("Failed to update book");

      alert("Book updated successfully!");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Failed to update book.");
    }
  };

  return (
    <div className="bg-white">
      <div className="text-black">
        <div className="p-8">
          <button
            onClick={handleClick}
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700 hover:border-teal-500 hover:text-teal-500 hover:opacity-80 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Books Details
          </button>

          <h1 className="text-3xl font-bold mt-6">Edit Book</h1>
        </div>

        <div className="flex pl-8">
          <div className="p-6 border border-gray-300 rounded-md shadow-xl w-fit px-3 pl-6">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label htmlFor="title" className="text-sm font-medium pb-3">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-64 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-400"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="author" className="text-sm font-medium pb-3">Author</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-64 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-400"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="isbn" className="text-sm font-medium pb-3">ISBN</label>
                <input
                  type="text"
                  id="isbn"
                  name="isbn"
                  value={formData.isbn}
                  onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                  className="w-64 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-400"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="publishedYear" className="text-sm font-medium pb-3">Published Year</label>
                <input
                  type="text"
                  id="publishedYear"
                  name="publishedYear"
                  value={formData.publishedYear}
                  onChange={(e) => setFormData({ ...formData, publishedYear: e.target.value })}
                  className="w-64 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-400"
                />
              </div>

              <div>
                <hr className="mb-4 border-gray-300" />
                <div className="flex gap-20">
                  <button
                    type="button"
                    onClick={handleClick}
                    className="px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700 hover:border-blue-500 hover:text-blue-500 hover:opacity-80 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md text-white text-sm"
                  >
                    Update Book
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
