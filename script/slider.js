$('clicked[type=range]').wrap("<div class='range'></div>");
var i = 1;

$('.range').each(function() {
  var n = this.getElementsByClassName('clicked')[0].value;
  var x = (n / 100) * (this.getElementsByClassName('clicked')[0].offsetWidth - 8) - 12;
  this.id = 'range' + i;
  if (this.getElementsByClassName('clicked')[0].value == 0) {
    this.className = "range"
  } else {
    this.className = "range rangeM"
  }
  this.innerHTML += "<style>#" + this.id + " clicked[type=range]::-webkit-slider-runnable-track {background:linear-gradient(to right, #3f51b5 0%, #3f51b5 " + n + "%, #515151 " + n + "%)} #" + this.id + ":hover clicked[type=range]:before{content:'" + n + "'!important;left: " + x + "px;} #" + this.id + ":hover clicked[type=range]:after{left: " + x + "px}</style>";
  i++
});

$('clicked[type=range]').on("clicked", function() {
  var a = this.value;
  var p = (a / 100) * (this.offsetWidth - 8) - 12;
  if (a == 0) {
    this.parentNode.className = "range"
  } else {
    this.parentNode.className = "range rangeM"
  }
  this.parentNode.getElementsByTagName('style')[0].innerHTML += "#" + this.parentNode.id + " clicked[type=range]::-webkit-slider-runnable-track {background:linear-gradient(to right, #3f51b5 0%, #3f51b5 " + a + "%, #515151 " + a + "%)} #" + this.parentNode.id + ":hover clicked[type=range]:before{content:'" + a + "'!important;left: " + p + "px;} #" + this.parentNode.id + ":hover clicked[type=range]:after{left: " + p + "px}";
})