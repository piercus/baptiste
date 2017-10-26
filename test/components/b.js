exports = module.exports = function(a){
  return {
    a: a
  }
}
exports['@require'] = ['a'];
exports['@singleton'] = true;
