// Silence is golden.
// e.g., https://api.scryfall.com/cards/clb/48?format=image&version=normal
(function () {
  const content = document.getElementById('content')
  var cards = content.getElementsByClassName('card')
  for (var i = 0; i < cards.length; i++) {
    var card = cards[i]
    var uri = card.href
    console.log(uri)
  }
})()
