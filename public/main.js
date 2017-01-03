console.log("HEYA WORLD")
fetch("/maps").then(data => {
  data.text().then(text => console.log(text));
});
