const pixelSize = 16;

function clearCanvas(context) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  document.getElementById('prediction').innerText = '-';
}

document.addEventListener('DOMContentLoaded', function(){ 
  document.getElementById('clear-btn').addEventListener('click', function() {
    const canvas = document.getElementById('paint');
    const context = canvas.getContext('2d');
    clearCanvas(context);
  });
}, false);

interact('#paint')
  .origin('self')
  .draggable({
    listeners: {
      // draw colored squares on move
      move: function (event) {
        const context = event.target.getContext('2d');

        context.fillStyle = 'white'
        context.fillRect(event.pageX - pixelSize / 2, event.pageY - pixelSize / 2,
                         pixelSize, pixelSize);
      },
      end: function(event) {
        predict(event.target);
      }
    }
  })
  // clear the canvas on doubletap
  .on('doubletap', function (event) {
    clearCanvas(event.target.getContext('2d'));
  })