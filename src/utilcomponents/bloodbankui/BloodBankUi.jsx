// import React, { useEffect, useState } from "react";
// import "./bloodbankui.css";
// import { useLocation, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { API } from "../../core/utils";
// const BloodBankUi = () => {
//   const [logitude, setLogitude] = useState("");
//   const [latitude, setLatitude] = useState("");
//   const navigate = useNavigate();
//   const [token, setToken] = useState("");
//   const [user, setUser] = useState("");
//   const location = useLocation();
//   const receivedData = location.state?.data;
//   //   console.log(receivedData);
//   useEffect(() => {
//     const jwtToken = Cookies.get("jwt_token");
//     if (jwtToken === undefined) {
//       navigate("/register", { replace: true });
//     } else {
//       setToken(jwtToken);
//     }
//   }, [navigate]);

//   //   console.log(otherData);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           // console.log(position.coords.longitude);
//           setLogitude(position.coords.longitude); // Set longitude state
//           setLatitude(position.coords.latitude); // Set latitude state
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported.");
//     }
//   }, [token]);

//   const getDonors = (bloodGroup, quantity, distacnce = 5) => {
//     API.get(
//       `blood/find/blood/bank/longitude/${logitude}/latitude/${latitude}/distance/${distacnce}/bloodGroup/${bloodGroup}/quantity/${quantity}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     )
//       .then((res) => {
//         console.log(res.data);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   useEffect(() => {
//     getDonors(user?.bloodGroup);
//   }, [logitude, latitude, user]);

//   return (
//     <div className="blood-bank-ui-main">
//       <h1>Blood Banks</h1>
//     </div>
//   );
// };

// export default BloodBankUi;
