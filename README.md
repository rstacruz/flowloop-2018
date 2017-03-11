# $PROJECT_NAME

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

## Settings

When timer runs out: (`settings.timerMode`)

- Continue
- Switch to break
- Stop immediately

## To do

- [x] Timer
- [ ] Saving logs
- [ ] Rolling over
- [x] Push notifications
- [ ] Ding sound
