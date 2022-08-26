describe("The Login Page", () => {
    it("successfully redirect", () => {
        cy.visit("/authexample");
        cy.url().should("include", "/login?redirect=%2Fauthexample");
    });
    it("successfully log in", () => {
        
        defaultIntercept();

        const username = "root";
        const password = "toor";

        cy.visit("/authexample");
        cy.get("input[type=text]").type(username);
        cy.get("input[type=password]").type(`${password}error!{enter}`);
        cy.get('.v-messages__message').should('contain', 'Unable to log in with provided credentials.')
        cy.get("input[type=password]").clear().type(`${password}{enter}`);
        cy.url().should("include", "/authexample");

    });
});

function defaultIntercept() {
    cy.intercept("POST", "/api/auth/login", (req) => {
        const { username, password } = req.body;
        let response;
        if (username == "root" && password == "toor") {
            response = { statusCode: 200, body: { detail: "Logged in" } };
        } else {
            response = { statusCode: 400, body: { non_field_errors: ["Unable to log in with provided credentials."] } };
        }
        req.reply(response);
    });
    cy.intercept("GET", "/api/profiles/me/", { fixture: "root_user.json" });
}
