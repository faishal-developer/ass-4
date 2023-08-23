import express from 'express';
import { validateRequest } from '../../middleWares/validateRequests';
import { userZodValidataion } from './user.zod';
import { userController } from './user.controller';
import { auth } from '../../shared/Authorization';
import { userRoles } from '../../utils/utils';

const router = express.Router();

router.post(
  "/users/signup",
  validateRequest(userZodValidataion.createUser),
  userController.createUser
);

router.get(
  "/users/my-profile",
  auth([userRoles.buyer, userRoles.seller]),
  userController.getMyProfile
);

router.patch(
  "/users/my-profile",
  validateRequest(userZodValidataion.updateUser),
  auth([userRoles.seller, userRoles.buyer]),
  userController.updateMyProfile
);


router.get(
  '/users/:id',  
  auth([userRoles.admin]),
  userController.getSingleUser
);

router.delete("/users/:id", auth([userRoles.admin]), userController.deleteUser);

router.patch(
  "/users/:id",
  validateRequest(userZodValidataion.updateUser),
  auth([userRoles.admin]),
  userController.updateUser
);



router.get("/users", auth([userRoles.admin]), userController.getAllUser);


export const UserRoutes = router;