/*
 * This simple bot will help you find any block
 */
const mineflayer = require('mineflayer')

const { performance } = require('perf_hooks')

if (process.argv.length < 4 || process.argv.length > 6) {
  console.log('Usage : node blockfinder.js <host> <port> [<name>] [<password>]')
  process.exit(1)
}

const bot = mineflayer.createBot({
  host: process.argv[2],
  port: parseInt(process.argv[3]),
  username: process.argv[4] ? process.argv[4] : 'finder',
  password: process.argv[5]
})

bot.on('chat', (username, message) => {
  if (username === bot.username) return

  const mcData = require('minecraft-data')(bot.version)

  if (message.startsWith('find')) {
    const name = message.split(' ')[1]
    const ids = [mcData.blocksByName[name].id]

    const startTime = performance.now()
    const blocks = bot.findBlocks({ matching: ids, maxDistance: 128, minCount: 10 })
    const time = (performance.now() - startTime).toFixed(2)

    bot.chat(`I found ${blocks.length} ${name} blocks in ${time} ms`)
  }
})
