AWS-SES-Serverless-Example
============================


This repo is an example of sending email using SES on Lambda invocation. It uses the AWS SES nodeJS SDK to send emails. Various parameters for sending email such as **sourceEmail** address, **destination** email address can be specified as **body parameter** for the Deployed APIGateway URL.

### Technical Architecture:
![Architecture diagram](https://raw.githubusercontent.com/lakshmantgld/aws-ses-serverless-example/master/readmeFiles/architecture.png)

### Notes on AWS SES
- If you are in **SES sandbox**, you have to **verify both sender and receiver email addresses**. But, If you have migrated out of SES sandbox, sender mail alone must be verified.

### Instructions to deploy:
- Clone this repo:
```
git clone https://github.com/JTrpak/aws-ses-serverless-node-12.git
```

- Install the dependencies:
```
cd aws-ses-serverless-node-12 && yarn install or npm install
```

- run serverless offline / deploy examples
```
#local run (serverless have to be installed globally)
serverless offline --environment dev --awsregion eu-central-1 --projectname test

#deploy
serverless deploy --environment dev --awsregion eu-central-1 --projectname test
```

- Once the deployment completes, you can send mail by invoking the URL with the following parameters.

```js
{
	"bccEmailAddresses": [],
	"ccEmailAddresses": [],
	"toEmailAddresses": ["****@gmail.com"],
	"bodyData": "Hey test message buddy!! From AWS SES",
	"bodyCharset": "UTF-8",
	"subjectdata": "AWS SES",
	"subjectCharset": "UTF-8",
	"sourceEmail": "****@gmail.com",
	"replyToAddresses": ["****@gmail.com"]
}
```

Here is the picture of similar invocation made in postman:
![Post parameters](https://raw.githubusercontent.com/lakshmantgld/aws-ses-serverless-example/master/readmeFiles/postmanScreenshot.png)
