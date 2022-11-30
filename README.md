# Overview

An interface where a user can annotate a set of images, and then view the results of their annotation. A user should be able to select image(s) they want to annotate, label each annotation, and have the ability to update or edit once completed.

## Installation
1. Clone repo
2. ``` npm install  ```
3. ```npm run start ```

## Technologies & Libraries

The underlying technology that it used for this project is JavaScript. The frameworks that are used:

1. User interface: [React.js][df1]
2. State Managemnt: [Redux-Sagas][df2]
3. UI/UX: [Semantic React][df3]
4. Polygons: [Kanva.js][df4]
5. Redux Logic: [Redux Toolkit][df5]
6. Library for Routing: [React-Router][df6]
7. Redux logging tool: [Redux Logger][df7]
8. Testing End-to-End: [Cypress][df8]
9. Unit testing: [Jest][df9]

## Application Functionalities

**Upload Images:**
The user can upload images in the application and he can choose one of them in order to edit.

**Reset:**
We can reset all the polygons from the image.

![reset](/reset.png)


**Submit:**
When we submit the new polygons we have two options either to continue with the next image if it's exist or return back to the Home page.

![submit](/submit.png)

**Undo:**
Undo the previous action on polygon.

## Testing

For End-to-End testing we used the Cypress library.
In order to run the tests run the command: ``` npx cypress open ```.
In Cypress suite you can find the e2e.cy.js file for the End-to-End testing.


For unit testing we used Jest.io, in order to run the tests run the command: ``` npm run test ```








[df1]: <https://reactjs.org/>
[df2]: <https://redux-saga.js.org/>
[df3]: <https://react.semantic-ui.com/>
[df4]: <https://konvajs.org/>
[df5]: <https://redux-toolkit.js.org/>
[df6]: <https://www.npmjs.com/package/react-router>
[df7]: <https://github.com/LogRocket/redux-logger#readme>
[df8]: <https://www.cypress.io/>
[df9]: <https://jestjs.io/>
