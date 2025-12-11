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
                }
            }
        }

    }
}
