import Map from '../componenet/Map';
import Sidebar from '../componenet/Sidebar';
import User from '../componenet/User';
import styles from './AppLayout.module.css';

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
