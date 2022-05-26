// use native call
function call(func, context, ...args) {
  func.call(context, ...args);
}

// use native apply
function call(func, context, ...args) {
  func.apply(context, args);
}

// use native bind
function call(func, context, ...args) {
  func.bind(context, ...args)();
}

// create new context
function call(func, context, ...args) {
  const uniqFieldName = Symbol("callFunction");
  const callContext = {
    ...context,
    [uniqFieldName]: func,
  };
  callContext[uniqFieldName](...args);
}

// modify current context
function call(func, context, ...args) {
  const uniqFieldName = Symbol("callFunction");
  context[uniqFieldName] = func;
  context[uniqFieldName](...args);
  delete context[uniqFieldName];
}

// es5 with native apply
function call(func, context) {
  const args = Array.prototype.slice.call(arguments, 2);
  func.apply(context, args);
}

// es5 modify current context
function call(func, context) {
  const args = Array.prototype.slice.call(arguments, 2);
  const uniqFieldName = Date.now().toString();
  context[uniqFieldName] = func;
  eval("context[uniqFieldName](" + args + ")");
  delete context[uniqFieldName];
}
