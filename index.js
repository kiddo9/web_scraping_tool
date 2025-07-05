const query = document.getElementById("query");
const url = document.getElementById("urls");
const submitButton = document.getElementById("btn");
const result = document.getElementById("results");
const Data = document.getElementById("data");
const error = document.getElementById("error");
const success = document.getElementById("success");
const backendUrl = "http://localhost:3000/api/v3/w/scraper";
const body = { query: query.value, url: url.value };

function clearResults() {
  result.innerHTML = "";
  error.textContent = "";
  success.textContent = "";
  Data.innerHTML = "";
}

function scraper() {
  clearResults();
  fetch(`${backendUrl}?url=${url.value}&query=${query.value}`, {
    method: "post",
  })
    .then((response) => response.json())
    .then((data) => {
      const results = data.data;
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

      // results.forEach((item) => {
      //   result.innerHTML += `<div class="result-item">
      //   <span class="tag">&lt;${item.tag}&gt;</span>
      //   <span class="text">${item.text}</span>
      //   <span class="tag">&lt;/${item.tag}&gt;</span>
      //   <div class="attributes">
      //     ${Object.entries(item.attributes || {})
      //       .map(
      //         ([key, value]) =>
      //           `<span class="attribute">${key}="${value}"</span>`
      //       )
      //       .join(" ")}
      // </div>`;
      // });

      const otherInfo = data.companyInfo;
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

      const product = otherInfo.products; // array, not string

      Data.innerHTML += "<p class='subtitle'>Products:</p><br>";
      product.forEach((product) => {
        `<p class="product"> ${product}</p><br>`;
      });

      Data.innerHTML += "<p class='subtitle'>Services:</p>";
      otherInfo.services.forEach((service) => {
        `<p class="service"> ${service}</p><br>`;
      });

      Data.innerHTML += `<p class="subtitle">Address: <br><br>${otherInfo.address}</p><br>`;
      Data.innerHTML += `<p class="subtitle">location:<br><br> ${otherInfo.location}</p><br>`;
      Data.innerHTML += `<p class="subtitle">Industry:<br><br> ${otherInfo.industry}</p><br>`;
    })

    .catch((error) => {
      console.error("Error:", error);
    });
}

submitButton.addEventListener("click", scraper);
url.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    scraper();
  }
});
