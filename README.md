# Sudoku React
A React based Sudoku generator using the wavefunction collapse algorithm

## Features
* Cross-platform
* Support for 4x4, 9x9 and 16x16 Sudokus
* Manual selection ("collapsing") of individual cells
* Statically servable (e.g. via GH Pages) due to being a 100% client side app

## Known issues
* Currently the algorithm itself is not fully implemented, hence the "Solve" button does nothing
* I didn't manage to get exporting the SVG from the DOM working, hence the "Export" entries do nothing

## How to build
The project is managed by Vite. Clone the project and run
```console
npm install
npm run build
```
to install the dependencies and generate statically servable files. You can find them in the `build` directory.

## How to deploy
How to serve them is up to you. You can use any static file hosting service you like.
### Any static file hoster
Simply download the files from the `gh-pages` branch to get the latest version.
### GitHub Pages
For GitHub Pages use
```console
npm run deploy
```
after your run the **build steps** above to directly deploy the to a fresh `gh-pages` branch with no commit history.
> :warning: **The commit history of the `gh-pages` branch will be permanently deleted**.
This is the default behaviour of the `gh-pages` cli command. For more info have a look at [the official repository](https://github.com/tschaub/gh-pages).

To deploy with a custom domain (i.e. writing a CNAME file) run with an additional flag:
```console
npm run deploy -- --cname sudoku.example.com
```
Please mind the `--` before setting the flag. To see a full list of available flags have a look at the help message of the `gh-pages` cli tool:
```console
npx gh-pages --help
```
For more info have a look at [the official repository](https://github.com/tschaub/gh-pages).
