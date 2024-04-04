export function createNumeric(str: any) {
  // check string exists
  if (typeof str !== "string") {
    return undefined;
  }

  // check each character is numeric
  for (const char of str) {
    // there has to be a better way to do this ;(
    // i miss rust strings
    if (
      char !== "0" &&
      char !== "1" &&
      char !== "2" &&
      char !== "3" &&
      char !== "4" &&
      char !== "5" &&
      char !== "6" &&
      char !== "7" &&
      char !== "8" &&
      char !== "9"
    ) {
      return undefined;
    }
  }

  // parse the int
  return parseInt(str, 10);
}

export function constructHomePageUrl(search: string, page: number) {
  let urlParams = new URLSearchParams();

  if (search) {
    urlParams.append("q", encodeURIComponent(search));
  }

  if (page > 1) {
    urlParams.append("p", encodeURIComponent(page));
  }

  return "/?" + urlParams.toString();
}

export function parseOrgType(type: "Business" | "NonProfit" | "Gov") {
  if (type === "NonProfit") {
    return "Non Profit";
  }

  if (type === "Gov") {
    return "Government";
  }

  return type;
}
