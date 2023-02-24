import { UserRole } from 'src/constants/user-roles.constant';
import { RoleMiddleware } from './role.middleware';

describe('RoleMiddleware', () => {
  it('should be defined', () => {
    expect(new RoleMiddleware(UserRole.Administrator)).toBeDefined();
  });
});
