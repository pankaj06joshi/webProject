const searchText = document.getElementById("search_text");
const submitBtn = document.getElementById("search_btn");
const cDay = document.getElementById("day"); // like (TUE)
const cDate = document.getElementById("date"); // like (12 AUG)

const cityName = document.getElementById("city");
const tempValue = document.getElementById("temp_real_value");
const tempStatus = document.getElementById("temp_status");
const divTohide = document.querySelector(".middle_layer");

const getInfo = async (event) => {
  event.preventDefault();

  let cityValue = searchText.value;
  function getCurrentDay() {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const currenttDate = new Date();
    return days[currenttDate.getDay()];
  }

  function getCurrentTime() {
    const cMonths = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
    const now = new Date();
    const month = cMonths[now.getMonth()];
    const date = now.getDate();

    let hour = now.getHours();
    let min = now.getMinutes();
    let period = "AM";
    if (hour > 11) {
      period = "PM";
      if (hour > 12) hour -= 12;
    }
    if (min < 10) {
      min = "0" + min;
    }

    return `${month} ${date}  |  ${hour}:${min}${period}`;
  }

  cDay.innerText = getCurrentDay();
  cDate.innerText = getCurrentTime();

  if (cityValue === "") {
    cityName.innerText = "Please Enter City Name That Field Cannot Be Blank";
    divTohide.classList.add("data_hide");
  } else {
    try {
      const apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=005d6dd6026af5ea519632d315dc6122`;
      const fetchResponse = await fetch(apiLink);
      // console.log(fetchResponse);
      const fetchData = await fetchResponse.json();
      const dataArray = [fetchData];
      cityName.innerText = dataArray[0].name;
      tempValue.innerText = dataArray[0].main.temp;
      const tempSta = dataArray[0].weather[0].main;

      //check condition which is clear,haze,clouds,rain
      if (tempSta == "Clear") {
        tempStatus.innerHTML = `<i class="fas fa-sun" style="color:#F7D975;"></i>`;
      } else if (tempSta == "Haze") {
        tempStatus.innerHTML = `<i class="fas fa-sun-haze" style="color:#F7D975;">`;
      } else if (tempSta == "Clouds") {
        tempStatus.innerHTML = `<i class="fas fa-clouds" style="color:#96A8B0;"></i>`;
      } else if (tempSta == "Rain") {
        tempStatus.innerHTML = `<i class="fas fa-cloud-showers-heavy" style="color:#83BEF3;"></i>`;
      } else {
        tempStatus.innerHTML = "No Logo Defined We will Add Logo in Future";
      }

      divTohide.classList.remove("data_hide");
    } catch (error) {
      cityName.innerText = "Please Enter Correct City Name...";
      divTohide.classList.add("data_hide");
    } finally {
      searchText.value = "";
    }
  }
};

submitBtn.addEventListener("click", getInfo);
