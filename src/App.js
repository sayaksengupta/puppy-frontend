import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./Pages/AboutUs";
import EditBreederProfile from "./Pages/EditBreederProfile";
import BreedMatchmaker from "./Pages/BreedMatchmaker";
import DogProfile from "./Pages/DogProfile";
import FindPuppy from "./Pages/FindPuppy";
import Home from "./Pages/Home";
import ListPuppy from "./Pages/ListPuppy";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ScrollToTop from "./Components/helper/ScrollToTop";
import Pedigree from "./Pages/Pedigree";
import RegisterSelect from "./Pages/RegisterSelect";
import BreederProfile from "./Pages/BreederProfile";
import PastPuppies from "./Pages/PastPuppies";
import MaleDogs from "./Pages/MaleDogs";
import FemaleDogs from "./Pages/FemaleDogs";
import AvailablePuppies from "./Pages/AvailablePuppies";
import EditPuppy from "./Pages/EditPuppy";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Terms from "./Pages/Terms";
import Wishlist from "./Pages/Wishlist";
import SignupCustomer from "./Pages/SignupCustomer";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/dog-profile" exact element={<DogProfile />} />
            <Route path="/add-pedigree" exact element={<Pedigree />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Signup />} />
            <Route
              path="/register-customer"
              exact
              element={<SignupCustomer />}
            />
            <Route path="/register-select" exact element={<RegisterSelect />} />
            <Route path="/breeder-profile" exact element={<BreederProfile />} />
            <Route
              path="/edit-breeder-profile"
              exact
              element={<EditBreederProfile />}
            />
            <Route path="/find-puppy" exact element={<FindPuppy />} />
            <Route path="/list-puppy" exact element={<ListPuppy />} />
            <Route path="/edit-puppy" exact element={<EditPuppy />} />
            <Route path="/male-dogs" exact element={<MaleDogs />} />
            <Route path="/female-dogs" exact element={<FemaleDogs />} />
            <Route path="/past-puppies" exact element={<PastPuppies />} />
            <Route
              path="/available-puppies"
              exact
              element={<AvailablePuppies />}
            />
            <Route
              path="/breed-matchmaker"
              exact
              element={<BreedMatchmaker />}
            />
            <Route path="/wishlist" exact element={<Wishlist />} />
            <Route path="/about-us" exact element={<AboutUs />} />
            <Route path="/privacy-policy" exact element={<PrivacyPolicy />} />
            <Route path="/terms" exact element={<Terms />} />
          </Routes>
        </>
      </Router>
    </>
  );
}

export default App;
