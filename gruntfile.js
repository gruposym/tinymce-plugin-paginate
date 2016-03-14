var shell = require("shelljs");

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
      jshint: {
        gruntfile: ['gruntfile.js'],
        js: {
          options: {
            node: true,
            browser: true,
            browserify: true,
            globals: {
              '$': true,
              'jQuery': true,
              'tinymce': true
            }
          },
          files: {
            src: ['src/**/*.js']
          }
        }
      },
      browserify: {
        dist: {
          src: 'index.js',
          dest: 'plugin.js'
        }
      },
      uglify: {
        dist: {
          files: {
            'plugin.min.js': ['plugin.js']
          }
        }
      },
      watch: {
        gruntfile: {
          files: 'Gruntfile.js',
          tasks: ['jshint:gruntfile'],
        },
        js: {
          files: ['src/**/*.js'],
          tasks: ['jshint:js'],
        }
      },
      bump: {
        options: {
          files: ['package.json','bower.json'],
          updateConfigs: [],
          commit: true,
          commitMessage: 'Release v%VERSION%',
          commitFiles: ['package.json','bower.json'],
          createTag: true,
          tagName: 'v%VERSION%',
          tagMessage: 'Version %VERSION%',
          push: true,
          pushTo: 'origin',
          gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
          globalReplace: false,
          prereleaseName: false,
          regExp: false
        }
      },
    });

    grunt.registerTask('jsdoc', function(){
      shell.exec('npm run jsdoc');
    });
    grunt.registerTask('default', ['browserify','jshint:js','uglify','jsdoc','watch']);
};
