pipeline {
    agent any

    stages {

        stage('Code') {
            steps {
                echo 'This is Developing code'
                git url: "https://github.com/salilgupta332/Doctor-Appointment.git", branch: "main"
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    echo "Building frontend image"
                    sh "docker image build -t frontend:v1.${BUILD_ID} ."
                    sh "docker tag ${DOCKER_HUB_USERNAME}/frontend:${DOCKER_IMAGE_TAG} ${DOCKER_HUB_USERNAME}/frontend:latest"
                }
            }
        }
        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    echo "Building backend image"
                    sh "docker image build -t backend:v1.${BUILD_ID} ."
                }
            }
        }
        stage("Pushing image to Docker Hub") {
            steps {
                sshagent(['ansible']) {
                    echo 'Pushing Image to Docker hub'
                    withCredentials([usernamePassword(credentialsId: "dockerhub", passwordVariable: "dockerHubPass", usernameVariable: "dockerHubUser")]) {
                        sh "ssh -o StrictHostKeyChecking=no ubuntu@${ANSIBLE_SERVER} 'docker login -u ${dockerHubUser} -p ${dockerHubPass}'"
                        sh "ssh -o StrictHostKeyChecking=no ubuntu@${ANSIBLE_SERVER} 'docker push devop0502/frontend:v1.${BUILD_ID}'"
                        sh "ssh -o StrictHostKeyChecking=no ubuntu@${ANSIBLE_SERVER} 'docker push devop0502/frontend:latest'"

                        sh "ssh -o StrictHostKeyChecking=no ubuntu@${ANSIBLE_SERVER} 'docker push devop0502/backend:v1.${BUILD_ID}'"
                        sh "ssh -o StrictHostKeyChecking=no ubuntu@${ANSIBLE_SERVER} 'docker push devop0502/backend:latest'"                     
                    }
                }
            }
        }

    }
}
