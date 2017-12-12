# Icarus
(WIP) Tiling Window Manager for MacOS - written in TypeScript

## Installation
Installing Icarus is quick and easy:

- Download and install [Phoenix](https://github.com/kasper/phoenix). If you have [Homebrew Cask](https://caskroom.github.io/): `brew cask install phoenix`.
- Enable control so that Phoenix can utilise the Accessibility API: `System Preferences > Security & Privacy > Accessibility`
- If you want a release build:
  - (No release is currently availiable, see https://github.com/Braden1996/Icarus/milestone/1)
- If you want a development build:
  - Download and install [Node](https://nodejs.org/). If you have [Homebrew](https://brew.sh/): `brew install node`.
  - Clone the repository into your user home directory, e.g. `cd ~ && git clone https://github.com/Braden1996/Icarus.git`
  - `cd` into newly cloned directory, and run `npm install` to download dependencies.
  - Build the project: `gulp build`, or enter development mode `gulp watch`.
  - Link Phoenix to Icarus build, e.g. `echo "require('~/.icarus/build/build.js');" > ~/.phoenix.js`
  - Start, or restart, Phoenix.
