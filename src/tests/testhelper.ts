import * as sinon from "sinon"
import * as chai from "chai"
import  sinonChai from "sinon-chai"

declare global {
  var expect: Chai.ExpectStatic
}

chai.use(sinonChai)

global.expect = chai.expect
global.sinon = sinon