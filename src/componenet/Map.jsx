import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  console.log(setSearchParams);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  const navigate = useNavigate();
  return (
    <div className={styles.mapContainer} onClick={() => navigate('form')}>
      <h1>Map</h1>
      <h1>
        position: {lat}, {lng}
      </h1>
      <button
        onClick={() =>
          setSearchParams({
            lat: 23,
            lng: 30,
          })
        }
      >
        Change Position
      </button>
    </div>
  );
}

export default Map;