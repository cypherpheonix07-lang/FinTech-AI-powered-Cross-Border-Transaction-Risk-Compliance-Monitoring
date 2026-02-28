import { Request, Response } from 'express';
import { TenantService } from './tenant.service';

export class TenantController {
  static async getAll(req: Request, res: Response) {
    try {
      const tenants = await TenantService.getAllTenants();
      res.status(200).json({ success: true, data: tenants });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to fetch tenants' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const tenant = await TenantService.getTenantById(req.params.id);
      if (!tenant) return res.status(404).json({ success: false, error: 'Tenant not found' });
      res.status(200).json({ success: true, data: tenant });
    } catch {
      res.status(500).json({ success: false, error: 'Failed to fetch tenant' });
    }
  }
}
