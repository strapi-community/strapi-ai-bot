module.exports = ({ env }) => ({
  rest: {
    defaultLimit: 25,
    maxLimit: 100,
    withCount: true,
    prefix: '/v1',
  },
});
