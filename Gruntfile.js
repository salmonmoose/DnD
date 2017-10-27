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
      "level_2": grunt.file.readJSON('data/level_2.json'),
      "level_3": grunt.file.readJSON('data/level_3.json'),
      "level_4": grunt.file.readJSON('data/level_4.json'),
      "level_5": grunt.file.readJSON('data/level_5.json'),
      "level_6": grunt.file.readJSON('data/level_6.json'),
      "level_7": grunt.file.readJSON('data/level_7.json'),
      "level_8": grunt.file.readJSON('data/level_8.json'),
      "level_9": grunt.file.readJSON('data/level_9.json')
    },
    weapons: grunt.file.readJSON('data/weapons.json'),
    armor: grunt.file.readJSON('data/armor.json'),
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