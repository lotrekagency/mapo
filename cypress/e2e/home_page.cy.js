describe("The Home Page", () => {
    it("successfully loads", () => {
        cy.visit("/");
        cy.get("code").contains("mapomodule")
        cy.get(".v-icon.mdi.mdi-menu").click()
        cy.get(".v-icon.mdi.mdi-account").should('be.visible')
        cy.get(".v-icon.mdi.mdi-chevron-down").click()
        cy.get(".v-icon.mdi.mdi-forest").should('be.visible')
        cy.get(".v-icon.mdi.mdi-chevron-left").click()
    }); 
});
