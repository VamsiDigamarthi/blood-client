import * as AuthApi from "../api/AuthRequest";

export const LogIns = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    console.log(data);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("/", { replace: true });
  } catch (e) {
    console.log(e?.response?.data?.message);
    alert(e?.response?.data?.message);
    console.log(formData);
    dispatch({ type: "AUTH_FAIL", data: e });
    // navigate("/registor", { state: dataToSend, replace: true });
  }
};

export const logout = (navigate) => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
  // console.log("lkjuhgfcvbnjkl");
  navigate("/", { replace: true });
};

// export const LogIns =
//   (formData, navigate, setOpenRegister, setSaveMobileToRegistor) =>
//   async (dispatch) => {
//     dispatch({ type: "AUTH_START" });
//     try {
//       const { data } = await AuthApi.logIn(formData);
//       // console.log(data);
//       dispatch({ type: "AUTH_SUCCESS", data: data });
//       navigate("/", { replace: true });
//     } catch (e) {
//       // console.log(e?.response?.data?.msg);
//       // alert(e?.response?.data?.msg);
//       console.log(formData);
//       dispatch({ type: "AUTH_FAIL", data: e });
//       setOpenRegister(true);
//       setSaveMobileToRegistor(formData);
//       // navigate("/registor", { state: dataToSend, replace: true });
//     }
//   };

// export const logout = (navigate) => async (dispatch) => {
//   dispatch({ type: "LOG_OUT" });
//   navigate("/", { replace: true });
// };
