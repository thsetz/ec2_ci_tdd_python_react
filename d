#!/usr/bin/env bash
set -e
set -x
eval $(docker-machine env -u)
export REACT_APP_USERS_SERVICE_URL=http://localhost
docker-compose up -d --build
docker-compose exec users python manage.py recreate_db
docker-compose exec users python manage.py seed_db
sh test.sh server
sh test.sh client
sh test.sh e2e

