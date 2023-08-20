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
import { CitiesProvider } from './contexts/CitiesContext';

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="price" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;

//notes
// create route in three steps (Control states or states updated )
//1. create a <Route />
//2. we link this Route into some page
//3. in this route we read the state from the URL
