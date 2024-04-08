/**
 * try to turn a string into a number, making sure it is numeric
 * @param str The string to try
 * @returns {number | undefined} The nunber if successful, undefined otherwise
 */
export function createNumeric(str: any): number | undefined {
  // check string exists
  if (typeof str !== "string") {
    return undefined;
  }

  // check each character is numeric
  if (!/^\d+$/.test(str)) {
    return undefined;
  }

  // parse the int
  return parseInt(str, 10);
}

/**
 * Construct a URL for the home page
 * @param search The search string
 * @param page The page number
 * @returns {string} The URL
 */
export function constructHomePageUrl(search: string, page: number): string {
  let urlParams = new URLSearchParams();

  if (search) {
    urlParams.append("q", encodeURIComponent(search));
  }

  if (page > 1) {
    urlParams.append("p", encodeURIComponent(page));
  }

  return "/?" + urlParams.toString();
}

/**
 * Parse an organization type into a human readable string
 * @param type The type to parse
 * @returns {string} The parsed type
 */
export function parseOrgType(type: "Business" | "NonProfit" | "Gov"): string {
  if (type === "NonProfit") {
    return "Non Profit";
  }

  if (type === "Gov") {
    return "Government";
  }

  return type;
}

/**
 * Parse a 10-digit phone number into a human readable format
 * @param phone The phone number to parse
 * @returns {string} The parsed phone number
 */
export function parsePhone(phone: string): string {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
}
