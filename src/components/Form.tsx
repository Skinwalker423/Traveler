// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import useUrlPosition from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import { convertToEmoji } from "../utils";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [isLoadingGeo, setIsLoadingGeo] =
    useState<boolean>(false);
  const [date, setDate] = useState<Date | string>(
    new Date()
  );
  const { lat, lng } = useUrlPosition();
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const [emoji, setEmoji] = useState("");

  console.log("country", country);

  useEffect(() => {
    const fetchReverseGeo = async () => {
      setIsLoadingGeo(true);
      try {
        if (!lat || !lng) return;
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();
        console.log("cityName", data);
        const emo = convertToEmoji(data.countryCode);
        setCityName(data?.city || data?.locality || "");
        setCountry(data.countryName || "");
        setEmoji(emo);
      } catch (error) {
        console.error("Could not retrive city name");
      } finally {
        setIsLoadingGeo(false);
      }
    };

    if (lat && lng) {
      fetchReverseGeo();
    }
  }, [lat, lng]);

  if (isLoadingGeo) return <Spinner />;

  return (
    <form className={styles.form}>
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
        <input
          id='date'
          onChange={(e) => setDate(e.target.value)}
          value={date.toLocaleString()}
        />
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
      </div>

      <div className={styles.buttons}>
        <Button>Add</Button>
        <Button
          type='back'
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
