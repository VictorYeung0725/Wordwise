/* eslint-disable react/prop-types */
import Spinner from './Spinner';
import styles from './CountryList.module.css';
import CountryItem from './CountryItem';
import Message from './Message';

import PropTypes from 'prop-types';

function CountryList({ cities, isLoading }) {
  console.log(cities);

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message={'Add your first click by click on the map'} />;

  /* eslint-disable react/prop-types */
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  /* eslint-disable react/prop-types */
  return (
    <ul className={styles.countryList}>
      {countries.map((country, index) => (
        <CountryItem country={country} key={index} />
      ))}
    </ul>
  );
}

CountryList.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      country: PropTypes.string.isRequired,
      emoji: PropTypes.string.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default CountryList;
