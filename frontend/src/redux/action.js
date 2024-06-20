export const login = (username) => ({
  type: "LOGIN",
  payload: { username },
});

export const logout = () => ({
  type: "LOGOUT",
});

export const setFolderData = (rootfolder) => ({
  type: "PARENT",
  payload: { rootfolder },
});
