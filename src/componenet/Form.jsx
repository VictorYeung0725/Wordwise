// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useURLPosition } from '../hook/useURLPosition';
import BackButton from './BackButton';
import Button from './Button';

import styles from './Form.module.css';
import Message from './Message';
import Spinner from './Spinner';

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useURLPosition();

  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState(''); //eslint-disable-line
  const [date, setDate] = useState(new Date()); //eslint-disable-line
  const [notes, setNotes] = useState('');
  const [emoji, setEmoji] = useState(''); //eslint-disable-line
  const [error, setError] = useState('');

  const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false); //eslint-disable-line

  useEffect(() => {
    if (!lat && lng) return;
    async function fetchCityData() {
      try {
        setIsLoadingGeolocation(true);
        setError('');
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();

        if (!data.countryCode)
          throw new Error(
            'There seems have no country, please click on elswhere'
          );
        setCityName(data.city || data.locality || '');
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoadingGeolocation(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  function handleSubmmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    console.log(newCity);
  }

  if (isLoadingGeolocation) return <Spinner />;

  if (!lat && lng) return <Message message="Start By clicking on the map" />;

  if (error) return <Message message={error} />;

  return (
    <form className={styles.form} onSubmit={handleSubmmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}

        <ReactDatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
