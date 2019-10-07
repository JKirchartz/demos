Parent/Child package.json test
==============================

This module is a proof of concept, to investigate how a child module can retreive the package.json information of the root project.

The index.js in the root directory only calls the function of the child module. The child module in turn determines the root directory's path and loads the package.json file it finds there. The child module then modifies the data found in the parent's package.json, just to prove that that's a thing you can do here.

## structure

    root ->
      package.json // contains a hidden message
      index.js // calls the child module's functionality
      child-module ->
          package.json // sets up a module
          index.js // reports on & modifies the root project's hidden message

## expected output

    This is a message from the parent package.json
    This is a message from the child module, modified from the message in parent package.json