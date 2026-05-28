import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../stylesheets/Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.role) newErrors.role = "Select account type";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      alert(response.data.message || "Account created successfully!");
      navigate("/login");
    } catch (error) {
      setErrors({
        email: error.response?.data?.message || "Registration failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1 className="register-title">Create Account</h1>

        <p className="register-subtitle">
          Join DermaCure AI and start your skin screening journey
        </p>

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            className="register-input"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <small className="error-text">{errors.name}</small>}

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="register-input"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <small className="error-text">{errors.email}</small>}

          <input
            type="password"
            name="password"
            placeholder="Create a password"
            className="register-input"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <small className="error-text">{errors.password}</small>
          )}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            className="register-input"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <small className="error-text">{errors.confirmPassword}</small>
          )}

          <select
            name="role"
            className="register-input"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select account type</option>
            <option value="user">Patient / User</option>
            <option value="doctor">Doctor</option>
          </select>
          {errors.role && <small className="error-text">{errors.role}</small>}

          <button className="register-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="register-footer">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;