/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

var main = new UI.Card({
  title: 'cerkit.com Daily Verse',
  icon: 'ICON_BIBLE',
  subtitle: 'NET Version',
  body: 'Press any button.'
});

main.show();

function getVerse() {
  ajax(
  {
    url: 'https://www.biblegateway.com/votd/get/?format=json',
    type: 'json'
  },
  function(data, status, request) {
    getCleanVerse(data.votd.reference);
  },
  function(error, status, request) {
    console.log('The ajax request failed: ' + error);
  }
);
}

// call another web service to get a non-HTML version, since the previous API uses HTML escape characters
function getCleanVerse(bookChapterVerse) {
  ajax(
  {
    url: 'http://labs.bible.org/api/?passage=' + bookChapterVerse + '&type=json',
    type: 'json'
  },
  function(data, status, request) {
    showVerse(bookChapterVerse, data[0].text);
  },
  function(error, status, request) {
    console.log('The ajax request failed: ' + error);
  });
}

function showVerse(bookChapterVerse, verse) {
  var wind = new UI.Window({
    fullscreen: true,
  });
  var chapterVerseText = new UI.Text({
    position: new Vector2(0, 0),
    size: new Vector2(144, 30),
    font: 'gothic-18-bold',
    text: bookChapterVerse,
    textAlign: 'center'
  });
  
  var verseText = new UI.Text({
    position: new Vector2(0, 30),
    size: new Vector2(144, 100),
    font: 'gothic-14',
    text: verse,
    textAlign: 'left'
  });
  
  
  wind.add(chapterVerseText);
  wind.add(verseText);
  wind.show();
}

main.on('click', 'select', function(e) {
  getVerse();
});

main.on('click', 'up', function(e) {
  getVerse();
});

main.on('click', 'down', function(e) {
  getVerse();
});



/*

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window({
    fullscreen: true,
  });
  var textfield = new UI.Text({
    position: new Vector2(0, 65),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});

*/