import CONFIG from '../../src/Config';
import TwitchClientFactory from '../../src/clients/TwitchClientFactory';
import TwitchClientImpl from '../../src/clients/TwitchClientImpl';
import TwitchClientMock from '../../src/clients/TwitchClientMock';
import * as Twitch from '../../src/clients/TwitchClient';

jest.mock('../../src/clients/TwitchClientImpl')
jest.mock('../../src/clients/TwitchClientMock')

it('mockTwitch = false', () => {
  CONFIG.mockTwitch = false;
  TwitchClientFactory.twitchClient = null;
  const actual: Twitch.Client = TwitchClientFactory.getInstance();
  expect(actual !== null).toBe(true);
  expect(actual instanceof TwitchClientImpl).toBe(true);
  expect(actual instanceof TwitchClientMock).toBe(false);
})

it('mockTwitch = true', () => {
  CONFIG.mockTwitch = true;
  TwitchClientFactory.twitchClient = null;
  const actual: Twitch.Client = TwitchClientFactory.getInstance();
  expect(actual !== null).toBe(true);
  expect(actual instanceof TwitchClientImpl).toBe(false);
  expect(actual instanceof TwitchClientMock).toBe(true);
})

it('already instantiated', () => {
  CONFIG.mockTwitch = true;
  const actual1: Twitch.Client = TwitchClientFactory.getInstance();
  const actual2: Twitch.Client = TwitchClientFactory.getInstance();
  expect(actual1 == actual2).toBe(true);
})
