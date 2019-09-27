SHELL=/bin/bash
export PATH_TO=`pwd`
alias tda='cd ${PATH_TO}'
alias tdu='cd /testdriven-app/services/users'
alias tdp='cd /Users/setzt/ci_learn/testdriven-app/services/users/project'
alias tdt='cd /Users/setzt/ci_learn/testdriven-app/services/users/project/tests'

alias dc='docker-compose'
alias dm='docker-machine

#Docker  Auf die lokale Instanz setzen: eval $(docker-machine env -u)

build_local:
	 export REACT_APP_USERS_SERVICE_URL=http://localhost && eval $(docker-machine env -u) && docker-compose up -d --build 

start:
	docker-compose up -d

log:
	docker-compose logs -f


shell:
	 docker-compose exec users flask shell

db_init:
	docker-compose exec users python manage.py db init

db_upgrade:
	docker-compose exec users python manage.py db migrate 
	docker-compose exec users python manage.py db upgrade 

db_change:
	docker-compose exec users python manage.py recreate_db 

pg:
	docker-compose exec users-db  psql -U postgres

seed:
	docker-compose exec users python manage.py seed_db 

black:
	 docker-compose exec users black project
	 docker-compose exec users black manage.py 

flake:
	 docker-compose exec users flake8 project

html:
	 open services/users/htmlcov/index.html

cov:
	 docker-compose exec users python manage.py cov

vjstest:
	cd services/client && npm test --  --verbose

jstest:
	cd services/client && npm test
	cd services/client && react-scripts test --coverage

djstest:
	docker-compose exec client npm test
	docker-compose exec client react-scripts test --coverage

test:
	docker-compose exec users python manage.py test

start_d: 
	docker-compose exec users python manage.py run
 
d_host:
	docker-machine rm testdriven-dev
	docker-machine create  testdriven-dev

p_host:
	 docker-machine rm testdriven-prod
	 docker-machine create --driver amazonec2 --amazonec2-region eu-central-1  --amazonec2-open-port 80 testdriven-prod


start_p: 
	docker-machine env testdriven-prod
	eval $(docker-machine env testdriven-prod)

docker_ls:
	docker-machine ls




p_update: 
	docker-compose -f docker-compose-prod.yml up -d --build
	docker-compose -f docker-compose-prod.yml exec users python manage.py recreate_db
	docker-compose -f docker-compose-prod.yml exec users python manage.py seed_db
	docker-compose -f docker-compose-prod.yml exec users python manage.py test


p_check:
	 docker-compose -f docker-compose-prod.yml exec users env


