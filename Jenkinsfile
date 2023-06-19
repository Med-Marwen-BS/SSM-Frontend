node {
   def commit_id
   stage('Preparation') {
     checkout scm
     bat "git rev-parse --short HEAD > .git/commit-id"                        
     commit_id = readFile('.git/commit-id').trim()
   }
   
   
   stage('Docker Build/Push Of SSM-Front') {
   withCredentials([usernamePassword(credentialsId: '829fc465-47c0-4903-a6b0-436f2ad50cdb', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
       
           bat 'docker build -t marwen95/ssm:latest .'
           bat 'docker login -u $USERNAME -p $PASSWORD'
           bat 'docker push marwen95/ssm:latest'
      }
       
   }   

}