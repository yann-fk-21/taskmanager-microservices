const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || 'http://localhost:8000/api/v1/users';

const getUserById = async (userId) => {
  let response;

  try {
    response = await fetch(`${USER_SERVICE_URL}/${userId}`);
  } catch (error) {
    const serviceError = new Error('Could not reach the user service.');
    serviceError.statusCode = 502;
    throw serviceError;
  }

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const serviceError = new Error(
      `User service returned HTTP ${response.status}.`,
    );
    serviceError.statusCode = 502;
    throw serviceError;
  }

  let userData;
  try {
    userData = await response.json();
  } catch (error) {
    const serviceError = new Error(
      'User service returned an invalid response.',
    );
    serviceError.statusCode = 502;
    throw serviceError;
  }

  if (!userData.user) {
    const serviceError = new Error(
      'User service returned an invalid response.',
    );
    serviceError.statusCode = 502;
    throw serviceError;
  }

  return userData.user;
};

module.exports = { getUserById };
