const apiKey = "307bfd9b3eaf4008a85eb1936e92cef3";

const openCageAPIAccesskey = "52dc705a7e4040afa92c814ed97ea038";

const getUserCountry = () => {
  fetch("https://ipapi.co/json/")
    .then(function (response) {
      return response.json();
    })
    .then((result) => {
      console.log(result);
      const countryName = result?.country_name;
      const option = document.createElement("option");
      option.value = countryName;
      option.text = `${countryName} (Current Location)`;
      option.selected = true;
      countryList.appendChild(option);
      // getCountryTime();
    })
    .catch((error) => console.log("error", error));
};

getUserCountry();

/*navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${openCageAPIAccesskey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const countryName = data.results[0].components.country;
      const option = document.createElement("option");
      option.value = countryName;
      option.text = `${countryName} (Current Location)`;
      option.selected = true;
      countryList.appendChild(option);
      getCountryTime();
    })
    .catch((error) => console.error(error));
});*/

async function getCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries = await response.json();

  console.log(countries);

  const countryList = document.getElementById("country-list");
  countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country.name.common;
    option.text = country.name.common;
    countryList.appendChild(option);
  });
}

async function getCountryTime() {
  displayLoading();
  const country = document.getElementById("country-list").value;
  const url = `https://timezone.abstractapi.com/v1/current_time/?api_key=953eade75d464e09a0f84864e352f238&location=${country}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data) {
      const countryTime = new Date(data?.datetime);
      const options = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };

      const formatedDate = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      };

      const formattedTime = countryTime.toLocaleString("en-US", options);

      const date = countryTime.toLocaleString("en-US", formatedDate);

      const countryTimeDisplay = document.getElementById("country-time");

      const dateDisplay = document.getElementById("formated-date");

      countryTimeDisplay.innerHTML = `${formattedTime}`;
      countryTimeDisplay.style.color = "#5F5F5F";
      countryTimeDisplay.style.fontSize = "45px";

      dateDisplay.innerHTML = `${date}`;
      dateDisplay.style.color = "#000";
      dateDisplay.style.fontSize = "25px";
      
      hideLoading();
    } else {
      hideLoading();
    }
  } catch (error) {
    console.error(error);
  }
}

getCountries();
const countryList = document.getElementById("country-list");
countryList.addEventListener("change", getCountryTime);

function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  const timeString = `${hours}:${minutes}:${seconds}`;
  const timeElement = document.getElementById("country-time");
  timeElement.textContent = `The current time in India is: ${timeString}`;
}

// Call updateTime() every second
// setInterval(updateTime, 1000);

const loader = document.querySelector("#loading");

// showing loading
function displayLoading() {
  loader.classList.add("display");
  setTimeout(() => {
    loader.classList.remove("display");
  }, 5000);
}

function hideLoading() {
  loader.classList.remove("display");
}
