#!/usr/bin/env node

/**
 * Build this package.j
 */

"use strict";

process.chdir(__dirname);

var apeTasking = require('ape-tasking');

apeTasking.runTasks('build', [
    function (callback) {
        require('coz').render([
            ".*.bud",
            "01-minimum-demo/.*.bud",
            "02-separated-template/.*.bud",
            "04-from-programmatic-api/.*.bud",
            "05-exec-bud-itself/.*.bud",
            "06-customize-coz/.*.bud"
        ], callback);
    }
], true);