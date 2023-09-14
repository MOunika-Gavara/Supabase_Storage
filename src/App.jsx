import CrudOp from './components/CrudOp';
import Upload from './components/Upload';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import SignedUrl from './components/SignedUrl';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header>
          <Routes>
            <Route exact path="/" element={<CrudOp />} ></Route>
            <Route exact path="/upload" element={<Upload />}></Route>
          </Routes>
        </Header>
      </BrowserRouter>
    </div>
  );
}

export default App;
