import React, { useEffect, useRef, useState } from 'react';
import './addpatient.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { bloodGroup } from '../../data/bloodGoup';
import { API, serverUrl } from '../../core/utils';
import { ToastContainer } from 'react-toastify';
import { CiChat1 } from 'react-icons/ci';
import Cookies from 'js-cookie';
import { io } from 'socket.io-client';
import { RxCross1 } from 'react-icons/rx';
import { MdOutlineEdit } from 'react-icons/md';
import { dangerMessage, registorSucces } from '../tostMessages/tostMessages';
import DonorsListS from '../donorsList/DonorsList';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};
const AddPatient = () => {
  const UUU = useSelector((state) => state.authReducer.authData);

  // console.log(UUU);
  const [logitude, setLogitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [patinets, setPatinets] = useState({
    patientFirstName: '',
    patientLastName: '',
    hospitalName: '',
    quantity: '',
    bloodGroup: '',
    requestType: '',
    requiredDate: '',
    longitude: '',
    latitude: '',
  });

  const onPatient = (e) => {
    setPatinets({ ...patinets, [e.target.name]: e.target.value });
  };
  const socket = useRef();
  const [patientDetails, setPatientDetails] = useState([]);
  const [singlePatinet, setSinglePatinet] = useState('');
  const [singleEntirePatinet, setSingleEntirePatinet] = useState([]);
  const [donorsList, setDonorsList] = useState([]);
  const [dnorWithDistance, setDnorWithDistance] = useState([]);
  const [bloodBankModalOpen, setBloodBankModalOpen] = useState(false);
  const [distance, setDistance] = useState(5);
  const [editPatientFormDisplay, setEditPatientFormDisplay] = useState(false);
  // store to blood bank bank fetch
  const [bloodBankFetchStorePatinet, setBloodBankFetchStorePatinet] =
    useState(null);
  const [bloodBankStorage, setBloodBankStorage] = useState([]);
  const [bloodBankDistance, setBloodBankDistance] = useState(5);
  // add patinet form validations errors
  const [patinetValidation, setPatinetValidation] = useState({});
  const [user, setUser] = useState(null);
  //
  // chat
  // const [chatModelOpen, setChatModelOpen] = useState(false);
  //
  const [onlineUsers, setOnlineUsers] = useState([]);
  // chat
  useEffect(() => {
    API.get('/auth/getUser', {
      headers: {
        Authorization: `Bearer ${UUU.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res.data?._id);
        setUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // // chat functionally
  // useEffect(() => {
  //   socket.current = io("ws://localhost:8080");
  //   socket.current.emit("new-user-add", user?._id);
  //   socket.current.on("get-users", (users) => {
  //     const userIds = users.map((item) => item.userId);
  //     setOnlineUsers(userIds);
  //   });
  // }, [user]);

  // chat functionally

  const getPatient = () => {
    API.get('/patient/get/patinet', {
      headers: {
        Authorization: `Bearer ${UUU?.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        // console.log(res.data);
        setPatientDetails(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getDonorList = (bloodGroup, requestType, distance = 5) => {
    console.log(bloodGroup);
    API.get(
      `/blood/find/donor/longitude/${logitude}/latitude/${latitude}/distance/${distance}/${bloodGroup}`,
      {
        headers: {
          Authorization: `Bearer ${UUU?.token}`,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => {
        setDonorsList(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getPatient();
    // getDonorList();
  }, [UUU]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log(position.coords.longitude);
          // console.log(position.coords.latitude);
          setLogitude(position.coords.longitude); // Set longitude state
          setLatitude(position.coords.latitude); // Set latitude state
          setPatinets({
            ...patinets,
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported.');
    }
  }, []);
  // afetr patinet added fetch donors
  useEffect(() => {
    setSinglePatinet(patientDetails[0]?.patientFirstName);
    setSingleEntirePatinet(patientDetails[0]);
    setBloodBankFetchStorePatinet(patientDetails[0]);
    getDonorList(patientDetails[0]?.bloodGroup, patientDetails[0]?.requestType);
  }, [patientDetails]);

  const validate = (values) => {
    const errors = {};

    const name = /^[a-zA-Z\s]*$/;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.patientFirstName) {
      errors.patientFirstName = 'Patient FirstName is required!';
    } else if (!name.test(values.patientFirstName)) {
      errors.patientFirstName =
        'Patient FirstName shold containe only charaters';
    }
    // last name
    if (!values.patientLastName) {
      errors.patientLastName = 'Patient LastName is required!';
    } else if (!name.test(values.patientLastName)) {
      errors.patientLastName = 'Patient LastName shold containe only charaters';
    }

    if (!values.hospitalName) {
      errors.hospitalName = 'Hospital Name is required!';
    } else if (!name.test(values.hospitalName)) {
      errors.hospitalName = 'Hospital Name shold containe only charaters';
    }

    if (!values.quantity) {
      errors.quantity = 'Quantity is required!';
    }

    // blood group
    if (!values.bloodGroup) {
      errors.bloodGroup = 'Blood Group is required!';
    }
    if (!values.requestType) {
      errors.requestType = 'Request Type is required!';
    }

    // date of birth
    if (!values.requiredDate) {
      errors.requiredDate = 'Required Date is required!';
    }

    setPatinetValidation(errors);
    return Object.keys(errors).length === 0;
  };

  // console.log(patinets);

  const onAddPatinet = (e) => {
    console.log('addd');
    e.preventDefault();
    if (editPatientFormDisplay) {
      // edit date
      console.log(patinets);
      API.patch('/patient/edit/patient', patinets, {
        headers: {
          authorization: `Bearer ${UUU?.token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          registorSucces(res.data);
          // console.log(res.data);
          getPatient();
        })
        .catch((e) => {
          console.log(e);
          dangerMessage('something went wrong please try again');
        });
    } else {
      // add data
      console.log(validate(patinets));
      if (validate(patinets)) {
        console.log('cond');
        API.post('/patient/add/patient', patinets, {
          headers: {
            authorization: `Bearer ${UUU?.token}`,
            'Content-Type': 'application/json',
          },
        })
          .then((res) => {
            registorSucces('patinet added..!');
            console.log(res.data);
            getPatient();
          })
          .catch((e) => {
            console.log(e);
            dangerMessage('something went wrong please try again');
          });
      }
    }
  };

  const onPatinetClickToFetchDonors = (patinet) => {
    console.log(patinet);
    setSingleEntirePatinet(patinet);
    setSinglePatinet(patinet?.patientFirstName);
    getDonorList(patinet?.bloodGroup, patinet?.requestType);
    setBloodBankFetchStorePatinet(patinet);
  };

  //
  const onDecrementCount = () => {
    if (distance >= 5) {
      setDistance((prev) => prev - 5);
      getDonorList(singleEntirePatinet?.bloodGroup, '', distance - 5);
    }
  };
  const onIncrementCount = () => {
    console.log('inc');
    if (distance <= 100) {
      setDistance((prev) => prev + 5);
      getDonorList(singleEntirePatinet?.bloodGroup, '', distance + 5);
    }
  };

  const onEditPatinetDetails = (patient) => {
    setSingleEntirePatinet(patient);
    setEditPatientFormDisplay(true);
    setPatientDetails([]);
    setPatinets(patient);
  };
  const onBloodBankModal = () => {
    setBloodBankModalOpen(true);
  };

  // blood banks
  const fetchBloodBanks = (bloodGroup, quantity, distance = 50) => {
    // console.log(bloodGroup, quantity);
    API.get(
      `/blood/find/blood/bank/longitude/${logitude}/latitude/${latitude}/distance/${distance}/bloodGroup/${bloodGroup}/quantity/${quantity}`,
      {
        headers: {
          authorization: `Bearer ${UUU?.token}`,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => {
        console.log(res.data);
        setBloodBankStorage(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    fetchBloodBanks(
      singleEntirePatinet?.bloodGroup,
      singleEntirePatinet?.quantity
    );
  }, [singleEntirePatinet]);

  const onDecrementCountBloodBank = () => {
    if (bloodBankDistance >= 5) {
      setBloodBankDistance((prev) => prev - 5);
      fetchBloodBanks(
        singleEntirePatinet?.bloodGroup,
        singleEntirePatinet?.quantity,
        bloodBankDistance - 5
      );
    }
  };

  const onIncrementCountBloodBank = () => {
    if (bloodBankDistance <= 100) {
      setBloodBankDistance((prev) => prev + 5);
      fetchBloodBanks(
        singleEntirePatinet?.bloodGroup,
        singleEntirePatinet?.quantity,
        bloodBankDistance + 5
      );
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    // console.log(distance);
    return distance;
  };

  useEffect(() => {
    const calculateDistances = () => {
      const distancesArray = donorsList.map((user) => {
        const distance = calculateDistance(
          user.location.coordinates[1],
          user.location.coordinates[0],
          latitude,
          logitude
        );
        return { ...user, distance };
      });
      const sorted = distancesArray
        .slice()
        .sort((a, b) => a.distance - b.distance);
      setDnorWithDistance(sorted);
    };
    donorsList && calculateDistances();
  }, [donorsList]);
  console.log(onlineUsers);
  console.log(dnorWithDistance);

  return (
    <div className="add-patinet-main-card">
      <h1>Add Patient Details</h1>
      <ToastContainer className="tost-class" />
      {!bloodBankModalOpen ? (
        <>
          <div className="add-patinet-form-sloder-card">
            <div className="show-patient-container">
              <div className="show-patient-donor-card">
                {patientDetails[0] !== undefined && (
                  <div>
                    <span
                      onClick={() =>
                        onPatinetClickToFetchDonors(patientDetails[0])
                      }
                      style={{
                        color:
                          singlePatinet ===
                            patientDetails[0]?.patientFirstName && 'red',
                        cursor: 'pointer',
                      }}
                    >
                      {patientDetails[0]?.patientFirstName?.slice(0, 10)}
                    </span>
                    <span className="patient-edit">
                      <MdOutlineEdit
                        onClick={() => onEditPatinetDetails(patientDetails[0])}
                        size={20}
                      />
                    </span>
                  </div>
                )}

                {patientDetails[1] !== undefined ||
                editPatientFormDisplay === true ? (
                  <div>
                    <span
                      onClick={() =>
                        onPatinetClickToFetchDonors(patientDetails[1])
                      }
                      style={{
                        color:
                          singlePatinet ===
                            patientDetails[1]?.patientFirstName && 'red',
                        cursor: 'pointer',
                      }}
                    >
                      {patientDetails[1]?.patientFirstName?.slice(0, 10)}
                    </span>

                    <span className="patient-edit">
                      <MdOutlineEdit
                        onClick={() => onEditPatinetDetails(patientDetails[1])}
                        size={20}
                      />
                    </span>
                  </div>
                ) : (
                  <div onClick={() => setPatientDetails([])}>
                    <span>Add patient</span>
                  </div>
                )}

                {patientDetails.length > 0 && (
                  <div className="add-patinet-distacnce-card">
                    <span onClick={onDecrementCount}>-</span>
                    <span>{distance}</span>
                    <span onClick={onIncrementCount}>+</span>
                  </div>
                )}
              </div>
              {patientDetails?.length > 0 ? (
                <div className="patinet-show-to-donor">
                  <div className="got-chat-card">
                    <span>
                      <Link to="/chat" className="link">
                        Go to Chat
                      </Link>
                    </span>
                    <span onClick={onBloodBankModal}>Blood Banks List</span>
                  </div>

                  {donorsList?.length > 0 ? (
                    <>
                      {dnorWithDistance?.map((each, key) => (
                        <div key={key} className="single-donor-card">
                          <DonorsListS
                            currentUser={user?._id}
                            online={onlineUsers.includes(each._id)}
                            each={each}
                          />
                        </div>
                      ))}
                    </>
                  ) : (
                    <div>
                      <h2>Details not available</h2>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={onAddPatinet} className="add-patient-form-data">
                  {patinetValidation.patientFirstName && (
                    <p>{patinetValidation.patientFirstName}</p>
                  )}
                  <input
                    placeholder="Patient First Name"
                    name="patientFirstName"
                    type="text"
                    onChange={onPatient}
                    value={patinets.patientFirstName}
                  />
                  {patinetValidation.patientLastName && (
                    <p>{patinetValidation.patientLastName}</p>
                  )}
                  <input
                    placeholder="Patient Last Name"
                    name="patientLastName"
                    type="text"
                    onChange={onPatient}
                    value={patinets.patientLastName}
                  />
                  {patinetValidation.hospitalName && (
                    <p>{patinetValidation.hospitalName}</p>
                  )}
                  <input
                    name="hospitalName"
                    onChange={onPatient}
                    placeholder="Hospital Name"
                    type="text"
                    value={patinets.hospitalName}
                  />
                  {patinetValidation.quantity && (
                    <p>{patinetValidation.quantity}</p>
                  )}
                  <input
                    placeholder="Quantity in ml"
                    onChange={onPatient}
                    name="quantity"
                    type="text"
                    value={patinets.quantity}
                  />
                  {patinetValidation.bloodGroup && (
                    <p>{patinetValidation.bloodGroup}</p>
                  )}
                  <select
                    value={patinets.bloodGroup}
                    name="bloodGroup"
                    onChange={onPatient}
                    id="selected"
                  >
                    <option disabled hidden selected>
                      SELECT BLOOD GROUP
                    </option>
                    {bloodGroup?.map((each, key) => (
                      <option key={key} value={each}>
                        {each}
                      </option>
                    ))}
                  </select>
                  {patinetValidation.requestType && (
                    <p>{patinetValidation.patientLastName}</p>
                  )}
                  <select
                    value={patinets.requestType}
                    onChange={onPatient}
                    name="requestType"
                  >
                    <option disabled hidden selected>
                      SELECT BLOOD Type
                    </option>
                    <option>Blood</option>
                    <option>Platlets</option>
                  </select>
                  {patinetValidation.requiredDate && (
                    <p>{patinetValidation.requiredDate}</p>
                  )}
                  <div className="date-card">
                    <span>Required Date</span>
                    <input
                      value={patinets.requiredDate}
                      onChange={onPatient}
                      name="requiredDate"
                      type="date"
                    />
                  </div>
                  <button type="submit">Submit</button>
                </form>
              )}
            </div>

            {/* right side slider */}
            <section className="patient-slider-sec">
              <Slider {...settings}>
                <div className="patinet-slider-app">
                  <img
                    src="https://i.ytimg.com/vi/eJj8F6w_Pns/maxresdefault.jpg"
                    alt=""
                  />
                </div>
                <div className="patinet-slider-app">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlKmOc8PZDVE8f1p2r90LbncWpQo8aqIlqAZJCkI7D5w&s"
                    alt=""
                  />
                </div>
              </Slider>
            </section>
          </div>
        </>
      ) : (
        <div className="blood-banks-model">
          <div className="blood-bank-main-model">
            <div>
              <h3>Blood Banks </h3>
              <RxCross1 onClick={() => setBloodBankModalOpen(false)} />
            </div>
            <div>
              <h2>Patient Name : {singlePatinet}</h2>
              <span>
                Plase select patinet name to find corresponding blood banks
              </span>
              <div className="add-patinet-distacnce-card">
                <span onClick={onDecrementCountBloodBank} key="1">
                  -
                </span>
                <span key="2">{bloodBankDistance}</span>
                <span onClick={onIncrementCountBloodBank} key="3">
                  +
                </span>
              </div>
            </div>
            <div className="blood-bank-main">
              {bloodBankStorage?.map((each) => (
                <div className="single-blood-bank-card">
                  <img
                    src={
                      each.profile
                        ? `${serverUrl}/${each.profile}`
                        : 'https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png'
                    }
                    alt=" blod"
                  />
                  <div>
                    <h3>{each?.bloodBankName}</h3>
                    <span>{each?.mobile}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPatient;
