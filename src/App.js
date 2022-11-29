import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import CreateUser from './pages/CreateUser/CreateUser';
import Detail from './pages/Detail/Detail';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='nav'>
        <Link className={`btn-list`} to="/home">List</Link>
        <Link className={`btn-create`} to="/create">Create</Link>
      </div>
      <div className='routes'>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/create' element={<CreateUser />} />
          <Route path='/users/:userId' element={<Detail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
