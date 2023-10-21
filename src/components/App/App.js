import React, { useState, useCallback, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import api from '../../utils/MainApi.js';
import moviesApi from '../../utils/MoviesApi.js';
import { filtredMoviesInSeachResult } from '../../utils/utils.js';
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

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [textSearchError, setTextSearchError] = useState("");

  const [movies, setMovies] = useState([]);

  const [savedMovies, setSavedMovies] = useState([]);

  const [search, setSearch] = React.useState({
    string: "",
    isChecked: localStorage.getItem("searchIsChecked")
  });

  const [searchSavedMovies, setSearchSavedMovies] = React.useState({
    string: "",
    isChecked: false
  });

  const [moviesSearchResult, setMoviesSearchResult] = useState([]);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [messagePopup, setMessagePopup] = useState("");
  const [iconPopup, setIconPopup] = useState(null);

  const checkIsToken = useCallback(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          const data = res.data;
          setCurrentUser(data);
          if (res) {
            handleLogin();
            navigate('/movies', { replace: true });
            api
              .getProfileInfo()
              .then((data) => {
                api
                  .getProfileMovies()
                  .then((data) => {
                    setSavedMovies(data.data);
                    setMoviesSearchResult(data.data);
                  })
              });
          }
        })
        .catch((err) => {
          console.log(err);
          handleLogOut();
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let { location } = useLocation();

  const savedMoviesPage = location === "/saved-movies";

  useEffect(() => {
    checkIsToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);


  function handleLogin() {
    setLoggedIn(true);
  }

  function handleLogOut() {
    setLoggedIn(false);
  }

  function handleClearedMessageErrors() {
    setMessageError('');
  }

  useEffect(() => {
    handleClearedMessageErrors()
  }, [navigate]);

  // popup
  function handlePopupSuccess() {
    setIconPopup(successIcon);
    setIsOpenPopup(true);
  }

  function handlePopupError() {
    setIconPopup(errorIcon);
    setIsOpenPopup(true);
  }

  function closeAllPopups() {
    setIsOpenPopup(false);
    setMessagePopup("");
    setIconPopup(null);
  }

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
  }, [isOpenPopup]);


  function handleSignUp(userData) {
    setIsLoading(true);
    const { name, password, email } = userData;
    register(name, password, email)
      .then((data) => {
        setMessagePopup("Вы успешно зарегистрировались!");
        localStorage.setItem('jwt', data.token);
        localStorage.setItem("loggedInLocalStorage", true);
        handlePopupSuccess();
        handleLogin();
        setMessageError('');
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setMessageError(err);
        setMessagePopup("Что-то пошло не так! Попробуйте ещё раз.");
        handlePopupError();
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
        localStorage.setItem("loggedInLocalStorage", true);
        setMessageError('');
        navigate('/movies', { replace: true });
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
        setMessagePopup("Данные профиля успешно обновлены!");
        handlePopupSuccess();
      })
      .catch((err) => {
        console.log(err);
        setMessageError(err);
        setMessagePopup("Что-то пошло не так! Попробуйте ещё раз.");
        handlePopupError();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSearchMovies() {
    if (search.string === "") {
      return;
    }
    setIsLoading(true);

    if (!localStorage.getItem("beatfilmMovies")) {

      moviesApi
        .getAllMovies()
        .then((data) => {
          localStorage.setItem("beatfilmMovies", JSON.stringify(data));
          handleSearchMovies();
        })
        .catch((err) => {
          console.log(err);
          setTextSearchError("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    const localStorageAllFilms = JSON.parse(localStorage.getItem("beatfilmMovies"));

    if (localStorageAllFilms) {
      const filtredMoviesSearch = filtredMoviesInSeachResult(localStorageAllFilms, search);
      if (filtredMoviesSearch.length < 1) {
        setTextSearchError("Ничего не найдено.");
      }
      setMovies(filtredMoviesSearch);
      localStorage.setItem("searchAll", search.string);
      localStorage.setItem("searchIsChecked", search.isChecked);
      localStorage.setItem("moviesRequest", JSON.stringify(filtredMoviesSearch));
      setIsLoading(false);
      return;
    }
  }

  function handleValueCheckbox(evt) {
    if (search.string === "") {
      return;
    }
    const searchIsChecked = evt.target.checked;
    setSearch((value) => ({ ...value, isChecked: searchIsChecked }));
  }

  function handleInputSeach(evt) {
    const searchString = evt.target.value;
    setSearch((value) => ({ ...value, string: searchString }));
  }

  useEffect(() => {
    handleSearchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.isChecked]);

  useEffect(() => {
    const searchAll = localStorage.getItem("searchAll");
    const searchIsChecked = localStorage.getItem("searchIsChecked");
    const localStorageMoviesRequest = JSON.parse(localStorage.getItem("moviesRequest"));
    if (searchAll) {
      setSearch((value) => ({ ...value, string: searchAll }));
    }

    if (searchIsChecked === true) {
      setSearch((value) => ({ ...value, isChecked: searchIsChecked }));
    }

    if (localStorageMoviesRequest) {
      setMovies(localStorageMoviesRequest);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSearchSavedMovies({
      string: "",
      isChecked: false,
    });
    if (savedMoviesPage) {
      handleSearchSavedMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedMovies, savedMoviesPage]);

  useEffect(() => {
    handleSearchSavedMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchSavedMovies.isChecked]);

  function handleSearchSavedMovies() {
    setIsLoading(true);
    const filtredMoviesSearch = filtredMoviesInSeachResult(savedMovies, searchSavedMovies);
    if (filtredMoviesSearch.length === 0) {
      setTextSearchError("Ничего не найдено.");
    }
    setMoviesSearchResult(filtredMoviesSearch);
    setIsLoading(false);
  }

  function handleValueCheckboxSavedMovies(evt) {
    const searchIsChecked = evt.target.checked;
    setSearchSavedMovies((value) => ({ ...value, isChecked: searchIsChecked }));
  }

  function handleInputSeachSavedMovies(evt) {
    const searchString = evt.target.value;
    setSearchSavedMovies((value) => ({ ...value, string: searchString }));
  }

  useEffect(() => {
    handleSearchSavedMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchSavedMovies.isChecked]);

  async function handleClickButtonSavedMovie(movie) {
    try {
      const newSavedMovie = await api.addMovie(movie);
      if (newSavedMovie) {
        setMoviesSearchResult([...savedMovies, newSavedMovie.data]);
        setSavedMovies([...savedMovies, newSavedMovie.data]);
      };
    } catch (err) {
      console.log(err);
    };
  }

  function handleDeleteMovie(movie) {

    api.deleteMovie(movie._id).then((data) => {
      const newCards = savedMovies.filter((c) => c._id !== movie._id);
      setMoviesSearchResult(newCards);
      setSavedMovies(newCards);
    });
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('beatfilmMovies');
    localStorage.removeItem('searchAll');
    localStorage.removeItem('searchIsChecked');
    localStorage.removeItem('moviesRequest');
    localStorage.removeItem('loggedInLocalStorage');
    handleLogOut();
    navigate('/signin', { replace: true });
    setCurrentUser({});
    setSearch({ string: "", isChecked: false });
    setMessagePopup("");
    setTextSearchError("");
    setMovies([]);
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
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
              <Register onSignUp={handleSignUp} isLoggedIn={isLoggedIn} isLoading={isLoading} messageError={messageError} />
            </main>}
          </div>
          }
        />
        <Route
          path="/signin"
          element={<div className="App">
            <Header main={false} authForm={true} isLoggedIn={isLoggedIn} />
            {<main className="main">
              <Login onSignIn={handleSignIn} isLoggedIn={isLoggedIn} isLoading={isLoading} messageError={messageError} />
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
              onSubmit={handleSearchMovies}
              movies={movies}
              savedMovies={savedMovies}
              onChange={handleValueCheckbox}
              handleInput={handleInputSeach}
              isLoading={isLoading}
              messageError={textSearchError}
              searchString={search.string}
              checked={search.isChecked}
              handleClickButtonSavedMovie={handleClickButtonSavedMovie}
              handleDeleteMovie={handleDeleteMovie}
              buttonShowMore={true} />
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
              onSubmit={handleSearchSavedMovies}
              movies={moviesSearchResult}
              savedMovies={savedMovies}
              onChange={handleValueCheckboxSavedMovies}
              handleInput={handleInputSeachSavedMovies}
              isLoading={isLoading}
              messageError={textSearchError}
              searchString={searchSavedMovies.string}
              checked={searchSavedMovies.isChecked}
              handleDeleteMovie={handleDeleteMovie}
              buttonShowMore={false}
            />
          }
        />
        <Route
          path="/*"
          element={<div className="App">
            {<main className="main">
              <NotFound notFound={true} />
            </main>}
          </div>
          }
        />
      </Routes >
      <InfoTooltip
        title={messagePopup}
        src={iconPopup}
        isOpen={isOpenPopup}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>)
    ;
};

export default App;
