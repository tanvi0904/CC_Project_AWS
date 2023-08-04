# ToDo List on AWS Cloud
The web app uses an ec2 instance to host the web app, which is redirected to the IP address from the local host of the instance using nginx.
For storing the records the Backend(NodeJS) connects the front end to the RDS which already has a table with the correct format created to store the data provided.

To run the web app, first one needs to establish a connection on two separate terminal windows. Using the following command
ssh -i <path_to_key_file> ubuntu@ec2-35-92-36-213.us-west-2.compute.amazonaws.com

Then run the commands on separate windows:
(To start the backend)
serve -s build
(Start the frontend)
npm start

Which should look like this

![image](https://github.com/UtkarshBagaria/CC_AWS/assets/79400700/3c0e4eed-7122-4cde-b811-d9c81d873135)

Once the required connections are established one can access the web app on the ec2 instance IP address. 
Which Looks like this

![image](https://github.com/UtkarshBagaria/CC_AWS/assets/79400700/c3277006-3f1e-4b3c-9db1-8fb642c76791)

After adding tasks simpling enter your query to the search box and pressing enter. The RDS (Shown in MYSQL Workbench) will contain the task added

![image](https://github.com/UtkarshBagaria/CC_AWS/assets/79400700/9f5affa7-c273-484c-acce-69a6bc86c14d)




