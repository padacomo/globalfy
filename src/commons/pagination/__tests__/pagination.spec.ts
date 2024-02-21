import { calculatePagination } from '../pagination';

describe('Pagination', () => {
  describe('when Pagination is called', () => {
    describe(' with page 1 and per Page 1', () => {
      it('returns the formatted date following the pattern informed', () => {
        const result = calculatePagination(1, 1);
        const mockResponse = { skip: 0, take: 1 };
        expect(result).toEqual(mockResponse);
      });
    });
    describe(' with page 2 and per Page 1', () => {
      it('returns the formatted date following the pattern informed', () => {
        const result = calculatePagination(2, 1);
        const mockResponse = { skip: 1, take: 1 };
        expect(result).toEqual(mockResponse);
      });
    });
  });
});
