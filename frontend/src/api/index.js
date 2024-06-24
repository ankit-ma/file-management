import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:5000",
  // Add any other configuration options here
});

// Add a request interceptor to automatically include the token in the Authorization header
api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");
  if (token) {
    config.headers.Authorization = `${token}`;
    config.params = { userId };
  }
  return config;
});

export const login = async (email, password) => {
  try {
    console.log(email, password);
    const response = await api.post("/user/login", { email, password });
    if (response.status === 200) {
      // Login successful, store token in cookie
      const token = response.data.token;
      const userId = response.data.id;
      Cookies.set("token", token);
      Cookies.set("userId", userId);
    }

    return response;
  } catch (error) {
    // Handle error
    throw error;
  }
};
export const signup = async (first_name, last_name, email, password) => {
  try {
    console.log(first_name, last_name, email, password);
    const response = await api.post("/user/register", {
      first_name,
      last_name,
      email,
      password,
    });
    if (response.status === 200) {
      // Login successful, store token in cookie
      const token = response.data.token;
      const userId = response.data.id;
      Cookies.set("token", token);
      Cookies.set("userId", userId);
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchRootDirectory = async () => {
  try {
    console.log("call is coming in api fetch");
    const userId = Cookies.get("userId");
    const response = await api.get("/folder/root/contents");
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchFolderDetails = async (foldername) => {
  try {
    const res = await api.post("/folder/contents", { filePath: foldername });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createFolder = (foldarData) => {
  return api.post("/folder/create", foldarData);
};

export const uploadFile = (file, payload) => {
  const formData = new FormData();

  formData.append("file", file);

  Object.keys(payload).forEach((key) => {
    formData.append(key, payload[key]);
  });

  return api.post("/file/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteFile = async (fileId) => {
  try {
    const response = await api.delete("/file/delete", { data: { fileId } });
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteFolder = async (folderId) => {
  try {
    const response = await api.delete("/folder/delete", { data: { folderId } });
    return response;
  } catch (error) {
    throw error;
  }
};
