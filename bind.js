// use native bind
function bind(func, context, ...args) {
  return func.bind(context, ...args);
}

// use native apply
function bind(func, context, ...args) {
  return function(...bindArgs) {
    func.apply(context, args.concat(bindArgs));
  };
}

// use native call
function bind(func, context, ...args) {
  return function(...bindArgs) {
    func.call(context, ...args.concat(bindArgs));
  };
}

// create new context
function bind(func, context, ...args) {
  return function(...bindArgs) {
    const uniqFieldName = Symbol("bindFunction");
    const boundContext = {
      ...context,
      [uniqFieldName]: func,
    };
    boundContext[uniqFieldName](...args.concat(bindArgs));
  };
}

// modify current context
function bind(func, context, ...args) {
  return function(...bindArgs) {
    const uniqFieldName = Symbol("bindFunction");
    context[uniqFieldName] = func;
    context[uniqFieldName](...args.concat(bindArgs));
    delete context[uniqFieldName];
  };
}

// es5 with native apply
function bind(func, context) {
  const args = Array.prototype.slice.call(arguments, 2);
  return function(argunemts) {
    const bindArgs = Array.prototype.slice.call(arguments);
    func.apply(context, args.concat(bindArgs));
  };
}

// es5 modify current context
function bind(func, context) {
  const args = Array.prototype.slice.call(arguments, 2);
  return function(argunemts) {
    const bindArgs = Array.prototype.slice.call(arguments);
    const uniqFieldName = Date.now().toString();
    context[uniqFieldName] = func;
    context[uniqFieldName].apply(context, args.concat(bindArgs));
    delete context[uniqFieldName];
  };
}
