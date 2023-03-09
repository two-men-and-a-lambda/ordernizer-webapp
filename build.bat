set appname=ordernizer
set bucket=s3://ordernizer.org
set distribution=E1JGWJYOAW71QO

npm run build

aws --profile default s3 sync "./dist/%appname%" "%bucket%" --cache-control "max-age=0, must-revalidate"
aws --profile default cloudfront create-invalidation --distribution-id %distribution% --paths "/*"