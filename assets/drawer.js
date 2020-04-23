const pixelSize = 16;

function resizeCanvases () {
  [].forEach.call(document.querySelectorAll('#paint'), function (
    canvas
  ) {
    delete canvas.width
    delete canvas.height

    var rect = canvas.getBoundingClientRect()

    canvas.width = rect.width
    canvas.height = rect.height
  })
}

function clearCanvas(context) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  document.getElementById('prediction').innerText = '-';
  resizeCanvases();
}

document.addEventListener('DOMContentLoaded', function(){ 
  document.getElementById('clear-btn').addEventListener('click', function() {
    const canvas = document.getElementById('paint');
    const context = canvas.getContext('2d');
    clearCanvas(context);
  });
  resizeCanvases();
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

// interact.js can also add DOM event listeners
interact(window).on('resize', resizeCanvases)