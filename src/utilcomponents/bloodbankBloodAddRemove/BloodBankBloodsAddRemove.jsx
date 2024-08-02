import React, { useEffect, useState } from 'react';
import './bloodbankbloodaddremove.css';
import { API } from '../../core/utils';
import Cookies from 'js-cookie';
import { FaRegEdit } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { bloodGroup } from '../../data/bloodGoup';
import { useSelector } from 'react-redux';
import { dangerMessage, registorSucces } from '../tostMessages/tostMessages';

import { RxCross2 } from 'react-icons/rx';

const BloodBankBloodsAddRemove = () => {
  const UUU = useSelector((state) => state.authReducer.authData);
  const [bloods, setBlood] = useState([]);
  // const [bloodData, setBloodData] = useState({
  //   bloodGroup: '',
  //   howMuchQuatity: '',
  // });

  const [logitude, setLogitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [distance, setDistance] = useState(5);

  const [bloodAllGroups, setBloodAllGroups] = useState([
    { bloodGroup: 'O+', howMuchQuatity: 0 },
    { bloodGroup: 'O-', howMuchQuatity: 0 },
    { bloodGroup: 'A+', howMuchQuatity: 0 },
    { bloodGroup: 'A-', howMuchQuatity: 0 },
    { bloodGroup: 'B+', howMuchQuatity: 0 },
    { bloodGroup: 'B-', howMuchQuatity: 0 },
    { bloodGroup: 'AB+', howMuchQuatity: 0 },
    { bloodGroup: 'AB-', howMuchQuatity: 0 },
    // { bloodGroup: 'RH+-', howMuchQuatity: 0 },
    // { bloodGroup: 'RH-', howMuchQuatity: 0 },
    // { bloodGroup: 'A1B+', howMuchQuatity: 0 },
    // { bloodGroup: 'A1B-', howMuchQuatity: 0 },
    // { bloodGroup: 'A2B+', howMuchQuatity: 0 },
    // { bloodGroup: 'A2B-', howMuchQuatity: 0 },
    // { bloodGroup: 'INRA', howMuchQuatity: 0 },
    // { bloodGroup: 'Bombay Blood Group', howMuchQuatity: 0 },
  ]);

  const [showPatinetOrEditUnits, setShowPatinetOrEditUnits] = useState(1);

  const [patinetDestails, setPatinetDetails] = useState([]);
  const [patinetDetailsWithDistance, setPatinetDetailsWithDistance] = useState(
    []
  );

  const [selectBloodGroup, setSelectBloodGroup] = useState('A+');

  const [BusinessInformationTimingsData, setBusinessInformationTimingsData] =
    useState({
      Sunday: {
        isClosed: false,
        is24Hours: false,
        timming: ['', ''],
      },
      Monday: {
        isClosed: false,
        is24Hours: false,
        timming: ['', ''],
      },
      Tuesday: {
        isClosed: false,
        is24Hours: false,
        timming: ['', ''],
      },
      Wednesday: {
        isClosed: false,
        is24Hours: false,
        timming: ['', ''],
      },
      Thursday: {
        isClosed: false,
        is24Hours: false,
        timming: ['', ''],
      },
      Friday: {
        isClosed: false,
        is24Hours: false,
        timming: ['', ''],
      },
      Saturday: {
        isClosed: false,
        is24Hours: false,
        timming: ['', ''],
      },
    });

  // token get

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log(position.coords.longitude);
          setLogitude(position.coords.longitude); // Set longitude state
          setLatitude(position.coords.latitude); // Set latitude state
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      alert(
        'please give me locations permitions other wise will not display the patinet details'
      );
    }
  }, []);

  useEffect(() => {
    API.get('/bloodbank/get/blood/bank', {
      headers: {
        authorization: `Bearer ${UUU?.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        // console.log(res.data);
        setBlood(res.data);
        setBloodAllGroups(
          res.data?.bloodGroups === undefined ||
            res.data?.bloodGroups === null ||
            (res.data?.bloodGroups).length === 0
            ? bloodAllGroups
            : res.data?.bloodGroups
        );
        setBusinessInformationTimingsData(
          res.data?.bloodBankTimming
            ? res.data?.bloodBankTimming
            : BusinessInformationTimingsData
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const getPatinetDetails = (bloodGroup = 'A+', distance = 5) => {
    API.get(
      `/blood/find/recevire/list/longitude/${logitude}/latitude/${latitude}/distance/${distance}/bloodGroup/${bloodGroup}`,
      {
        headers: {
          authorization: `Bearer ${UUU?.token}`,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => {
        setPatinetDetails(res?.data);
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  useEffect(() => {
    getPatinetDetails();
  }, [showPatinetOrEditUnits]);

  const onDecrementCount = () => {
    if (distance >= 5) {
      setDistance((prev) => prev - 5);
      // getPatinetDetails()
      // console.log(selectBloodGroup);
      getPatinetDetails(selectBloodGroup, distance - 5);
    }
  };
  const onIncrementCount = () => {
    if (distance <= 100) {
      // console.log(selectBloodGroup);
      setDistance((prev) => prev + 5);
      getPatinetDetails(selectBloodGroup, distance + 5);
    }
  };
  // setSelectBloodGroup

  const onBloodGroupSeleFun = (e) => {
    setSelectBloodGroup(e.target.value);
    getPatinetDetails(e.target.value, distance);
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
      const distancesArray = patinetDestails.map((user) => {
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
      setPatinetDetailsWithDistance(sorted);
    };
    patinetDestails && calculateDistances();
  }, [patinetDestails]);

  // Helper function to convert 12-hour time to 24-hour time
  const convertTo24HourFormat = (time12h) => {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  };

  const convertTo12HourFormat = (time24hrs) => {
    // Split the input time string into hours and minutes
    let [hours, minutes] = time24hrs.split(':');

    // Determine the period (AM/PM)
    let period = parseInt(hours) >= 12 ? 'PM' : 'AM';

    // Convert hours from 24-hour to 12-hour format
    hours = parseInt(hours) % 12 || 12; // The `|| 12` handles the case where `hours % 12` is 0 (i.e., midnight or noon)

    // Format the minutes to always have two digits
    minutes = minutes;

    // Return the formatted 12-hour time string
    return `${hours}:${minutes} ${period}`;
  };

  // console.log(patinetDetailsWithDistance);

  const handleTimeChange = (day, index, newValue) => {
    setBusinessInformationTimingsData((prevState) => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        timming: prevState[day].timming.map((time, i) =>
          i === index ? convertTo12HourFormat(newValue) : time
        ),
      },
    }));
  };

  const CheckButtonChangeHandler = (e, day, type) => {
    const { checked } = e.target;
    setBusinessInformationTimingsData((prevState) => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        [type]: checked,
      },
    }));
  };

  const BloodbankEditBusinessInformationTimingsUpdate = () => {
    // console.log(BusinessInformationTimingsData);

    API.patch(
      '/bloodbank/add/bloodbank/timmings',
      BusinessInformationTimingsData,
      {
        headers: {
          authorization: `Bearer ${UUU?.token}`,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => {
        registorSucces('Updated Timings Sucessfully.... ');
        // console.log(res.data);
        setShowPatinetOrEditUnits(1)

      })
      .catch((e) => {
        console.log(e);
        dangerMessage('something went wrong please try again');
      });
  };

  const [ActiveBloodQuantityEditing, setActiveBloodQuantityEditing] =
    useState(null);

  const [changedBloodQuantity, setchangedBloodQuantity] = useState({
    inUnits: null,
    inMl: null,
  });

  const [isBloodQuantityEditting, setisBloodQuantityEditting] = useState(false);

  useEffect(() => {
    setchangedBloodQuantity({
      inUnits: bloodAllGroups[ActiveBloodQuantityEditing]?.howMuchQuatity,
      inMl: bloodAllGroups[ActiveBloodQuantityEditing]?.howMuchQuatity * 450,
    });
  }, [ActiveBloodQuantityEditing]);

  const bloodQuantityDataSubmitHandler = () => {
    bloodAllGroups[ActiveBloodQuantityEditing] = {
      howMuchQuatity: changedBloodQuantity.inUnits,
      bloodGroup: bloodAllGroups[ActiveBloodQuantityEditing]?.bloodGroup,
    };

    API.post('/bloodbank/add/bloods', bloodAllGroups, {
      headers: {
        authorization: `Bearer ${UUU?.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        registorSucces('Updated Quantity Sucessfully.... ');
        // console.log(res.data);
      })
      .catch((e) => {
        // console.log(e);
        dangerMessage('something went wrong please try again');
      });

    setisBloodQuantityEditting(false);
  };

  const handleChangeInBloodQuantity = (e) => {
    const { name, value } = e.target;

    name === 'bloodQuantityinUnits'
      ? setchangedBloodQuantity({
          inUnits:
            value < 0 ||
            value === 'NaN' ||
            value === '-' ||
            value === '' ||
            value === ' '
              ? 0
              : value,
          inMl:
            value < 0 ||
            value === 'NaN' ||
            value === '-' ||
            value === '' ||
            value === ' '
              ? 0
              : value * 450,
        })
      : setchangedBloodQuantity({
          inMl:
            value < 0 ||
            value === 'NaN' ||
            value === '-' ||
            value === '' ||
            value === ' '
              ? 0
              : value,
          inUnits:
            value < 0 ||
            value === 'NaN' ||
            value === '-' ||
            value === '' ||
            value === ' '
              ? 0
              : parseFloat(value / 450).toFixed(2),
        });
  };

  return (
    <section className="blood-bank-add-remove-main-card">
      <ToastContainer className="tost-class" />
      <h1>{bloods?.bloodBankName}</h1>
      <section className="edit-banks-show-patinets">
        <span
          className="bloodbankEditCursorStyle"
          onClick={() => setShowPatinetOrEditUnits(1)}
          data-active={showPatinetOrEditUnits === 1}
        >
          Blood Quantity Edit
        </span>

        <span
          className="bloodbankEditCursorStyle"
          onClick={() => setShowPatinetOrEditUnits(2)}
          data-active={showPatinetOrEditUnits === 2}
        >
          Edit Business Information
        </span>

        <span
          className="bloodbankEditCursorStyle"
          onClick={() => setShowPatinetOrEditUnits(3)}
          data-active={showPatinetOrEditUnits === 3}
        >
          Show Patinet Details
        </span>
      </section>

      {showPatinetOrEditUnits === 1 && (
        <section className="blood-banks-todo">
          <div>
            <h3>Available Bloods</h3>
          </div>

          <div className="blood-main-todo">
            {bloodAllGroups?.map((each, key) => (
              <div key={key} className="single-todo">
                <img src=".\images\icon.jpg" alt="" className="" />
                <div className="single-todo-blood-group-name">
                  <span>{each.bloodGroup}</span>
                </div>
                <div className="single-todo-blood-quantity">
                  <span>{`${parseFloat(each.howMuchQuatity).toFixed(
                    2
                  )} U `}</span>
                  <span>{`${each.howMuchQuatity * 450} ml`}</span>
                </div>

                <div
                  className="single-todo-edit-icon"
                  onClick={() => {
                    setActiveBloodQuantityEditing(key);
                    setisBloodQuantityEditting(true);
                  }}
                >
                  <FaRegEdit size={24} />
                </div>
              </div>
            ))}
          </div>

          <div
            className={
              'bloodQuantityDataEditContainer ' +
              (isBloodQuantityEditting && 'isBloodQuantityEditting')
            }
          >
            <div className="bloodQuantityDataEditContainerSection">
              <div className="bloodQuantityDataEditContainerSectionCloseButton" onClick={ () => setisBloodQuantityEditting(false)}>
                <RxCross2 size={24}/>
              </div>
              <div className="bloodQuantityDataEditContainer-header">
                <span>Blood Group</span>
                <span>
                  {bloodAllGroups[ActiveBloodQuantityEditing]?.bloodGroup}
                </span>
              </div>
              <div className="bloodQuantityDataEditContainer-body">
                <div className="bloodQuantityDataEditContainerInputFields">
                  <input
                    name="bloodQuantityinUnits"
                    placeholder="Quantity (U)"
                    type="number"
                    className="bloodQuantityDataInputHolder"
                    onChange={(e) => {
                      handleChangeInBloodQuantity(e);
                    }}
                    value={changedBloodQuantity.inUnits}
                  />
                  <input
                    name="bloodQuantityinMl"
                    placeholder="Quantity (ml)"
                    min="1"
                    type="number"
                    className="bloodQuantityDataInputHolder"
                    onChange={(e) => {
                      handleChangeInBloodQuantity(e);
                    }}
                    value={changedBloodQuantity.inMl}
                  />
                </div>

                <button type="submit" onClick={bloodQuantityDataSubmitHandler}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {showPatinetOrEditUnits === 2 && (
        <div
          className={`Blood-bank-Edit-Business-Information ${
            showPatinetOrEditUnits === 2 && 'openBusinessInformation'
          }`}
        >
          <div className="Blood-bank-Edit-Business-Information-Section-Container">
            <div className="Blood-bank-Edit-Business-Information-Section-header">
              <p>Business Information</p>

              <div className="Blood-bank-Edit-Business-Information-Section-header-right">
                <button
                  onClick={BloodbankEditBusinessInformationTimingsUpdate}
                  type="Submit"
                >
                  Submit
                </button>
                <div
                  className="Blood-bank-Edit-Business-Information-Section-close-button"
                  onClick={() => setShowPatinetOrEditUnits(1)}
                >
                  <RxCross2 size={28} />
                </div>
              </div>
            </div>

            <div className="Blood-bank-Edit-Business-Information-Section-body">
              {Object.keys(BusinessInformationTimingsData).map((day) => {
                const timings = BusinessInformationTimingsData[day].timming;
                const isClosed = BusinessInformationTimingsData[day].isClosed;
                const is24Hours = BusinessInformationTimingsData[day].is24Hours;
                // console.log(convertTo24HourFormat(timings[0]));

                return (
                  <div
                    className="Blood-bank-Edit-Business-Information-Section-body-inner-card"
                    key={day}
                  >
                    <h4>{day}</h4>

                    <div className="inputTimeOptionsChecker">
                      {!is24Hours && (
                        <span>
                          <input
                            type="checkbox"
                            name="isClosed"
                            onChange={(e) =>
                              CheckButtonChangeHandler(e, day, 'isClosed')
                            }
                            checked={isClosed}
                          />
                          Closed
                        </span>
                      )}

                      {!isClosed && (
                        <span>
                          <input
                            type="checkbox"
                            name="is24HoursOpen"
                            onChange={(e) =>
                              CheckButtonChangeHandler(e, day, 'is24Hours')
                            }
                            checked={is24Hours}
                          />
                          24 Hours Open
                        </span>
                      )}
                    </div>

                    {!isClosed && !is24Hours && (
                      <div className="inputTimeSetter">
                        <input
                          type="time"
                          value={convertTo24HourFormat(timings[0])}
                          onChange={(e) =>
                            handleTimeChange(day, 0, e.target.value)
                          }
                          className="Blood-bank-Edit-Business-Information-setTimings-Input"
                        />
                        <input
                          type="time"
                          value={convertTo24HourFormat(timings[1])}
                          onChange={(e) =>
                            handleTimeChange(day, 1, e.target.value)
                          }
                          className="Blood-bank-Edit-Business-Information-setTimings-Input"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {showPatinetOrEditUnits === 3 && (
        <section className="show-patinet-to-blood-banks">
          <section className="blood-bank-patinet-list-first-card">
            <div className="add-patinet-distacnce-card">
              <span onClick={onDecrementCount}>-</span>
              <span>{`${distance} km `} </span>
              <span onClick={onIncrementCount}>+</span>
            </div>
            <select
              onChange={onBloodGroupSeleFun}
              className="add-patinet-distacnce-card-select-field"
            >
              <option selected>Select Blood Group</option>
              {bloodGroup?.map((each, key) => (
                <option key={key} value={each}>
                  {each}
                </option>
              ))}
            </select>
          </section>
          {patinetDetailsWithDistance?.length > 0 ? (
            <section className="all-patinets-details-added">
              {patinetDetailsWithDistance?.map((each, key) => (
                <section key={key} className="single-patinet-card">
                  <h3>{each?.patientFirstName}</h3>
                  <span>{each?.bloodGroup}</span>
                  <span>
                    {parseFloat(each.distance.toFixed(2))} km distance
                  </span>
                </section>
              ))}
            </section>
          ) : (
            <section className="no-patinet-details">
              <h2>No Patinet Details</h2>
              <p>Please Filter the Another Blood Group and Chnage Distance</p>
              <p>ALERT</p>
              <p>
                Please Check once again user location permission enable or not
                if your location permittion is disable will not show any patinet
                details
              </p>
              <p>Please give me the your locations permittions</p>
            </section>
          )}
        </section>
      )}
    </section>
  );
};

export default BloodBankBloodsAddRemove;
