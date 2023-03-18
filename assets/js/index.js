const countryList = document.getElementById("country-list");

const countryTimeDisplay = document.getElementById("country-time");

const dateDisplay = document.getElementById("formated-date");

const loader = document.querySelector("#loading");
const toggleLoading = async (show) => {
  if (show) {
    loader.classList.add("display");
  } else {
    loader.classList.remove("display");
  }
};

(async () => {
  try {
    toggleLoading(true);
    const response = await fetch("https://ipapi.co/json/");
    const result = await response.json();
    const countryName = result?.country_name;
    const option = new Option(
      `${countryName} (Current Location)`,
      result?.timezone,
      true,
      true
    );
    countryList.add(option);
    calcTime();
  } catch (error) {
    console.log("error", error);
  } finally {
    toggleLoading(false);
  }
})();

countryList.addEventListener("change", calcTime);
setInterval(calcTime, 1000);

function calcTime() {
  const timezone = document.getElementById("country-list").value;

  if (timezone === "") {
    countryTimeDisplay.innerHTML = "Kindly select the location.";
    dateDisplay.innerHTML = "";
    return;
  }

  const date = new Date();
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

  if (timezone === "UTC") {
    const countryTime = date.toUTCString(timezone);

    const modifiedDate = new Date(countryTime);

    countryTimeDisplay.innerHTML = `${modifiedDate.getUTCHours()}:${modifiedDate.getUTCMinutes()}:${modifiedDate.getUTCSeconds()} ${
      modifiedDate.getUTCHours() >= 12 ? "PM" : "AM"
    }`;

    dateDisplay.innerHTML = new Intl.DateTimeFormat(
      "en-US",
      formatedDate
    ).format(modifiedDate);
  } else if (timezone?.includes("/")) {
    const countryTime = new Date();

    options.timeZone = timezone;
    formatedDate.timeZone = timezone;

    const formattedTime = countryTime.toLocaleString("en-US", options);
    const date = countryTime.toLocaleString("en-US", formatedDate);

    countryTimeDisplay.innerHTML = `${formattedTime}`;
    dateDisplay.innerHTML = `${date}`;
  } else {
    let result = timezone?.slice(3, 6);
    if (result) {
      const utc = date.getTime() + date.getTimezoneOffset() * 60000;

      const nd = new Date(utc + 3600000 * result);

      const countryTime = new Date(nd);

      const formattedTime = countryTime.toLocaleString("en-US", options);
      const modifiedDate = countryTime.toLocaleString("en-US", formatedDate);

      countryTimeDisplay.innerHTML = `${formattedTime}`;
      dateDisplay.innerHTML = `${modifiedDate}`;
    }
  }
}

(async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (response && response?.status === 200 && response?.statusText === "OK") {
      const countries = await response.json();
      countries.forEach((country) => {
        const option = new Option(country?.name?.common, country?.timezones[0]);
        countryList.add(option);
      });
    }
  } catch (error) {
    console.log("error", error);
  }
})();
