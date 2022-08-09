describe("DELETE / characters/id", () => {
  const tochaHumana = {
    name: "Jhonny Storm",
    alias: "Tocha Humana",
    team: ["Quarteto Fantástico"],
    active: true,
  };
  
  context("Quando tenho um personagem cadastrado", () => {
    before(function () {
      cy.postCharacter(tochaHumana).then(function (response) {
        Cypress.env("characterId", response.body.character_id);
      });
    });

    it("Deve remover um personagem por Id", () => {
      const id = Cypress.env("characterId");
      cy.deleteCharactersById(id).then(function (response) {
        expect(response.status).to.eql(204);
      });
    });

    after(function () {
      const id = Cypress.env("characterId");
      cy.deleteCharactersById(id).then(function (response) {
        expect(response.status).to.eql(404);
      });
    });

    it("Deve retornar 404 ao remover por Id não cadastrado ", () => {
      const id = "62f1b2f63a13ab28c004b7d8";
      cy.getCharactersById(id).then(function (response) {
        expect(response.status).to.eql(404);
      });
    });
  });
});
