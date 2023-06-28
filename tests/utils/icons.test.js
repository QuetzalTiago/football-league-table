import { getFlagIcon } from "../../src/utils/icons";

describe("icon utils", () => {
  describe("getFlagIcon", () => {
    // Given a country name
    // When the getFlagIcon function is called with this country name
    // Then it should return a string matching the expected format
    test("returns correct URL string", () => {
      const country = "USA";
      const result = getFlagIcon(country);
      expect(result).toBe(`https://flagsapi.codeaid.io/${country}.png`);
    });
  });
});
