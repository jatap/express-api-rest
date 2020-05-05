/**
 * @apiDefine UserInfo Main user fields
 *
 * @apiParam {String} name User name.
 * @apiParam {String} email User email.
 * @apiParam {String} password User password (encrypted on the DB).
 */

/**
 * @apiDefine FullSuccessResponse Full success response
 *
 * @apiSuccess (Success 200) {Object} user User information.
 * @apiSuccess (Success 200) {String} token JWT access token.
 */

/**
 * @api {post} /users/register Register
 * @apiName UserRegister
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiUse UserInfo
 * @apiUse FullSuccessResponse
 * @apiError (Error 400) Error Bad request.
 */

/**
 * @api {post} /users/login Login
 * @apiName UserLogin
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiParam {String} email User email.
 * @apiParam {String} password User password (encrypted on the DB).
 * @apiUse FullSuccessResponse
 * @apiError (Error 401) InvalidLoginCredentials Invalid login credentials.
 * @apiError (Error 400) Error Bad request.
 */

/**
 * @api {get} /users/profile Profile
 * @apiName UserProfile
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} Bearer JWT access token.
 * @apiSuccess (Success 200) {Object} user User information.
 * @apiError (Error 401) InvalidLoginCredentials Invalid login credentials.
 */

/**
 * @api {post} /users/profile/logout Logout
 * @apiName UserLogout
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} Bearer JWT access token.
 * @apiSuccess 200
 * @apiError (Error 500) Error Internal server error.
 */

/**
 * @api {post} /users/profile/logoutall Logout (all devices)
 * @apiName UserLogoutAll
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} Bearer JWT access token.
 * @apiSuccess 200
 * @apiError (Error 500) Error Internal server error.
 */

/**
 * @api {put} /users/:id Update (full)
 * @apiName UserFullUpdate
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} Bearer JWT access token.
 * @apiParam {String} id User id.
 * @apiUse UserInfo
 * @apiSuccess (Success 200) {Object} user User information.
 * @apiError (Error 500) Error Internal server error.
 */

/**
 * @api {patch} /users/:id Update (partial)
 * @apiName UserPartialUpdate
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} Bearer JWT access token.
 * @apiParam {String} id User id.
 * @apiUse UserInfo
 * @apiSuccess (Success 200) {Object} user User information.
 * @apiError (Error 500) Error Internal server error.
 */
