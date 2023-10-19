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
  //стейт для хранения найденных фильмов
  const [movies, setMovies] = useState([]); //+
  //стейт для хранения сохраненных фильмов
  const [savedMovies, setSavedMovies] = useState([]);
  //стейт для хранения данных поискового запроса
  const [search, setSearch] = React.useState({
    string: "",
    isChecked: false
  });
  // стейт для хранения поискового запроса со страницы сохраненных фильмов
  const [searchSavedMovies, setSearchSavedMovies] = React.useState({
    string: "",
    isChecked: false
  });
  // стейт для хранения результатов поиска на saved-movies
  const [moviesSearchResult, setMoviesSearchResult] = useState([]);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [messagePopup, setMessagePopup] = useState("");
  const [iconPopup, setIconPopup] = useState(null);

  // React.useEffect(() => {
  //   if (isLoggedIn) {
  //     Promise.all([api.getProfileInfo(), api.getProfileMovies()])
  //       .then((data) => {
  //         setCurrentUser(data[0]);
  //         console.log(data[1]);
  //         if (data[1] === undefined) {
  //           setSavedMovies([]);
  //           setMoviesSearchResult([]);
  //         } else {
  //           setSavedMovies(data[1]);
  //           setMoviesSearchResult(data[1]);
  //         }
  //         console.log(savedMovies);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setMessagePopup(err);
  //       });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isLoggedIn]);

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

    const localStorageAllFilms = JSON.parse(localStorage.getItem("beatfilmMovies"));

    if (localStorageAllFilms) {
      const filtredMoviesSearch = filtredMoviesInSeachResult(localStorageAllFilms, search);
      if (filtredMoviesSearch < 1) {
        setTextSearchError("Ничего не найдено.");
      }
      setIsLoading(false);
      setMovies(filtredMoviesSearch); //+
      localStorage.setItem("searchAll", search.string);
      // console.log(search);
      localStorage.setItem("searchIsChecked", search.isChecked);
      localStorage.setItem("moviesRequest", JSON.stringify(filtredMoviesSearch));
      return;
    }

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

  function handleValueCheckbox(evt) {
    if (search.string === "") {
      return;
    }
    const searchIsChecked = evt.target.checked;
    setSearch((value) => ({ ...value, isChecked: searchIsChecked }));

    // console.log(search.isChecked);
    // console.log(localStorage.getItem("searchIsChecked"));
  }

  function handleInputSeach(evt) {
    const searchString = evt.target.value;
    // console.log(searchString);
    setSearch((value) => ({ ...value, string: searchString }));
    // console.log(search);
  }

  // useEffect(() => {
  //   handleSearchMovies();
  // }, [search, searchSavedMovies]);

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
  }, []);

  useEffect(() => {
    // (savedMovies);
    setSearchSavedMovies({
      string: "",
      isChecked: false,
    });
    if (savedMoviesPage) {
      handleSearchSavedMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedMovies, savedMoviesPage]); //+

  useEffect(() => {
    handleSearchSavedMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchSavedMovies.isChecked]);

  function handleSearchSavedMovies() {
    const filtredMoviesSearch = filtredMoviesInSeachResult(savedMovies, searchSavedMovies);

    if (filtredMoviesSearch.length < 1) {
      setTextSearchError("Ничего не найдено.");
    }

    setMoviesSearchResult(filtredMoviesSearch);
  }

  function handleValueCheckboxSavedMovies(evt) {
    const searchIsChecked = evt.target.checked;
    setSearchSavedMovies((value) => ({ ...value, isChecked: searchIsChecked }));
    // console.log(searchSavedMovies.isChecked);
    // console.log(localStorage.getItem("searchIsChecked"));
  }

  function handleInputSeachSavedMovies(evt) {
    const searchString = evt.target.value;
    // console.log(searchSavedMovies.isChecked);
    setSearchSavedMovies((value) => ({ ...value, string: searchString }));
  }

  // function handleClickButtonSavedMovie(movie) {
  //   console.log(savedMovies);
  //   console.log(movie);
  //   console.log(typeof movie);

  //   api
  //     .addMovie(movie)
  //     .then((data) => {
  //       savedMovies.push(data);
  //       api.getProfileMovies()
  //         .then((res) => {
  //           console.log('getProfileMovies', res);
  //           return res.json();
  //         })
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });


  function handleClickButtonSavedMovie(movie) {
    setIsLoading(true);
    api.addMovie(movie)
      .then((data) => {
        setSavedMovies([...savedMovies, data]);
        setMoviesSearchResult([...savedMovies, data]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // api.getProfileMovies().
  //   then((data) => {
  //     console.log('getProfileMovies', data);
  //   });
  // console.log('addMovie data', data);
  // 
  // console.log('typeof data: ', typeof data);
  // console.log('typeof savedMovies: ', typeof savedMovies);
  // console.log('[...savedMovies, data]', [...savedMovies, data]);
  // 
  // console.log('savedMovies after push', savedMovies);
  // setSavedMovies([...savedMovies, data]);
  // setMoviesSearchResult([...savedMovies, data]);
  // console.log('savedMovies after add', savedMovies);

  //   console.log('savedMovies after push and get', savedMovies);
  //   console.log('savedMovies after push and get typeof: ', typeof savedMovies);
  // }

  function handleDeleteMovie(movie) {

    api.deleteMovie(movie._id).then((data) => {
      const newCards = savedMovies.filter((c) => c._id !== movie._id);
      setMoviesSearchResult(newCards);
      setSavedMovies(newCards);
      console.log(savedMovies);
    });
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
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
    setMovies([]); //+
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
              movies={movies} //+
              savedMovies={savedMovies} //+
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
              savedMovies={savedMovies} //+
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
