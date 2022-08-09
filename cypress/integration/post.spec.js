describe("POST /characters", () => {
 

  it("Deve cadastrar um personagem", () => {
    const characters = {
      name: "Wanda Maximoff1",
      alias: "Feiticeira escarlate1",
      team: ["vingadores"],
      active: true,
    };

    cy.api({
      method: "post",
      url: "characters",
      headers: {
        Authorization: Cypress.env("token"),
      },
      body: characters,
      
    }).then(function (response) {
      expect(response.status).to.eql(201);
      cy.log(response.body.character_id);
      expect(response.body.character_id.length).to.eql(24);
    });
  });
});
