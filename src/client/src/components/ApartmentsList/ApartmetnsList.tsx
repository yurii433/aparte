import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
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

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

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
            setIsLoading(false);
            setApartments(response.data.apartments);
          }
        } catch (err: unknown) {
          setIsLoading(false);
          setError(true);
          if (axios.isAxiosError(err)) {
            console.log("Axios error:", err.message);
          } else {
            console.log("Unexpected error:", err);
          }
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

  if (isLoading) {
    return (
      <div className={styles.loaderWrap}>
        <div className={styles.loader}></div>
        <div className={styles.loaderToolTip}>
          {" "}
          <h4> Loading Apartments</h4>
          <div className={styles.loaderToolTipText}>
            Our API is hosted with Render.com free of payment plan. There may be
            issues with API's 'cold start', thank you for understanding.
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <h3 className={styles.error}>
        Unexpected error occured. Please refresh the page or return later
      </h3>
    );
  }

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
