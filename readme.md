# Boilerplate for AWS Lambda with Typescript, Jest, Webpack

This is the boilerplate I used for all my lambda typescript projects. It uses makefile to custom build each lambda handler using webpack (bundled, minimized). This setup improves both the cold start and warm start time because each function only include what is necessary to run instead of all node module packages that are depended by other lambda functions in the app. I have not yet able to get AWS ToolKit testing feature to work but Jest is functional.

This repo is accumulation of all the things I have done wrong in the past. Hope it helps your setup too! Any comments/suggestions are very welcome.

> Note: I tried building a separate dependency layer with all the node modules but that does not improve the performance much (it slowed down in some situations). If you know how to make lambda run faster, pls drop me a note. Much appreciated.

To use the boilerplate:

- clone the repo
- npm install
- start coding, testing, building and deploying

To test:

- write tests
- `npm run test`, `npx jest`, or use vscode debugger (two built-in launch tasks for jest are defined in `.vscode/launch.json`)
- `sam local invoke <function name> -e <event>` will invoke the function locally using lambda's docker image. Make sure the function is built using `sam build` command first. See sam's local invoke documentation for more info.
  ```shell
  sam build
  sam local invoke SampleFunction \
    -e ./src/__tests__/events/event-ok.json
  ```

To build:

- `npm run build`: local build using `tsc`, all transpiled code are in `./build`
- `sam build`: this is necessary if you want to use `sam deploy`. It uses the custom build process (i.e. make and webpack) to create the minified bundle in `.aws-sam/build/<function name>` folder

To deploy:

- `sam deploy --guided`

To create new lambda functions:

- write functions in `src/handlers` directory
- write tests in `src/__tests__` directory
- update `Makefile` to include the function

### Note on build process using Makefile

- in `template.yml`, the `SampleFunction` specifies to use makefile for the build process instead of sam's built-in method (esbuild?)
- each build target in the makefile contains instructions on building _one specific lambda function_ (see the `LAMBDA_PATH` and `LAMBDA_FILE` env variables), which will trigger the common build process using webpack to perform the build
- a make target is needed for every lambda function that are defined in the sam's template
- make's target name for each lambda function must be in the format of: `build-<resource logical id>` (e.g. `build-SampleFunction`: the word _SampleFunction_ is the _logical resource id_ defined in the template)

### Note on tsconfig

- webpack uses an extended version of `tsconfig.sam.json` to include only the handler specified in each make target (see the `build-lambda-function` target in the Makefile)
- jest uses the `tsconfig.json` version which includes everything in the `src` directory
