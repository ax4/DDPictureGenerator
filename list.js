const axios = require('axios').default
const fs = require('fs/promises')
const packageJson = require('./package.json')

async function main() {
  let vtblist = (await axios.get("http://api.vtbs.moe/v1/fullInfo", {
    headers: {
      "user-agent": "DDPictureGenerator " + packageJson.version
    },
    responseType: "json"
  })).data
  vtblist = vtblist.filter((e) => {
    // 排除 Hololive
    if (e.vdb && e.vdb.group && e.vdb.group === '40e82f4e-40d8-539c-87c8-ed17c6ea519f') {
      return false
    }
    // 排除 Hololive EN
    if (e.vdb && e.vdb.group && e.vdb.group === 'd406e5da-ef7d-5e0f-9439-264188944758') {
      return false
    }
    // 排除无头像
    if (!e.face || e.face === 'http://i0.hdslb.com/bfs/face/member/noface.jpg') {
      return false
    }
    return true
  })
  facelist = vtblist.map((e) => {
    return e.face
  }).sort()
  await fs.mkdir('tmp', { recursive: true })
  await fs.writeFile('tmp/face.list', facelist.join("\n"))
  debugger

}
main()