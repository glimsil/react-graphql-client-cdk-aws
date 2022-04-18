# react-graphql-client-cdk-aws
This is an example of graphql+appsync client with react, using AWS amplify.

Requirements:
 - Node.js
 - CDK
 - AWS CLI

# Setup
First, setup you aws environment running:

```
    aws configure
```
You should set up your User Access Key / Secret and region.

Then you need an appsync deployment. You can follow the example here: https://github.com/glimsil/appsync-graphql-cdk-aws

Set up the endpoint and credentials in app/src/App.tsx

To run the application locally, you can go to `app` folder and run:
```
    npm start
```

The application will be served on localhost:3000

# Deploying
In the first time you should run:
```
    cdk bootstrap # You only have to run it once
```   

Then, you need to build your react app on `app` folder, running:

```
    npm run build
```

After building the app, build and compile the TS infra component on `infra` folder, running:
```
    npm run build
```   

To deploy the app run (on `infra` folder):
```
    cdk deploy --require-approval never
```

The app bundles will be deployed to an s3 bucket. This app will be served by CloudFront. A domain will be created (you can get it from AWS console - Cloud front page) in the following format: `xxxxxxx.cloudfront.net`

To destroy the stack, run:

```
    cdk destroy
```