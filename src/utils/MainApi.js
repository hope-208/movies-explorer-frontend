class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return res.text().then((text) => {
            throw JSON.parse(text).message || JSON.parse(text).error;

        });
    }

    _loadToken() {
        this._headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`
    }

    getProfileMovies() {
        this._loadToken();
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            credentials: 'include',
            headers: this._headers,
        })
            .then((res) => {
                this._checkResponse(res);
            });
    }

    getProfileInfo() {
        this._loadToken();
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: this._headers,
        })
            .then((res) => this._checkResponse(res));
    }

    editMyProfile({ name, email }) {
        this._loadToken();
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                email: email,
            }),
        })
            .then((res) => this._checkResponse(res));
    }

    addMovie(data) {
        return fetch(`${this._baseUrl}/movies`, {
            method: "POST",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                nameRU: data.nameRU,
                nameEN: data.nameEN,
                director: data.director,
                country: data.country,
                year: data.year,
                duration: data.duration,
                description: data.description,
                trailerLink: data.trailerLink,
                image: `https://api.nomoreparties.co/${data.image.url}`,
                thumbnail: `https://api.nomoreparties.co/${data.image.formats.thumbnail.url}`,
                movieId: data.id,
            }),
        }).then((res) => {
            this._checkResponse(res)
        });
    }

    deleteMovie(id) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: "DELETE",
            credentials: 'include',
            headers: this._headers,
        }).then((res) => this._checkResponse(res));
    }

}

const api = new Api({
    baseUrl: 'https://api.movies-explorer-hope.nomoredomainsicu.ru',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});

export default api;
