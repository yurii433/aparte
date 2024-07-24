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
  const [apartments, setApartments] = useState<ApartmentsListInterface[]>([]);

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
          } else {
            setError(true);
            throw new Error(`No apartments found`);
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
          <h4 className={styles.loaderHeader}> Loading Apartments</h4>
          <div>
            <p className={styles.loaderToolTipText}>
              For demo purposes, this API is hosted on Render.com using their
              free plan. <br />
              The first time you load the app, it might take a bit longer than
              expected &#40;up to 60 seconds&#41;. Thank you for your patience.
            </p>
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
        Your Location: found {apartments.length} apartments
      </h2>
      {apartments.length > 0 ? (
        apartments.map((apt) => {
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
