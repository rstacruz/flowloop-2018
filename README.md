# Flowloop

> A polite web-based timer for hyper-productivity

[![](docs/images/screenshot.png)](http://ricostacruz.com/flowloop/)

[![Status](https://travis-ci.org/rstacruz/flowloop.svg?branch=master)](https://travis-ci.org/rstacruz/flowloop "See test builds")

<details>
<summary>Set up instructions</summary>

## Set up

Requires Node 6+ and Yarn.

```sh
yarn            # First-time setup
yarn start      # Development server
```

```sh
yarn run build  # Build for production (builds into /public)
```

## What's here

| Path | Purpose
| --- | ---
| `/web/assets` | the files to be copied into `/public/assets`
| `/web/html` | the files to be copied into `/public`
| `/web/css` | CSS files (via PostCSS)
| `/web/js` | JS files (via Browserify)
| `/public` | The built files (gitignored)

## Heroku setup

```sh
heroku create --app my-app
git push heroku master
```
</details>

<details>
<summary>To do list</summary>

## To do

- [x] Timer
- [x] Saving logs
- [x] Push notifications
- [x] Ding sound
- [ ] Rolling over
</details>

<details>
<summary>Sources</summary>

## Sources

- https://notificationsounds.com/standard-ringtones/echoed-ding-459
</details>
