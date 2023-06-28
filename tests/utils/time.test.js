import { formatTimestamp } from "../../src/utils/time";

describe("time utils", () => {
  describe("formatTimestamp", () => {
    let getTimezoneOffsetSpy;

    beforeAll(() => {
      getTimezoneOffsetSpy = jest.spyOn(Date.prototype, "getTimezoneOffset");

      getTimezoneOffsetSpy.mockReturnValue(0);
    });

    // Given a timestamp
    // When the formatTimestamp function is called with this timestamp
    // Then it should return an object containing a formatted date and time
    test("returns correct formatted date and time", () => {
      const timestamp = new Date(2023, 5, 1, 13, 30).getTime();
      const result = formatTimestamp(timestamp);

      const expectedDate = "6.1.2023";
      const expectedTime = "01:30 ";

      expect(result).toEqual({
        date: expectedDate,
        time: expectedTime,
      });
    });
  });
});
