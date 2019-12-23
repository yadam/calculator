## Adam's String Calculator

### Deliverables

- This code repo with one commit per stage of the challenge requirements

### Assumptions

- Incorporating development dependencies beyond those included with create-react-app are allowed

### Architectural Overview

This project is broken up into reasonable sections based on the needs of the project. Excessive breakup of code was avoided.

- public
  - This folder contains create-react-app default files
  - Excessive files were removed.
  - Small modifications were made for styling purposes
- src
  - This folder contains the top level components and tests for the project
  - components
    - This folder contains the React components that were created
  - services
    - This folder contains the parser that is used to parse the string and calculate the results. This should be considered the business logic of the project
  - styles
    - This folder contains the CSS Modules for styling the project

### Test Coverage

The unit test coverage of this project is 100% for custom written code. Code that shipped with create-react-app was not tested.
