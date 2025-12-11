pipeline {
  agent any

  environment {
    // we will derive Docker Hub username from credentials at runtime
    IMAGE_TAG = "v1.${env.BUILD_ID}"
  }

  stages {

    stage('Checkout') {
      steps {
        git url: "https://github.com/salilgupta332/Doctor-Appointment.git", branch: "main"
      }
    }

    stage('Build & Tag Frontend') {
      steps {
        dir('frontend') {
          sh "docker build -t frontend:${IMAGE_TAG} ."
          // tag for your Docker Hub username will be done before push
        }
      }
    }

    stage('Build & Tag Backend') {
      steps {
        dir('backend') {
          sh "docker build -t backend:${IMAGE_TAG} ."
        }
      }
    }

    stage('Login & Push to Docker Hub') {
      steps {
        // dockerhub is the credential id you showed in the screenshot
        withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PASS')]) {
          // use the credential username for tagging/pushing to ensure it matches Jenkins stored value
          sh """
            # tag images for your Docker Hub account (use the username from credentials)
            docker tag frontend:${IMAGE_TAG} ${DOCKERHUB_USER}/frontend:${IMAGE_TAG}
            docker tag frontend:${IMAGE_TAG} ${DOCKERHUB_USER}/frontend:latest

            docker tag backend:${IMAGE_TAG} ${DOCKERHUB_USER}/backend:${IMAGE_TAG}
            docker tag backend:${IMAGE_TAG} ${DOCKERHUB_USER}/backend:latest

            # login and push
            docker login -u "${DOCKERHUB_USER}" -p "${DOCKERHUB_PASS}"
            docker push ${DOCKERHUB_USER}/frontend:${IMAGE_TAG}
            docker push ${DOCKERHUB_USER}/frontend:latest
            docker push ${DOCKERHUB_USER}/backend:${IMAGE_TAG}
            docker push ${DOCKERHUB_USER}/backend:latest
            docker logout
          """
        }
      }
    }
  }
}
