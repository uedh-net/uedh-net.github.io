function card_to_image (href) {
  // e.g.,
  // https://scryfall.com/card/clb/48/veteran-soldier ->
  // https://api.scryfall.com/cards/clb/48?format=image&version=normal
  // remove 'https://'
  if (href.slice(0, 8) !== 'https://') return
  href = href.slice(8, href.length)
  // add 'api.'
  href = 'api.' + href
  // 'card' -> 'cards'
  var parts = href.split('/')
  if (parts[1] !== 'card') return
  parts[1] = 'cards'
  // remove name
  parts.pop()
  href = parts.join('/')
  // add params
  href = href + '?format=image&version=png'
  // add 'https://'
  href = 'https://' + href
  return href
}

function show_on_hover (viewer, card, image) {
  card.addEventListener('mouseover', () => {
    viewer.innerHTML = '<img src="' + image + '" />'
    FloatingUIDOM.computePosition(card, viewer).then(({x, y}) => {
      Object.assign(tooltip.style, {
        left: `${x}px`,
        top: `${y}px`,
      })
    })
  })
}

(function () {
  const viewer = document.getElementById('card_viewer')
  const content = document.getElementById('content')
  var cards = content.getElementsByClassName('card')
  for (var i = 0; i < cards.length; i++) {
    var card = cards[i]
    var href = card.href
    var image = card_to_image(href)
    if (image === null) continue
    show_on_hover(viewer, card, image)
  }
})()
