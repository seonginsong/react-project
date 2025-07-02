import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
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
              <li><Link to="/">home</Link></li>
              <li><Link to="/Country">country</Link></li>
              <li><Link to="/City">city</Link></li>
              <li><Link to="/Address">address</Link></li>
              <li><Link to="/Customer">customer</Link></li>
          </ul>
          <hr />
          {/*---------------------------------------*/}
          
          {/*content */}
          <Routes>
            <Route path='/' element={<Home />} />{/*라우터 -> 컴포넌트 */}
            <Route path='/Country' element={<Country />} />
            <Route path='/City' element={<City />} />
            <Route path='/Address' element={<Address />} />
            <Route path='/Customer' element={<Customer />} />
            <Route path="/countryOne/:countryId" element={<CountryOne />} />
            <Route path="/cityOne/:cityId" element={<CityOne />} />
            <Route path="/addressOne/:addressId" element={<AddressOne />} />
            <Route path="/customerOne/:customerId" element={<CustomerOne />} />
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
