import CountryItem from "./CountryItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const { isLoading, cities } = useCities();
  if (isLoading) return <Spinner />;
  console.log(cities);
  const countries = [...new Set(cities.map((city) => city.country))];
  console.log("my ", countries);
  return (
    <ul className={styles.countryList}>
      {countries?.map((country) => {
        return <CountryItem country={country} emoji={"hi"} key={country} />;
      })}
    </ul>
  );
}

export default CountryList;
