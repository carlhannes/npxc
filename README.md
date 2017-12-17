# npxc
NPX Closest - Small, dependency free, ES5 native NodeJS way of executing the closest npm binary from current working directory and upwards.

Using eslint with the airbnb-base/legacy config for the code and airbnb-base for tests, is tested using AVA.

# When to use
My team encountered problems with using npm bins from parent folders in monoreps (i.e. a repo utilising lerna).
We wanted to use tools such as `eslint` and `rollup` installed in the root of the monorepo, 
but utilise them inside the packages of the the monorepo, so `packages/project1/package.json` would have content something like this:

```js
"scripts": {
  "build": "../../node_modules/rollup/bin/rollup -c ../../rollup.config.js --environment BUILD:production"
}
```

This was confusing and created issues on different platforms where some terminals did not recognize `..` as a command, etc,
so I decided to try a different approach, which resulted in that you could replace the above line with the following:
```js
"scripts": {
  "build": "npxc rollup -c ../../rollup.config.js --environment BUILD:production"
}
```

# Usage
In your monorepo, install shared libraries in the root `package.json`,
then in the `packages/project1/` use `npm install npxc --save-dev` to use `npxc` in that project.
In `packages/project1/package.json`, use `npxc` like this:

```js
"scripts": {
  "build": "npxc my-shared-bin --my-args"
}
```

If it does not find `my-shared-bin` in `node_modules` for `packages/project1`, it'll traverse upwards, and hit `../../node_modules/.bin/my-shared-bin`,
fire that with the current working directory correctly and the right arguments (hopefully, if I didn't do anything wrong).

It defaults to a depth of 5, so max `['./', '../', '../../', '../../', '../../../']`.



