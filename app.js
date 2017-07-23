const path = require('path')
const Ginkgo = require('./ginkgo')

const configure = {
  directory: {
    APP_ROOT: path.join(__dirname, 'examples')
  }
}

const ginkgo = new Ginkgo(configure)

const app = ginkgo.getApp()

app.listen(8080)