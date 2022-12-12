import React from 'react';
import { Link, Navigate, Route, Routes, useHref } from 'react-router-dom';
import { Menu } from 'antd';
import NotFoundPage from './Pages/NotFoundPage';
import HomePage from './Pages/HomePage';
import CreateUserPage from './Pages/CreateUserPage';
import DetailUserPage from './Pages/DetailUserPage';
import './App.css';

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
          <Route path='*' element={<NotFoundPage />} />
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/create' element={<CreateUserPage />} />
          <Route path='/users/:userId' element={<DetailUserPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;