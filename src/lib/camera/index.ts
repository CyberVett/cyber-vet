const camera = function () {
  let width = 0;
  let height = 0;

  const createObjects = function () {
    const video = document.createElement('video');
    video.id = 'video';
    video.width = width;
    video.width = height;
    video.autoplay = true;
    document.body.appendChild(video);

    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = width;
    canvas.width = height;
    document.body.appendChild(canvas);
  }


  return {
    canvas: null,
    context: null,
    startCamera: function (w = 680, h = 480) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        width = w;
        height = h;

        createObjects();
        // @ts-ignore
        this.video = document.getElementById('video');
        // @ts-ignore
        this.canvas = document.getElementById('canvas');
        // @ts-ignore
        this.context = this.canvas.getContext('2d');

        (function (video) {
          navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
            // @ts-ignore
            video.srcObject = stream;
            // @ts-ignore
            video.play();
          });
        })(this.video)

      }
    },

    takeSnapshot: function () {
      // @ts-ignore
      this.context.drawImage(this.video, 0, 0, width, height);
    },
    video: null,
  }
}();

export default camera;