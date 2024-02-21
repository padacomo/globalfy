import { formatDate } from '../date.util';

describe('dateUtil', () => {
  describe('when formatting a date', () => {
    const date = new Date('2023-03-01 12:00:00');

    describe('and a format pattern is informed', () => {
      it('returns the formatted date following the pattern informed', () => {
        const result = formatDate(date, 'dd-MM-yyyy');

        expect(result).toBe('01-03-2023');
      });
    });

    describe('and a format pattern is not informed', () => {
      it('returns the formatted date following the default pattern', () => {
        const result = formatDate(date);

        expect(result).toBe('2023-03-01');
      });
    });
  });
});
