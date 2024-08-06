import { useState } from "react";

import axios from "axios";

import styles from "./AddApartmentForm.module.css";

const URL = import.meta.env.REACT_APP_API_URL;

interface FormDataInterface {
  name: string;
  price: number;
  rooms: number;
  description?: string;
}

interface AddApartmentFormProps {
  setApartmentsListChanged: (state: boolean) => void;
}
const AddApartmentForm = ({
  setApartmentsListChanged,
}: AddApartmentFormProps) => {
  const [formData, setFormData] = useState<FormDataInterface>({
    name: "",
    price: 0,
    rooms: 0,
    description: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("testssss");
    if (
      formData.name.length < 1 ||
      formData.price <= 0 ||
      formData.rooms <= 0
    ) {
      setErrorMessage("Check the provided data");
    } else {
      const sendDatatoDB = async () => {
        try {
          await axios.post(URL + "/apartments", formData, {
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (err) {
          console.log(err);
        }
      };
      sendDatatoDB();
      setApartmentsListChanged(true);
      setFormData({
        name: "",
        price: 0,
        rooms: 0,
        description: "",
      });
      setErrorMessage(" ");
    }
  };

  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.addApartmentForm}>
      <h2 className="">Add Apartment</h2>

      <label className={styles.formInput}>
        Apartment's Name
        <input
          type="text"
          placeholder="E.g., Wonderful apartment near the sea"
          name="name"
          value={formData.name}
          minLength={1}
          onChange={handleFormDataChange}
        />
      </label>
      <label className={styles.formInput}>
        Rooms
        <input
          type="number"
          min={1}
          placeholder="0"
          name="rooms"
          value={formData.rooms > 0 ? formData.rooms : ""}
          onChange={handleFormDataChange}
          className={styles.smallFormInput}
        />
      </label>
      <label className={styles.formInput}>
        Price
        <input
          type="number"
          min={1}
          placeholder="0"
          name="price"
          value={formData.price > 0 ? formData.price : ""}
          onChange={handleFormDataChange}
          className={styles.smallFormInput}
        />
      </label>
      <label className={styles.formInput}>
        Description
        <input
          type="text"
          maxLength={999}
          placeholder="Provide a short description of your apartment"
          name="description"
          value={formData.description}
          onChange={handleFormDataChange}
        />
      </label>
      <div className={styles.errorMessage}> {errorMessage}</div>

      <button className={styles.button}>Add New Apartment</button>
    </form>
  );
};

export default AddApartmentForm;
