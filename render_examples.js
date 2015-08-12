#!/usr/bin/env node

require('coz').render([
    "01-minimum-demo/.*.bud",
    "02-separated-template/.*.bud",
    "04-from-programmatic-api/.*.bud",
    "05-exec-bud-itself/.*.bud",
    "06-customize-coz/.*.bud"
], function (err) {
    if (err) {
        console.error(err);
    }
});