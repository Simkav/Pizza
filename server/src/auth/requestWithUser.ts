import { Request } from 'express';

type userObj = {
  id: number;
  isAdmin: boolean;
};

export interface RequestWithUser extends Request {
  userObj: userObj;
}
