'use strict';

const endpoint = 'new-user-survey';

module.exports = ({ request }) => ({
  async getSurvey() {
    const response = await request({ endpoint, params });

    if (response.data && response.data.length) {
      return response.data;
    }

    return {
      data: {
        id: 1,
        attributes: {
          createdAt: '2023-02-01T20:29:43.010Z',
          updatedAt: '2023-02-01T20:31:07.579Z',
          embedColor: '#5700df',
          embedTitle: '🙋‍♀️ Hello',
          embedBody:
            "You are now a member of the growing community at Strapi Community Discord Server. We have members from all over the world who build awesome projects, and support each other.\n\n👋 We'd **love** to get to know you a bit better, so please **[fill out this short survey](https://strapi.typeform.com/to/TLM3Ae?channel=U01JT604ER2)** then introduce yourself in the [#introduction channel](https://discord.gg/2ZVmbQAuKW)!\n\nIf you're stuck for things to say, here are a few ideas:\n\n- Where you're from? \n- What tech stack do you use? \n- Your experience with Strapi?\n- What have you been working on?",
        },
      },
      meta: {},
    };
  },
});
