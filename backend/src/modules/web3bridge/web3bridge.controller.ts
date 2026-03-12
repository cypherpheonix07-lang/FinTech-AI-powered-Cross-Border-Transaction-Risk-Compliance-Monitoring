import { Request, Response, NextFunction } from 'express';
import { crossChainService } from '../../services/crossChainService';
import { identityService } from '../../services/identityService';

export class Web3BridgeController {
  static async getCrossChainTransfers(req: Request, res: Response, next: NextFunction) {
    try {
      const transfers = await crossChainService.getRecentTransfers();
      res.status(200).json({ success: true, data: transfers });
    } catch (error) {
      next(error);
    }
  }

  static async getBridgeHealth(req: Request, res: Response, next: NextFunction) {
    try {
      const health = await crossChainService.monitorBridgeHealth();
      res.status(200).json({ success: true, data: health });
    } catch (error) {
      next(error);
    }
  }

  static async getCredentials(req: Request, res: Response, next: NextFunction) {
    try {
      const { did } = req.params;
      const credentials = await identityService.getCredentials(did);
      res.status(200).json({ success: true, data: credentials });
    } catch (error) {
      next(error);
    }
  }

  static async generateProof(req: Request, res: Response, next: NextFunction) {
    try {
      const { credentialId, attribute } = req.body;
      const proof = await identityService.generateZKProof(credentialId, attribute);
      res.status(200).json({ success: true, data: { proof } });
    } catch (error) {
      next(error);
    }
  }
}
