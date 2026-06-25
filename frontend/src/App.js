import './App.css';
import {
  Route,
  Routes
} from "react-router-dom";

import Blogstate from './context/blog/blogstate';

import Navbar from './component/navbar';
import Home from './component/home';
import About from './component/about';
import Alert from './component/alert';
import Addblog from './component/addblog';
import SignUp from './component/signup';
import Login from './component/login';
import Logout from './component/logout';
import Featchuser from './component/featchuser';



function App() {
  const alert="this is blog Website"
  return (
    <Blogstate>
        <Navbar/>
        <Alert alert={alert}/>
        <div className='container'>

            <Routes>

              <Route path="/login" element=
              {
                <>
                  <Login/>
                </>
              } />

              <Route path="/signup" element=
              {
                <>
                  <SignUp/>
                </>
              } />

              <Route path="/logout" element=
              {
                <>
                  <Logout/>
                </>
              } />

              <Route path="/detail" element=
              {
                <>
                  <Featchuser/>
                </>
              } />

              <Route path="/home" element=
              {
                <>
                  <Home/>
                </>
              } />

              <Route path="/addblog" element=
              {
                <>
                  <Addblog/>
                </>
              } />

              <Route path="/about" element=
              {
                <>
                  <About/>
                </>
              } />

            </Routes>
        </div> 
      </Blogstate>
  );
}

export default App;
