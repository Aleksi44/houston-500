Bomber Space
---------

The official Bomber Space Game.


Getting started
-----------

Install deps :
```sh
$ yarn
```
Start web server at http://localhost:8080/ :
```sh
$ yarn start
```
Test your code :
```sh
$ yarn lint
```


Usage
-----------

Run :
```sh
$ yarn add @stationspatiale/bomber-space
```

And use like this :
```
import BomberSpace from '@stationspatiale/bomber-space';

let bs = new BomberSpace({
  canvas: document.getElementById(id),
});
bs.runClassicGame();
```
