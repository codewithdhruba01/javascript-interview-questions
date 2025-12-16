# Build Tools and Development Interview Questions

## Table of Contents

### [Package Managers](#package-managers)
1. [npm vs yarn vs pnpm](#1-npm-vs-yarn-vs-pnpm)
2. [package.json Structure](#2-packagejson-structure)
3. [Semantic Versioning](#3-semantic-versioning)
4. [npm Scripts](#4-npm-scripts)

### [Bundlers](#bundlers)
5. [Webpack vs Rollup vs Vite](#5-webpack-vs-rollup-vs-vite)
6. [Webpack Configuration](#6-webpack-configuration)
7. [Code Splitting](#7-code-splitting)
8. [Tree Shaking](#8-tree-shaking)

### [Task Runners](#task-runners)
9. [Grunt vs Gulp](#9-grunt-vs-gulp)
10. [Gulp Configuration](#10-gulp-configuration)

### [Module Systems](#module-systems)
11. [CommonJS vs ES Modules](#11-commonjs-vs-es-modules)
12. [Transpilation](#12-transpilation)
13. [Polyfills](#13-polyfills)

### [Development Tools](#development-tools)
14. [ESLint](#14-eslint)
15. [Prettier](#15-prettier)
16. [Husky and lint-staged](#16-husky-and-lint-staged)

---

## Package Managers

### 1. npm vs yarn vs pnpm

| Feature | npm | Yarn | pnpm |
|---------|-----|------|------|
| **Speed** | Moderate | Fast (v2+) | Fastest |
| **Disk Usage** | High | High | Lowest |
| **Lock File** | package-lock.json | yarn.lock | pnpm-lock.yaml |
| **Workspaces** | Basic | Advanced | Advanced |
| **Security** | Good | Good | Good |

**npm:**
```bash
# Install dependencies
npm install

# Install specific package
npm install lodash

# Install dev dependency
npm install --save-dev jest

# Run scripts
npm run build
npm test
```

**Yarn:**
```bash
# Install dependencies
yarn install

# Install specific package
yarn add lodash

# Install dev dependency
yarn add --dev jest

# Run scripts
yarn build
yarn test
```

**pnpm:**
```bash
# Install dependencies
pnpm install

# Install specific package
pnpm add lodash

# Install dev dependency
pnpm add --save-dev jest

# Run scripts
pnpm run build
pnpm test
```

### 2. package.json Structure

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "Project description",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "build": "webpack --mode=production",
    "test": "jest",
    "lint": "eslint src/",
    "format": "prettier --write src/"
  },
  "keywords": ["javascript", "react"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "react": "^18.2.0",
    "lodash": "~4.17.21"
  },
  "devDependencies": {
    "webpack": "^5.88.0",
    "jest": "^29.5.0"
  },
  "peerDependencies": {
    "react-dom": "^18.2.0"
  },
  "engines": {
    "node": ">=16.0.0",
    "npm": ">=8.0.0"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/user/repo.git"
  },
  "bugs": {
    "url": "https://github.com/user/repo/issues"
  },
  "homepage": "https://github.com/user/repo#readme"
}
```

### 3. Semantic Versioning

**Version Format:** `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

**Version Ranges:**
```json
{
  "dependencies": {
    "exact": "1.2.3",
    "patch": "~1.2.3",    // >=1.2.3 <1.3.0
    "minor": "^1.2.3",    // >=1.2.3 <2.0.0
    "latest": "*",        // Any version
    "range": ">=1.0.0 <2.0.0"
  }
}
```

**Publishing:**
```bash
# Patch version
npm version patch

# Minor version
npm version minor

# Major version
npm version major

# Publish
npm publish
```

### 4. npm Scripts

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "webpack --mode=production",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "format": "prettier --write src/",
    "clean": "rm -rf dist/",
    "prebuild": "npm run clean && npm run lint",
    "build:dev": "webpack --mode=development",
    "serve": "npm run build && live-server dist/"
  }
}
```

**Pre and Post Scripts:**
```json
{
  "scripts": {
    "pretest": "npm run lint",
    "test": "jest",
    "posttest": "npm run test:coverage"
  }
}
```

**Cross-platform Scripts:**
```json
{
  "scripts": {
    "clean": "rimraf dist",
    "build": "webpack --mode=production"
  }
}
```

---

## Bundlers

### 5. Webpack vs Rollup vs Vite

| Feature | Webpack | Rollup | Vite |
|---------|---------|--------|------|
| **Use Case** | Apps | Libraries | Development |
| **Build Speed** | Slow | Fast | Fastest |
| **Code Splitting** | Advanced | Basic | Advanced |
| **HMR** | Yes | No | Excellent |
| **Configuration** | Complex | Simple | Simple |

**Webpack Configuration:**
```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
};
```

### 6. Webpack Configuration

```javascript
// Advanced webpack config
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => ({
  mode: argv.mode || 'development',
  entry: {
    main: './src/index.js',
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: argv.mode === 'production'
          }
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          argv.mode === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  devtool: argv.mode === 'development' ? 'eval-cheap-module-source-map' : 'source-map'
});
```

### 7. Code Splitting

**Entry Point Splitting:**
```javascript
// webpack.config.js
module.exports = {
  entry: {
    main: './src/index.js',
    admin: './src/admin.js',
    vendor: ['react', 'lodash']
  }
};
```

**Dynamic Imports:**
```javascript
// Lazy loading components
const loadComponent = () => import('./components/HeavyComponent.js');

button.addEventListener('click', () => {
  loadComponent().then(module => {
    const Component = module.default;
    // Use component
  });
});

// Route-based splitting
const routes = {
  home: () => import('./pages/Home.js'),
  about: () => import('./pages/About.js'),
  contact: () => import('./pages/Contact.js')
};

function loadRoute(route) {
  routes[route]().then(module => {
    const Page = module.default;
    renderPage(Page);
  });
}
```

**React.lazy:**
```javascript
import React, { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

### 8. Tree Shaking

**ES6 Modules (Tree Shakeable):**
```javascript
// utils.js
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }
export function multiply(a, b) { return a + b; } // Bug: should be multiply

// main.js
import { add, subtract } from './utils.js';
// multiply is not imported, so it can be removed by tree shaking

console.log(add(5, 3)); // 8
console.log(subtract(5, 3)); // 2
```

**Webpack Configuration for Tree Shaking:**
```javascript
module.exports = {
  mode: 'production', // Enables tree shaking
  optimization: {
    usedExports: true, // Marks unused exports
    minimize: true     // Removes unused code
  }
};
```

**Side Effects:**
```json
{
  "sideEffects": false
}
```

```json
{
  "sideEffects": [
    "*.css",
    "./src/polyfills.js"
  ]
}
```

---

## Task Runners

### 9. Grunt vs Gulp

| Feature | Grunt | Gulp |
|---------|-------|------|
| **Configuration** | JSON-like | Code-based |
| **Performance** | File-based | Stream-based |
| **Learning Curve** | Easy | Moderate |
| **Plugins** | Many | Many |

**Grunt Configuration:**
```javascript
// Gruntfile.js
module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/bundle.js'
      }
    },
    uglify: {
      dist: {
        src: 'dist/bundle.js',
        dest: 'dist/bundle.min.js'
      }
    },
    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['concat', 'uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['concat', 'uglify']);
};
```

### 10. Gulp Configuration

```javascript
// gulpfile.js
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

function scripts() {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('dist/'))
    .pipe(uglify())
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('dist/'));
}

function styles() {
  return gulp.src('src/**/*.css')
    .pipe(concat('styles.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/'));
}

function watch() {
  gulp.watch('src/**/*.js', scripts);
  gulp.watch('src/**/*.css', styles);
}

exports.scripts = scripts;
exports.styles = styles;
exports.watch = watch;
exports.default = gulp.parallel(scripts, styles);
```

---

## Module Systems

### 11. CommonJS vs ES Modules

| Feature | CommonJS | ES Modules |
|---------|----------|------------|
| **Syntax** | require/module.exports | import/export |
| **Loading** | Synchronous | Asynchronous |
| **Browser Support** | No (needs bundler) | Modern browsers |
| **Tree Shaking** | No | Yes |
| **Dynamic Imports** | No | Yes |

**CommonJS:**
```javascript
// math.js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = { add, subtract };

// or
module.exports.add = add;
module.exports.subtract = subtract;

// main.js
const { add, subtract } = require('./math');
console.log(add(5, 3)); // 8
```

**ES Modules:**
```javascript
// math.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// Default export
export default function multiply(a, b) {
  return a * b;
}

// main.js
import { add, subtract } from './math.js';
import multiply from './math.js';

console.log(add(5, 3)); // 8
console.log(multiply(5, 3)); // 15
```

### 12. Transpilation

**Babel Configuration:**
```json
{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "browsers": ["last 2 versions", "ie >= 11"]
      },
      "useBuiltIns": "usage",
      "corejs": 3
    }],
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-optional-chaining"
  ]
}
```

**Webpack with Babel:**
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
```

### 13. Polyfills

```javascript
// Manual polyfill
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement) {
    return this.indexOf(searchElement) !== -1;
  };
}

// Using core-js
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Conditional polyfills
async function loadPolyfills() {
  if (!window.fetch) {
    await import('whatwg-fetch');
  }

  if (!window.Promise) {
    await import('es6-promise/auto');
  }
}

loadPolyfills();
```

---

## Development Tools

### 14. ESLint

**Configuration:**
```javascript
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    'no-unused-vars': 'error',
    'no-console': 'warn',
    'react/prop-types': 'off',
    'indent': ['error', 2],
    'quotes': ['error', 'single']
  },
  overrides: [
    {
      files: ['*.test.js'],
      rules: {
        'no-console': 'off'
      }
    }
  ]
};
```

### 15. Prettier

**Configuration:**
```javascript
// .prettierrc.js
module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'lf'
};
```

**Prettier with ESLint:**
```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    'prettier/prettier': 'error'
  }
};
```

### 16. Husky and lint-staged

**Setup:**
```bash
npm install --save-dev husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

**Configuration:**
```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,css,md}": [
      "prettier --write"
    ]
  }
}
```

**Husky Hooks:**
```bash
# Pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"

# Pre-push hook
npx husky add .husky/pre-push "npm run test"

# Commit-msg hook
npx husky add .husky/commit-msg "npx --no-install commitlint --edit \$1"
```

**[⬆️ Back to Top](#build-tools-and-development-interview-questions)**
