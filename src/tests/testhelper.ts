import * as sinon from "sinon"
import * as chai from "chai"
import  sinonChai from "sinon-chai"
import  chaiAsPromised from "chai-as-promised"

declare global {
  var expect: Chai.ExpectStatic
}

chai.use(sinonChai)
chai.use(chaiAsPromised)

global.expect = chai.expect
global.sinon = sinon