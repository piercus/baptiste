# Baptiste

dependency injection electrolyte-driven module builder

## Injection Example

components/a.js
```javascript
exports = module.exports = function(){
  return {
    foo : "bar"
  }
}
exports['@singleton'] = false;
```
components/b.js
```javascript
exports = module.exports = function(a){
  return {
    a: a
  }
}
exports['@require'] = ['a'];
exports['@singleton'] = true;
```
index.js
```javascript
const path = require('path');
const baptiste = require('../index.js');

var mdl = baptiste.buildModule({
  paths: [
    path.join(__dirname, 'components')
  ],
  components : ['a', 'b'],
  entry: 'b'
})

mdl.create({ a : {foo2: "bar2"}}).then(function(b){
  // b.a.foo2 is "bar2"
  // do your stuff here
});

```

## Extend Example

Extension is useful if you want to use components from a first module (in real-life the module will be npm-git-package) into another module.

components2/c.js
```javascript
module.exports = function (a) {
	return {
		a
	};
};
exports = module.exports;
exports['@require'] = ['a'];
exports['@singleton'] = true;
```

index.js
```javascript
const path = require('path');
const baptiste = require('baptiste');

const mdla = baptiste.buildModule({
	paths: [
		path.join(__dirname, 'components')
	],
	components: ['a', 'b'],
	entry: 'b'
});

const mdlb = baptiste.buildModule({
	paths: [
		path.join(__dirname, 'components2')
	],
	components: ['c'],
  required: ['a'],
	entry: 'c'
});

mdla.extend(mdlb).create().then(c => {
  // c.a.foo === "bar"
  // now c has been instanciated with a
});

```
