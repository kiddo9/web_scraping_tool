const axios = require("axios"); //import axios
const cheerio = require("cheerio"); // import cheerio

//function for the web scraping
async function universalScrape(url: string) {
  // add the user agent to avoid blocking will making a request
  const response = await axios.get(url, {
    timeout: 100000, //set timeout to 100 seconds
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    },
  });

  // Load the HTML into cheerio
  const $ = cheerio.load(response.data);

  // Initialize scraped data and company info
  const scrapedData: any[] = [];
  const companyInfo = {
    companyName: "",
    emails: new Set<string>(),
    phones: new Set<string>(),
    socialMedia: new Set<string>(),
    describe: "",
    location: "",
    products: new Set<string>(),
    industry: "",
    url: "",
    techStack: new Set<string>(), // ✅ New
  };

  // set the tags to scrape
  const selectors = `meta, h1, h2, h3, h4, h5, h6, p, span, div, li, strong, b, i, em, a, label, 
button, input, textarea, img, table, tr, td, th, thead, tbody, tfoot, 
script, title, link, video, source, iframe, nav, footer, header, article, section, footer, main, aside, form`;

  // Metadata checks before DOM traversal
  // Get company name from various sources
  const metaSiteName = $('meta[property="og:site_name"]').attr("content");
  const metaAuthor = $('meta[name="author"]').attr("content");
  const metaTitle = $("title").text().split("|")[0].trim();

  // Set company name if not already set
  if (!companyInfo.companyName) {
    companyInfo.companyName = metaSiteName || metaAuthor || metaTitle;
  }

  // check for each tag in the selectors
  $(selectors).each((index: number, element: any) => {
    const $el = $(element); // Use jQuery-like syntax for the element
    const tag = element.tagName.toLowerCase(); // Convert tag name to lowercase

    let textContent = ""; // Initialize text content
    // Get text content based on element type
    if ($el.is("input, textarea")) {
      textContent = ($el.val() as string)?.trim() || "";
    } else {
      textContent = $el.text().trim();
    }

    const attributes: Record<string, string> = {}; // Initialize attributes object
    // Collect attributes from the element
    Object.entries(element.attribs || {}).forEach(([key, val]) => {
      if (val) attributes[key] = val as string;
    });
    // Add the tag and text content to scraped data if not empty
    // and if there are attributes
    if (textContent || Object.keys(attributes).length > 0) {
      scrapedData.push({
        index,
        tag,
        text: textContent,
        attributes,
      });
    }

    const lowerText = textContent.toLowerCase(); // Convert text content to lowercase for easier matching

    const emailMatch = textContent.match(
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
    ); // Regex to match email addresses
    // Regex to match phone numbers (basic pattern)
    const phoneMatch = textContent.match(/(\+?\d[\d\s\-]{7,}\d)/g);
    if (emailMatch) emailMatch.forEach((e) => companyInfo.emails.add(e)); // Add emails to the set
    // Add phone numbers to the set
    // Note: This regex is basic and may not cover all phone formats
    if (phoneMatch) phoneMatch.forEach((p) => companyInfo.phones.add(p));

    // Social Media Links
    if (tag === "a" && attributes.href) {
      const href = attributes.href;
      if (
        /facebook|linkedin|twitter|instagram|youtube/i.test(href) &&
        href.length > 10 &&
        !href.startsWith("#") &&
        !href.startsWith("javascript:")
      ) {
        companyInfo.socialMedia.add(href);
      }
    }

    //
    if (
      tag === "meta" &&
      (attributes.name === "description" ||
        attributes.property === "og:description")
    ) {
      const metaContent = attributes.content?.trim().toLowerCase() || "";

      // company discription detection
      if (!companyInfo.describe) {
        companyInfo.describe = attributes.content.trim();
      }

      // Location detection from text content
      $('script[type="application/ld+json"]').each((_: any, element: any) => {
        try {
          const json = JSON.parse($(element).text());
          if (json?.address?.streetAddress && !companyInfo.location) {
            companyInfo.location = `${json.address.streetAddress}, ${
              json.address.addressLocality || ""
            }, ${json.address.addressCountry || ""}`;
          }
        } catch (err) {
          // ignore
        }
      });

      // Industry detection from meta tag
      const industryKeywords = [
        // Core Industries
        "fashion",
        "technology",
        "finance",
        "healthcare",
        "education",
        "automotive",
        "real estate",
        "hospitality",
        "retail",
        "manufacturing",
        "construction",
        "energy",
        "telecommunications",
        "media",
        "entertainment",
        "agriculture",
        "transportation",
        "logistics",
        "e-commerce", // ✅ Add this
        "online shopping", // ✅ Add this
        "marketplace", // ✅ Add this

        // Tech-Enhanced Sectors
        "fintech",
        "edtech",
        "healthtech",
        "greentech",
        "cleantech",
        "legaltech",
        "foodtech",
        "agritech",
        "hrtech",
        "proptech",
        "insurtech",
        "martech",

        // IT & Tech Services
        "information technology",
        "software development",
        "cloud computing",
        "cybersecurity",
        "it consulting",
        "saas",
        "paas",
        "iaas",
        "infrastructure",
        "data analytics",
        "machine learning",
        "artificial intelligence",
        "big data",
        "devops",
        "blockchain",
        "web development",
        "mobile development",
      ];

      for (const keyword of industryKeywords) {
        if (metaContent.includes(keyword) && !companyInfo.industry) {
          companyInfo.industry = keyword;
          break;
        }
      }
    }

    // Products/Services
    if (
      tag == "li" &&
      lowerText.length > 0 &&
      /product|products|services|service/i.test(lowerText)
    ) {
      companyInfo.products.add(textContent);
    }

    // Look for script or link tags
    const stackKeywords = [
      "react",
      "vue",
      "angular",
      "bootstrap",
      "jquery",
      "node_modules",
      "php",
      "js",
      "python",
      "ruby",
      "java",
      "javascript",
      "typescript",
      "next.js",
      "nuxt.js",
      "svelte",
      "ember.js",
      "backbone.js",
      "d3.js",
      "lodash.js",
      "moment.js",
    ];
    stackKeywords.forEach((keyword) => {
      if (
        (tag === "script" || tag === "a" || tag === "div") &&
        attributes.src &&
        attributes.src.includes(keyword)
        // ✅ New
      ) {
        companyInfo.techStack.add(keyword);
      }
    });
  });

  //package data response
  const finalData = {
    //data: scrapedData,
    companyInfo: {
      name: companyInfo.companyName || "Unknown Company",
      emails: Array.from(companyInfo.emails),
      phones: Array.from(companyInfo.phones),
      socialMedia: Array.from(companyInfo.socialMedia),
      location: companyInfo.location,
      industry: companyInfo.industry,
      describe: companyInfo.describe,
      url: url,
      products: Array.from(companyInfo.products),
      techStack: Array.from(companyInfo.techStack), // ✅ New
    },
    total: scrapedData.length,
  };

  //return data
  return finalData;
}

module.exports = universalScrape;
