Cypress.Commands.add("setToken", function () {
  cy.api({
    method: "POST",
    url: "/sessions",
    body: {
      email: "jonasdominguini@qacademy.io",
      password: "pwd123",
    },
  }).then(function (response) {
    expect(response.status).to.eql(200);
    cy.log(response.body.token);
    Cypress.env("token", response.body.token);
  });
});

Cypress.Commands.add("back2ThePast", function () {
  cy.api({
    method: "DELETE",
    url: "/back2thepast/62eeb6a2fb67220016584560",
  }).then(function (response) {
    expect(response.status).to.eql(200);
  });
});

// POST requisição que testa o cadastro de personagens
Cypress.Commands.add("postCharacter", function (payload) {
  cy.api({
    method: "POST",
    url: "/characters",
    body: payload,
    headers: {
      Authorization: Cypress.env("token"),
    },
    failOnStatusCode: false,
  }).then(function (response) {
    return response;
  });
});

// GET requisição que testa a obtenção de personagens.
Cypress.Commands.add("getCharacters", function (payload) {
  cy.api({
    method: "GET",
    url: "/characters",
    body: payload,
    headers: {
      Authorization: Cypress.env("token"),
    },
    failOnStatusCode: false,
  }).then(function (response) {
    return response;
  });
});

Cypress.Commands.add("searchCharacters", function (characterName) {
  cy.api({
    method: "GET",
    url: "/characters",
    qs: { name: characterName },
    headers: {
      Authorization: Cypress.env("token"),
    },
    failOnStatusCode: false,
  }).then(function (response) {
    return response;
  });
});

// Criando personagens
Cypress.Commands.add("populateCharacters", function (characters) {
  characters.forEach(function (c) {
    cy.postCharacter(c);
  });
});

// Get procura por ID.
Cypress.Commands.add("getCharactersById", function (characterId) {
  cy.api({
    method: "GET",
    url: "/characters/" + characterId,
    headers: {
      Authorization: Cypress.env("token"),
    },
    failOnStatusCode: false,
  }).then(function (response) {
    return response;
  });
});

Cypress.Commands.add("deleteCharactersById", function (characterId) {
    cy.api({
      method: "DELETE",
      url: "/characters/" + characterId,
      headers: {
        Authorization: Cypress.env("token"),
      },
      failOnStatusCode: false,
    }).then(function (response) {
      return response;
    });
  });