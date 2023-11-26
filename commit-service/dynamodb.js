const AWS = require('aws-sdk')
require('dotenv').config()

// please use your own IAM access credentials you would have created.
// remember to store the actual values in a .env file
AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient()

const TABLE_NAME = "commits-db"


// this function is for adding/updating an entry/member in the table
// make sure you add the item being added and the table name in the params const
const addCommit = async (commit) => {
    const params = {
        TableName: TABLE_NAME,
        Item: {
            commitId: new Date().toString(),
            commit: commit}
    }

    return await dynamoClient.put(params).promise()
}

// this function is retrieving a table entry by its id.
// make sure you include the id key in the params const
const getCommitById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id
        }
    }
    return await dynamoClient.get(params).promise()
}

// this function is retrieving all entries in the table
const getCommits = async () => {
    const params = {
        TableName: TABLE_NAME
    }

    const commits = await dynamoClient.scan(params).promise()
    console.log(commits)
    return commits
}

//export our functions to be used for our api
module.exports = {
    dynamoClient,
    getCommits,
    addCommit,
    getCommitById,
}