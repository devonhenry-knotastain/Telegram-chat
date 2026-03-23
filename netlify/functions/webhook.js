const fetch = require("node-fetch");

exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  const message = body.message;

  if (!message) {
    return { statusCode: 200 };
  }

  const data = {
    chat_id: message.chat.id.toString(),
    username: message.from.username || "",
    message: message.text || "",
  };

  // Send to Supabase
  await fetch(process.env.SUPABASE_URL + "/rest/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": process.env.SUPABASE_KEY",
      "Authorization": `Bearer ${process.env.SUPABASE_KEY}`
    },
    body: JSON.stringify(data),
  });

  return {
    statusCode: 200,
    body: "ok",
  };
};
