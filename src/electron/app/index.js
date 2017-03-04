const React = require('react');
const ReactDOM = require('react-dom');

console.log('test');

const HelloWorld = () => (
  <div>
    <p>Hello world</p>
  </div>
);

ReactDOM.render(<HelloWorld />, document.getElementById('mount'));
