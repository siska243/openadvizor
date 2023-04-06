import { env } from "./env.js";

class httpRequest {
  url = () =>
    `https://graph.facebook.com/${env.VERSION}/${env.PHONE_NUMBER_ID}/messages`;
  async sendMessage(to,message,link) {
    try {
      let $response = await axios.post(this.url(), this.data(to,message,link), {
        headers: {
          Authorization: `Bearer ${env.ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      return $response;
    } catch (e) {
      return e;
    }
  }
  data(to,message,link="",template_name="TEMPLATE_NAME",code="Fr_fr") {
    return {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "template",
      template: {
        name: template_name,
        language: {
          code,
        },
        components: [
          {
            type: "header",
            parameters: [
              {
                type: "image",
                image: {
                  link,
                },
              },
            ],
          },
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: message,
              },
            ],
          },
        ],
      },
    };
  }
}

export { httpRequest };
