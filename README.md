
# Ink Blot Static Site Boilerplate
A boilerplate for static HTML sites by Ink Blot Media Group.

## Installation

This boilerplate requires [Node.js](https://nodejs.org/) v6.9.0+ to run.

### Step 1
![enter image description here](https://help.github.com/assets/images/help/repository/clone-repo-clone-url-button.png)
Download this repo either by downloading the .zip or [using your command line tool to clone this repo.](https://help.github.com/en/articles/cloning-a-repository) (Your command line tool should open you into your root user. Use `cd <folder name>` to enter inside and navigate folders. Use `cd ..` to go up a level. `ls` will list out the items in the folder.)

### Step 2
Open your command line tool and navigate to the repo folder on your local drive, if you aren't already inside that folder. Install the necessary packages from Node into this local folder by entering the following in the command line tool:

```sh
 npm install
```

You should immediately see the necessary packages installed in /node_modules/ folder. You can be sure it worked by entering `npm view gulp version` (it should return at least 4.0.1)

## Automatically building the site and watching files for changes

Once installed, enter command
```sh
gulp
```

Which will activate gulp's tasks and return something like this:
```sh
    [16:24:10] Using gulpfile ~/Sites/<repo folder name>/gulpfile.js
    [16:24:10] Starting 'watch'...
    [16:24:10] Starting 'cleanDist'...
    [16:24:10] Finished 'cleanDist' after 18 ms
    [16:24:10] Starting 'buildScripts'...
    [16:24:10] Starting 'buildTemplates'...
    [16:24:10] Starting 'lintScripts'...
    [16:24:10] Starting 'buildStyles'...
    [16:24:10] Starting 'buildSVGs'...
    [16:24:10] Starting 'optimizeImg'...
    [16:24:10] Starting 'copyFiles'...
    [16:24:10] Finished 'buildSVGs' after 175 ms
    [16:24:10] Finished 'buildScripts' after 193 ms
    [16:24:10] Finished 'lintScripts' after 193 ms
    [16:24:11] Finished 'buildTemplates' after 820 ms
    [16:24:11] Finished 'copyFiles' after 832 ms
    [16:24:14] gulp-imagemin: Minified 13 images (saved 73.3 kB - 21.1%)
    [16:24:14] Finished 'buildStyles' after 3.79 s
    [16:24:14] Finished 'optimizeImg' after 3.79 s
    [16:24:14] Starting 'startServer'...
    [16:24:14] Finished 'startServer' after 62 ms
    [16:24:14] Starting 'watchSource'...
    [16:24:14] Finished 'watchSource' after 2.64 ms
    [16:24:14] Finished 'watch' after 3.88 s
    [Browsersync] **Access URLs:**
    ------------------------------------
    Local: http://localhost:3000
    External: http://192.168.1.7:3000
    ------------------------------------
    UI: http://localhost:3001
    UI External: http://localhost:3001
    ------------------------------------
    [Browsersync] Serving files from: ./dist/

```

Changing and saving a file will cause gulp to run again and will refresh in your browser.
