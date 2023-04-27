


import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import './App.css'
import HomePage from './pages/HomePage';
import PostsPage from './pages/PostPage';
import CreatePostPge from './pages/CreatePostPge';
import ViewFullPost from './components/ViewFullPost';

function App() {


  return (
    <>
      <div className='whole-page'>
        <Routes>
          <Route element={<Layout />} >
            <Route  path="/"index={true} element={<HomePage />} />
            <Route path="viewposts/" element={<PostsPage />} />
            <Route path="createpost/" element={<CreatePostPge />} />
            <Route path="viewposts/viewfullpost/:id" element={<ViewFullPost />} />
          </Route>
        </Routes> 
      </div>
   
    </>
  )
}

export default App
