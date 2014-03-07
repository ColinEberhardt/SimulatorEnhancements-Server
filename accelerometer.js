var container;
var camera, scene, renderer, cube;
var mouseX = 0, mouseY = 0, mouseDown = false;


container = $('#accelerometer');

var windowHalfX = container.width() / 2;
var windowHalfY = container.height() / 2;

// camera
camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.y = 150;
camera.position.z = 500;
scene = new THREE.Scene();

// cube
var geometry = new THREE.CubeGeometry(200, 100, 20);
for (var i = 0; i < geometry.faces.length; i += 2) {
  var hex = Math.random() * 0xffffff;
  geometry.faces[ i ].color.setHex(hex);
  geometry.faces[ i + 1 ].color.setHex(hex);
}

var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors, overdraw: 0.5 });
cube = new THREE.Mesh(geometry, material);
cube.position.y = 150;
scene.add(cube);

// renderer
renderer = new THREE.CanvasRenderer();
renderer.setClearColor(0xf0f0f0);
renderer.setSize(window.innerWidth, window.innerHeight);
container.append(renderer.domElement);


// resize the camera on window resize
function resize() {
  var windowHalfX = container.width() / 2;
  var windowHalfY = container.height() / 2;

  camera.aspect = windowHalfX / windowHalfY;
  camera.updateProjectionMatrix();

  renderer.setSize(container.width(), container.height());
};
$(window).resize(resize);
resize();

container.mouseup(function () {
  mouseDown = false;
});

container.mousedown(function () {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
  mouseDown = true;
});

container.mousemove(function (event) {
  if (!mouseDown) return;

  var newmouseX = event.clientX - windowHalfX;
  cube.rotation.y += (newmouseX - mouseX) * 0.02;
  mouseX = newmouseX;

  var newmouseY = event.clientY - windowHalfY;
  cube.rotation.x += (newmouseY - mouseY) * 0.02;
  mouseY = newmouseY;
});

function animate() {
  // update the view model
  viewModel.model.accelerometer.x(-cube.rotation.x * 0.2);
  viewModel.model.accelerometer.y(-cube.rotation.y * 0.2);

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate();
