// use native apply
function apply(func, context, argsArray) {
  func.apply(context, argsArray)
}

// use native call
function apply(func, context, argsArray = []) {
  func.call(context, ...argsArray)
}

// use native bind
function apply(func, context, argsArray = []) {
  func.bind(context, ...argsArray)()
}

// create new context
function apply(func, context, argsArray = []) {
  const uniqFieldName = Symbol("applyFunction");
  const applyContext = {
    ...context,
    [uniqFieldName]: func,
  };
  applyContext[uniqFieldName](...argsArray);
}

// modify current context
function apply(func, context, argsArray = []) {
  const uniqFieldName = Symbol("applyFunction");
  context[uniqFieldName] = func;
  context[uniqFieldName](...argsArray);
  delete context[uniqFieldName];
}

// es5 modify current context
function apply(func, context, argsArray) {
  const uniqFieldName = Date.now().toString();
  context[uniqFieldName] = func;
  eval("context[uniqFieldName](" + argsArray + ")");
  delete context[uniqFieldName];
}
