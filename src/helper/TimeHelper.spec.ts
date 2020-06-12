import TimeHelper from './TimeHelper';

describe('TimeHelper', () => {
  test('getFuzzyDuration(234)', (): void => {
    expect(TimeHelper.getFuzzyDuration(-1)).toEqual('The future');
  });

  test('formatDuration(25h20m39s)', (): void => {
    expect(TimeHelper.formatDuration('25h20m39s')).toEqual('25:20:39');
  });
});
