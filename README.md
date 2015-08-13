coz-examples
============

Examples for coz

[![Build Status][my_travis_badge_url]][my_travis_url]
[![npm version][my_npm_budge_url]][my_npm_url]

+ [01 Minimum Demo](#01-minimum-demo)
+ [02 Separated Template](#02-separated-template)
+ [04 From Programmatic Api](#04-from-programmatic-api)
+ [05 Exec Bud Itself](#05-exec-bud-itself)
+ [06 Customize Coz](#06-customize-coz)


<a name="example"></a>
Examples
--------

<a name="01-minimum-demo"></a>
### 01 Minimum Demo

**[.who-likes-what.txt.bud](./01-minimum-demo/.who-likes-what.txt.bud)**

```javascript
/**
 * .who-likes-what.txt.bud
 * This is a bud file for "examples/01-minimum-demo"
 */

// Exports as a Node.js module.
module.exports = {

    // Template string. By default, parsed by Handlebars engine.
    tmpl: '{{#each members}}Hi, my name is {{@key}}. I like {{this}}.\n{{/each}}',

    // Overwrite when already existing.
    force: true,

    // File path to write out.
    path: 'who-likes-what.txt',

    // File permission.
    mode: '444',

    // Data to render.
    data: {
        members: {
            "Mai": "apple",
            "Tom": "Orange",
            "Rita": "Banana"
        }
    }
};

```
**[who-likes-what.txt](./01-minimum-demo/who-likes-what.txt)**

```
Hi, my name is Mai. I like apple.
Hi, my name is Tom. I like Orange.
Hi, my name is Rita. I like Banana.

```


<a name="02-separated-template"></a>
### 02 Separated Template

**[.what-colors.html.bud](./02-separated-template/.what-colors.html.bud)**

```javascript
/**
 * .what-colors.html.bud
 * This is a bud file for "examples/02-separated-template"
 */

// Exports as a Node.js module.
module.exports = {

    // Template file path. Relative to this bud file.
    tmpl: '.what-colors.html.hbs',

    // Overwrite when already existing.
    force: true,

    // File path to write out.
    path: 'what-colors.html',

    // File permission.
    mode: '444',

    // Data to render.
    data: require('./.what-colors.html.json')
};


```
**[.what-colors.html.hbs](./02-separated-template/.what-colors.html.hbs)**

```html
<table>
    <caption>Colors</caption>
    <tbody>
    {{#each colors}}
        <tr><th>{{@key}}</th>{{this}}</tr>
    {{/each}}
    </tbody>
</table>
```
**[.what-colors.html.json](./02-separated-template/.what-colors.html.json)**

```json
{
  "colors": {
    "banana": "yellow",
    "apple": "red",
    "grape": "purple"
  }
}
```
**[what-colors.html](./02-separated-template/what-colors.html)**

```html
<table>
    <caption>Colors</caption>
    <tbody>
        <tr><th>banana</th>yellow</tr>
        <tr><th>apple</th>red</tr>
        <tr><th>grape</th>purple</tr>
    </tbody>
</table>
```


<a name="04-from-programmatic-api"></a>
### 04 From Programmatic Api

**[.travel-by-what.txt.bud](./04-from-programmatic-api/.travel-by-what.txt.bud)**

```javascript
/**
 * .travel-by-what.txt
 * This is a bud file for "examples/04-from-programmatic-api"
 */

// Exports as a Node.js module.
module.exports = {

    tmpl: '{{#each ways}}Goes {{@key}} by {{this}}.\n{{/each}}',
    force: true,
    mode: '444',
    data: {
        ways: {
            'Tokyo': 'Train',
            'France': 'Airplane'
        }
    }
};


```
**[run_rendering.js](./04-from-programmatic-api/run_rendering.js)**

```javascript
#!/usr/bin/env node

/**
 * run_rendering.js
 * This is an executable file for "examples/04-from-programmatic-api/run_rendering.js"
 */

var coz = require('coz');

// Render .bud files.
coz.render([
    '**/.*.bud'
], function (err) {
    console.log(err ? err : 'Done!');
});
```
**[travel-by-what.txt](./04-from-programmatic-api/travel-by-what.txt)**

```
Goes Tokyo by Train.
Goes France by Airplane.

```


<a name="05-exec-bud-itself"></a>
### 05 Exec Bud Itself

**[.exec-me.txt.bud](./05-exec-bud-itself/.exec-me.txt.bud)**

```javascript
#!/usr/bin/env node

/**
 * .exec-me.txt.bud
 * This is a bud file for "examples/04-exec-bud-itself"
 */

module.exports = {
    force: true,
    mode: '444',
    tmpl: 'This file is rendered from: "{{from}}"',
    data: {
        from: require('path').basename(__filename)
    }
};

// If there is no parent, it means that this module is executed directory.
// e.g., `node .exec-me.txt.bud`
var main = module.parent == null;
if (main) {
    // Render this bud file.
    // `__filename` is Node.js reserved word and contains path of this file.
    require('coz').render(__filename);
}
```
**[exec-me.txt](./05-exec-bud-itself/exec-me.txt)**

```
This file is rendered from: ".exec-me.txt.bud"
```


<a name="06-customize-coz"></a>
### 06 Customize Coz

**[.render-by-custom-cli.txt.bud](./06-customize-coz/.render-by-custom-cli.txt.bud)**

```javascript
/**
 * render-by-custom-cli.txt.bud
 * This is a bud file for "examples/06-customize-coz"
 */

// Bud for coz CLI with custom configuration
module.exports = {
    force: true,
    mode: '444',
    tmpl: 'myCustomTmpl01',
    data: {
        'generator': __filename
    }
};
```
**[.render-with-custom-setup.txt.bud](./06-customize-coz/.render-with-custom-setup.txt.bud)**

```javascript
/**
 * render-with-custom-setup.txt.bud
 * This is a bud file for "examples/06-customize-coz"
 */

// Bud with custom setup
module.exports = {
    force: true,
    mode: '444',
    // Template with using custom helper function.
    tmpl: 'Hey, {{emphasize msg}}',
    engine: 'handlebars',
    // Setup options for handlebars engine.
    setup: {
        // Register custom handlebars helpers.
        helpers: {
            'emphasize': function (txt) {
                return txt.toUpperCase() + '!!!!';
            }
        }
    },
    data: {
        'msg': 'watch out'
    }
};
if (!module.parent) {
    require('coz').render(__filename);
}
```
**[render-by-custom-cli.txt](./06-customize-coz/render-by-custom-cli.txt)**

```
myCustomTmpl01
```
**[render-by-my-custom-engine-01.txt](./06-customize-coz/render-by-my-custom-engine-01.txt)**

```
This is good day to die.
```
**[render-by-my-custom-tmpl-01.json](./06-customize-coz/render-by-my-custom-tmpl-01.json)**

```json
{"generator":"/Users/okuni/projects/coz/docs/examples/06-customize-coz/render-with-custom-tmpl.js","coz is":"wonderful","$$bud":{"cwd":"/Users/okuni/projects/coz/docs/examples/06-customize-coz","path":"/Users/okuni/projects/coz/docs/examples/06-customize-coz/render-by-my-custom-tmpl-01.json"}}
```
**[render-with-custom-engine.js](./06-customize-coz/render-with-custom-engine.js)**

```javascript
#!/usr/bin/env node

/**
 * render-with-custom-engine.js
 * This is an executable file for "examples/06-customize-coz"
 */


var Coz = require('coz').Coz;

// Create a custom coz context.
var coz = new Coz({
    // Define custom engines.
    engines: {
        'myCustomEngine01': {
            // Aliases for this engine.
            // These names also can be used in "engine" property of bud.
            $aliases: [
                'myCustom01'
            ],
            /**
             * Compile template string and create template function.
             * @implements {module:coz/lib/template~Engine.prototype.compile}
             * @param {string} source - Source string to compile.
             * @param {function} callback - Callback when done.
             */
            'compile': function (source, callback) {

                // Define a template function with source.
                // Template function takes a single agument `data` object and returns rendered string.

                /**
                 * Compiled template function
                 * @param {object} data - Data to render with.
                 * @returns {string} - Rendered string.
                 */
                function compiledTemplate(data) {
                    var rendered = String(source);
                    Object.keys(data).forEach(function (key) {
                        rendered = rendered.replace('__' + key + '___', data[key]);
                    });
                    return rendered;
                }

                // Pass the template function to callback.
                var err = null;
                callback(err, compiledTemplate);
            }
        }
    }
});

// Use custom coz context to render.
coz.render({
    force: true,
    mode: '444',
    // Use engine defined above.
    engine: 'myCustomEngine01',
    path: __dirname + '/render-by-my-custom-engine-01.txt',
    // Template source string to compile with the custom engine.
    tmpl: 'This is good day to __goodToDo___.',
    // Data to passed to compiled template function.
    data: {
        goodToDo: 'die'
    }
}, function (err) {
    console.log('Compile done with custom engine');
});
```
**[render-with-custom-setup.txt](./06-customize-coz/render-with-custom-setup.txt)**

```
Hey, WATCH OUT!!!!
```
**[render-with-custom-tmpl.js](./06-customize-coz/render-with-custom-tmpl.js)**

```javascript
#!/usr/bin/env node

/**
 * render-with-custom-tmpl.js
 * This is an executable file for "examples/06-customize-coz"
 */


var Coz = require('coz').Coz;

// Create a custom coz context.
var coz = new Coz({
    // Define custom templates.
    tmpls: {
        // Custom template to generate single line json string.
        singleLineJson: function (data) {
            return JSON.stringify(data, null, 0);
        }
    }
});

coz.render({
    force: true,
    mode: '444',
    path: 'render-by-my-custom-tmpl-01.json',
    // Use custom tmpl
    tmpl: 'singleLineJson',
    // Data to pass custom tmpl.
    data: {
        'generator': __filename,
        'coz is': 'wonderful'
    }
}, function (err) {
    console.log('Compile done with custom tmpl.');
});
```
**[use-custom-config-from-cli.config.js](./06-customize-coz/use-custom-config-from-cli.config.js)**

```javascript
/**
 * use-custom-config-from-cli.config.js
 * This is a CLI configuration file for "examples/06-customize-coz"
 */

// Custom configuration for CLI
module.exports = {
    tmpls: {
        // Custom template function.
        myCustomTmpl01: function (data) {
            return JSON.stringify(data, null, 2);
        }
    }
};
```
**[use-custom-config-from-cli.sh](./06-customize-coz/use-custom-config-from-cli.sh)**

```
#!/bin/bash

###
# use-custom-config-from-cli.sh
# This is a CLI shell file for "examples/06-customize-coz"
##

HERE=$(dirname $0)

cd ${HERE}

# Render bud with custom configuration.
coz render ".render-by-custom-cli.txt.bud" -c "use-custom-config-from-cli.config.js"
```




<a name="example"></a>
Links
--------

+ [coz](https://github.com/coz-repo/coz)



[my_travis_url]: http://travis-ci.org/coz-repo/coz-examples
[my_npm_url]: http://www.npmjs.org/package/coz-examples
[my_npm_budge_url]: http://img.shields.io/npm/v/coz-examples.svg?style=flat
