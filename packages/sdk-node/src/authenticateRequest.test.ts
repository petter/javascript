import { constants } from '@clerk/backend';
import { Request } from 'express';

import { authenticateRequest } from './authenticateRequest';

const mockNext = jest.fn();

afterEach(() => {
  mockNext.mockReset();
});

const mockClerkClient = () => ({
  authenticateRequest: jest.fn(),
});

describe('authenticateRequest', () => {
  it('correctly parses the req object', async () => {
    const req = {
      cookies: {
        [constants.Cookies.Session]: 'token',
        [constants.Cookies.ClientUat]: 'token',
      },
      headers: {
        [constants.Headers.Authorization]: 'Bearer token',
        [constants.Headers.ForwardedPort]: 'port',
        [constants.Headers.ForwardedHost]: 'host',
        host: 'host',
        referer: 'referer',
        'user-agent': 'user-agent',
      },
    } as any as Request;

    const options = {
      jwtKey: 'jwtKey',
      authorizedParties: ['party1'],
    };

    const clerkClient = mockClerkClient();
    const apiKey = 'apiKey';
    const frontendApi = 'frontendApi';
    const publishableKey = 'publishableKey';
    await authenticateRequest(clerkClient as any, apiKey, frontendApi, publishableKey, req, options);
    expect(clerkClient.authenticateRequest).toHaveBeenCalledWith({
      authorizedParties: ['party1'],
      clientUat: 'token',
      cookieToken: 'token',
      forwardedHost: 'host',
      forwardedPort: 'port',
      apiKey: apiKey,
      frontendApi: frontendApi,
      publishableKey: publishableKey,
      headerToken: 'token',
      host: 'host',
      jwtKey: 'jwtKey',
      referrer: 'referer',
      userAgent: 'user-agent',
    });
  });
});