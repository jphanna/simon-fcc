var simonSays = [];
function getSimon() {
  var seq = Math.floor(Math.random() * (5 - 1)) + 1;
  simonSays.push(seq);
}

for (var i = 0; i <  20; i ++) {
  getSimon();
}
console.log(simonSays);
