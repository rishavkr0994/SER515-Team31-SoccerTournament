# Soccer_Tournament_Website [ASU Soccer]
## SER 515 Project [Group 31]

![screencapture-ser515-team31-soccertournament-web-app-s3-website-us-east-2-amazonaws-2021-11-29-02_57_43](https://user-images.githubusercontent.com/89811541/143846770-0fa14809-622f-4f2a-9e2c-dacd91efbdf3.png)
#### Demo:
[Youtube](https://www.youtube.com/watch?v=cwtM3_ohhxU)
#### Project Management Resources:
	Taiga: https://tree.taiga.io/project/rishavkr0994-soccer-tournament-website/backlog
	Google Drive: https://drive.google.com/drive/u/3/folders/0AHNourJPboIPUk9PVA

#### Deployment Details:
The deployment has been done using AWS. The front-end has been hosted within an S3 bucket and the backend microservice is deployed using Elastic Beanstalk.

	Web Application: http://ser515-team31-soccertournament-web-app.s3-website.us-east-2.amazonaws.com/
	API Documentation: http://asusoccerser515-env.eba-kpz2eki8.us-east-2.elasticbeanstalk.com/swagger-ui.html

#### Front-End Environment:
- Node >= 14.0.0 and npm >= 5.6 
#### Steps To Run The Front-End (React Application)
	1. Git clone the project to your workspace.
	2. Open the project in the terminal and using command 'cd front-end/soccer' to the soccer directory.
	3. Run 'npm install'.
	4. Run 'npm start'.

#### Back-End Environment: 
- Java >= 8 and MySQL 8.0
#### Steps To Run The Back-End (Spring Boot Application)
	1. Git clone the project to your workspace.
	2. Open the project in the IDE and find the 'SoccerApplication' class under directory 'src/main/java/com.ser515.soccer'.
	3. Right click the class and choose "Run 'SoccerApplication' option.
