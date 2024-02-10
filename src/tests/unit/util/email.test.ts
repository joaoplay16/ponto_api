import {
  generatePasswordRedefinitionTemplate,
  generateUserRegisterTemplate,
  isEmail,
} from "../../../util/email"

describe("Test email utilities functions", () => {
  it("Should return html template wiht username and registration link", () => {
    let username = "Jimmy"
    let registrationLink = "http://pontoapi.com/register"

    var userRegistrationTemplate = generateUserRegisterTemplate(
      username,
      registrationLink
    )

    expect(userRegistrationTemplate).to.be.string
    expect(userRegistrationTemplate).to.contains(`Continue Seu Cadastro`)
    expect(userRegistrationTemplate).to.contains(`Olá, ${username}`)
    expect(userRegistrationTemplate).to.contains(registrationLink)
  })

  it("Should return html template with username and password redefinition link", () => {
    let username = "Jimmy"
    let passwordRedefinitionLink = "http://pontoapi.com/change_password"

    var passwordRedefinitionTemplate = generatePasswordRedefinitionTemplate(
      username,
      passwordRedefinitionLink
    )

    expect(passwordRedefinitionTemplate).to.be.string
    expect(passwordRedefinitionTemplate).to.contains(`Redefinição de senha`)
    expect(passwordRedefinitionTemplate).to.contains(`Olá, ${username}`)
    expect(passwordRedefinitionTemplate).to.contains(passwordRedefinitionLink)
  })

  it("Should return true when receive a valid email address", () => {
    expect(isEmail("testemail@xemaple.com")).to.be.true
  })

  it("Should return false when receive an invalid email address", () => {
    expect(isEmail("testemail#xemaple.com")).to.be.false
  })
})
