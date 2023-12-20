// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();  // Get the navigate function from react-router-dom

//   const handleLogin = async () => {
//     try {
//       if (!username || !password) {
//         console.error('Invalid username or password');
//         return;
//       }
//       const response = await fetch('http://localhost:8080/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username,
//           password,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const token = data.token;
//         console.log(token);
//         localStorage.setItem('token', token);
//         navigate('/');
//       } else {
//         console.error('Authentication failed');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import your CSS file
import axios from 'axios';

const BaseURL = 'https://www.beaapis.com/1';
const Headers = {
  'X-BEA-Application-Id': 'Fdo32NoHF7H3ur5tzT0zp7S_QMOnW6zhEVab3U37zEk',
  'X-BEA-Authorization': 'mDbKLYBJOOqxVlZuW4ov6Vk_66EeqILi3qG7-hOipM0',
};

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  // const handleLogin = async () => {
  //   try {
  //     if (!username || !password) {
  //       console.error('Invalid username or password');
  //       return;
  //     }
  //     const response = await fetch('http://localhost:8080/api/auth/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         username,
  //         password,
  //       }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       const token = data.token;
  //       localStorage.setItem('token', token);
  //       navigate('/');
  //     } else {
  //       console.error('Authentication failed');
  //     }
  //   } catch (error) {
  //     console.error('Error during login:', error);
  //   }
  // };

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        console.error('Invalid username or password');
        return;
      }
      try {
        const response = await axios({
          url: BaseURL + '/Users',
          params: {
            "fields": "*",
            "limit": 1,
            "where": {
              "userName": username,
              "Password": password,
            },

          },
          method: 'get',
          headers: Headers
        });

        // console.log(response.data)

        if (response.status === 200 && response.data.results.length) {
          let user = response.data.results[0];
          let agent = navigator.userAgent;
          let token = new Date()/1000 + "::" + user.objectId + "::" + agent;
          localStorage.setItem('token', btoa(token));
          localStorage.setItem('user', btoa(JSON.stringify(user)));
          navigate('/');
        } else {
          console.error('Authentication failed');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
      
    }catch(error) {
      console.error('Error during login:', error);
    }
  }

    return (
      <div className="login-container">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  };

  export default Login;
