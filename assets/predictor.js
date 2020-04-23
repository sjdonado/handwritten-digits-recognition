const preprocess = (image) => {
  let tensor = tf.browser.fromPixels(image)
    .resizeNearestNeighbor([28, 28])
    .mean(2)
    .expandDims(2)
    .expandDims()
    .toFloat();

  return tensor.div(255.0);
}

function predict(image) {
  if (window.model) {
    const scores = window.model.predict(preprocess(image)).dataSync();
    predicted = scores.indexOf(Math.max(...scores));
    document.getElementById('prediction').innerText = predicted;
  }
}

(async () => {
  window.model = await tf.loadLayersModel('model/model.json');
  console.log('model loaded!');
})()