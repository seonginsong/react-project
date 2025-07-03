import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import AddAddress from './component/AddAddress';
import AddCity from './component/AddCity';
import AddCountry from './component/AddCountry';
import AddCustomer from './component/AddCustomer';
import Address from './component/Address';
import AddressOne from "./component/AddressOne";
import City from './component/City';
import CityOne from "./component/CityOne";
import Country from './component/Country';
import CountryOne from "./component/CountryOne";
import Customer from './component/Customer';
import CustomerOne from "./component/CustomerOne";
import Home from './component/Home';

export default function App() {


  return (
    <BrowserRouter>
      <div>
          {/* header */}
          <h1>Sakila Porject</h1>
          <ul>
              <li><Link to="/" className="hover:bg-gray-200">home</Link></li>
              <li><Link to="/Country" className="hover:bg-gray-200">country</Link></li>
              <li><Link to="/City" className="hover:bg-gray-200">city</Link></li>
              <li><Link to="/Address" className="hover:bg-gray-200">address</Link></li>
              <li><Link to="/Customer" className="hover:bg-gray-200">customer</Link></li>
          </ul>
          <hr />
          {/*---------------------------------------*/}
          
          {/*content */}
          <Routes>
            <Route path='/' element={<Home />} />{/*라우터 -> 컴포넌트 */}
            {/* country crud*/}
            <Route path='/Country' element={<Country />} />
            <Route path="/CountryOne/:countryId" element={<CountryOne />} />
            <Route path='/AddCountry' element={<AddCountry />} />
            {/* city crud*/}
            <Route path='/City' element={<City />} />
            <Route path="/CityOne/:cityId" element={<CityOne />} />
            <Route path='/AddCity' element={<AddCity />} />
            {/* customer crud*/}
            <Route path='/Customer' element={<Customer />} />
            <Route path="/CustomerOne/:customerId" element={<CustomerOne />} />
            <Route path='/AddCustomer' element={<AddCustomer />} />
            {/* address crud*/}
            <Route path='/Address' element={<Address />} />
            <Route path="/AddressOne/:addressId" element={<AddressOne />} />
            <Route path='/AddAddress' element={<AddAddress />} />
            
          </Routes>

          {/*---------------------------------------*/}

          {/* footer */}
          <hr />
          <div>
            Copyright @ GDJ91
          </div>
      </div>
    </BrowserRouter>
    );
}
