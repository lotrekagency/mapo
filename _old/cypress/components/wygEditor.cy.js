import wygEditor from "../../packages/@mapomodule/uikit/components/Form/fields/wygEditor/wygEditor"

describe('<wygEditor />', () => {
  it('renders', () => {
    // see: https://test-utils.vuejs.org/guide/
    cy.mount(wygEditor)
  })
})