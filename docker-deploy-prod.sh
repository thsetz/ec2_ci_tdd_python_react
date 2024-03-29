#!/bin/sh
#TRAVIS_BRANCH="production"

set -e
if [ -z "$TRAVIS_PULL_REQUEST" ] || [ "$TRAVIS_PULL_REQUEST" == "false" ]
then

  if [ "$TRAVIS_BRANCH" == "production" ]
  then

    JQ="jq --raw-output --exit-status"

    configure_aws_cli() {
        aws --version
        aws configure set default.region eu-central-1
        aws configure set default.output json
        echo "AWS Configured!"
    }

    register_definition() {
      if revision=$(aws ecs register-task-definition --cli-input-json "$task_def" | $JQ '.taskDefinition.taskDefinitionArn'); then
        echo "Revision: $revision"
      else
        echo "=============================="
        echo "Failed to register task definition"
        echo "=============================="
        echo "$task_def with AWS_RDS_EXERCISES_URI"
        exit 1
        return 1
      fi
    }

    update_service() {
      if [[ $(aws ecs update-service --cluster $cluster --service $service --task-definition $revision | $JQ '.service.taskDefinition') != $revision ]]; then
        echo "=============================="
        echo "Error updating service. Service ==> $service cluster ==> $cluster revision ==> $revision" 
        echo "=============================="
        exit 1
        return 1
      fi
    }

    deploy_cluster() {

      cluster="test-driven-production-cluster"


      # client
      service="testdriven-client-prod-service"
      template="ecs_client_prod_taskdefinition.json"
      task_template=$(cat "ecs/$template")
      task_def=$(printf "$task_template" $AWS_ACCOUNT_ID)
      #echo "$task_def"
      register_definition
      update_service

      # swagger
      service="testdriven-swagger-prod-service"
      template="ecs_swagger_prod_taskdefinition.json"
      task_template=$(cat "ecs/$template")
      task_def=$(printf "$task_template" $AWS_ACCOUNT_ID)
      #echo "$task_def"
      register_definition
      update_service

      # exercises
      service="testdriven-exercises-prod-service"
      template="ecs_exercises_prod_taskdefinition.json"
      task_template=$(cat "ecs/$template")
      task_def=$(printf "$task_template" $AWS_ACCOUNT_ID $AWS_RDS_EXERCISES_URI)
      #echo "$task_def with AWS_RDS_EXERCISES_URI"
      register_definition
      update_service

      # users
      service="testdriven-users-prod-service"
      template="ecs_users_prod_taskdefinition.json"
      task_template=$(cat "ecs/$template")
      task_def=$(printf "$task_template" $AWS_ACCOUNT_ID $AWS_RDS_URI $PRODUCTION_SECRET_KEY)
      #echo "$task_def"
      register_definition
      update_service
    }

    configure_aws_cli
    deploy_cluster

  fi

fi
