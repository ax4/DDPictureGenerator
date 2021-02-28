const fs = require('fs/promises')
const Photosaic = require('photosaic').default

async function main() {
  var filelist = await (await fs.readdir('cache')).map((e) => {
    return "cache/" + e
  })
  var target
  if (process.env.TARGET_IMAGE) {
    target = "./" + process.env.TARGET_IMAGE.split("/").pop()
  } else {
    target = "./target.jpg"
  }
  var gridNum = 100
  if (process.env.GRID_NUM) {
    try {
      gridNum = parseInt(process.env.GRID_NUM)
    } catch (error) {
      console.error(error)
    }
  }
  var outputWidth = 3000
  if (process.env.OUTPUT_WIDTH) {
    try {
      outputWidth = parseInt(process.env.OUTPUT_WIDTH)
    } catch (error) {
      console.error(error)
    }
  }
  const mosaic = Photosaic(target, filelist, {
    gridNum,
    outputWidth
  })
  const finalMosaicBuffer = await mosaic.build()
  await fs.promises.writeFile(`./finalMosaic.png`, finalMosaicBuffer)
}
main().then(() => {
  console.log("done")
}).catch((e) => {
  console.error(e);
  process.exit(-1)
})