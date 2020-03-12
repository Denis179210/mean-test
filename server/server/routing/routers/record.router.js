import express from 'express';
import { RecordController } from "../../controllers";
import passport from 'passport';

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.get('/stats', RecordController.aggregate);
router.get('/', RecordController.receiveMany);
router.post('/', RecordController.create);
router.patch('/:_id', RecordController.update);
router.delete('/:_id', RecordController.remove);

router.get('/exists', RecordController.exists);


export const RecordRouter = router;
