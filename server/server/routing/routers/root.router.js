import express from 'express';
import { RootController } from "../../controllers";

const router = express.Router();

/* GET home page. */

router.get('/*', RootController.redirectToHome);

export const RootRouter = router;
