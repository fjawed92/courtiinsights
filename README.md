# Court Insights

The league home page: live scores, standings, stat leaders, and the sponsors
who pay for the season — shown directly under the league name, where everyone
sees them first.

## What's in here

| File | What it is |
|---|---|
| `index.html` | The page itself. Rarely needs changing. |
| `data/league.js` | **All the content.** Scores, standings, sponsors, teams. This is the file you edit. |
| `assets/styles.css` | All the colors and layout. |
| `assets/app.js` | Draws the page from the data file. You shouldn't need to touch this. |
| `design/mockups.html` | The design mockups — phone and desktop, both colorways. Reference only, not part of the site. |

## Looking at the site on your computer

Double-click `index.html`. It opens in your browser. That's it — no build step,
no install, nothing to run.

## Updating the league

Open `data/league.js` in any text editor. Everything is labeled in plain English.

**Change a score** — find the game under `games:` and edit the `score` values.
Put `leading: true` on whichever team is ahead so their score shows in bold.

**Add a game happening right now** — set `live: true` and write the clock into
`status`, like `"Q3 · 4:12"`. That's what turns on the red pulsing dot.

**Add a sponsor** — copy one line inside `sponsors.list` and change the three
values: `initials` (what shows in the colored square), `name`, and `kind`
(their tier and what they sponsor). Six sponsors fill the grid evenly; nine
also works.

**Change the presenting sponsor** — edit `sponsors.presenting`. This is the
big one at the top, directly under the league name.

**Update standings** — edit the `w`, `l`, `pct`, `gb` and `streak` values.
`last5` is five letters read left to right: `"WWLWW"`. Put
`playoffCut: true` on the team that sits just below the playoff line and a red
line is drawn there.

Save the file, refresh the browser. Done.

### The one rule

Keep the quotes and commas exactly where they are. If the page goes blank
after an edit, you most likely deleted a comma or a quote mark — undo your
change (Ctrl+Z / Cmd+Z) and try again more carefully.

## The colors

Red, white and blue. Every color is set once at the top of `assets/styles.css`,
so changing the look is a handful of lines, not a redesign.

| Token | Value | Used for |
|---|---|---|
| `--brand-bg` | `#1D428A` | Banner, top bar, team tags |
| `--accent` | `#C8102E` | Stripe under the league name, sponsor rule, live games, buttons |
| `--data` | `#2E62C4` | Stat bars |
| `--win` | `#17794F` | Winning streaks |
| `--paper` | `#F4F6FA` | Page background |

Red is deliberately never placed on blue — the contrast is unreadable. On blue
surfaces the emphasis is white. Red is spent where it lands on white.

The page also follows the visitor's light/dark setting automatically; the dark
values are further down in the same block.

## Putting it online

It's a plain static site, so it's free to host.

1. Go to [netlify.com](https://netlify.com) (or [vercel.com](https://vercel.com)) and sign up.
2. Connect this GitHub repository.
3. When it asks for a build command, leave it blank. Publish directory: `/`.
4. It gives you a web address. Point your own domain at it later if you want one.

Every time you push a change to `data/league.js`, the live site updates itself.

## Where this could go next

The data file works well for a weekly update. If updating scores during games
starts being a chore, the next step is a Google Sheet as the source — you'd
edit a spreadsheet on your phone at the gym and the site would follow. That's a
change to `app.js` only; the design and the data shape stay exactly as they are.
