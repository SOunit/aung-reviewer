"use client";

import { useEffect, useState } from "react";

type ReviewItem = {
  fileName: string;
  filePath: string;
  title: string;
  change: string;
  type: "Positive" | "Negative";
  feedback: string;
  issue: string;
  suggestion: string;
};

export default function ReviewPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/review");
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
      {reviews.map((review, idx) => {
  const isPositive = review.type === "Positive";

  return (
    <div
      key={idx}
      className={`p-6 rounded-2xl shadow-md hover:shadow-xl transition-all flex flex-col gap-4 ${
        isPositive 
          ? "bg-green-50 border-green-200" 
          : "bg-red-50 border-red-200"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={isPositive ? "text-green-600" : "text-red-600"}>
          {isPositive ? "✅" : "⚠️"}
        </div>
        <h2 className="text-lg font-bold text-gray-800">{review.title}</h2>
      </div>
  
      <div className="flex flex-col gap-2">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase">File Name</p>
          <p className="text-sm text-gray-700">{review.fileName}</p>
        </div>
  
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase">Change</p>
          <p className="text-sm text-gray-700">{review.change}</p>
        </div>
  
        {isPositive ? (
          // Positiveな場合だけFeedbackを表示
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase">Feedback</p>
            <p className="text-sm text-gray-700">{review.feedback}</p>
          </div>
        ) : (
          // Negativeな場合だけIssueとSuggestionを表示
          <>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase">Issue</p>
              <p className="text-sm text-gray-700">{review.issue}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase">Suggestion</p>
              <p className="text-sm text-gray-700">{review.suggestion}</p>
            </div>
          </>
        )}
  
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase">File Path</p>
          <p className="text-sm text-gray-700">{review.filePath}</p>
        </div>
      </div>
    </div>
  );
  
})}

    </div>
    
  );
}
