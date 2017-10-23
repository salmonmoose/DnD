module.exports = function (grunt) {

  var game = {
    modifiers: grunt.file.readJSON('data/modifiers.json'),
    classes: {
      "Cleric": grunt.file.readJSON('data/cleric.json')
    },
    spells: {
      "cantrips": grunt.file.readJSON('data/cantrips.json'),
      "level_1": grunt.file.readJSON('data/level_1.json')
    }
  };

  grunt.initConfig({
    metalsmith: {
      adrik: {
        src: 'contents',
        dest: 'dist/adrik',
        options: {
          metadata: {},
          plugins: {
            'metalsmith-sass': {
              outputDir: 'css',
              sourceMap: true,
              sourceMapContents: true
            },

            'metalsmith-pug': {
              pretty: true,
              locals: {
                title: 'Adrik Ungart',
                character: grunt.file.readJSON('adrik.json'),
                game: game
              }
            }
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-metalsmith');

  grunt.registerTask('default', [
    'metalsmith'
  ]);
}