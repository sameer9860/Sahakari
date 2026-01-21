import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { transliterateToNepali } from "../utils/nepaliTransliterate";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("services");
  
  // Post State
  const [postData, setPostData] = useState({ 
    title: "", 
    content: "", 
    title_np: "", 
    content_np: "" 
  });
  const [postImage, setPostImage] = useState(null);
  const [postStatus, setPostStatus] = useState("");
  const [posts, setPosts] = useState([]);
  const [postSearch, setPostSearch] = useState("");

  // Service State
  const [serviceData, setServiceData] = useState({
    title: "",
    description: "",
    title_np: "",
    description_np: "",
    icon: "🌟",
  });
  const [serviceStatus, setServiceStatus] = useState("");
  const [services, setServices] = useState([]);
  const [serviceSearch, setServiceSearch] = useState("");
  const [editingService, setEditingService] = useState(null);
  const [editingPost, setEditingPost] = useState(null);

  // --- Fetch Data ---
  useEffect(() => {
    fetchPosts();
    fetchServices();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/posts/");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/services/");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // --- Post Handlers ---
  const handlePostChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...postData, [name]: value };
    
    // Auto-transliterate when typing directly in Nepali field
    // Always transliterate if the current input contains Roman characters
    if (name === 'title_np' || name === 'content_np') {
      // Check if current value has any Roman characters (a-z, A-Z)
      const hasRomanChars = /[a-zA-Z]/.test(value);
      
      if (hasRomanChars && value) {
        // Transliterate the entire value
        const transliterated = transliterateToNepali(value);
        updatedData[name] = transliterated;
      }
    }
    
    setPostData(updatedData);
  };

  const handleImageChange = (e) => {
    setPostImage(e.target.files[0]);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    formData.append("title_np", postData.title_np || "");
    formData.append("content_np", postData.content_np || "");
    if (postImage) {
      formData.append("image", postImage);
    }

    try {
      if (editingPost) {
        await axios.patch(
          `http://localhost:8000/api/posts/${editingPost.id}/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setPostStatus("Post updated successfully!");
      } else {
        await axios.post("http://localhost:8000/api/posts/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setPostStatus("Post created successfully!");
      }
      setPostData({ title: "", content: "", title_np: "", content_np: "" });
      setPostImage(null);
      setEditingPost(null);
      fetchPosts();
    } catch (error) {
      console.error(error);
      setPostStatus("Error saving post.");
    }
  };

  const deletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`http://localhost:8000/api/posts/${id}/`);
        setPostStatus("Post deleted successfully!");
        fetchPosts();
      } catch (error) {
        console.error(error);
        setPostStatus("Error deleting post.");
      }
    }
  };

  const editPost = (post) => {
    setEditingPost(post);
    setPostData({ 
      title: post.title || "", 
      content: post.content || "",
      title_np: post.title_np || "",
      content_np: post.content_np || ""
    });
  };

  const cancelEditPost = () => {
    setEditingPost(null);
    setPostData({ title: "", content: "", title_np: "", content_np: "" });
  };

  // --- Service Handlers ---
  const handleServiceChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...serviceData, [name]: value };
    
    // Auto-transliterate when typing directly in Nepali field
    // Always transliterate if the current input contains Roman characters
    if (name === 'title_np' || name === 'description_np') {
      // Check if current value has any Roman characters (a-z, A-Z)
      const hasRomanChars = /[a-zA-Z]/.test(value);
      
      if (hasRomanChars && value) {
        // Transliterate the entire value
        const transliterated = transliterateToNepali(value);
        updatedData[name] = transliterated;
      }
    }
    
    setServiceData(updatedData);
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await axios.patch(
          `http://localhost:8000/api/services/${editingService.id}/`,
          serviceData
        );
        setServiceStatus("Service updated successfully!");
      } else {
        await axios.post("http://localhost:8000/api/services/", serviceData);
        setServiceStatus("Service created successfully!");
      }
      setServiceData({ 
        title: "", 
        description: "", 
        title_np: "", 
        description_np: "", 
        icon: "🌟" 
      });
      setEditingService(null);
      fetchServices();
    } catch (error) {
      console.error(error);
      setServiceStatus("Error saving service.");
    }
  };

  const deleteService = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await axios.delete(`http://localhost:8000/api/services/${id}/`);
        setServiceStatus("Service deleted successfully!");
        fetchServices();
      } catch (error) {
        console.error(error);
        setServiceStatus("Error deleting service.");
      }
    }
  };

  const editService = (service) => {
    setEditingService(service);
    setServiceData({
      title: service.title || "",
      description: service.description || "",
      title_np: service.title_np || "",
      description_np: service.description_np || "",
      icon: service.icon || "🌟",
    });
  };

  const cancelEditService = () => {
    setEditingService(null);
    setServiceData({ 
      title: "", 
      description: "", 
      title_np: "", 
      description_np: "", 
      icon: "🌟" 
    });
  };

  return (
    <>
      <Header />
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <aside
          style={{
            width: "250px",
            background: "linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)",
            color: "#fff",
            padding: "2rem 0",
            boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <div style={{ padding: "0 1.5rem", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", margin: 0, fontWeight: "700" }}>
              Admin
            </h2>
            <p style={{ fontSize: "0.85rem", margin: "0.5rem 0 0 0", opacity: 0.9 }}>
              Dashboard
            </p>
          </div>

          <nav>
            {[
              { id: "services", label: "📋 Services", icon: "📋" },
              { id: "posts", label: "📝 Posts", icon: "📝" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                style={{
                  width: "100%",
                  padding: "1rem 1.5rem",
                  border: "none",
                  background:
                    activeSection === item.id
                      ? "rgba(255,255,255,0.2)"
                      : "transparent",
                  color: "#fff",
                  fontSize: "1rem",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  borderLeft:
                    activeSection === item.id ? "4px solid #fff" : "4px solid transparent",
                  fontWeight: activeSection === item.id ? "600" : "500",
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== item.id) {
                    e.target.style.background = "rgba(255,255,255,0.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== item.id) {
                    e.target.style.background = "transparent";
                  }
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, background: "#f8f9fa", overflow: "auto" }}>
          <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
            {/* Services Section */}
            {activeSection === "services" && (
              <>
                <h1 style={{ marginBottom: "2rem", color: "var(--secondary-color)" }}>
                  Services Management
                </h1>

                {/* Create/Edit Service Form */}
                <div
                  style={{
                    background: "#fff",
                    padding: "2rem",
                    borderRadius: "1rem",
                    boxShadow: "var(--shadow-md)",
                    marginBottom: "2rem",
                  }}
                >
                  <h3
                    style={{
                      marginBottom: "1.5rem",
                      color: "var(--secondary-color)",
                    }}
                  >
                    {editingService ? "Edit Service" : "Add New Service"}
                  </h3>
                  {serviceStatus && (
                    <div
                      style={{
                        marginBottom: "1rem",
                        padding: "0.75rem 1rem",
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
                        Service Title (English)
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
                        Service Title (नेपाली) - Type in Romanized Nepali (auto-converts)
                      </label>
                      <input
                        type="text"
                        name="title_np"
                        value={serviceData.title_np}
                        onChange={handleServiceChange}
                        style={inputStyle}
                        placeholder="Optional - Type in Roman: 'bachat yojana' (auto converts to Devanagari)"
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
                        Description (English)
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
                    <div style={{ marginBottom: "1rem" }}>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          fontWeight: "500",
                        }}
                      >
                        Description (नेपाली) - Type in Romanized Nepali (auto-converts)
                      </label>
                      <textarea
                        name="description_np"
                        value={serviceData.description_np}
                        onChange={handleServiceChange}
                        rows="3"
                        style={inputStyle}
                        placeholder="Optional - Type in Roman: 'sajilo ra saro bachat' (auto converts to Devanagari)"
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
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ backgroundColor: "var(--secondary-color)" }}
                      >
                        {editingService ? "Update Service" : "Add Service"}
                      </button>
                      {editingService && (
                        <button
                          type="button"
                          onClick={cancelEditService}
                          style={{
                            padding: "0.75rem 1.5rem",
                            borderRadius: "0.5rem",
                            border: "1px solid #ccc",
                            background: "#f5f5f5",
                            cursor: "pointer",
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Services List */}
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
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    Services List
                    <span style={{ fontSize: "0.8em", color: "#666" }}>
                      ({services.length})
                    </span>
                  </h3>

                  <input
                    type="text"
                    placeholder="Search services..."
                    value={serviceSearch}
                    onChange={(e) => setServiceSearch(e.target.value)}
                    style={{
                      ...inputStyle,
                      marginBottom: "1.5rem",
                      maxWidth: "300px",
                    }}
                  />

                  <div style={{ overflowX: "auto" }}>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "0.95em",
                      }}
                    >
                      <thead>
                        <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
                          <th style={tableHeaderStyle}>Icon</th>
                          <th style={tableHeaderStyle}>Title</th>
                          <th style={tableHeaderStyle}>Description</th>
                          <th style={tableHeaderStyle}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {services
                          .filter((service) =>
                            service.title
                              .toLowerCase()
                              .includes(serviceSearch.toLowerCase())
                          )
                          .map((service) => (
                            <tr
                              key={service.id}
                              style={{ borderBottom: "1px solid #e2e8f0" }}
                            >
                              <td style={tableCellStyle}>{service.icon}</td>
                              <td style={tableCellStyle}>{service.title}</td>
                              <td
                                style={{
                                  ...tableCellStyle,
                                  maxWidth: "300px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {service.description}
                              </td>
                              <td style={tableCellStyle}>
                                <button
                                  onClick={() => editService(service)}
                                  style={{
                                    padding: "0.5rem 1rem",
                                    marginRight: "0.5rem",
                                    background: "#3b82f6",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "0.4rem",
                                    cursor: "pointer",
                                    fontSize: "0.85em",
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => deleteService(service.id)}
                                  style={{
                                    padding: "0.5rem 1rem",
                                    background: "#ef4444",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "0.4rem",
                                    cursor: "pointer",
                                    fontSize: "0.85em",
                                  }}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    {services.filter((s) =>
                      s.title.toLowerCase().includes(serviceSearch.toLowerCase())
                    ).length === 0 && (
                      <p
                        style={{
                          textAlign: "center",
                          marginTop: "1rem",
                          color: "#999",
                        }}
                      >
                        No services found.
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Posts Section */}
            {activeSection === "posts" && (
              <>
                <h1 style={{ marginBottom: "2rem", color: "var(--primary-color)" }}>
                  Posts Management
                </h1>

                {/* Create/Edit Post Form */}
                <div
                  style={{
                    background: "#fff",
                    padding: "2rem",
                    borderRadius: "1rem",
                    boxShadow: "var(--shadow-md)",
                    marginBottom: "2rem",
                  }}
                >
                  <h3
                    style={{
                      marginBottom: "1.5rem",
                      color: "var(--primary-color)",
                    }}
                  >
                    {editingPost ? "Edit Post" : "Create New Post"}
                  </h3>
                  {postStatus && (
                    <div
                      style={{
                        marginBottom: "1rem",
                        padding: "0.75rem 1rem",
                        borderRadius: "0.5rem",
                        background: postStatus.includes("Error")
                          ? "#fee2e2"
                          : "#dcfce7",
                        color: postStatus.includes("Error")
                          ? "#991b1b"
                          : "#166534",
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
                        Post Title (English)
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
                        Post Title (नेपाली) - Type in Romanized Nepali (auto-converts)
                      </label>
                      <input
                        type="text"
                        name="title_np"
                        value={postData.title_np}
                        onChange={handlePostChange}
                        style={inputStyle}
                        placeholder="Optional - Type in Roman: 'mero nepali lekha' (auto converts to Devanagari)"
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
                        Content (English)
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
                    <div style={{ marginBottom: "1rem" }}>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          fontWeight: "500",
                        }}
                      >
                        Content (नेपाली) - Type in Romanized Nepali (auto-converts)
                      </label>
                      <textarea
                        name="content_np"
                        value={postData.content_np}
                        onChange={handlePostChange}
                        rows="4"
                        style={inputStyle}
                        placeholder="Optional - Type in Roman: 'hamro sahakari kura' (auto converts to Devanagari)"
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
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button type="submit" className="btn btn-primary">
                        {editingPost ? "Update Post" : "Publish Post"}
                      </button>
                      {editingPost && (
                        <button
                          type="button"
                          onClick={cancelEditPost}
                          style={{
                            padding: "0.75rem 1.5rem",
                            borderRadius: "0.5rem",
                            border: "1px solid #ccc",
                            background: "#f5f5f5",
                            cursor: "pointer",
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Posts List */}
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
                      color: "var(--primary-color)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    Posts List
                    <span style={{ fontSize: "0.8em", color: "#666" }}>
                      ({posts.length})
                    </span>
                  </h3>

                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={postSearch}
                    onChange={(e) => setPostSearch(e.target.value)}
                    style={{
                      ...inputStyle,
                      marginBottom: "1.5rem",
                      maxWidth: "300px",
                    }}
                  />

                  <div style={{ overflowX: "auto" }}>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "0.95em",
                      }}
                    >
                      <thead>
                        <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
                          <th style={tableHeaderStyle}>Title</th>
                          <th style={tableHeaderStyle}>Content</th>
                          <th style={tableHeaderStyle}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {posts
                          .filter((post) =>
                            post.title
                              .toLowerCase()
                              .includes(postSearch.toLowerCase())
                          )
                          .map((post) => (
                            <tr
                              key={post.id}
                              style={{ borderBottom: "1px solid #e2e8f0" }}
                            >
                              <td style={tableCellStyle}>{post.title}</td>
                              <td
                                style={{
                                  ...tableCellStyle,
                                  maxWidth: "350px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {post.content}
                              </td>
                              <td style={tableCellStyle}>
                                <button
                                  onClick={() => editPost(post)}
                                  style={{
                                    padding: "0.5rem 1rem",
                                    marginRight: "0.5rem",
                                    background: "#3b82f6",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "0.4rem",
                                    cursor: "pointer",
                                    fontSize: "0.85em",
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => deletePost(post.id)}
                                  style={{
                                    padding: "0.5rem 1rem",
                                    background: "#ef4444",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "0.4rem",
                                    cursor: "pointer",
                                    fontSize: "0.85em",
                                  }}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    {posts.filter((p) =>
                      p.title.toLowerCase().includes(postSearch.toLowerCase())
                    ).length === 0 && (
                      <p
                        style={{
                          textAlign: "center",
                          marginTop: "1rem",
                          color: "#999",
                        }}
                      >
                        No posts found.
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
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

const tableHeaderStyle = {
  padding: "1rem",
  textAlign: "left",
  fontWeight: "600",
  color: "#333",
  background: "#f9fafb",
};

const tableCellStyle = {
  padding: "1rem",
  textAlign: "left",
};

export default AdminDashboard;
