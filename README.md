# wavedef-app

A synthesizer building/programming environment built using the [wavedef](https://github.com/zakangelle/wavedef) library.

[![Circle CI](https://circleci.com/gh/zakangelle/wavedef-app/tree/master.svg?style=shield)](https://circleci.com/gh/zakangelle/wavedef-app/tree/master) [![Coverage Status](https://img.shields.io/coveralls/zakangelle/wavedef-app.svg)](https://coveralls.io/github/zakangelle/wavedef-app?branch=master) [![See Demo](https://img.shields.io/badge/see-demo-8500ff.svg)](http://dev.wavedef.com/)

<a href="http://dev.wavedef.com/">
  <img src='http://i.imgur.com/AaNfuK5.jpg?1' width='360px'>
</a>

## Requirements

+ NodeJS

## Tech Stack

* [express](http://expressjs.com/) - Server HTTP framework
* [react](https://facebook.github.io/react/) - View layer
* [babel](https://babeljs.io/) - ES6/JSX compiler
* [webpack](https://webpack.github.io/) - Module bundler
* [tape](https://github.com/substack/tape) - Testing

## Setup

Clone the repo:

```
$ git clone https://github.com/zakangelle/wavedef-app.git
```

Install dependencies:

```
$ npm install
```

## Development

Start the app in `development` mode at [http://localhost:3000](http://localhost:3000) (rebuilds when code changes are made):

```
$ npm start
```

To work on the `wavedef` library alongside the app, clone it directly into your `node_modules` folder:

```
$ cd node_modules
$ rm -rf wavedef
$ git clone https://github.com/zakangelle/wavedef
```

Changes to the `wavedef` library will now trigger a rebuild/refresh in your app.
