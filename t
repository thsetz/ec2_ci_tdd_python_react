
export REACT_APP_USERS_SERVICE_URL=http://localhost
export REACT_APP_USERS_SERVICE_URL=http://DOCKER_MACHINE_STAGING_IP
export REACT_APP_USERS_SERVICE_URL=http://DOCKER_MACHINE_PROD_IP
export SECRET_KEY=SOMETHING_SUPER_SECRET


DOCKER_MACHINE_IP=`docker-machine ip testdriven-prod`










docker-compose -f docker-compose-prod.yml exec users python manage.py recreate_db
docker-compose -f docker-compose-prod.yml exec users python manage.py seed_db
docker-compose -f docker-compose-prod.yml exec users python manage.py test
docker-compose -f docker-compose-prod.yml exec users flake8 project
./node_modules/.bin/cypress open --config baseUrl=http://${DOCKER_MACHINE_IP}
