import { ApiKeyGuard } from './api-key.guard';
import { ExecutionContext } from '@nestjs/common';

describe('ApiKeyGuard', () => {
  let guard: ApiKeyGuard;

  beforeEach(() => {
    guard = new ApiKeyGuard({} as any);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should throw if API key or secret are missing', () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {},
        }),
      }),
    } as unknown as ExecutionContext;

    expect(() => guard.canActivate(mockContext)).toThrow();
  });

  it('should allow access if headers are valid', () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            'api-key': 'root',
            'api-secret': 'root',
          },
        }),
      }),
    } as unknown as ExecutionContext;

    process.env.API_KEY = 'root';
    process.env.API_SECRET = 'root';

    expect(guard.canActivate(mockContext)).toBe(true);
  });
});
