# Gorod

A browser city builder in a Soviet / CIS setting. Open `index.html` (no build step).
`sprites.html` shows the sprite sheet.

Controls: left-click to use a tool, right-drag or WASD to pan, wheel to zoom, Space to pause, 1/2/3 for speed, Esc for Inspect.
Loop: build power, roads, then zone R/C/I. Services (schools, hospitals, culture, parks) raise land value so denser buildings grow.

Maps: choose Russian Forest, Steppe, Desert, Mountains or Far North (or random) when starting a city. Seasons change the look and heating/cooling power use. Coal mines, iron quarries, oil fields and farms are generated in the map; industry (or shops, for farms) near them earns more tax.

Epochs (choose at the start of a city): Old Rus & Muscovy, Imperial St. Petersburg, Russian Revival & Industry, Soviet Union, Modern Russia, or Mixed (all eras, with a filter tab per epoch). Old epochs need no electricity. Each sprite file in `sprites/` (`rus.js`, `imp.js`, `rev.js`, `mod.js`, plus the Soviet sets) tags its buildings with an epoch, role and tier; `game/epochs.js` turns those into game stats.
Settings: season length 1-100 minutes (at 1x speed), or lock a season.
