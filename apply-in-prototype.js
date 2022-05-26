// use native apply in prototype
Function.prototype.myApply = function(context, argsArray) {
  this.apply(context, argsArray);
};

// use native call in prototype
Function.prototype.myApply = function(context, argsArray = []) {
  this.call(context, ...argsArray);
};

// use native bind in prototype
Function.prototype.myApply = function(context, argsArray = []) {
  this.bind(context, ...argsArray)();
};

// create new context in prototype
Function.prototype.myApply = function(context, argsArray = []) {
  const uniqFieldName = Symbol("applyFunction");
  const applyContext = {
    ...context,
    [uniqFieldName]: this,
  };
  applyContext[uniqFieldName](...argsArray);
};

// modify current context in prototype
Function.prototype.myApply = function(context, argsArray = []) {
  const uniqFieldName = Symbol("applyFunction");
  context[uniqFieldName] = this;
  context[uniqFieldName](...argsArray);
  delete context[uniqFieldName];
};

// es5 modify current context in prototype
Function.prototype.myApply = function(context, argsArray) {
  const uniqFieldName = Date.now().toString();
  context[uniqFieldName] = this;
  eval("context[uniqFieldName](" + argsArray + ")");
  delete context[uniqFieldName];
};
