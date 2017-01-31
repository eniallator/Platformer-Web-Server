require("./css/main.css")

fetch("/maps").then(data => {
  data.json().then(text => console.log(text));
});
