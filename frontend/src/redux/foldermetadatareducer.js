const initialState = {
  rootfolder: {},
};

const foldermetadatareducer = (state = initialState, action) => {
  switch (action.type) {
    case "PARENT":
      return {
        ...state,

        rootfolder: action.payload.rootfolder,
      };

    default:
      return state;
  }
};

export default foldermetadatareducer;
