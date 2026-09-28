import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  city: "",
  role: "",
  experience: "",
};

function ComponentA() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      id: Date.now(),
      ...formData,
    };

    dispatch(addUser(newUser));
    setFormData(initialForm);
  };

  return (
    <section className="panel form-panel">
      <div className="panel-header">
        <p className="eyebrow">Component A</p>
        <h2>Profile Registration</h2>
      </div>

      <form className="user-form" onSubmit={handleSubmit}>
        <div className="field-grid">
          <label>
            <span>Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </label>

          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </label>

          <label>
            <span>Phone Number</span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone"
              required
            />
          </label>

          <label>
            <span>City</span>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              required
            />
          </label>

          <label>
            <span>Role</span>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Enter role"
              required
            />
          </label>

          <label>
            <span>Experience</span>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            >
              <option value="">Select experience</option>
              <option value="Fresher">Fresher</option>
              <option value="1-3 Years">1-3 Years</option>
              <option value="3-5 Years">3-5 Years</option>
              <option value="5+ Years">5+ Years</option>
            </select>
          </label>
        </div>

        <button type="submit" className="submit-button">
          Save profile
        </button>
      </form>
    </section>
  );
}

export default ComponentA;
