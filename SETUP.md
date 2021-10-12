# SETUP

このプロジェクトのセットアップ手順を残したメモ

## Setup for Vue CLI Project

（いまは使ってない）

```sh
kght6123@air shiori % vue create shiori

Vue CLI v4.5.13
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, TS, Router, Vuex, Linter
? Choose a version of Vue.js that you want to start the project with 3.x
? Use class-style component syntax? No
? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? Yes
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a linter / formatter config: Prettier
? Pick additional lint features: Lint on save
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? No


Vue CLI v4.5.13
✨  Creating project in /Volumes/Develop/shiori/shiori.
🗃  Initializing git repository...
⚙️  Installing CLI plugins. This might take a while...


added 1336 packages, and audited 1337 packages in 1m

82 packages are looking for funding
  run `npm fund` for details

12 moderate severity vulnerabilities

To address issues that do not require attention, run:
  npm audit fix

To address all issues possible (including breaking changes), run:
  npm audit fix --force

Some issues need review, and may require choosing
a different dependency.

Run `npm audit` for details.
🚀  Invoking generators...
📦  Installing additional dependencies...


added 124 packages, changed 1 package, and audited 1461 packages in 15s

100 packages are looking for funding
  run `npm fund` for details

12 moderate severity vulnerabilities

To address issues that do not require attention, run:
  npm audit fix

To address all issues possible (including breaking changes), run:
  npm audit fix --force

Some issues need review, and may require choosing
a different dependency.

Run `npm audit` for details.
⚓  Running completion hooks...

📄  Generating README.md...

🎉  Successfully created project shiori.
👉  Get started with the following commands:

 $ cd shiori
 $ npm run serve

mv shiori vue-cli
npm install --save firebase
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init -p
npm uninstall tailwindcss postcss autoprefixer
npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
npm i -D stylelint stylelint-config-recommended stylelint-config-standard
npx sb init
npm run storybook

npm i -D @storybook/addon-storyshots --force
npm install vue-jest@next --save-dev

npm remove babel-jest
npm install --save-dev babel-jest@26
npm install --save-dev ts-jest@26

npm i -D @storybook/addon-storyshots-puppeteer puppeteer


npm test storybook-puppeteer.test.js
npm test storybook.test.js

# https://github.com/storybookjs/storybook/issues/13801

```

## Setup for Vite Project

```sh
npm create @vitejs/app shiori --template vue-ts
cd shiori

npm install
npm init vite
firebase init --project=kght6123-shiori

npm install --save firebase
npm install vue-router@4
npm install vuex@4

npm install -D eslint eslint-plugin-vue @vue/eslint-config-typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm i -D prettier eslint-plugin-prettier @vue/eslint-config-prettier
npm i -D stylelint stylelint-config-recommended stylelint-config-standard

npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init -p

npx sb@next init --builder storybook-builder-vite
npm run storybook

npm install @storybook/addon-storyshots-puppeteer puppeteer --save-dev
npm install @mdx-js/preact --save-dev
npm run build-storybook
npm install --save-dev babel-jest @babel/core @babel/preset-env

npm install --save-dev @babel/plugin-syntax-jsx @babel/preset-react

npm install --save-dev vue-jest@5.0.0-alpha.8 # https://storybook.js.org/addons/@storybook/addon-storyshots
↓
npm install vue-jest@next --save-dev --force

# https://github.com/vuejs/vue-jest/issues/344
npm remove babel-jest
npm install --save-dev babel-jest@26

npm install --save-dev ts-jest@26

# https://github.com/storybookjs/storybook/issues/13801

npm install --save-dev daisyui

# https://github.com/jpkleemans/vite-svg-loader
npm install vite-svg-loader --save-dev

# https://github.com/Mitica/ascrape-js
npm install ascrape
```

## アイコン

https://github.com/icons8/line-awesome

master ブランチを zip でダウンロードして使う

## 背景画像

https://www.pakutaso.com/20200921260post-26160.html
