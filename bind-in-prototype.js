// use native bind in prototype
Function.prototype.myBind = function(context, ...args) {
  return this.bind(context, ...args);
};

// use native apply in prototype
Function.prototype.myBind = function(context, ...args) {
  const boundFunction = this;
  return function (...bindArgs) {
    boundFunction.apply(context, [...args, ...bindArgs]);
  };
};

// use native call in prototype
Function.prototype.myBind = function(context, ...args) {
  const boundFunction = this;
  return function (...bindArgs) {
    boundFunction.call(context, ...[...args, ...bindArgs]);
  };
};

// create new context in prototype
Function.prototype.myBind = function(context, ...args) {
  const boundFunction = this;
  return function (...bindArgs) {
    const uniqFieldName = Symbol("bindFunction");
    const boundContext = {
      ...context,
      [uniqFieldName]: boundFunction,
    };
    boundContext[uniqFieldName](...[...args, ...bindArgs]);
  };
};

// modify current context in prototype
Function.prototype.myBind = function(context, ...args) {
  const boundFunction = this;
  return function (...bindArgs) {
    const uniqFieldName = Symbol("bindFunction");
    context[uniqFieldName] = boundFunction;
    context[uniqFieldName](...[...args, ...bindArgs]);
    delete context[uniqFieldName];
  };
};

// es5 with native apply in prototype
Function.prototype.myBind = function(context) {
  const args = Array.prototype.slice.call(arguments, 1);
  const boundFunction = this;
  return function(argunemts) {
    const bindArgs = Array.prototype.slice.call(arguments);
    boundFunction.apply(context, args.concat(bindArgs));
  };
};

// es5 modify current context in prototype
Function.prototype.myBind = function(context) {
  const args = Array.prototype.slice.call(arguments, 1);
  const boundFunction = this;
  return function(argunemts) {
    const bindArgs = Array.prototype.slice.call(arguments);
    const uniqFieldName = Date.now().toString();
    context[uniqFieldName] = boundFunction;
    context[uniqFieldName].apply(context, args.concat(bindArgs));
    delete context[uniqFieldName];
  };
};
