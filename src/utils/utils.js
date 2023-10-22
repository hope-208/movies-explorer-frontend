import { REGEX_EMAIL, REGEX_NAME, SHORT_MOVIE_DURATION } from "../utils/constants.js";

function checkRegexEmail(value) {
    if (value === undefined) {
        return { message: "", isValid: true }
    }

    if (!REGEX_EMAIL.test(value)) {
        return { message: "Некорректный адрес электронной почты", isValid: true }
    }
    return { message: "", isValid: false }
}

function checkRegexName(value) {

    if (!REGEX_NAME.test(value)) {
        return { message: "Имя пользователя может содержать только латиницу, кириллицу, дефис и пробел.", isValid: true }
    }
    return { message: "", isValid: false }
}

function filtredMoviesInSeachResult(movies, searchData) {
    if (searchData.isChecked) {
        return movies
            .filter((movie) => movie.duration <= SHORT_MOVIE_DURATION)
            .filter((movie) =>
                movie.nameRU
                    .trim()
                    .toLowerCase()
                    .includes(searchData.string.trim().toLowerCase()) ||
                movie.nameEN
                    .trim()
                    .toLowerCase()
                    .includes(searchData.string.trim().toLowerCase())
            );
    } else {
        return movies.filter((movie) =>
            movie.nameRU
                .trim()
                .toLowerCase()
                .includes(searchData.string.trim().toLowerCase()) ||
            movie.nameEN
                .trim()
                .toLowerCase()
                .includes(searchData.string.trim().toLowerCase()));
    }
}

export { checkRegexEmail, checkRegexName, filtredMoviesInSeachResult };