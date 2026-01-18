import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminDashboard = () => {
  // Post State
  const [postData, setPostData] = useState({ title: "", content: "" });
  const [postImage, setPostImage] = useState(null);
  const [postStatus, setPostStatus] = useState("");

  // Service State
  const [serviceData, setServiceData] = useState({
    title: "",
    description: "",
    icon: "🌟",
  });
  const [serviceStatus, setServiceStatus] = useState("");

  // --- Post Handlers ---
  const handlePostChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setPostImage(e.target.files[0]);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    if (postImage) {
      formData.append("image", postImage);
    }

    try {
      await axios.post("http://localhost:8000/api/posts/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPostStatus("Post created successfully!");
      setPostData({ title: "", content: "" });
      setPostImage(null);
      // Reset file input manually if needed using ref, but simplifying for now
    } catch (error) {
      console.error(error);
      setPostStatus("Error creating post.");
    }
  };

  // --- Service Handlers ---
  const handleServiceChange = (e) => {
    setServiceData({ ...serviceData, [e.target.name]: e.target.value });
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/services/", serviceData);
      setServiceStatus("Service created successfully!");
      setServiceData({ title: "", description: "", icon: "🌟" });
    } catch (error) {
      console.error(error);
      setServiceStatus("Error creating service.");
    }
  };

  return (
    <>
      <Header />
      <div
        className="container"
        style={{ padding: "4rem 0", minHeight: "60vh" }}
      >
        <h2
          className="section-title"
          style={{ textAlign: "left", marginBottom: "2rem" }}
        >
          Admin Dashboard
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: "2rem",
          }}
        >
          {/* Create Post Form */}
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "1rem",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <h3
              style={{ marginBottom: "1.5rem", color: "var(--primary-color)" }}
            >
              Create New Post
            </h3>
            {postStatus && (
              <div
                style={{
                  marginBottom: "1rem",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                  background: postStatus.includes("Error")
                    ? "#fee2e2"
                    : "#dcfce7",
                  color: postStatus.includes("Error") ? "#991b1b" : "#166534",
                }}
              >
                {postStatus}
              </div>
            )}

            <form onSubmit={handlePostSubmit}>
              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                  }}
                >
                  Post Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={postData.title}
                  onChange={handlePostChange}
                  style={inputStyle}
                  required
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                  }}
                >
                  Content
                </label>
                <textarea
                  name="content"
                  value={postData.content}
                  onChange={handlePostChange}
                  rows="4"
                  style={inputStyle}
                  required
                ></textarea>
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                  }}
                >
                  Image (Optional)
                </label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  style={inputStyle}
                  accept="image/*"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Publish Post
              </button>
            </form>
          </div>

          {/* Create Service Form */}
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "1rem",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <h3
              style={{
                marginBottom: "1.5rem",
                color: "var(--secondary-color)",
              }}
            >
              Add Service
            </h3>
            {serviceStatus && (
              <div
                style={{
                  marginBottom: "1rem",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                  background: serviceStatus.includes("Error")
                    ? "#fee2e2"
                    : "#dcfce7",
                  color: serviceStatus.includes("Error")
                    ? "#991b1b"
                    : "#166534",
                }}
              >
                {serviceStatus}
              </div>
            )}

            <form onSubmit={handleServiceSubmit}>
              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                  }}
                >
                  Service Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={serviceData.title}
                  onChange={handleServiceChange}
                  style={inputStyle}
                  required
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                  }}
                >
                  Description
                </label>
                <textarea
                  name="description"
                  value={serviceData.description}
                  onChange={handleServiceChange}
                  rows="3"
                  style={inputStyle}
                  required
                ></textarea>
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                  }}
                >
                  Icon (Emoji or text)
                </label>
                <input
                  type="text"
                  name="icon"
                  value={serviceData.icon}
                  onChange={handleServiceChange}
                  style={inputStyle}
                  placeholder="e.g. 💰, 🌾"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ backgroundColor: "var(--secondary-color)" }}
              >
                Add Service
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  borderRadius: "0.5rem",
  border: "1px solid #e2e8f0",
};

export default AdminDashboard;
