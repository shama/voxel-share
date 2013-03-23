var createEngine = require('voxel-engine');
var createTerrain = require('voxel-perlin-terrain');
var debris = require('voxel-debris');
var toolbar = require('toolbar');

// create the game
var game = createEngine({
  generateVoxelChunk: createTerrain({scaleFactor:10}),
  chunkDistance: 2,
  materials: [
    'grass',
    ['grass', 'dirt', 'grass_dirt'],
    'obsidian',
    'plank'
  ],
  texturePath: './textures/',
  startingPosition: [35, -1200, 35],
  worldOrigin: [0,0,0],
  fogDisabled: true,
  lightsDisabled: true
});
var container = document.getElementById('container');
game.appendTo(container);

// block selector
var blockSelector = toolbar({el: '#tools'});
var currentMaterial = 1;
blockSelector.on('select', function(material) {
  var idx = game.materials.indexOf(material);
  if (idx === -1) {
    if (material === 'dirt') idx = 1;
  }
  if (idx > -1) currentMaterial = idx + 1;
});

var explode = debris(game, { power : 1.5, yield: 1 });
game.on('mousedown', function (pos) {
  if (erase) explode(pos);
  else game.createBlock(pos, currentMaterial);
})

var erase = true;
window.addEventListener('keydown', function (ev) {
  if (ev.keyCode === 'X'.charCodeAt(0)) erase = !erase;
});
function ctrlToggle (ev) { erase = !ev.ctrlKey }
window.addEventListener('keyup', ctrlToggle);
window.addEventListener('keydown', ctrlToggle);

// add some trees
var createTree = require('voxel-forest');
for (var i = 0; i < 20; i++) {
  createTree(game, {bark: 4, leaves: 1});
}

// create a sky
var sky = require('voxel-sky')(game)();
var hour = (new Date()).getHours() * 100;
for (var i = 0; i < hour; i++) sky();
game.on('tick', sky);

// create a share thing
var share = require('../')({
  game: game,
  // api v3 key from imgur.com
  key: '70e28448fe7b804'
});

// if ctrl is pressed
var ctrl = false;
window.addEventListener('keydown', function(e) { ctrl = !!e.ctrlKey; });

window.addEventListener('keyup', function(e) {
  // on ctrl+s, open share
  if (ctrl && e.keyCode === 83) {
    share.open();
    if (game.controls.enabled) game.pointer.release();
  }
  // on esc, close share
  if (e.keyCode === 27) {
    share.close();
    //if (!game.controls.enabled) game.pointer.request();
  }
});

// obtain pointer lock
container.addEventListener('click', function() {
  game.requestPointerLock(container);
  // Close share dialog when clicking back to game
  game.pointer.on('attain', share.close.bind(share));
});
