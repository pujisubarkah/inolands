import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Comments from './DiscussionCreateComment'; // Import komponen Comments

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null); // State untuk menyimpan ID post yang dipilih
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk mengatur modal
  const [userId, setUserId] = useState('user_1'); // ID pengguna untuk upvote (bisa diganti sesuai kebutuhan)

  useEffect(() => {
    const fetchPostsWithComments = async () => {
      // Fetch posts dengan 3 komentar terbaru
      const { data: posts, error } = await supabase
        .from('posts')
        .select(`
          *,
          replies:replies(post_id, comment, created_at)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error(error);
      } else {
        // Untuk setiap post, ambil 3 komentar terbaru
        const postsWithTopComments = posts.map((post) => {
          const topComments = (post.replies || [])
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Urutkan komentar
            .slice(0, 3); // Ambil 3 komentar terbaru
          return { ...post, topComments };
        });
        setPosts(postsWithTopComments);
      }
    };

    fetchPostsWithComments();
  }, []);

  // Menambahkan upvote untuk pengguna tertentu
  const handleUpvote = async (postId, userId) => {
    const { data: post, error } = await supabase
      .from('posts')
      .select('upvotes')
      .eq('id', postId)
      .single();

    if (error) {
      console.error('Error fetching post:', error);
      return;
    }

    // Jika upvotes tidak ada, buat objek baru
    const updatedUpvotes = post.upvotes ? { ...post.upvotes } : {};

    if (!updatedUpvotes[userId]) {
      updatedUpvotes[userId] = true; // Menambahkan upvote untuk pengguna
    } else {
      delete updatedUpvotes[userId]; // Hapus upvote jika sudah ada
    }

    const { error: updateError } = await supabase
      .from('posts')
      .update({ upvotes: updatedUpvotes })
      .eq('id', postId);

    if (updateError) {
      console.error('Error updating upvotes:', updateError);
    } else {
      console.log('Upvote updated successfully!');
    }
  };

  // Menghitung jumlah upvotes dari JSON
  const getUpvoteCount = (upvotes) => {
    return upvotes ? Object.keys(upvotes).length : 0;
  };

  const openModal = (postId) => {
    setSelectedPostId(postId); // Set ID post yang diklik
    setIsModalOpen(true); // Tampilkan modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Sembunyikan modal
    setSelectedPostId(null); // Reset ID post
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Forum Diskusi Inovasi</h1>
      {posts.length === 0 ? (
        <p className="text-gray-600">Belum ada diskusi. Jadilah yang pertama memulai diskusi!</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative">
              <h2 className="text-xl font-semibold text-blue-600">{post.title}</h2>
              <p className="text-gray-700 mt-2">{post.description}</p>
              <div className="text-gray-500 text-sm mt-4">
                {new Date(post.created_at).toLocaleString()}
              </div>

              {/* Upvotes */}
              <div className="mt-2 text-gray-600">
                Like: {getUpvoteCount(post.upvotes)} {/* Menampilkan jumlah upvote */}
                <button
                  onClick={() => handleUpvote(post.id, userId)} // Ganti 'user_1' dengan ID pengguna yang sesungguhnya
                  className="ml-4 text-blue-500 hover:text-blue-700"
                >
                  <FontAwesomeIcon icon={faThumbsUp} />
                </button>
              </div>

              {/* Top 3 Comments */}
              {post.topComments && post.topComments.length > 0 && (
                <div className="mt-4 border-t border-gray-300 pt-4">
                  <h3 className="text-lg font-semibold text-gray-800">Komentar Terbaru:</h3>
                  <ul className="space-y-2">
                    {post.topComments.map((comment) => (
                      <li key={comment.created_at} className="text-gray-700 ml-6 pl-4 border-l-2 border-gray-300">
                        <p>{comment.comment}</p>
                        <small className="text-gray-500">
                          {new Date(comment.created_at).toLocaleString()}
                        </small>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Comment Button */}
              <button
                className="absolute bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow hover:bg-blue-600 transition duration-300"
                onClick={() => openModal(post.id)} // Buka modal dengan ID post
              >
                <FontAwesomeIcon icon={faComment} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      {isModalOpen && selectedPostId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={closeModal}
            >
              &times;
            </button>
            {/* Comments Component */}
            <Comments postId={selectedPostId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Forum;
