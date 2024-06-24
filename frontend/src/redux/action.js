export const login = (data) => ({
  type: "LOGIN",
  payload: {
    username: data.name,
    folderCount: data.folderCount,
    fileCount: data.fileCount,
    totalSize: data.totalSize,
  },
});

export const logout = () => ({
  type: "LOGOUT",
});

export const setFolderData = (rootfolder) => ({
  type: "PARENT",
  payload: { rootfolder },
});
