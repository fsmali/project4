import { useEffect, useState } from 'react';
import '../register/register.scss';
import { API_URL } from '../../consts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('submit button clicked');
    try {
      const { res } = await axios.post(
        'http://localhost:8000/auth/register/',
        formData
      );
      console.log(res);
      navigate('/login');
    } catch (e) {
      console.log(e);
      setShowError(true);
    }
  };
  return (
    <div className="register_form">
      <h1>Register page</h1>
      <h3 className="error_register">
        {showError && <div className="error">Something Went Wrong</div>}
      </h3>
      <form className="register_page" onSubmit={onSubmit}>
        <input
          placeholder="firstname*"
          name="first_name"
          value={formData.first_name}
          onChange={onChange}
        />
        <input
          placeholder="lastname*"
          name="last_name"
          value={formData.last_name}
          onChange={onChange}
        />
        <input
          placeholder="username*"
          name="username"
          value={formData.username}
          onChange={onChange}
        />
        <input
          placeholder="email*"
          name="email"
          value={formData.email}
          onChange={onChange}
        />
        <input
          type="password"
          placeholder="password*"
          name="password"
          value={formData.password}
          onChange={onChange}
        />
        <input
          type="password"
          placeholder="password_confirmation*"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={onChange}
        />
        <button className="register_button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};
export default RegisterPage;
