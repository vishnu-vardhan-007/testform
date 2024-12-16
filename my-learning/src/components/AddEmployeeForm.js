import React, { useState } from 'react';
import styles from './AddEmployeeForm.css'; // Import your CSS module here

const AddEmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    email: '',
    phone: '',
    department: '',
    dateOfJoining: '',
    role: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (formData.phone.length !== 10) {
      setError('Phone number must be 10 digits.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:5000/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Employee added successfully!');
        setFormData({
          name: '',
          employeeId: '',
          email: '',
          phone: '',
          department: '',
          dateOfJoining: '',
          role: '',
        });
      } else {
        setError(result.error || 'Failed to add employee.');
      }
    } catch (error) {
      setError('Error submitting the form. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.formGroup}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="employeeId">Employee ID:</label>
        <input
          type="text"
          id="employeeId"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          placeholder="Employee ID"
          maxLength="10"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="1234567890"
          pattern="[0-9]{10}"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="department">Department:</label>
        <select
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="dateOfJoining">Date of Joining:</label>
        <input
          type="date"
          id="dateOfJoining"
          name="dateOfJoining"
          value={formData.dateOfJoining}
          onChange={handleChange}
          max={new Date().toISOString().split('T')[0]}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="role">Role:</label>
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Role (e.g., Manager)"
          required
        />
      </div>

      <div className={styles.formButtons}>
        <button type="submit" className={styles.buttonSubmit}>
          Submit
        </button>
        <button
          type="reset"
          className={styles.buttonReset}
          onClick={() =>
            setFormData({
              name: '',
              employeeId: '',
              email: '',
              phone: '',
              department: '',
              dateOfJoining: '',
              role: '',
            })
          }
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default AddEmployeeForm;
