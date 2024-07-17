import { useState } from "react";

import ApartmentsList from "../components/ApartmentsList/ApartmetnsList";
import AddApartmentForm from "../components/AddApartmentForm/AddApartmentForm";

const Home = () => {
  const [apartmentsListChanged, setApartmentsListChanged] = useState(false);
  return (
    <>
      {" "}
      <AddApartmentForm setApartmentsListChanged={setApartmentsListChanged} />
      <ApartmentsList
        apartmentsListChanged={apartmentsListChanged}
        setApartmentsListChanged={setApartmentsListChanged}
      />
    </>
  );
};

export default Home;
