import { useAppSelector, useAppDispatch } from '@/store';
import { selectTenants, selectActiveTenant, setActiveTenant, fetchTenants } from '@/store/slices/tenantSlice';
import { useCallback } from 'react';

export function useTenant() {
  const dispatch = useAppDispatch();
  const { tenants, activeTenantId, loading } = useAppSelector(selectTenants);
  const activeTenant = useAppSelector(selectActiveTenant);

  const switchTenant = useCallback((tenantId: string) => {
    dispatch(setActiveTenant(tenantId));
  }, [dispatch]);

  const loadTenants = useCallback(() => {
    dispatch(fetchTenants());
  }, [dispatch]);

  return { tenants, activeTenantId, activeTenant, loading, switchTenant, loadTenants };
}
