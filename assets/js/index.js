const countryList = document.getElementById("country-list");

const countryTimeDisplay = document.getElementById("country-time");

const dateDisplay = document.getElementById("formated-date");

const getUserCountry = () => {
  fetch("https://ipapi.co/json/")
    .then(function (response) {
      return response.json();
    })
    .then((result) => {
      const countryName = result?.country_name;
      const option = document.createElement("option");
      option.value = countryName;
      option.text = `${countryName} (Current Location)`;
      option.selected = true;
      countryList.appendChild(option);
    })
    .catch((error) => console.log("error", error));
};

async function getCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");

  const countries = await response.json();

  countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country?.timezones[0];
    option.text = country?.name?.common;
    countryList.appendChild(option);
  });

  getUserCountry();
}

function calcTime() {
  const timezone = document.getElementById("country-list").value;

  let result = timezone.slice(3, 6);
  if (result) {
    const d = new Date();

    const utc = d.getTime() + d.getTimezoneOffset() * 60000;

    const nd = new Date(utc + 3600000 * result);

    const countryTime = new Date(nd);
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

    countryTimeDisplay.innerHTML = `${formattedTime}`;
    countryTimeDisplay.style.color = "#5F5F5F";
    countryTimeDisplay.style.fontSize = "45px";

    dateDisplay.innerHTML = `${date}`;
    dateDisplay.style.color = "#000";
    dateDisplay.style.fontSize = "25px";

    /*console.log(`The current time of the country is ${nd.toLocaleString()}`);*/
  } else {
    updateTime();
  }
}

countryList.addEventListener("change", function () {
  document.getElementById("default-time").style.display = "none";
  document.getElementById("default-formated-date").style.display = "none";
  displayLoading();
  setTimeout(() => {
    setInterval(calcTime, 1000);
  }, 1000);
});

/*async function getCountryTime() {
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
}*/

getCountries();

const loader = document.querySelector("#loading");

function displayLoading() {
  loader.classList.add("display");
  setTimeout(() => {
    loader.classList.remove("display");
  }, 1000);
}

function hideLoading() {
  loader.classList.remove("display");
}

function updateTime() {
  const countryTimeDisplay = document.getElementById("default-time");
  const dateDisplay = document.getElementById("default-formated-date");

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  const formattedTime = `${formattedHours}:${minutes}:${seconds} ${ampm}`;

  countryTimeDisplay.innerHTML = `${formattedTime}`;
  countryTimeDisplay.style.color = "#5F5F5F";
  countryTimeDisplay.style.fontSize = "45px";

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = now.toLocaleString("en-US", options);

  dateDisplay.innerHTML = `${formattedDate}`;
  dateDisplay.style.color = "#000";
  dateDisplay.style.fontSize = "25px";
}

setInterval(updateTime, 1000);

moment().utcOffset("UTC+02:00").format("YYYY-MM-DD HH:mm");
