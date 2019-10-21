import AWS from 'aws-sdk';

/**
 * Digital Ocean Spaces Connection
 */

const spacesEndpoint = new AWS.Endpoint('https://sgp1.digitaloceanspaces.com');
const s3 = new AWS.S3({
      endpoint: spacesEndpoint,
      accessKeyId: 'WAPWPGAMT7PWMXJ3DEI6',
      secretAccessKey: 'e4OLDuinZbXAk1oO0cxNb3DB7wXFvHL8KmfUPKQE/NY'
    });
export default s3;