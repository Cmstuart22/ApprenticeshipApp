const initState = {
  loggedIn: false,
  isRegistered: false,
  isAdmin: false,
  studentId: [],
  options: {
    _id: "1",
    name: "Select",
  },
};

const Reducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_LOGGED_IN":
      return {
        ...state,
        loggedIn: action.loggedIn,
      };

    case "IS_REGISTERED":
      return {
        ...state,
        isRegistered: action.isRegistered,
      };

    case "SET_IS_ADMIN":
      return {
        ...state,
        isAdmin: action.isAdmin,
      };

    case "CHANGE_STUDENT":
      return {
        ...state,
        options: {
          ...state.options,
          _id: action._id,
          name: action.name,
        },
      };

    case "SET_STUDENT_IDS":
      return {
        ...state,
        studentId: action.studentId,
      };

    default:
      return state;
  }
};

export default Reducer;
