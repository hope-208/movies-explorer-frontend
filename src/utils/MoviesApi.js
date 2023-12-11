class Api {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return res.text().then((text) => {
            throw JSON.parse(text).message || JSON.parse(text).error;

        });
    }

    getAllMovies() {
        return fetch(`${this._baseUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => this._checkResponse(res));
    }
}

const moviesApi = new Api({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default moviesApi;
