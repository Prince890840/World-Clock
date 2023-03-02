const getCountry = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (response) {
      const data = await response.json();
      console.log("Countries data", data);
      const countryList = document.getElementById("countryList");
      data.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.name.common;
        option.text = country.name.common;
        countryList.appendChild(option);
      });
    } else {
      console.log("There is something wrong to fetch the Data.");
    }
  } catch (error) {
    console.error(error);
  }
};

getCountry();
