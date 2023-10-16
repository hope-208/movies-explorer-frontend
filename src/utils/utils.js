import { REGEX_EMAIL, REGEX_NAME } from "../utils/constants.js";

function checkRegexEmail(value) {
    if (value === undefined) {
        return { message: "", invalid: true }
    }

    if (!REGEX_EMAIL.test(value)) {
        return { message: "Некорректный адрес электронной почты", invalid: true }
    }
    return { message: "", invalid: false }
}

function checkRegexName(value) {

    if (!REGEX_NAME.test(value)) {
        return { message: "Имя пользователя может содержать только латиницу, кириллицу, дефис и пробел.", invalid: true }
    }
    return { message: "", invalid: false }
}

export { checkRegexEmail, checkRegexName };