import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Event from '../auth/models/Event';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET as string;

interface AuthenticatedRequest extends Request {
  user?: { userId: string, city: string };
}

const authenticateToken = (
  req: Request, 
  res: Response, 
  next: NextFunction
): Response | void => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.sendStatus(403);
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    (req as AuthenticatedRequest).user = user as { userId: string, city: string };
    next();
  });
};

router.get('/', authenticateToken, async (req: Request, res: Response) => {
  const authReq = req as AuthenticatedRequest;
  try {
    const events = await Event.find({ city: authReq.user?.city });
    res.json(events);
  } catch (err) {
    res.status(500).send('Error retrieving events');
  }
});

export default router;
