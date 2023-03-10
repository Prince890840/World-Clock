const countryList = document.getElementById("country-list");

const countryTimeDisplay = document.getElementById("country-time");

const dateDisplay = document.getElementById("formated-date");

const getUserCountry = () => {
  displayLoading();
  fetch("https://ipapi.co/json/")
    .then(function (response) {
      return response.json();
    })
    .then((result) => {
      calcTime(result?.timezone);
      const countryName = result?.country_name;
      const option = document.createElement("option");
      option.value = result?.timezone;
      option.text = `${countryName} (Current Location)`;
      option.selected = true;
      countryList.appendChild(option);
      hideLoading();
    })
    .catch((error) => {
      console.log("error", error);
      hideLoading();
    });
};

async function getCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  if (response && response?.status === 200 && response?.statusText === "OK") {
    const countries = await response.json();

    countries.forEach((country) => {
      const option = document.createElement("option");
      option.value = country?.timezones[0];
      option.text = country?.name?.common;
      countryList.appendChild(option);
    });
  }
  getUserCountry();
}

function calcTime() {
  const timezone = document.getElementById("country-list").value;

  if (timezone === "UTC") {
    const date = new Date();
    const countryTime = date.toUTCString(timezone);

    const modifiedDate = new Date(countryTime);

    countryTimeDisplay.innerHTML = `${modifiedDate.getUTCHours()}:${modifiedDate.getUTCMinutes()}:${modifiedDate.getUTCSeconds()} ${
      modifiedDate.getUTCHours() >= 12 ? "PM" : "AM"
    }`;
    countryTimeDisplay.style.color = "#ffffff";
    countryTimeDisplay.style.fontSize = "45px";
    countryTimeDisplay.style.fontWeight = 700;

    const formatedDate = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };

    dateDisplay.innerHTML = new Intl.DateTimeFormat(
      "en-US",
      formatedDate
    ).format(modifiedDate);
    dateDisplay.style.color = "#ffffff";
    dateDisplay.style.fontSize = "25px";
    dateDisplay.style.fontWeight = 700;
  } else if (timezone?.includes("/")) {
    const countryTime = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: timezone,
    };

    const formatedDate = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: timezone,
    };

    const formattedTime = countryTime.toLocaleString("en-US", options);

    const date = countryTime.toLocaleString("en-US", formatedDate);

    countryTimeDisplay.innerHTML = `${formattedTime}`;
    countryTimeDisplay.style.color = "#ffffff";
    countryTimeDisplay.style.fontSize = "45px";
    countryTimeDisplay.style.fontWeight = 700;

    dateDisplay.innerHTML = `${date}`;
    dateDisplay.style.color = "#ffffff";
    dateDisplay.style.fontSize = "25px";
    dateDisplay.style.fontWeight = 700;
  } else if (timezone === "") {
    countryTimeDisplay.innerHTML = "Kindly select the location.";
    countryTimeDisplay.style.fontSize = "25px";
    dateDisplay.innerHTML = "";
  } else {
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
      countryTimeDisplay.style.color = "#ffffff";
      countryTimeDisplay.style.fontSize = "45px";
      countryTimeDisplay.style.fontWeight = 700;

      dateDisplay.innerHTML = `${date}`;
      dateDisplay.style.color = "#ffffff";
      dateDisplay.style.fontSize = "25px";
      dateDisplay.style.fontWeight = 700;
    }
  }
}

countryList.addEventListener("change", function () {
  setTimeout(() => {
    calcTime();
  }, 1000);
});

setInterval(calcTime, 1000);

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
