import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
function CityList() {
  const { isLoading, data } = useCities();
  console.log("use cities", useCities());
  if (isLoading) return <Spinner />;
  return (
    <ul className={styles.cityList}>
      {data?.map((city) => {
        return <CityItem city={city} key={city.id} />;
      })}
    </ul>
  );
}

export default CityList;
