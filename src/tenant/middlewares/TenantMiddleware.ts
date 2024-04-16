import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { TenantService } from '../services/tenant.service';
import { NextFunction } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  private readonly logger = new Logger(TenantMiddleware.name);
  constructor(private readonly tenantService: TenantService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { headers } = req;
    const tenantId = headers['X-TENANT-ID'] || headers['x-tenant-id'];

    if (!tenantId) {
      this.logger.warn('X Tenant Id not provided');
      req['tenantId'] = null;
      return next();
    }
    const tenant = this.tenantService.get(tenantId);
    req['tenantId'] = tenant.id;
    next();
  }
}
