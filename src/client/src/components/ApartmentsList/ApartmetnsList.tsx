import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ApartmentList.module.css";

const URL = "https://aparte-api.onrender.com/apartments";

interface ApartmentsListInterface {
  rooms: number;
  price: number;
  name: string;
  description?: string;
  _id: string;
}

interface ApartmentListProps {
  apartmentsListChanged: boolean;
  setApartmentsListChanged: (state: boolean) => void;
}

const ApartmentsList = ({
  apartmentsListChanged,
  setApartmentsListChanged,
}: ApartmentListProps) => {
  const [apartmetns, setApartments] = useState<ApartmentsListInterface[]>([]);

  useEffect(
    function () {
      const fetchData = async () => {
        try {
          const options = {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          };
          const response = await axios.get(URL, options);
          if (response.data.apartments) {
            setApartments(response.data.apartments);
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
      setApartmentsListChanged(false);
    },
    [apartmentsListChanged]
  );

  const deleteApartment = async (id: string) => {
    const url = `${URL}/${id}`;

    try {
      await axios.delete(url);
      setApartmentsListChanged(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.apartmentsList}>
      <h2 className={styles.apartmentListHeader}>
        Your Location: found {apartmetns.length} apartments
      </h2>
      {apartmetns.length > 0 ? (
        apartmetns.map((apt) => {
          return (
            <div className={styles.apartmentCard} key={apt._id}>
              <div className={styles.cardText}>
                <h3>{apt.name}</h3>
                <div> {apt.description && <p>{apt.description}</p>}</div>
              </div>
              <div className={styles.cardDetails}>
                <p>
                  {apt.rooms + " "}
                  {apt.rooms === 1 ? "room" : "rooms"}{" "}
                </p>
                <p>${apt.price} per night </p>

                <button onClick={() => deleteApartment(apt._id)}>Delete</button>
              </div>
            </div>
          );
        })
      ) : (
        <p>No apartments availiable</p>
      )}
    </div>
  );
};

export default ApartmentsList;
