import './App.css'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import DocumentLoader from './pages/DocumentLoader';
import RecipientsList from './pages/RecipientsList';
import DocumentViewver from './pages/DocumentViewer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DocumentLoader />}/>
        <Route path="/view" element={<DocumentViewver />}/>
        <Route path="/list" element={<RecipientsList />}/>
      </Routes> 
    </BrowserRouter>
  )
}

export default App;
