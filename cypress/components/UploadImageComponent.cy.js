import Products from '../../src/features/uploadImages/UploadImageComponent';
// import { store } from '../../src/app/store';
// import { Provider } from 'react-redux';
describe('<Upload Image Component>', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.mount( <Products />);
    })
    it('Upload button', () => {
        cy.get('[data-cy=upload-image-button]').should('exist');
    })
})