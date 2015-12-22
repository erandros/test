# Viper site

1. [Sites](#sites)  
2. [Environments](#environments)  

---
# Sites
## Live site

[![build status](https://git.thegeck.com/ci/projects/6/status.png?ref=master)](https://git.thegeck.com/ci/projects/6?ref=master)

* https://viper.fitmentgroup.com

## Test site

[![build status](https://git.thegeck.com/ci/projects/6/status.png?ref=test)](https://git.thegeck.com/ci/projects/6?ref=test)

* https://vipertest.fitmentgroup.com

## Dev site

[![build status](https://git.thegeck.com/ci/projects/5/status.png)](https://git.thegeck.com/ci/projects/5)

* https://viperdev.fitmentgroup.com

# Environments

## How to reference local ViperAPi
To reference a locally running ViperApi at port 50558, 
add the field `LOCAL_API` with value true to `env.json`  

## How to set the environment of the site
The site's environment (with `Production`, `Staging` and `Development` as possible values)
is determined by the value of the `ASPNET_ENV` field in `/src/viper/env.json`. 

## Why do we use this `env.json`
ASP NET 5 lets you configure this by setting `ASPNET_ENV` 
as a Windows environment variable, or setting it in the project properties at Visual Studio.  
But we didn't use this, since we needed to set environments for different sites running on the same machine,
but ASP NET 5 just lets you set one environment per machine.  
So, instead we wrote our deploy scripts to write the `env.json` file with the appropiate environment. For example:
the production deploy script, creates the `env.json` with `{ "ASPNET_ENV": "Production" }`
