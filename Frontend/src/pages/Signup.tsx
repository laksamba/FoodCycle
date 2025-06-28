import React, { useState, type FormEvent } from 'react';
import { User, Mail, Lock, Phone, MapPin, Briefcase, CheckCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  password: string;
  role: 'business' | 'consumer' | 'ngos' | 'admin';
  phone?: string;
  latitude?: string;
  longitude?: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    role: 'consumer',
    phone: '',
    latitude: '',
    longitude: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.latitude && isNaN(Number(formData.latitude))) {
      newErrors.latitude = 'Latitude must be a valid number';
    }
    if (formData.longitude && isNaN(Number(formData.longitude))) {
      newErrors.longitude = 'Longitude must be a valid number';
    }
    if (formData.phone && isNaN(Number(formData.phone))) {
      newErrors.phone = 'Phone must be a valid number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submitData = {
      name: formData.name,
      email: formData.email,
      password: formData.password, // Backend should hash this
      role: formData.role,
      phone: formData.phone ? Number(formData.phone) : undefined,
      location:
        formData.latitude && formData.longitude
          ? {
              type: 'Point',
              coordinates: [Number(formData.longitude), Number(formData.latitude)],
            }
          : undefined,
    };

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });
      if (response.ok) {
        alert('Registration successful!');
        setFormData({
          name: '',
          email: '',
          password: '',
          role: 'consumer',
          phone: '',
          latitude: '',
          longitude: '',
        });
      } else {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <User className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="w-full outline-none text-gray-700"
                required
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <Mail className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full outline-none text-gray-700"
                required
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <Lock className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full outline-none text-gray-700"
                required
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <Briefcase className="w-5 h-5 text-gray-500 mr-2" />
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full outline-none text-gray-700"
                required
              >
                <option value="consumer">Consumer</option>
                <option value="business">Business</option>
                <option value="ngos">NGO</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <Phone className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="w-full outline-none text-gray-700"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center border border-gray-300 rounded-lg p-2">
                <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="number"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleInputChange}
placeholder="Latitude"
className="w-full outline-none text-gray-700"
step="any"
                />
              </div>
              {errors.latitude && <p className="text-red-500 text-sm mt-1">{errors.latitude}</p>}
            </div>

            <div>
              <div className="flex items-center border border-gray-300 rounded-lg p-2">
                <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="number"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleInputChange}
                  placeholder="Longitude"
                  className="w-full outline-none text-gray-700"
                  step="any"
                />
              </div>
              {errors.longitude && <p className="text-red-500 text-sm mt-1">{errors.longitude}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;