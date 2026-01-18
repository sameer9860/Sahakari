import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLanguage } from "../context/LanguageContext";

const News = () => {
  const [posts, setPosts] = useState([]);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/posts/");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  if (posts.length === 0) return null;

  return (
    <section
      className="news"
      id="news"
      style={{ padding: "4rem 0", background: "#f8f9fa" }}
    >
      <div className="container">
        <div className="section-title">
          <h2>Latest News & Events</h2>
          <p>Stay updated with our latest activities and announcements.</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                background: "#fff",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "var(--shadow-md)",
              }}
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              )}
              <div style={{ padding: "1.5rem" }}>
                <small
                  style={{
                    color: "var(--text-light)",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  {new Date(post.created_at).toLocaleDateString()}
                </small>
                <h4
                  style={{
                    marginBottom: "1rem",
                    color: "var(--primary-color)",
                  }}
                >
                  {post.title}
                </h4>
                <p style={{ color: "var(--text-dark)", marginBottom: "1rem" }}>
                  {post.content.length > 100
                    ? `${post.content.substring(0, 100)}...`
                    : post.content}
                </p>
                <a
                  href="#"
                  style={{
                    color: "var(--secondary-color)",
                    fontWeight: "600",
                    textDecoration: "none",
                  }}
                >
                  Read More &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
