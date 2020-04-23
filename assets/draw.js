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

  // Set up touch events for mobile, etc
  canvas.addEventListener('touchstart', function (e) {
    mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  }, false);

  canvas.addEventListener('touchend', function (e) {
    var mouseEvent = new MouseEvent('mouseup', {});
    canvas.dispatchEvent(mouseEvent);
  }, false);

  canvas.addEventListener('touchmove', function (e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  }, false);

  // Get the position of a touch relative to the canvas
  function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top
    };
  }

  // Prevent scrolling when touching the canvas
  document.body.addEventListener('touchstart', function (e) {
    if (e.target === canvas) {
      e.preventDefault();
    }
  }, false);

  document.body.addEventListener('touchend', function (e) {
    if (e.target === canvas) {
      e.preventDefault();
    }
  }, false);

  document.body.addEventListener('touchmove', function (e) {
    if (e.target === canvas) {
      e.preventDefault();
    }
  }, false);

  document.getElementById('clear').addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('prediction').innerText = '-';
  });
};