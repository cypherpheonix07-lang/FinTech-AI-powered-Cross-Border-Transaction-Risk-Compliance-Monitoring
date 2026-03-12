import { Router } from 'express';
import { Web3BridgeController } from './web3bridge.controller';

const router = Router();

router.get('/cross-chain/transfers', Web3BridgeController.getCrossChainTransfers);
router.get('/cross-chain/health', Web3BridgeController.getBridgeHealth);
router.get('/identity/credentials/:did', Web3BridgeController.getCredentials);
router.post('/identity/proof', Web3BridgeController.generateProof);

export default router;
