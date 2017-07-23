const path = require('path')
const Ginkgo = require('./ginkgo')

const configure = {
  directory: {
    APP_ROOT: path.join(__dirname, 'examples')
  }
}

const ginkgo = new Ginkgo(configure)

ginkgo.run(8080)