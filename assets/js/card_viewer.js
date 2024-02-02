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

function attach_tooltip_event_handlers (element, tooltip, image) {
  function update_tooltip() {
    tooltip.innerHTML = '<img src="' + image + '" />'
    FloatingUIDOM.computePosition(element, tooltip, {
      // placement: 'top',
      middleware: [FloatingUIDOM.flip(), FloatingUIDOM.shift()],
    }).then(({x, y}) => {
      Object.assign(tooltip.style, {
        left: `${x}px`,
        top: `${y}px`,
      })
    })
  }

  function show_tooltip() {
    tooltip.style.display = 'block'
    update_tooltip()
  }
   
  function hide_tooltip() {
    tooltip.style.display = ''
  }

  [
    ['mouseenter', show_tooltip],
    ['mouseleave', hide_tooltip],
    ['focus', show_tooltip],
    ['blur', hide_tooltip],
  ].forEach(([event, listener]) => {
    element.addEventListener(event, listener)
  })
}

(function () {
  const viewer = document.getElementById('card_viewer')
  var cards = content.getElementsByClassName('card')
  for (var i = 0; i < cards.length; i++) {
    var card = cards[i]
    var href = card.href
    var image = card_to_image(href)
    if (image === null) continue
    attach_tooltip_event_handlers(card, viewer, image)
  }
})()
