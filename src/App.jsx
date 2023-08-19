import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import City from './componenet/City';

import CityList from './componenet/CityList';
import CountryList from './componenet/CountryList';
import AppLayout from './page/AppLayout';
import Homepage from './page/Homepage';
import Login from './page/Login';
import PageNotFound from './page/PageNotFound';
import Pricing from './page/Pricing';
import Product from './page/Product';
import Form from './componenet/Form';

const BASE_URL = `http://localhost:9000`;

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        console.log('there is an error');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="price" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          {/* <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          /> */}
          <Route index element={<Navigate replace to="cities" />} />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:id" element={<City />} cities={cities} />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//notes
// create route in three steps (Control states or states updated )
//1. create a <Route />
//2. we link this Route into some page
//3. in this route we read the state from the URL
