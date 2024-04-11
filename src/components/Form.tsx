// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import DatePicker from "react-datepicker";
import { FormEvent, useEffect, useState } from "react";

import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import useUrlPosition from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import { convertToEmoji } from "../utils";
import Message from "./Message";

import "react-datepicker/dist/react-datepicker.css";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [isLoadingGeo, setIsLoadingGeo] =
    useState<boolean>(false);
  const [geoError, setGeoError] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const { lat, lng } = useUrlPosition();
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const [emoji, setEmoji] = useState("");

  console.log("country", country);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form submitted", cityName, date, notes);
  };

  useEffect(() => {
    const fetchReverseGeo = async () => {
      setGeoError("");
      setIsLoadingGeo(true);
      try {
        if (!lat || !lng) return;
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();
        console.log("cityName", data);
        if (!data.countryCode) {
          throw new Error(
            "That's not a city. Click somewhere else 😊"
          );
        }
        const emo = convertToEmoji(data.countryCode);
        setCityName(data?.city || data?.locality || "");
        setCountry(data.countryName || "");
        setEmoji(emo);
      } catch (error: any) {
        console.error("Could not retrive city name");
        setGeoError(error.message);
      } finally {
        setIsLoadingGeo(false);
      }
    };

    if (lat && lng) {
      fetchReverseGeo();
    }
  }, [lat, lng]);

  if (isLoadingGeo) return <Spinner />;
  if (!lat && !lng)
    return (
      <Message message={"Start by clicking on the map"} />
    );
  if (geoError) return <Message message={geoError} />;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input
          id='cityName'
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>
          When did you go to {cityName}?
        </label>
        <DatePicker
          value={date.toDateString()}
          selected={date}
          onChange={(date: Date) => setDate(date)}
        />
        {/* <input
          id='date'
          onChange={(e) => setDate(e.target.value)}
          value={date.toLocaleString()}
        /> */}
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>
          Notes about your trip to {cityName}
        </label>
        <textarea
          id='notes'
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
        {/* {formError && (
          <p className={styles.error}>{formError}</p>
        )} */}
      </div>

      <div className={styles.buttons}>
        <Button type='submit'>Add</Button>
        <Button
          theme='back'
          onClick={() => {
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
