import React from 'react';
import { Link, Route, Routes, useHref } from 'react-router-dom';
import CreateUser from './pages/CreateUser/CreateUser';
import Detail from './pages/Detail/Detail';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import './App.css';
import { Menu } from 'antd';

function App() {
  const items = [
    { label: <Link to='/home'>List</Link>, key: '/home' },
    { label: <Link to='/create'>Create</Link>, key: '/create' },
  ];
  const href = useHref()
  return (
    <div className="App">
      <Menu items={items} selectedKeys={href} mode={'horizontal'} />
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
