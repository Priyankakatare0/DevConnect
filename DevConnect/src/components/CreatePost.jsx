import React, { useState } from 'react'
import axios from 'axios'

const CreatePost = ({ onPostCreated }) => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!content.trim()) {
            setError('Content is required');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Get token from localStorage
            const token = localStorage.getItem('token');
            
            if (!token) {
                setError('Please login to create a post');
                setLoading(false);
                return;
            }

            const response = await axios.post('https://devconnect-3-10k9.onrender.com/post', 
                { content },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            setSuccess('Post created successfully!');
            setContent(''); // Clear the form
            setShowForm(false); // Hide the form after successful post
            console.log('Post created:', response.data);
            
            // Refresh the posts list
            if (onPostCreated) {
                onPostCreated();
            }

        } catch (err) {
            if (err.response?.status === 401) {
                setError('Please login to create a post');
                localStorage.removeItem('token'); // Remove invalid token
            } else {
                setError(err.response?.data?.message || 'Failed to create post');
            }
            console.error('Error creating post:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mb-8">
            {/* Toggle Button */}
            {!showForm ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
                    <button
                        onClick={() => setShowForm(true)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 flex items-center justify-center gap-3 group"
                    >
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <span className="text-lg">Share your thoughts with the community</span>
                    </button>
                </div>
            ) : (
                /* Create Post Form */
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                Create New Post
                            </h2>
                            <button
                                onClick={() => {
                                    setShowForm(false);
                                    setError('');
                                    setSuccess('');
                                    setContent('');
                                }}
                                className="text-white/80 hover:text-white focus:outline-none p-1 rounded-full hover:bg-white/20 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    {/* Form Content */}
                    <div className="p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-3">
                                    What's on your mind?
                                </label>
                                <textarea
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Share your thoughts, ideas, or ask a question..."
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 text-gray-800 placeholder-gray-400"
                                    disabled={loading}
                                />
                                <div className="mt-2 flex justify-between items-center">
                                    <span className="text-sm text-gray-500">
                                        {content.length}/500 characters
                                    </span>
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Be respectful and constructive
                                    </div>
                                </div>
                            </div>

                            {error && (
                                <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-3">
                                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            )}

                            {success && (
                                <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-start gap-3">
                                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{success}</span>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={loading || !content.trim()}
                                    className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                                        loading || !content.trim()
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg hover:shadow-xl'
                                    }`}
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            Publishing...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                            Publish Post
                                        </>
                                    )}
                                </button>
                                
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setError('');
                                        setSuccess('');
                                        setContent('');
                                    }}
                                    disabled={loading}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200 font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Success message outside form for better visibility */}
            {success && !showForm && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-3 max-w-4xl mx-auto">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">{success}</span>
                </div>
            )}
        </div>
    )
}

export default CreatePost
