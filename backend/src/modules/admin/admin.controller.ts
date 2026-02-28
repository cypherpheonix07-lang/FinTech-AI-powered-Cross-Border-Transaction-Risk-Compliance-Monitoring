import { Request, Response } from 'express';
import { AdminService } from './admin.service';

export class AdminController {
  static async getOverview(req: Request, res: Response) {
    try {
      const overview = await AdminService.getOverview();
      res.status(200).json({ success: true, data: overview });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to fetch admin overview' });
    }
  }

  static async listUsers(req: Request, res: Response) {
    try {
      const users = await AdminService.listUsers();
      res.status(200).json({ success: true, data: users });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to fetch users' });
    }
  }

  static async updateUserRole(req: Request, res: Response) {
    try {
      const { userId, role } = req.body;
      const user = await AdminService.updateUserRole(userId, role);
      res.json({ success: true, data: user });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to update user role' });
    }
  }

  static async freezeAccount(req: Request, res: Response) {
    try {
      const { accountId } = req.body;
      const account = await AdminService.freezeAccount(accountId);
      res.json({ success: true, data: account });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to freeze account' });
    }
  }

  static async rotateKeys(req: Request, res: Response) {
    try {
      const { tenantId } = req.body;
      const result = await AdminService.rotateKeys(tenantId);
      res.json({ success: true, data: result });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to rotate keys' });
    }
  }

}
