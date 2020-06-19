import CONFIG from '../src/Config';
import * as index from '../src/index'

jest.spyOn(index, 'getToken').mockImplementation();  //Navigation is not implemented by jest
jest.spyOn(index, 'renderApp').mockImplementation();  //React stuff will be tested by 'src/components/App.tsx'

it('no token', () => {
  CONFIG.userAccessToken = null;
  window.location.hash = '';
  expect(index.checkForToken()).toBe(false);
});

it('with token', () => {
  CONFIG.userAccessToken = null;
  window.location.hash = '#access_token=lcrrgole0dkjum0cikl9ib51cqf9op&scope=&token_type=bearer';
  expect(index.checkForToken()).toBe(true);
});

it('main no token', () => {
  CONFIG.userAccessToken = null;
  window.location.hash = '';
  index.main();
  expect(index.getToken).toBeCalled();
});

it('main with token', () => {
  CONFIG.userAccessToken = null;
  window.location.hash = '#access_token=lcrrgole0dkjum0cikl9ib51cqf9op&scope=&token_type=bearer';
  index.main();
  expect(index.renderApp).toBeCalled();
});