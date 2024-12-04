import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const CreateDiscussion = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('posts')
      .insert([{ title, description, tags }]);

    if (error) {
      console.error(error);
      alert('Gagal menambahkan diskusi.');
    } else {
      alert('Diskusi berhasil ditambahkan!');
      setTitle('');
      setDescription('');
      setTags('');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tambah Diskusi Baru</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Judul
          </label>
          <input
            id="title"
            type="text"
            placeholder="Judul diskusi"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Deskripsi
          </label>
          <textarea
            id="description"
            placeholder="Deskripsi diskusi"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
            required
          />
        </div>

        <div>
          <label
            htmlFor="tabs"
            className="block text-sm font-medium text-gray-700"
          >
            Kategori (Tab)
          </label>
          <input
            id="tabs"
            type="text"
            placeholder="Contoh: Teknologi, Pendidikan"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          onClick={() => console.log('Tambah Diskusi button clicked')}
        >
          Tambah Diskusi
        </button>
      </form>
    </div>
  );
};

export default CreateDiscussion;
