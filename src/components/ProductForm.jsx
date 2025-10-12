import React, { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ProductForm({ editingProduct, onSave }) {
  const [title, setTitle] = useState(editingProduct?.title || "");
  const [description, setDescription] = useState(editingProduct?.description || "");
  const [price, setPrice] = useState(editingProduct?.price || "");
  const [images, setImages] = useState([]);

  const handleFiles = (e) => setImages(Array.from(e.target.files));

  const handleSubmit = async (e) => {
    e.preventDefault();
    let uploadedUrls = [];

    for (const file of images) {
      const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      uploadedUrls.push(url);
    }

    const productData = {
      title, description, price, images: uploadedUrls
    };

    if (editingProduct?.id) {
      const docRef = doc(db, "products", editingProduct.id);
      await updateDoc(docRef, productData);
    } else {
      await addDoc(collection(db, "products"), productData);
    }

    onSave(productData);
    setTitle(""); setDescription(""); setPrice(""); setImages([]);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg shadow mb-6">
      <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required className="w-full p-2 border rounded mb-2"/>
      <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} required className="w-full p-2 border rounded mb-2"/>
      <input type="number" placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} required className="w-full p-2 border rounded mb-2"/>
      <input type="file" accept="image/*" multiple onChange={handleFiles} className="mb-2"/>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save Product</button>
    </form>
  );
}
