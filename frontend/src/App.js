import './App.css';
import Header from './Header';
import HomePage from './HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Chronology from './Pages/Chronology';
import _2007to2013 from './Pages/_2007to2013';
import _2013to2014 from './Pages/_2013to2014';
import _2015 from './Pages/_2015';
import _2016 from './Pages/_2016';
import _2017 from './Pages/_2017';
import _2018 from './Pages/_2018';
import _2019 from './Pages/_2019';
import _2020 from './Pages/_2020';
import _2021 from './Pages/_2021';
import _2022 from './Pages/_2022';
import Footer from './Footer';
import Others from './Pages/Others';
import Prologue from './Pages/Prologue';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/prologue" element={<Prologue/>}/>
          <Route path="/chronology" element={<Chronology/>}/>
          <Route path="/2007to2013" element={<_2007to2013/>}/>
          <Route path="/2013to2014" element={<_2013to2014/>}/>
          <Route path="/2015" element={<_2015/>}/>
          <Route path="/2016" element={<_2016/>}/>
          <Route path="/2017" element={<_2017/>}/>
          <Route path="/2018" element={<_2018/>}/>
          <Route path="/2019" element={<_2019/>}/>
          <Route path="/2020" element={<_2020/>}/>
          <Route path="/2021" element={<_2021/>}/>
          <Route path="/2022" element={<_2022/>}/>
          <Route path="/others" element={<Others/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
