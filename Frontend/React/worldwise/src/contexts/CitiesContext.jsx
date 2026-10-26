import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from "react";

const CitiesContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "setLoading":
      return { ...state, isLoading: action.payload };
    case "setData":
      return { ...state, isLoading: false, data: action.payload };

    case "setCurrentCity":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "deleteCity":
      return {
        ...state,
        isLoading: false,
        currentCity: {},
        data: state.data.filter((city) => city.id !== action.payload),
      };

    case "updateCities":
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    default:
  }
}

const initialState = {
  data: [],
  isLoading: false,
  currentCity: {},
};
function CitiesContextProvider({ children }) {
  // const [data, setData] = useState([]);
  // const [isLoading, setLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  const [{ data, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  useEffect(function () {
    async function fetchData() {
      try {
        dispatch({ type: "setLoading", payload: true });

        const res = await fetch("http://localhost:8000/cities");
        const data = await res.json();
        dispatch({ type: "setData", payload: data });
      } catch (error) {
        console.log("my erorr", error.message);
      } finally {
        dispatch({ type: "setLoading", payload: false });
      }
    }

    fetchData();
  }, []);

  async function createCity(newCity) {
    try {
      dispatch({ type: "setLoading", payload: true });
      const res = await fetch(`http://localhost:8000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "setCurrentCity", payload: data });
      // setCurrentCity(data);
    } catch (error) {
      console.log("my erorr", error.message);
    } finally {
      dispatch({ type: "setLoading", payload: false });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "setLoading", payload: true });
      const res = await fetch(`http://localhost:8000/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "deleteCity", payload: id });
      // setData((cities) => {
      //   return cities.filter((city) => {
      //     return city.id !== id;
      //   });
      // });
    } catch (error) {
      console.log("my erorr", error.message);
    } finally {
      dispatch({ type: "setLoading", payload: false });
    }
  }

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    try {
      dispatch({ type: "setLoading", payload: true });
      const res = await fetch(`http://localhost:8000/cities/${id}`);
      const data = await res.json();

      dispatch({ type: "updateCities", payload: data });
      // setData((cities) => [...cities, data]);
    } catch (error) {
      console.log("my erorr", error.message);
    } finally {
      dispatch({ type: "setLoading", payload: false });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        data,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  return useContext(CitiesContext);
}

export { CitiesContextProvider, useCities };
