window.onload = function () {
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');
   
  var painting = document.getElementById('paint');
  var paint_style = getComputedStyle(painting);
  canvas.width = parseInt(paint_style.getPropertyValue('width'));
  canvas.height = parseInt(paint_style.getPropertyValue('height'));
  
  var mouse = { x: 0, y: 0 };

  var onPaint = function() {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
  };
   
  canvas.addEventListener('mousemove', function(e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
  }, false);
  
  ctx.lineWidth = 25;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'white';
  canvas.style.backgroundColor = 'black';
   
  canvas.addEventListener('mousedown', function(e) {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);
    canvas.addEventListener('mousemove', onPaint, false);
  }, false);
   
  canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
    predict(canvas);
  }, false);

  document.getElementById('clear').addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('prediction').innerText = '';
  });
};