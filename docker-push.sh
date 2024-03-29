#!/bin/sh

set -x
set -e
echo "This may work"

#export AWS_RDS_URI="postgres://postgres:postgres@database-2.cbgpys1o5cxt.eu-central-1.rds.amazonaws.com:5432/users_prod"
if [ -z "$TRAVIS_PULL_REQUEST" ] || [ "$TRAVIS_PULL_REQUEST" == "false" ]
then

  STAGING_ALB="testdriven-staging-alb-846600664.eu-central-1.elb.amazonaws.com"
  PRODUCTION_ALB="testdriven-production-alb-1620025013.eu-central-1.elb.amazonaws.com"
  if [[ "$TRAVIS_BRANCH" == "staging" ]]; then
    export DOCKER_ENV=stage
    export     REACT_APP_USERS_SERVICE_URL="http://$STAGING_ALB"
    export REACT_APP_EXERCISES_SERVICE_URL="http://$STAGING_ALB"
  elif [[ "$TRAVIS_BRANCH" == "production" ]]; then
    export DOCKER_ENV=prod
    export     REACT_APP_USERS_SERVICE_URL="http://$PRODUCTION_ALB"
    export REACT_APP_EXERCISES_SERVICE_URL="http://$PRODUCTION_ALB"
    export DATABASE_URL="$AWS_RDS_URI"
    export SECRET_KEY="$PRODUCTION_SECRET_KEY"
  fi

  if [ "$TRAVIS_BRANCH" == "staging" ] || \
     [ "$TRAVIS_BRANCH" == "production" ]
  then
    curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
    unzip awscli-bundle.zip
    ./awscli-bundle/install -b ~/bin/aws
    export PATH=~/bin:$PATH
    # add AWS_ACCOUNT_ID, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY env vars
    eval $(aws ecr get-login --region eu-central-1 --no-include-email)
    export TAG=$TRAVIS_BRANCH
    export REPO=$AWS_ACCOUNT_ID.dkr.ecr.eu-central-1.amazonaws.com
  fi

  if [ "$TRAVIS_BRANCH" == "staging" ] || \
      [ "$TRAVIS_BRANCH" == "production" ]
  then
    # users
    docker build $USERS_REPO -t $USERS:$COMMIT -f Dockerfile-$DOCKER_ENV
    docker tag $USERS:$COMMIT $REPO/$USERS:$TAG
    docker push $REPO/$USERS:$TAG
    # users db
    docker build $USERS_DB_REPO -t $USERS_DB:$COMMIT -f Dockerfile
    docker tag $USERS_DB:$COMMIT $REPO/$USERS_DB:$TAG
    docker push $REPO/$USERS_DB:$TAG
    # client
    docker build $CLIENT_REPO -t $CLIENT:$COMMIT -f Dockerfile-$DOCKER_ENV --build-arg REACT_APP_USERS_SERVICE_URL=$REACT_APP_USERS_SERVICE_URL --build-arg REACT_APP_EXERCISES_SERVICE_URL=$REACT_APP_EXERCISES_SERVICE_URL --build-arg REACT_APP_API_GATEWAY_URL=$REACT_APP_API_GATEWAY_URL
    docker tag $CLIENT:$COMMIT $REPO/$CLIENT:$TAG
    docker push $REPO/$CLIENT:$TAG
    # swagger
    docker build $SWAGGER_REPO -t $SWAGGER:$COMMIT -f Dockerfile-$DOCKER_ENV
    docker tag $SWAGGER:$COMMIT $REPO/$SWAGGER:$TAG
    docker push $REPO/$SWAGGER:$TAG
    # exercises
    docker build $EXERCISES_REPO -t $EXERCISES:$COMMIT -f Dockerfile-$DOCKER_ENV
    docker tag $EXERCISES:$COMMIT $REPO/$EXERCISES:$TAG
    docker push $REPO/$EXERCISES:$TAG
    # exercises db
    docker build $EXERCISES_DB_REPO -t $EXERCISES_DB:$COMMIT -f Dockerfile
    docker tag $EXERCISES_DB:$COMMIT $REPO/$EXERCISES_DB:$TAG
    docker push $REPO/$EXERCISES_DB:$TAG
  fi

fi
