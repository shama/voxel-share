# voxel-share

Take a snapshot in [voxel.js](https://github.com/maxogden/voxel-engine) and
share on imgur.com/twitter.com.

Props to [imgur.com](http://imgur.com) for enabling CORS and accepting base64
image uploads via the browser. :D

[View this example](http://shama.github.com/voxel-share)

# usage

Create a share tool:

```js
var share = require('voxel-share')({
  // pass a copy of the game
  game: game,

  // api key from http://imgur.com/register/api_anon
  key: 'abcd1234',

  // specify a message to set as caption/tweet
  message: 'Greetings from voxel.js! @voxeljs',

  // type of image: image/png or image/jpg
  type: 'image/png',

  // quality of image. between 0 and 1
  quality: 0.75
});
```

Then upon desired event, open/close the share dialog:

```js
window.addEventListener('keyup', function(e) {

  // on enter, open dialog
  if (e.keyCode === 13) share.open();

  // on esc, close dialog
  if (e.keyCode === 27) share.close();

});
```

Check
[the example](https://github.com/shama/voxel-share/tree/master/example/world.js)
for a more in-depth usage.

# install

With [npm](https://npmjs.org) do:

```
npm install voxel-share
```

Use [browserify](http://browserify.org) to `require('voxel-share')`.

## release history
* 0.2.0 - update to work with imgur api v3. Thanks @maxogden!
* 0.1.0 - initial release

## license
Copyright (c) 2013 Kyle Robinson Young<br/>
Licensed under the MIT license.
