# ordernizer-webapp
Angular Web App for customer interaction with the Ordernizer
https://www.ordernizer.org/

To run this app locally you will need to install angular cli
"npm install -g @angular/cli"

Then run 
"npm install"

And you will know if it worked if you can sucesfully run
"npm run build"

Pipeline:
the build script is .github\workflows\main.yml
It triggers on every push

The steps are fairly readable but we are doing the following on one of github's servers:
1. Clones github code
2. Downloads npm on the server
3. Npm installs dependencies from package.json
4. Npm builds our code
5. Syncs our code to our existing s3 bucket
6. Updates the cloudfront distribution that hosts our website public

we get like 2000 minutes a month for free on github actions
similar to the verizon call or text plan from 2011
