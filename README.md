# Baptiste

dependency injection electrolyte-driven module builder

## Example

components/a.js
```javascript
exports = module.exports = function(){
  return {
    foo : "bar"
  }
}
exports['@singleton'] = true;
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

mdl.inject({ a : {foo2: "bar2"}}).then(function(b){
  // b.a.foo2 is "bar2"
  // do your stuff here
});

```
