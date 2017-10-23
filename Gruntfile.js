module.exports = function (grunt) {

  var game = {
    modifiers: grunt.file.readJSON('data/modifiers.json'),
    races: {
      "Dwarf": grunt.file.readJSON('data/dwarf.json')
    },
    classes: {
      "Cleric": grunt.file.readJSON('data/cleric.json')
    },
    spells: {
      "cantrips": grunt.file.readJSON('data/cantrips.json'),
      "level_1": grunt.file.readJSON('data/level_1.json'),
      "level_2": grunt.file.readJSON('data/level_2.json')
    },
    proficiencies: grunt.file.readJSON('data/proficiencies.json')
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
                character: grunt.file.readJSON('adrik.json'),
                game: game
              }
            }
          }
        }
      }
    },

    copy: {
      fonts: {
        files: [
          {
            expand: true,
            src: [
              'node_modules/components-font-awesome/fonts/*',
              'node_modules/rpg-awesome/fonts/*'
            ],
            dest: 'contents/fonts/',
            filter: 'isFile',
            flatten: true
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-metalsmith');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', [
    'copy',
    'metalsmith'
  ]);
}