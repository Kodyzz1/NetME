import { Router } from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} from '../../controllers/userController.js';

const userRouter = Router();

// api/users
userRouter
    .route('/')
    .get(getAllUsers)
    .post(createUser);


// api/users/:id
userRouter
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// api/users/:userId/friends/:friendId
userRouter
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

export default userRouter;