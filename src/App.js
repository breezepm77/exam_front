import './App.css';
import Home from './Pages/Home/Home';
import {Route, Routes} from 'react-router-dom'
import HomeId from './Pages/HomeId/HomeId';
import Order from './Pages/Order/Order'


function App() {
  return (
<>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/:id' element={<HomeId/>}/>
    <Route path='/order/:id' element={<Order/>}/>
  </Routes>
</>
  );
}

export default App;
