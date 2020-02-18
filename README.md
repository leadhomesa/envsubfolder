## envsubfolder

A cli utility that walks a folder recursively, replacing any environment variables in all the HTML files it finds. 

### Usage

Install this package globally using:

`npm install -g @leadhome/envsubfolder`

You should then be able to use it like this:

`envsubfolder <target>`

### What it's doing

This utility starts by making a backup of the `<target>` folder at `<target>_bak`. For example, if you run `envsubfolder app`, this utility will make a backup of the `app` folder to `app_bak`. If this backup folder already exists, it will instead restore the backup folder `app_bak` to `app`.

This utility will then look for any files ending in `.html` recusively, replacing any instance of `${<env_var>}` with the value of the environment variable called `<env_var>`. For example, this utility will replace any instance of `${VERSION}` with the value of the environment variable `VERSION`. 

### Purpose

Based on https://12factor.net/, it is considered best practice to build your application artifact independent of it's runtime configuration. This means building an artifact that does not have any configuration "backed in", but rather that accepts configuration at runtime, specifically in the form of environment variables. This affords one the flexibility to use the exact same artifact to run the application in any environment with any conbination of configuration. 

This utility is aimed to help achieve this behaviour for UI projects. 
