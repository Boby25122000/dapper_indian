import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaEdit, FaTrash } from "react-icons/fa";

export default function ProductCard({
  product,
  onEdit,
  onDelete,
  onLike,
  onComment,
  isSeller,
}) {
  const [index, setIndex] = useState(0);
  const [comment, setComment] = useState("");

  const next = () =>
    setIndex((i) => (i + 1) % (product.images?.length || 1));
  const prev = () =>
    setIndex(
      (i) => (i - 1 + (product.images?.length || 1)) % (product.images?.length || 1)
    );

  const submitComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onComment(product.id, comment.trim());
    setComment("");
  };

  return (
    <article className="bg-white shadow-lg rounded-xl overflow-hidden my-6 max-w-md mx-auto md:max-w-2xl transition hover:shadow-2xl">
      {/* Image Area */}
      <div className="relative">
        <img
          src={
            product.images && product.images.length
              ? product.images[index]
              : "https://via.placeholder.com/400x300?text=No+Image"
          }
          alt={product.title}
          className="w-full h-64 object-cover"
        />

        {/* Prev/Next buttons */}
        {product.images && product.images.length > 1 && (
          <>
            <button
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white px-2 py-1.5 rounded-md cursor-pointer hover:bg-black/60"
              onClick={prev}
            >
              <FaArrowLeft />
            </button>
            <button
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white px-2 py-1.5 rounded-md cursor-pointer hover:bg-black/60"
              onClick={next}
            >
              <FaArrowRight />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {product.images && product.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {product.images.map((_, i) => (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full ${
                  i === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-xl font-semibold text-blue-950">{product.title}</h4>
          <div className="text-lg font-bold text-green-600">₹{product.price}</div>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4">{product.description}</p>

        {/* Actions */}
        <div className="flex justify-between items-center mb-4">
          <button
            className={`px-3 py-1 rounded-md font-medium border transition transform active:scale-95 ${
              product.liked
                ? "bg-red-600 text-white border-red-600"
                : "bg-white text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
            }`}
            onClick={() => onLike(product.id)}
          >
            ❤️ {product.likes}
          </button>

          {isSeller && (
            <div className="flex gap-2">
              <button
                className="px-2 py-1 text-white bg-blue-500 rounded-md hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:border transition flex items-center gap-1"
                onClick={() => onEdit(product)}
              >
                <FaEdit /> Edit
              </button>
              <button
                className="px-2 py-1 text-white bg-red-600 rounded-md hover:bg-white hover:text-red-600 hover:border-red-600 hover:border transition flex items-center gap-1"
                onClick={() => onDelete(product.id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          )}
        </div>

        {/* Comments */}
        <div className="border-t pt-4">
          <h5 className="text-lg font-semibold mb-2">Comments</h5>
          {product.comments && product.comments.length > 0 ? (
            <ul className="space-y-1 mb-3 max-h-28 overflow-y-auto pr-1">
              {product.comments.map((c, i) => (
                <li key={i} className="text-gray-700 text-sm">
                  • {c}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500 mb-3 text-sm">No comments yet.</div>
          )}

          <form onSubmit={submitComment} className="flex gap-2">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 border border-stone-300 rounded-md p-2 text-sm"
            />
            <button
              className="px-3 py-1 bg-blue-400 text-white rounded-md hover:bg-white hover:text-blue-400 hover:border-blue-400 hover:border transition text-sm"
              type="submit"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}
