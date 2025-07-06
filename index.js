const query = document.getElementById("query");
const url = document.getElementById("urls");
const submitButton = document.getElementById("btn");
const result = document.getElementById("results");
const Data = document.getElementById("data");
const error = document.getElementById("error");
const success = document.getElementById("success");
const saveButton = document.getElementById("save");
const backendUrl = "http://localhost:3000/api/v3/w/scraper";
const savebackendUrl = "http://localhost:3000/api/v3/w/save";
let saveInfo = [];
let Urls;
const body = { query: query.value, url: url.value };

function clearResults() {
  result.innerHTML = "";
  error.textContent = "";
  success.textContent = "";
  Data.innerHTML = "";
}

function processUrls() {
  const urlArray = url.value
    .split(/\r?\n/) // split by new lines (Windows or Unix)
    .map((url) => url.trim()) // trim each line
    .filter((url) => url); // remove empty lines

  if (urlArray.length === 0) {
    error.textContent = "Please enter at least one URL.";
    return;
  }

  return urlArray;
}

function scraper() {
  Urls = processUrls();
  clearResults();
  fetch(`${backendUrl}?url=${JSON.stringify(Urls)}`, {
    method: "post",
  })
    .then((response) => response.json())
    .then((data) => {
      const results = data.res;
      saveInfo = results;
      if (data.status === "error") {
        error.textContent = data.message;
        return;
      }
      if (Array.isArray(results) && results.length === 0) {
        error.textContent = "No results found.";
        return;
      }
      clearResults();
      success.textContent = "";
      error.textContent = "";

      success.textContent = data.message;

      results.map((datas) => {
        const otherInfo = datas.companyInfo;

        Data.innerHTML += `<p class="Company_details"> Company name: ${otherInfo.name}</p><br>`;
        Data.innerHTML += `<p class="subtitle"> Company name: ${otherInfo.name}</p><br>`;
        Data.innerHTML += `<p class="subtitle"> website url: ${otherInfo.url}</p><br>`;

        Data.innerHTML += "<p class='subtitle'>Emails:</p><br>";
        otherInfo.emails.forEach((email) => {
          Data.innerHTML += `<p class="email">${email}</p><br>`;
        });

        Data.innerHTML += "<p class='subtitle'>Phone numbers:</p><br>";
        otherInfo.phones.forEach((phone) => {
          Data.innerHTML += `<p class="phone">${phone}</p><br>`;
        });

        Data.innerHTML += "<p class='subtitle'>Social media:</p><br>";
        otherInfo.socialMedia.forEach((social) => {
          Data.innerHTML += `<p class="social"> ${social}</p><br>`;
        });

        Data.innerHTML += "<p class='subtitle'>Products:</p><br>";
        otherInfo.products.forEach((product) => {
          Data.innerHTML += `<p class="product"> ${product}</p><br>`;
        });
        Data.innerHTML += `<p class="subtitle">Tech stack:</p><br>`;
        otherInfo.techStack.forEach((tech) => {
          Data.innerHTML += `<p class="tech"> ${tech}</p><br>`;
        });
        Data.innerHTML += `<p class="subtitle">location:<br><br> ${otherInfo.location}</p><br>`;
        Data.innerHTML += `<p class="subtitle">Description:<br><br> ${otherInfo.describe}</p><br>`;
        Data.innerHTML += `<p class="subtitle">Industry: ${otherInfo.industry}</p><br>`;
      });

      saveButton.style.display = "block";
    })

    .catch((error) => {
      console.error("Error:", error);
    });
}

function saveData() {
  if (saveInfo.length === 0) {
    error.textContent = "No data to save. Please scrape first.";
    return;
  }

  fetch(savebackendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: saveInfo }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        success.textContent = data.message;
      } else {
        error.textContent = data.message || "Failed to save data.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      error.textContent = "An error occurred while saving data.";
    });
  saveButton.style.display = "none"; // Hide the save button after saving
  saveInfo = []; // Clear the saveInfo array after saving
  Data.innerHTML = ""; // Clear the displayed data
  success.textContent = "data successfully saved"; // Show success message
  error.textContent = ""; // Clear any previous error messages
}

submitButton.addEventListener("click", scraper);
saveButton.addEventListener("click", () => {
  saveData();
});
