/**
 * PATHGUARD PILLAR 5: INSTITUTIONAL TREASURY
 * Governance Service — Role-Based Access Control (RBAC) policy engine.
 * Ensures only authorized entities can perform sensitive treasury actions.
 */

export enum InstitutionalRole {
  ADMIN = 'ADMIN',
  TREASURY_MANAGER = 'TREASURY_MANAGER',
  COMPLIANCE_OFFICER = 'COMPLIANCE_OFFICER',
  AUDITOR = 'AUDITOR',
  VIEWER = 'VIEWER'
}

export interface UserRoleRecord {
  userId: string;
  role: InstitutionalRole;
  institutionId: string;
  grantedAt: string;
}

export class GovernanceService {
  private static instance: GovernanceService;
  private userRoles: Map<string, UserRoleRecord> = new Map();

  private constructor() {
    this.seedDeveloperRoles();
  }

  public static getInstance(): GovernanceService {
    if (!GovernanceService.instance) {
      GovernanceService.instance = new GovernanceService();
    }
    return GovernanceService.instance;
  }

  private seedDeveloperRoles(): void {
    this.assignRole('Founder_Alpha', InstitutionalRole.ADMIN, 'PG_HQ_001');
    this.assignRole('Compliance_Bot', InstitutionalRole.COMPLIANCE_OFFICER, 'PG_HQ_001');
  }

  /**
   * Assign a role to a user within an institution.
   */
  assignRole(userId: string, role: InstitutionalRole, institutionId: string): void {
    this.userRoles.set(userId, {
      userId,
      role,
      institutionId,
      grantedAt: new Date().toISOString()
    });
    console.log(`[Pillar-5] RBAC: ${role} assigned to user ${userId} for institution ${institutionId}`);
  }

  /**
   * Check if a user has permission for a specific action.
   */
  canPerformAction(userId: string, action: string): boolean {
    const record = this.userRoles.get(userId);
    if (!record) return false;

    const { role } = record;

    switch (action) {
      case 'INITIATE_TRANSFER':
        return [InstitutionalRole.ADMIN, InstitutionalRole.TREASURY_MANAGER].includes(role);
      case 'APPROVE_TRANSFER':
        return [InstitutionalRole.ADMIN, InstitutionalRole.COMPLIANCE_OFFICER].includes(role);
      case 'VIEW_SENSITIVE_LOGS':
        return [InstitutionalRole.ADMIN, InstitutionalRole.AUDITOR].includes(role);
      case 'MANAGE_USERS':
        return role === InstitutionalRole.ADMIN;
      default:
        return role === InstitutionalRole.ADMIN || role === InstitutionalRole.VIEWER;
    }
  }

  /**
   * Get the role of a user.
   */
  getUserRole(userId: string): InstitutionalRole | undefined {
    return this.userRoles.get(userId)?.role;
  }
}

export const governanceService = GovernanceService.getInstance();
