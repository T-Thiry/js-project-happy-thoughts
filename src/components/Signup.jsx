import { useState } from 'react';


const Signup = ({onSuccess}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  

    fetch('https://happy-thoughts-api-svd7.onrender.com/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setError(null)
          localStorage.setItem('accessToken', data.response.accessToken);
          localStorage.setItem('userId', data.response.id);
          onSuccess();
        } else {
          setError(data.message || 'Something went wrong.');
        }
      })
      .catch(() => setError('Network error'));
  };


  return ( 
    <div className='signup-container'>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
          <input
            type='text'
            placeholder='Name'
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input
            type='email'
            placeholder='Email'
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input
            type='password'
            placeholder='Password'
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <button type='submit'>Sign Up</button>
          {error && <p>{error}</p>}
      </form>
    </div>
  )

}
  export default Signup;