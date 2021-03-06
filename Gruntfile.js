'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          requir: 'coffee-script',
        },
        src: ['test/**/*.coffee'],
      },
    },
    release: {
      options: {
        tagName: 'v<%= version %>',
        commitMessage: 'Prepared to release <%= version %>.',
      },
    },
    watch: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.coffee'],
      tasks: ['test'],
    },
  });

  // load all grunt tasks
  require('matchdep').
    filterDev(['grunt-*', '!grunt-cli']).
    forEach(grunt.loadNpmTasks);

  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('test:watch', ['watch']);
  grunt.registerTask('default', ['test']);
};
