// import { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// // Define the type for the context value
// interface AuthContextType {
//   isLoggedIn: boolean;
//   loading: boolean;
// }

// export const AuthContext = createContext<AuthContextType>({
//   isLoggedIn: false,  // Default to false (not logged in)
//   loading: true,      // Default to loading
// });

// // Create the AuthProvider component
// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(true);

//   // Function to verify token
//   const verifyToken = async (token: string) => {
//     try {
//       const response = await axios.get('/api/auth/verify', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.status === 200) {
//         setIsLoggedIn(true);
//       }
//     } catch (error) {
//       setIsLoggedIn(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Check token on initial load
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       verifyToken(token);
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
