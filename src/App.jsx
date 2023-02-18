import Today from "./components/Today";
import Information from "./components/Information";
import Forecast from "./components/Forecast";
import { fullYear } from "./helpers/getTime";
import axios from "axios";
import { useState, useEffect } from "react";
import Logo from "./components/Logo";

function App() {
  const key = "WQpHvCLUpweCdgmUx2X2MyxvwypVAp80";
  const locationKey = "11222";
  const [weather, setWeather] = useState();
  const [daily, setDaily] = useState([]);
  const [minmax, setMinmax] = useState([]);


  useEffect(() => {
    axios
      .get(
        `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${key}&language=es-ar&details=true`
      )
      .then((resp) => {
        setWeather(resp.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${key}&language=es-ar&metric=true`
      )
      .then((resp) => {
        setDaily(resp.data.DailyForecasts.slice(1));
        setMinmax(resp.data.DailyForecasts.slice(0, 1));
      })
      .catch((error) => console.log(error));
  }, []);

  
  return (
    <div className="container flex flex-col mx-auto bg-slate-100">
      <header className="py-4">
        <div className="flex justify-between items-end text-slate-800">
          <Logo />
          <h4>Rosario, Argentina</h4>
        </div>
      </header>
      <div className="flex flex-col lg:flex-row items-center py-6 gap-y-4">
        {/* Sección izquirda (desktop) o sup (mobile) */}
        <div className="flex flex-col items-left w-full lg:w-1/2">
          {/* Información del dia*/}
          <Information fullYear={fullYear} />
        </div>
        <div className="flex flex-col items-center w-full lg:w-1/2">
          {/* Temperatura actual */}
          <Today weather={weather} minmax={minmax}/>
        </div>
        {/* Sección derecha (desktop) o inf (mobile) */}
        <div className="flex lg:flex-col gap-x-2 w-full overflow-scroll lg:w-1/2">
          {/* Forecast 7 días */}
          {daily.map((day, i) => {
            return (
              <div className="">
                <Forecast key={i} day={day} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default App;
