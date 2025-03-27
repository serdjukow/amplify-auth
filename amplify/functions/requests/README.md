## GraphQL Code generation

### Create Sandbox

- First you need a sandbox to generate the code:

    `npx ampx sandbox --profile Goldweiss`

### Generate Code

- Then you can generate the code:

    `npx ampx generate graphql-client-code --profile Goldweiss --out amplify\functions\requests\graphql`

    You can use `--statement-max-depth 2` to limit the depth of the generated code.

### Delete Fields

- You need to delete following fields to make the generated code work.

<!-- - `createProduct`: `expansion` -->
