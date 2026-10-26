import styles from "./Spinner.module.css";
import { useUrlPosition } from "../hooks/useUrlPosition";
function Spinner() {
  const [lat, lng] = useUrlPosition();
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default Spinner;
