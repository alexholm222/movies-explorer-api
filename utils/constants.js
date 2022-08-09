const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const DEFAUTL_CODE = 500;
const UNAUTHORIZED_CODE = 401;
const REGISTRATION_CODE = 409;
const ACCESS_DENIED_CODE = 403;
const REGEX = /^https?:\/\/[-\w]*\.[\w]{2,3}.*$/i;
const NOT_FOUND_MESSAGE = 'Запрашиваемая страница не существует';
const NOT_FOUND_MESSAGE_USER = 'Пользователь с указанным _id не найден';
const NOT_FOUND_MESSAGE_MOVIE = 'Фильм с указанным id не найден';
const BAD_REQUEST_MESSAGE = 'Переданы некорректные данные';
const DEFAUTL_MESSAGE = 'На сервере произошла ошибка';
const UNAUTHORIZED_MESSAGE = 'Ошибка авторизации';
const REGISTRATION_MESSAGE = 'Пользоваетель с таким email уже существует';
const ACCESS_DENIED_MESSAGE = 'Недостаточно прав';
const VALID_EMAIL_MESSAGE = 'Неверный формат почты';
const VALID_URL_MESSAGE = 'Неверный формат ссылки';
const SERVER_START = 'Сервер успешно запущен на порту';

module.exports = {
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  DEFAUTL_CODE,
  UNAUTHORIZED_CODE,
  REGISTRATION_CODE,
  ACCESS_DENIED_CODE,
  REGEX,
  NOT_FOUND_MESSAGE,
  REGISTRATION_MESSAGE,
  BAD_REQUEST_MESSAGE,
  NOT_FOUND_MESSAGE_MOVIE,
  ACCESS_DENIED_MESSAGE,
  NOT_FOUND_MESSAGE_USER,
  UNAUTHORIZED_MESSAGE,
  VALID_EMAIL_MESSAGE,
  VALID_URL_MESSAGE,
  DEFAUTL_MESSAGE,
  SERVER_START,
};
