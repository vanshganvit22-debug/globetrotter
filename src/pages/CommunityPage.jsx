import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Plus,
  Search,
  Sparkles,
  MapPin,
  Send
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CommunityPage = () => {
  const { communityPosts, likeCommunityPost, showToast, user } = useApp();
  const [filterTag, setFilterTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCompose, setShowCompose] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostDest, setNewPostDest] = useState('');

  const tags = ['All', 'Tuscany', 'Japan', 'Santorini', 'Itinerary', 'Photography', 'Budgeting'];

  const filteredPosts = communityPosts.filter((post) => {
    const matchesTag = filterTag === 'All' || post.tags?.includes(filterTag);
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostTitle || !newPostContent) return;
    communityPosts.unshift({
      id: `post-${Date.now()}`,
      author: {
        name: user?.name || 'Alexander Wright',
        handle: `@${user?.name?.toLowerCase().replace(' ', '_') || 'alexander'}`,
        avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        badge: 'Explorer'
      },
      date: 'Just now',
      title: newPostTitle,
      content: newPostContent,
      destination: newPostDest || 'Worldwide',
      image: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?q=80&w=800&auto=format&fit=crop',
      likes: 1,
      comments: 0,
      saves: 0,
      tags: [filterTag === 'All' ? 'TravelStory' : filterTag]
    });
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostDest('');
    setShowCompose(false);
    showToast('Travel story published to community!');
  };

  return (
    <div className="page-container community-page">
      {/* Header */}
      <div className="community-header">
        <div>
          <span className="section-eyebrow">Traveler Collective</span>
          <h1 className="section-heading">GlobeTrotter Community</h1>
          <p className="section-subtitle">
            Exchange verified itineraries, secret local spots, culinary gems, and photography advice with fellow explorers.
          </p>
        </div>

        <button onClick={() => setShowCompose(!showCompose)} className="btn-primary-lg">
          <Plus className="w-4 h-4" />
          <span>Share Travel Story</span>
        </button>
      </div>

      {/* Story Composer Box */}
      {showCompose && (
        <form onSubmit={handleCreatePost} className="compose-story-card">
          <h3 className="section-heading-sm mb-3">Share Your Travel Experience</h3>
          <div className="form-group mb-3">
            <input
              type="text"
              placeholder="Headline / Catchy title (e.g. Hidden sunset terrace in Positano)..."
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              placeholder="Destination (e.g. Amalfi Coast, Italy)"
              value={newPostDest}
              onChange={(e) => setNewPostDest(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group mb-3">
            <textarea
              rows={3}
              placeholder="Write your recommendation, tip, or itinerary details..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="form-textarea"
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowCompose(false)}
              className="btn-outline-sm"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary-sm">
              <Send className="w-3.5 h-3.5" />
              <span>Publish Story</span>
            </button>
          </div>
        </form>
      )}

      {/* Search & Tag Filter Bar */}
      <div className="community-toolbar">
        <div className="search-pill-wrapper">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search stories, tips, or authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-pill-input"
          />
        </div>

        <div className="filter-chips-list">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`filter-chip ${filterTag === tag ? 'active' : ''}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Community Feed Cards */}
      <div className="community-feed-list">
        {filteredPosts.map((post) => (
          <article key={post.id} className="community-post-card">
            {/* Author Header */}
            <div className="post-author-row">
              <div className="author-meta-left">
                <img src={post.author.avatar} alt={post.author.name} className="post-avatar" />
                <div>
                  <div className="author-name-wrap">
                    <h4 className="author-name">{post.author.name}</h4>
                    <span className="author-badge-tag">{post.author.badge}</span>
                  </div>
                  <span className="post-date">{post.author.handle} &bull; {post.date}</span>
                </div>
              </div>

              <div className="post-dest-tag">
                <MapPin className="w-3.5 h-3.5 text-[#caa560]" />
                <span>{post.destination}</span>
              </div>
            </div>

            {/* Post Content */}
            <h3 className="post-title">{post.title}</h3>
            <p className="post-text">{post.content}</p>

            {post.image && (
              <div className="post-media-wrap">
                <img src={post.image} alt={post.title} className="post-img" />
              </div>
            )}

            {/* Post Tags */}
            <div className="post-tags-row">
              {post.tags?.map((t, idx) => (
                <span key={idx} className="post-hashtag">#{t}</span>
              ))}
            </div>

            {/* Post Action Footer */}
            <div className="post-actions-footer">
              <button
                onClick={() => likeCommunityPost(post.id)}
                className={`post-action-btn ${post.userLiked ? 'liked' : ''}`}
              >
                <Heart className={`w-4 h-4 ${post.userLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{post.likes}</span>
              </button>

              <button
                onClick={() => showToast('Comments drawer opened.')}
                className="post-action-btn"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments}</span>
              </button>

              <button
                onClick={() => showToast('Post saved to your bookmarks.')}
                className="post-action-btn"
              >
                <Bookmark className="w-4 h-4" />
                <span>{post.saves}</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText?.(window.location.href);
                  showToast('Post link copied to clipboard.');
                }}
                className="post-action-btn ml-auto"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
