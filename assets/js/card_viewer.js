// Silence is golden.
// e.g., https://api.scryfall.com/cards/clb/48?format=image&version=normal
(function () {
  console.log('iife')
  var cards = document.getElementsByClassName('card')
  for (var i = 0; i < cards.length; i++) {
    console.log(i)
    var card = cards[i]
    var uri = anchor.href
    console.log(uri)
  }
})()
