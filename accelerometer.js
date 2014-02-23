var container;
var camera, scene, renderer;
var cube;
var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {

  container = document.createElement( 'div' );
  document.getElementById('accelerometer').appendChild( container );

  camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.y = 150;
  camera.position.z = 500;

  scene = new THREE.Scene();

  // Cube

  var geometry = new THREE.CubeGeometry( 200, 100, 20 );

  for ( var i = 0; i < geometry.faces.length; i += 2 ) {

    var hex = Math.random() * 0xffffff;
    geometry.faces[ i ].color.setHex( hex );
    geometry.faces[ i + 1 ].color.setHex( hex );

  }

  var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );

  cube = new THREE.Mesh( geometry, material );
  cube.position.y = 150;
  scene.add( cube );


  renderer = new THREE.CanvasRenderer();
  renderer.setClearColor( 0xf0f0f0 );
  renderer.setSize( window.innerWidth, window.innerHeight );

  container.appendChild( renderer.domElement );



  document.addEventListener( 'mousedown', onDocumentMouseDown, false );

  //

  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

//

function onDocumentMouseDown( event ) {

  event.preventDefault();

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'mouseup', onDocumentMouseUp, false );
  document.addEventListener( 'mouseout', onDocumentMouseOut, false );

  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;

}

function onDocumentMouseMove( event ) {

  var newmouseX = event.clientX - windowHalfX;

  cube.rotation.y += (newmouseX - mouseX) * 0.02;
  mouseX = newmouseX;

  var newmouseY = event.clientY - windowHalfY;

  cube.rotation.x += (newmouseY - mouseY) * 0.02;
  mouseY = newmouseY;

}

function onDocumentMouseUp( event ) {

  document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
  document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
  document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentMouseOut( event ) {

  document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
  document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
  document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}


//

function animate() {

  requestAnimationFrame( animate );

  render();

}

var tick =0;

function render() {

  if (tick>50){
    var request = new XMLHttpRequest();
    request.open('POST', '/accelerometer', true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); 
    request.send(JSON.stringify({'accelerometer':{'x':-cube.rotation.x*0.2, 'y':-cube.rotation.y*0.2, 'z':0.0}}));
    tick = 0;
  }
  tick++;

  renderer.render( scene, camera );

}