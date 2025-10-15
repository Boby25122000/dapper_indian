import React, { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function ProductForm({ editingProduct, onSave, maxImages = 10 }) {
  const [title, setTitle] = useState(editingProduct?.title || "");
  const [description, setDescription] = useState(editingProduct?.description || "");
  const [price, setPrice] = useState(editingProduct?.price || "");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  // 🔹 Handle selected files
  const handleFiles = (e) => {
    const filesArray = Array.from(e.target.files);
    if (filesArray.length + images.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }
    setImages((prev) => [...prev, ...filesArray]);
  };

  // 🔹 Remove image from preview
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 🔹 Submit product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !price) return;

    setUploading(true);
    setProgress(0);

    try {
      const uploadPromises = images.map((file) => {
        return new Promise((resolve, reject) => {
          const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(Math.round(prog));
            },
            (error) => reject(error),
            async () => {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(url);
            }
          );
        });
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      const productData = { title, description, price, images: uploadedUrls };

      if (editingProduct?.id) {
        const docRef = doc(db, "products", editingProduct.id);
        await updateDoc(docRef, productData);
      } else {
        await addDoc(collection(db, "products"), productData);
      }

      onSave(productData);
      setTitle("");
      setDescription("");
      setPrice("");
      setImages([]);
      alert("✅ Product uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed, try again!");
    }

    setUploading(false);
    setProgress(0);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded mb-3"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full p-2 border rounded mb-3"
        />

        <div className="mb-3">
          <label
            htmlFor="fileInput"
            className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
          >
            {uploading ? `Uploading... (${progress}%)` : `Choose Images (${images.length}/${maxImages})`}
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFiles}
            className="hidden"
          />
        </div>

        {/* Image Previews */}
        <div className="flex flex-wrap gap-2 mb-3 justify-center">
          {images.map((img, idx) => (
            <div key={idx} className="relative w-20 h-20">
              <img
                src={URL.createObjectURL(img)}
                alt={`preview-${idx}`}
                className="w-full h-full object-cover rounded border"
              />
              <span
                onClick={() => removeImage(idx)}
                className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center cursor-pointer hover:bg-red-800"
              >
                ✖
              </span>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer disabled:opacity-50"
        >
          {uploading ? `Uploading... ${progress}%` : "Upload Product"}
        </button>
      </form>
    </div>
  );
}
