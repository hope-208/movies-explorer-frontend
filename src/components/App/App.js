import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

function App() {

  return (
    <Routes>
      <Route
        path="/"
        element={<div className="App">
          <Header main={true} authForm={false} isLoggedIn={false} />
          {<main className="main">
            <Main />
          </main>}

          <Footer /></div>
        }
      />
      <Route
        path="/signup"
        element={<div className="App">
          <Header main={false} authForm={true} isLoggedIn={false} />
          {<main className="main">
            <Register isLoggedIn={false} />
          </main>}
        </div>
        }
      />
      <Route
        path="/signin"
        element={<div className="App">
          <Header main={false} authForm={true} isLoggedIn={false} />
          {<main className="main">
            <Login isLoggedIn={false} />
          </main>}
        </div>
        }
      />
      <Route
        path="/users/me"
        element={<div className="App">
          <Header main={false} authForm={false} isLoggedIn={true} />
          {<main className="main">
            <Profile isLoggedIn={true} />
          </main>}
        </div>
        }
      />
      <Route
        path="/movies"
        element={<div className="App">
          <Header main={false} authForm={false} isLoggedIn={true} />
          {<main className="main">
            <Movies />
          </main>}
          <Footer />
        </div>
        }
      />
      <Route
        path="/saved-movies"
        element={<div className="App">
          <Header main={false} authForm={false} isLoggedIn={true} />
          {<main className="main">
            <SavedMovies />
          </main>}
          <Footer />
        </div>
        }
      />
      <Route
        path="/*"
        element={<div className="App">
          {<main className="main">
            <NotFound />
          </main>}
        </div>
        }
      />
    </Routes >
  );
};

export default App;
