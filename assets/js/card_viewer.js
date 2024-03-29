function card_to_image (href) {
  // e.g.,
  //   https://scryfall.com/card/clb/48/veteran-soldier ->
  //   https://api.scryfall.com/cards/clb/48?format=image&version=normal
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
    FloatingUIDOM.computePosition(element, tooltip, {
      placement: 'right',
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
    ['pointerenter', show_tooltip],
    ['pointerleave', hide_tooltip],
  ].forEach(([event, listener]) => {
    element.addEventListener(event, listener)
  })
}

(function () {
  var cards = content.getElementsByClassName('card')
  for (var i = 0; i < cards.length; i++) {
    var card = cards[i]
    var image = card_to_image(card.href)
    if (image === null) continue
    var tooltip_id = 'tooltip_' + i
    card.insertAdjacentHTML('afterend', '<div id="' + tooltip_id + '" class="tooltip"><img src="' + image + '" /></div>')
    var tooltip = document.getElementById(tooltip_id)
    attach_tooltip_event_handlers(card, tooltip, image)
  }
})()
