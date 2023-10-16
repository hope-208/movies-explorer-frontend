import React, { useState, useCallback, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import api from '../../utils/MainApi.js';
import { register, authorize, checkToken } from '../../utils/auth.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import Header from '../Header/Header';
import Register from '../Register/Register';
import Login from '../Login/Login';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import successIcon from '../../images/ok.svg';
import errorIcon from '../../images/error.svg';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Preloader from '../Preloader/Preloader.js';

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = React.useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isRegisterSuccessPopupOpen, setIsRegisterSuccessPopupOpen] =
    useState(false);
  const [isRegisterErrorPopupClose, setIsRegisterErrorPopupClose] =
    useState(false);
  const [isEditProfileSuccessPopupOpen, setIsEditProfileSuccessPopupOpen] =
    useState(false);
  const [isEditProfileErrorPopupClose, setIsEditProfileErrorPopupClose] =
    useState(false);



  const checkIsToken = useCallback(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          const data = res.data;
          const userData = {
            _id: data._id,
            email: data.email,
          };
          if (res) {
            handleLogin();
            navigate('/movies', { replace: true });
            api
              .getProfileInfo()
              .then((data) => {
                setCurrentUser(data.data);
                // api
                //   .getInitialCards()
                //   .then((data) => {
                //     setCards(data.data);
                //   })
              });
          }
        })
        .catch((err) => {
          console.log(err);
          handleLogOut();
        });
    }
  }, []);

  useEffect(() => {
    checkIsToken();
  }, [isLoggedIn]);

  useEffect(() => {
    function handleEsc(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    function handleClickOverlay(evt) {
      evt.target.classList.contains('popup_opened') && closeAllPopups();
    }

    document.addEventListener('keydown', handleEsc);
    document.addEventListener('mousedown', handleClickOverlay);
    return () => {
      document.removeEventListener('keydown', handleClickOverlay);
      document.removeEventListener('mousedown', handleEsc);
    };
  }, [
    isRegisterSuccessPopupOpen,
    isRegisterErrorPopupClose
  ]);

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleLogOut() {
    setLoggedIn(false);
  }

  function handleClearedMessageErrors() {
    setMessageError('');
  }

  function handleRegisterSuccess() {
    setIsRegisterSuccessPopupOpen(true);
  }

  function handleRegisterError() {
    setIsRegisterErrorPopupClose(true);
  }

  function handleEditProfileSuccess() {
    setIsEditProfileSuccessPopupOpen(true);
  }

  function handleEditProfileError() {
    setIsEditProfileErrorPopupClose(true);
  }

  function handleSignUp(userData) {
    setIsLoading(true);
    const { name, password, email } = userData;
    register(name, password, email)
      .then(() => {
        handleRegisterSuccess();
        handleLogin();
        setMessageError('');
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setMessageError(err);
        handleRegisterError();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSignIn(userData) {
    setIsLoading(true);
    const { password, email } = userData;
    authorize(password, email)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        handleLogin();
        setMessageError('');
        navigate('/movies', { replace: true });
        //   api
        //     .getInitialCards()
        //     .then((data) => {
        //       setCards(data.data);
        //     })
      })
      .catch((err) => {
        console.log(err);
        setMessageError(err);
        handleLogOut();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser({ name, email }) {
    setIsLoading(true);
    api
      .editMyProfile({ name, email })
      .then((data) => {
        setCurrentUser(data.data);
        setMessageError('');
        handleEditProfileSuccess();
      })
      .catch((err) => {
        console.log(err);
        setMessageError(err);
        handleEditProfileError();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    handleLogOut();
    navigate('/signin', { replace: true });
    setCurrentUser({});
    // setCards([]);
  }

  function closeAllPopups() {
    setIsRegisterSuccessPopupOpen(false);
    setIsRegisterErrorPopupClose(false);
    setIsEditProfileSuccessPopupOpen(false);
    setIsEditProfileErrorPopupClose(false);
  }

  return (
    isLoading ? (<Preloader />) :

      (<CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/"
            element={<div className="App">
              <Header main={true} authForm={false} isLoggedIn={isLoggedIn} />
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
                <Register onSignUp={handleSignUp} isLoggedIn={isLoggedIn} isLoading={isLoading} messageError={messageError} handleClearedMessageErrors={handleClearedMessageErrors} />
              </main>}
            </div>
            }
          />
          <Route
            path="/signin"
            element={<div className="App">
              <Header main={false} authForm={true} isLoggedIn={isLoggedIn} />
              {<main className="main">
                <Login onSignIn={handleSignIn} isLoggedIn={isLoggedIn} isLoading={isLoading} messageError={messageError} handleClearedMessageErrors={handleClearedMessageErrors} />
              </main>}
            </div>
            }
          />
          <Route
            path="/users/me"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={Profile}
                onUpdateUser={handleUpdateUser}
                main={false}
                authForm={false}
                onSignOut={handleSignOut}
                isLoading={isLoading}
                messageError={messageError}
                handleClearedMessageErrors={handleClearedMessageErrors}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={Movies}
                main={false}
                authForm={false}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={SavedMovies}
                main={false}
                authForm={false}
              />
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
        {/* <InfoTooltip
        title="Вы успешно зарегистрировались!"
        src={successIcon}
        isOpen={isRegisterSuccessPopupOpen}
        onClose={closeAllPopups}
      />

      <InfoTooltip
        title="Что-то пошло не так! Попробуйте ещё раз."
        src={errorIcon}
        isOpen={isRegisterErrorPopupClose}
        onClose={closeAllPopups}
      /> */}

        <InfoTooltip
          title="Данные профиля успешно обновлены!"
          src={successIcon}
          isOpen={isEditProfileSuccessPopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          title="Что-то пошло не так! Попробуйте ещё раз."
          src={errorIcon}
          isOpen={isEditProfileErrorPopupClose}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>)
  );
};

export default App;
