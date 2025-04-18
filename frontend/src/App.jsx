import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/submit-feedback", form);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      alert("Error submitting feedback");
    }
    setLoading(false);
  };

  return (
    <div className="d-flex flex-column vh-100">
      <div className="container flex-grow-1 d-flex flex-column justify-content-center">
        <h2 className="text-center">Submit Feedback</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <input
              name="name"
              className="form-control"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              name="message"
              className="form-control"
              placeholder="Feedback"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
          {submitted && (
            <div className="text-success mt-3">Thanks for your feedback!</div>
          )}
        </form>
      </div>

      <footer className="text-center text-muted py-2">
        © 2025 Shreyansh Goyal | Feedback Collector Task
      </footer>
    </div>
  );
}

export default App;
