const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || 'http://localhost:8000/api/v1/users';

<<<<<<< HEAD
=======
const AUTH_SERVICE_URL =
  process.env.AUTH_SERVICE_URL || 'http://localhost:8002/api/v1/auth';
>>>>>>> 1c3b474 (feat: add api gateway)
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

<<<<<<< HEAD
module.exports = { getUserById };
=======
const verifyTokenByAuthService = async (token) => {
  let response;
  try {
    response = await fetch(`${AUTH_SERVICE_URL}/verify`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      return null;
    }

    if (!response.ok) {
      const serviceError = new Error(
        `Auth service returned HTTP ${response.status}.`,
      );
      serviceError.statusCode = 502;
      throw serviceError;
    }

    let authData;
    try {
      authData = await response.json();
    } catch (error) {
      const serviceError = new Error(
        'Auth service returned an invalid response.',
      );
      serviceError.statusCode = 502;
      throw serviceError;
    }

    return authData.is_valid;
  } catch (error) {
    const serviceError = new Error('Could not reach the auth service.');
    serviceError.statusCode = 502;
    throw serviceError;
  }
};

const checkAuthorization = async (res, token) => {
  const isAuthorized = await verifyTokenByAuthService(token);
  if (!isAuthorized) {
    return res
      .status(status.UNAUTHORIZED)
      .json({ message: 'Unauthorized acccess due to invalid token' });
  }
};

module.exports = { getUserById, checkAuthorization };
>>>>>>> 1c3b474 (feat: add api gateway)
