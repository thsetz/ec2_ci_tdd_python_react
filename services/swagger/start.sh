#!/bin/bash
set -x

if [ $URL != "**None**" ]; then
  sed -i -e 's@https://petstore.swagger.io/v2/swagger.json@'"$URL"'@g' /usr/share/nginx/html/index.html
fi

echo "HURRA2"
exec nginx -g 'daemon off;'

set +x
