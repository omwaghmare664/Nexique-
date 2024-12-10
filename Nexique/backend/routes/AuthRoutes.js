const AuthRouter = require('express').Router();
const { signUpController, loginController, deleteUserController, updateUserController, logoutUser, getAllUsers } = require('../controllers/AuthController');
const { uploadProfile } = require('../middlewares/upload');

// Routes with file upload for profile picture
AuthRouter.post('/signup', uploadProfile.single("profilePicture"), signUpController);
AuthRouter.put('/update/:id', uploadProfile.single("profilePicture"), updateUserController);

AuthRouter.post('/login', loginController);
AuthRouter.delete('/delete/:id', deleteUserController);
AuthRouter.get('/users', getAllUsers);
AuthRouter.get('/logout', logoutUser);

module.exports = AuthRouter;
