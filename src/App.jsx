import './App.css'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import DocumentLoader from './pages/DocumentLoader';
import ReceiversList from './pages/ReceiversList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DocumentLoader />}/>
        {/* <Route path="/show" element={<DocumentShower />}/> */}
        <Route path="/list" element={<ReceiversList />}/>
      </Routes> 
    </BrowserRouter>
  )
}

export default App;
