const axios = require("axios");
const cheerio = require("cheerio");

async function universalScrape(url: string) {
  const response = await axios.get(url, { timeout: 100000 });
  const $ = cheerio.load(response.data);

  const scrapedData: any[] = [];
  const companyInfo = {
    companyName: "",
    emails: new Set<string>(),
    phones: new Set<string>(),
    socialMedia: new Set<string>(),
    address: "",
    location: "",
    products: new Set<string>(),
    services: new Set<string>(),
    industry: "",
    url: "",
  };

  const selectors = `
      h1, h2, h3, h4, h5, h6, p, span, div, li, strong, b, i, em, a, label, 
      button, input, textarea, img, table, tr, td, th, thead, tbody, tfoot, 
      script, title, link, video, source, iframe, nav, footer, header, article, section, footer, main, aside, form
    `;

  $(selectors).each((index: number, element: any) => {
    const $el = $(element);
    const tag = element.tagName.toLowerCase();

    let textContent = "";
    if ($el.is("input, textarea")) {
      textContent = ($el.val() as string)?.trim() || "";
    } else {
      textContent = $el.text().trim();
    }

    const attributes: Record<string, string> = {};
    Object.entries(element.attribs || {}).forEach(([key, val]) => {
      if (val) attributes[key] = val as string;
    });

    if (textContent || Object.keys(attributes).length > 0) {
      scrapedData.push({
        index,
        tag,
        text: textContent,
        attributes,
      });
    }

    // === Enhanced Insights === //

    const lowerText = textContent.toLowerCase();

    // Emails & Phones
    const emailMatch = textContent.match(
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
    );
    const phoneMatch = textContent.match(/(\+?\d[\d\s\-]{7,}\d)/g);
    if (emailMatch) emailMatch.forEach((e) => companyInfo.emails.add(e));
    if (phoneMatch) phoneMatch.forEach((p) => companyInfo.phones.add(p));

    // Social Media
    if (tag === "a" && attributes.href) {
      const href = attributes.href;
      if (/facebook|linkedin|twitter|instagram|youtube/i.test(href)) {
        companyInfo.socialMedia.add(href);
      }
    }

    if (tag === "title" || tag === "h1" || tag === "h2" || tag === "span") {
      // If the title or h1 contains the company name, we can extract more info
      const companyName = textContent.trim();
      if (!companyInfo.companyName) companyInfo.companyName = companyName; // Assuming address might be in the title
    }

    // Address/Location
    if (
      lowerText.includes("address") ||
      lowerText.includes("head office") ||
      lowerText.includes("headquarters") ||
      lowerText.includes("location") ||
      lowerText.includes("contact address") ||
      lowerText.includes("contact location") ||
      lowerText.includes("contact details") ||
      lowerText.includes("contact information")
    ) {
      if (!companyInfo.address) companyInfo.address = textContent;
    }
    if (
      lowerText.includes("country") ||
      lowerText.includes("city") ||
      lowerText.includes("state") ||
      lowerText.includes("region") ||
      lowerText.includes("locate") ||
      lowerText.includes("street")
    ) {
      if (!companyInfo.location) companyInfo.location = textContent;
    }

    // Industry
    if (
      lowerText.includes("fashion") ||
      lowerText.includes("technology") ||
      lowerText.includes("finance") ||
      lowerText.includes("healthcare") ||
      lowerText.includes("education") ||
      lowerText.includes("automotive") ||
      lowerText.includes("real estate") ||
      lowerText.includes("hospitality") ||
      lowerText.includes("retail") ||
      lowerText.includes("manufacturing") ||
      lowerText.includes("construction") ||
      lowerText.includes("energy") ||
      lowerText.includes("telecommunications") ||
      lowerText.includes("media") ||
      lowerText.includes("entertainment") ||
      lowerText.includes("agriculture") ||
      lowerText.includes("transportation") ||
      lowerText.includes("logistics")
    ) {
      if (!companyInfo.industry) companyInfo.industry = textContent;
    }

    // Products/Services
    if (lowerText.includes("product") || lowerText.includes("products")) {
      companyInfo.products.add(textContent);
    }
    if (lowerText.includes("service") || lowerText.includes("services")) {
      companyInfo.services.add(textContent);
    }
  });

  const finalData = {
    status: "success",
    message: "Scraping complete",
    data: scrapedData,
    companyInfo: {
      name: companyInfo.companyName || "Unknown Company",
      emails: Array.from(companyInfo.emails),
      phones: Array.from(companyInfo.phones),
      socialMedia: Array.from(companyInfo.socialMedia),
      address: companyInfo.address,
      location: companyInfo.location,
      industry: companyInfo.industry,
      url: url,
      products: Array.from(companyInfo.products),
      services: Array.from(companyInfo.services),
    },
    total: scrapedData.length,
  };

  return finalData;
}

exports.universalScraper = async (req: any, res: any) => {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res
      .status(400)
      .json({ status: "error", message: "URL is required" });
  }

  try {
    const scrapedData = await universalScrape(url);
    console.log(scrapedData);

    return res.json(scrapedData);
  } catch (error: any) {
    console.error("Scraping Error:", error.message, error.code);
    if (error.code === "ECONNABORTED") {
      return res
        .status(408)
        .json({ status: "error", message: "Request timed out" });
    }

    if (error.code === "ERR_BAD_REQUEST") {
      return res.status(403).json({
        status: "error",
        message: "Request failed with status code 403(unauthorized)",
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Scraping failed",
      error: error.message,
    });
  }
};
