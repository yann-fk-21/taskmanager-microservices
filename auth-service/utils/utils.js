require('dotenv').config();
const bcrypt = require('bcrypt');

const USER_SERVICE_URL =
  (process.env.USER_SERVICE_URL || 'http://localhost:8000/api/v1/users').replace(
    /\/+$/,
    '',
  );

const getServiceError = (message, statusCode = 502) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const getResponseErrorStatus = (response) => {
  if ([400, 409, 422].includes(response.status)) {
    return response.status;
  }

  return 502;
};

const createUser = async (userData) => {
  let response;
  try {
    response = await fetch(USER_SERVICE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
  } catch (error) {
    throw getServiceError('Could not reach the user service.');
  }

  if (!response.ok) {
    throw getServiceError(
      `User service returned HTTP ${response.status}.`,
      getResponseErrorStatus(response),
    );
  }

  return parseUserResponse(response);
};

const getUserByEmail = async (email) => {
  let response;
  try {
    response = await fetch(
      `${USER_SERVICE_URL}/email/${encodeURIComponent(email)}`,
    );
  } catch (error) {
    throw getServiceError('Could not reach the user service.');
  }

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw getServiceError(`User service returned HTTP ${response.status}.`);
  }

  return parseUserResponse(response);
};

const parseUserResponse = async (response) => {
  let userDataResponse;
  try {
    userDataResponse = await response.json();
  } catch (error) {
    throw getServiceError('User service returned an invalid response.');
  }

  if (!userDataResponse.user) {
    throw getServiceError('User service returned an invalid response.');
  }

  return userDataResponse.user;
};

const comparePasswords = async (inputPassword, storedPassword) => {
  return await bcrypt.compare(inputPassword, storedPassword);
};

module.exports = { createUser, getUserByEmail, comparePasswords };
