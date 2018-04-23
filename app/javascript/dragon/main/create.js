import { keydownEventHandlers } from "./event_handlers"

export default function create() {
  const self = this
  this._map = this.make.tilemap({key: "map"})
  const background = this._map.addTilesetImage("background")
  this._map.createDynamicLayer("World", background, 0, 0);

  const player = createPlayer(this)

  prepareCamera(this)

  window.document.onkeydown = event => {
    const h = keydownEventHandlers[event.key]
    if (h) h(self, event)
    else console.log(event.key)
  }
}

function createPlayer(game) {
  const player = game.add.sprite(0, 0, "player")

  player.setOrigin(0, 0)
  player.setFrame(0)
  player._x = 1
  player._y = 1

  game._player = player

  return player
}

function prepareCamera(game) {
  game.cameras.main.setBounds(0, 0,
    game._map.widthInPixels, game._map.heightInPixels);
  game.cameras.main.startFollow(game._player);
}