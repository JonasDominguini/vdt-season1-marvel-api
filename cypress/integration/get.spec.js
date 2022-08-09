describe("GET / characters", () => {
  const characters = [
    {
      name: "Charles Xavier",
      alias: "Professor X",
      team: ["x-men"],
      active: true,
    },
    {
      name: "Logan",
      alias: "Wolverine",
      team: ["x-men"],
      active: true,
    },

    {
      name: "Peter Parker",
      alias: "Homem aranha",
      team: ["novos vingadores"],
      active: true,
    },
  ];
  before(() => {
    cy.populateCharacters(characters);
  });

  it("Deve retornar uma lista de personagens", () => {
    cy.getCharacters().then(function (response) {
      expect(response.status).to.eql(200);
      expect(response.body).to.be.a("array");
      expect(response.body.length).greaterThan(0);
    });
  });

  it("Deve buscar personagem por nome", () => {
    cy.searchCharacters("Logan").then(function (response) {
      expect(response.status).to.eql(200);
      expect(response.body.length).to.eql(1);
      expect(response.body[0].alias).to.eql("Wolverine");
      expect(response.body[0].team).to.eql(["x-men"]);
      expect(response.body[0].active).to.eql(true);
    });
  });
});

describe("GET / characters/id", () => {
  const tonyStark = {
    name: "Tony Stark",
    alias: "Homem de ferro",
    team: ["vingadores"],
    active: true,
  }; 

  context("Quando tenho um personagem cadastrado", () => {
    before(() => {      
      cy.postCharacter(tonyStark).then(function (response) {
        Cypress.env("characterId", response.body.character_id);
      });
    });

    it("Deve buscar o personagem pelo ID", () => {
      const id = Cypress.env("characterId");
      cy.getCharactersById(id).then(function (response) {
        expect(response.status).to.eql(200);
        expect(response.body.alias).to.eql("Homem de ferro");
        expect(response.body.team).to.eql(["vingadores"]);
        expect(response.body.active).to.eql(true);
      });
    });

    it("Deve retornar 404 ao buscar por Id não cadastrado ", () => {
      const id = "62f1b2f63a13ab28c004b7d8";
      cy.getCharactersById(id).then(function (response) {
        expect(response.status).to.eql(404);
      });
    });
  });
});
