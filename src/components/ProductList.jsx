// src/components/ProductList.jsx
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaEdit, FaTrash } from "react-icons/fa";

export default function ProductList({
  products,
  onEdit,
  onDelete,
  onLike,
  onComment,
  isSeller,
}) {
  if (!products || products.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">
        No products available. {isSeller ? "Add your first product!" : ""}
      </p>
    );
  }

  return (
    <div className="grid gap-6 px-4 md:px-10 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
          onLike={onLike}
          onComment={onComment}
          isSeller={isSeller}
        />
      ))}
    </div>
  );
}

function ProductCard({ product, onEdit, onDelete, onLike, onComment, isSeller }) {
  const [index, setIndex] = useState(0);
  const [commentText, setCommentText] = useState("");

  const next = () =>
    setIndex((i) => (i + 1) % (product.images?.length || 1));
  const prev = () =>
    setIndex(
      (i) => (i - 1 + (product.images?.length || 1)) % (product.images?.length || 1)
    );

  const submitComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onComment(product.id, commentText.trim());
    setCommentText("");
  };

  return (
    <article className="bg-white shadow-lg rounded-xl overflow-hidden transition hover:shadow-2xl">
      {/* Image Area */}
      <div className="relative">
        <img
          src={
            product.images && product.images.length
              ? product.images[index]
              : "https://via.placeholder.com/400x300?text=No+Image"
          }
          alt={product.title}
          className="w-full h-56 object-cover"
        />

        {product.images && product.images.length > 1 && (
          <>
            <button
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white px-2 py-1.5 rounded-md hover:bg-black/60"
              onClick={prev}
            >
              <FaArrowLeft />
            </button>
            <button
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white px-2 py-1.5 rounded-md hover:bg-black/60"
              onClick={next}
            >
              <FaArrowRight />
            </button>
          </>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-lg font-semibold text-blue-950">
            {product.title}
          </h4>
          <span className="text-green-600 font-bold">₹{product.price}</span>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-3">{product.description}</p>

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
                className="px-2 py-1 text-white bg-blue-500 rounded-md hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:border transition flex items-center gap-1 text-sm"
                onClick={() => onEdit(product)}
              >
                <FaEdit /> Edit
              </button>
              <button
                className="px-2 py-1 text-white bg-red-600 rounded-md hover:bg-white hover:text-red-600 hover:border-red-600 hover:border transition flex items-center gap-1 text-sm"
                onClick={() => onDelete(product.id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          )}
        </div>

        {/* Comments */}
        <div className="border-t pt-3">
          <h5 className="text-sm font-semibold mb-2">Comments</h5>
          {product.comments && product.comments.length > 0 ? (
            <ul className="space-y-1 mb-3 max-h-20 overflow-y-auto text-sm">
              {product.comments.map((c, i) => (
                <li key={i} className="text-gray-700">
                  • {c}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500 mb-3 text-sm">No comments yet.</div>
          )}

          <form onSubmit={submitComment} className="flex gap-2">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
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
