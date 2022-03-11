let uploadProvider = 'local'

if (process.env.UPLOAD_PROVIDER_ENABLED == true) {
  uploadProvider = 'aws-s3'
}

module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: uploadProvider,
      providerOptions: {
        accessKeyId: env('AWS_ACCESS_KEY_ID'),
        secretAccessKey: env('AWS_ACCESS_SECRET'),
        region: env('AWS_REGION'),
        params: {
          Bucket: env('AWS_BUCKET'),
        },
      },
    },
  },
})
