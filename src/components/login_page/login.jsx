import { useState } from 'react';
import '../login_page/login.scss'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const initialFormData = {
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const onChange = (e) => {
    setError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const {data} = await axios.post(
        'http://localhost:8000/auth/login/',
        formData
      );
      console.log(data)
      
    
      localStorage.setItem('token', data.token);

      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      navigate('/developers/');
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <div className="view">
      <h1>Login</h1>
      <h3 className='errorLogin'>{error && <div className="error">Invalid Credentials!!</div>}</h3>
      <form className="auth-form" onSubmit={onSubmit}>
        <input
          placeholder="Email*"
          name="email"
          onChange={onChange}
          value={formData.email}
        />
        <input
          placeholder="Password*"
          name="password"
          type="password"
          onChange={onChange}
          value={formData.password}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default LoginPage