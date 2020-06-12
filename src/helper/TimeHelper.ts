class TimeHelper {
  static getFuzzyDuration = (seconds: number): string => {
    let result;
    if (seconds < 0) {
      return 'The future';
    }
    if (seconds < 3) {
      return 'Now';
    }
    if (seconds < 60) {
      result = seconds;
      return `${result} seconds ago`;
    }
    if (seconds < 3600) {
      result = Math.floor(seconds / 60);
      return `${result} minute${result === 1 ? '' : 's'} ago`;
    }
    if (seconds < 86400) {
      result = Math.floor(seconds / 3600);
      return `${result} hour${result === 1 ? '' : 's'} ago`;
    }
    if (seconds < 2628300) {
      result = Math.floor(seconds / 86400);
      return `${result} day${result === 1 ? '' : 's'} ago`;
    }
    if (seconds < 31556952) {
      result = Math.floor(seconds / 2628300);
      return `${result} month${result === 1 ? '' : 's'} ago`;
    }
    result = Math.floor(seconds / 31556952);
    return `${result} year${result === 1 ? '' : 's'} ago`;
  };

  // Test cases:
  // inputs: 25h20m39s,  16h4m8s,  3h5m7s,  49m12s, 5m23s, 3m2s
  // outputs: 25:20:39 ,  16:04:08, 3:05:07, 49:12,   5:23, 3:02
  static formatDuration = (input: string): string => {
    const numbers = input.split(/[hms]/).filter((i) => i.length > 0);
    const mapped = numbers.map((x, i) => (i === 0 ? x : x.padStart(2, '0')));
    const filtered = mapped.filter((x, i) => i > 0 || x !== '0');
    const fixed = filtered.join(':');
    return fixed;
  };
}

export default TimeHelper;
