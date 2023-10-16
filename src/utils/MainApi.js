class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Код ошибки: ${res.status}`);
        }
    }

    _loadToken() {
        this._headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`
    }

    async getProfileInfo() {
        this._loadToken();
        const res = await fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: this._headers,
        });
        return this._checkResponse(res);
    }

    async editMyProfile({ name, email }) {
        this._loadToken();
        const res = await fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                email: email,
            }),
        });
        return this._checkResponse(res);
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
