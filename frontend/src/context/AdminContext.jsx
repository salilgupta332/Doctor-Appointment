import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");

  return (
    <AdminContext.Provider value={{ backendUrl, aToken, setAToken }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
