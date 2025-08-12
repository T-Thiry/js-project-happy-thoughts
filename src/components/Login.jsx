import { useState} from 'react';

const Login = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


const handleSubmit = (e) => {
  e.preventDefault();
  setError('');


fetch('https://happy-thoughts-api-svd7.onrender.com/users/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})

  .then(res => {
    if (!res.ok) { 
      throw new Error('Login failed');
    }
    return res.json();
  })
  .then(data => {
    localStorage.setItem('accessToken', data.accessToken)
    onSuccess();
  })
  .catch(() => {
    setError('Invalid email or password');
  });
};

return (
  <div className='login-container'>
  <form onSubmit={handleSubmit}>
    <h2>Login</h2>
    {error && <p>{error}</p>}
      <input 
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required 
      />
      <input 
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required 
      />
    <button type='submit'>Log in</button>
  </form>
  </div>
  );
};

export default Login