import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    name: string;
    email: string;
}

const token = localStorage.getItem('token');
if (token) {
  const decoded = jwtDecode<DecodedToken>(token);
  console.log(decoded.name, decoded.email);
}
