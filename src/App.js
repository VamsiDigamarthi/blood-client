import "./App.css";
import Header from "./components/Header/Header";
import Marque from "./components/Marque/Marque";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
  // useLocation,
} from "react-router-dom";
import Profile from "./components/profile/Profile";
import { useSelector } from "react-redux";
import Chat from "./components/Chat/Chat";
import NotFound from "./components/notfound/NotFound";
import InitialScreen from "./components/initialScreen/InitialScreen";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Cookies from "js-cookie";
import HowWeHelp from "./utilcomponents/howWeHelp/HowWeHelp";
import WhoWeAre from "./utilcomponents/whoweare/WhoWeAre";
import ContactUs from "./components/contactus/ContactUs";
import AddPatient from "./utilcomponents/addPatient/AddPatient";
import BloodBankBloodsAddRemove from "./utilcomponents/bloodbankBloodAddRemove/BloodBankBloodsAddRemove";
import TermAndConditions from "./utilcomponents/temsAndConditions/TermAndConditions";
import Privacy from "./utilcomponents/privacy/Privacy";
import BloodBankUi from "./utilcomponents/bloodbankui/BloodBankUi";
import { useEffect, useState } from "react";
import Conversation from "./utilcomponents/conversation/Conversation";
import NewInitialScree from "./components/newInitialScree/NewInitialScree";
import Explore from "./components/Explore/Explore";
import ScrollToTopOnRouteChange from "./ScrollToTopOnRouteChange";
import CursorBlur from "./components/CurserPointer/CurserPointer";
const App = () => {
  const UUU = useSelector((state) => state.authReducer.authData);

  // console.log(UUU);

  return (
    <Router>
      <div className="App">
        {/* <CursorBlur /> */}
        <ScrollToTopOnRouteChange />
        <Header />
        <div className="Header-Manager"></div>
        <Marque />
        <div className="second-app-card">
          <Routes>
            {/* <Route
              path="/registor"
              element={UUU ? <Navigate to="/" /> : <NewInitialScree />}
            /> */}

            <Route path="/registor" element={<InitialScreen />} />

            <Route path="/" element={<Home />} />
            <Route path="/howwehelp" element={<HowWeHelp />} />
            <Route path="/whoweare" element={<WhoWeAre />} />

            <Route
              path="/contact"
              element={UUU ? <ContactUs /> : <Navigate to="/registor" />}
            />
            <Route
              path="/patient"
              element={UUU ? <AddPatient /> : <Navigate to="/registor" />}
            />
            <Route
              path="/bloodbank"
              element={
                UUU ? <BloodBankBloodsAddRemove /> : <Navigate to="/registor" />
              }
            />

            <Route path="/temsconditions" element={<TermAndConditions />} />
            <Route path="/policy" element={<Privacy />} />
            <Route
              path="/chat"
              element={UUU ? <Chat /> : <Navigate to="/registor" />}
            />

            <Route
              path="/explore"
              element={UUU ? <Explore /> : <Navigate to="/registor" />}
            />
            {/* <Route
              path="/bloodbanks"
              element={UUU ? <BloodBankUi /> : <Navigate to="/registor" />}
            /> */}

            {/* <Route
              path="/conversation"
              element={UUU ? <Conversation /> : <Navigate to="/registor" />}
            /> */}

            <Route
              path="/Profile"
              element={UUU ? <Profile /> : <Navigate to="/registor" />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
        {/* <OTP /> */}
      </div>
    </Router>
  );
};

export default App;
