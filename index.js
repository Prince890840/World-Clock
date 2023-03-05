const apiKey = "307bfd9b3eaf4008a85eb1936e92cef3";

const openCageAPIAccesskey = "52dc705a7e4040afa92c814ed97ea038";

navigator.geolocation.getCurrentPosition((position) => {
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
      // getCountryTime();
    })
    .catch((error) => console.error(error));
});

async function getCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries = await response.json();

  const countryList = document.getElementById("country-list");
  countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country.name.common;
    option.text = country.name.common;
    countryList.appendChild(option);
  });
}

async function getCountryTime() {
  const country = document.getElementById("country-list").value;
  const url = `https://timezone.abstractapi.com/v1/current_time/?api_key=953eade75d464e09a0f84864e352f238&location=${country}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const countryTime = new Date(data?.datetime);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      // timeZone: data?.gmt_offset / 3600,
    };
    const formattedTime = countryTime.toLocaleString("en-US", options);

    console.log(formattedTime);

    const countryTimeDisplay = document.getElementById("country-time");
    countryTimeDisplay.innerHTML = `The current time in ${country} is: ${formattedTime}`;
  } catch (error) {
    console.error(error);
  }
}

getCountries();
const countryList = document.getElementById("country-list");
// countryList.addEventListener("change", getCountryTime);

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
