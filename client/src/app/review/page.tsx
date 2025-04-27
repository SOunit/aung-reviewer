"use client";

import { useEffect, useState } from "react";

type ReviewItem = {
  title: string;
  message: string;
};

export default function ReviewPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/result.json");
        const data = await res.json();
        console.log({data});
        setReviews(data);
      } catch (error) {
        console.error("Failed to fetch review data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-600">Loading...</div>;
  }

  if (reviews.length === 0) {
    return <div className="p-8 text-center text-green-500 text-2xl font-semibold">✅ LGTM！</div>;
  }

  return (
    <div className="p-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review, idx) => (
        <div
          key={idx}
          className="p-6 border rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white"
        >
          <h2 className="text-xl font-bold mb-4 text-indigo-700">{review.title}</h2>
          <p className="text-gray-700">{review.message}</p>
        </div>
      ))}
    </div>
  );
}
