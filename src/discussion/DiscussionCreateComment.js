import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('replies')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) console.error(error);
      else setComments(data);
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('replies')
      .insert([{ post_id: postId, comment: commentText }]);

    if (error) {
      console.error(error);
      alert('Gagal menambahkan komentar.');
    } else {
      setCommentText('');
      alert('Komentar berhasil ditambahkan!');
      // Refresh comments
      const { data } = await supabase
        .from('replies')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });
      setComments(data);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg mt-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Komentar</h3>

      <ul className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-600">Belum ada komentar. Jadilah yang pertama berkomentar!</p>
        ) : (
          comments.map((comment) => (
            <li
              key={comment.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-gray-800">{comment.comment}</p>
              <small className="text-gray-500">
                {new Date(comment.created_at).toLocaleString()}
              </small>
            </li>
          ))
        )}
      </ul>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <textarea
          placeholder="Tambahkan komentar..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Kirim Komentar
        </button>
      </form>
    </div>
  );
};

export default Comments;
