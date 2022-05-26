// use native call in prototype
Function.prototype.myCall = function(context, ...args) {
  this.call(context, ...args);
};

// use native apply in prototype
Function.prototype.myCall = function(context, ...args) {
  this.apply(context, args);
};

// use native bind in prototype
Function.prototype.myCall = function(context, ...args) {
  this.bind(context, ...args)();
};

// create new context in prototype
Function.prototype.myCall = function(context, ...args) {
  const uniqFieldName = Symbol("callFunction");
  const callContext = {
    ...context,
    [uniqFieldName]: this,
  };
  callContext[uniqFieldName](...args);
};

// modify current context in prototype
Function.prototype.myCall = function(context, ...args) {
  const uniqFieldName = Symbol("callFunction");
  context[uniqFieldName] = this;
  context[uniqFieldName](...args);
  delete context[uniqFieldName];
};

// es5 with native apply in prototype
Function.prototype.myCall = function(context) {
  const args = Array.prototype.slice.call(arguments, 1);
  this.apply(context, args);
};

// es5 modify current context in prototype
Function.prototype.myCall = function(context) {
  const args = Array.prototype.slice.call(arguments, 1);
  const uniqFieldName = Date.now().toString();
  context[uniqFieldName] = this;
  eval("context[uniqFieldName](" + args + ")");
  delete context[uniqFieldName];
};
