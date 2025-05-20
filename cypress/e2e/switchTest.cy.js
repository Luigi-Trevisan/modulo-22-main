/// <reference types="cypress" />
const { homePage } = require("../support/pages/home.page");
const loginPage = require("../support/pages/login.page");
const { email, senha } = require("../fixtures/data.json");
const { profilePage } = require("../support/pages/profile.page");

describe("Switch de Testes", () => {
  beforeEach(() => {
    cy.setCookie("ebacStoreVersion", "v2", { domain: "lojaebac.ebaconline.art.br" });
    cy.visit("/");
  });

  const testeAtual = Cypress.env("TESTE_ATUAL");

  switch (testeAtual) {
    case "appActions":
      describe("Teste de Autenticação (appActionsTest.cy.js)", () => {
        it("deve fazer o login com sucesso", () => {
          cy.login(email, senha);
          profilePage.customerName().should("have.text", "trevisan luigi");
        });
      });
      break;

    case "pageObjects":
      describe("Teste de Autenticação (pageObjectsTest.cy.js)", () => {
        it("deve fazer o login com sucesso", () => {
          homePage.openMenu("Account");
          loginPage.login(email, senha);
          homePage.openMenu("Account");
          profilePage.customerName().should("have.text", "trevisan luigi");
        });
      });
      break;

    default:
      it("Nenhum teste foi selecionado", () => {
        cy.log("Configure a variável TESTE_ATUAL para 'appActions' ou 'pageObjects'.");
      });
  }
});
