import type { Schema } from "../../data/resource";
import { sendMail } from "../emailDelivery/sendMail";

export const handler: Schema["sendMail"]["functionHandler"] = async (event) => {
  const { toEmail, toEmailCC, betreff, schreiben, header, mailAttachments } =
    event.arguments;

  try {
    const response = await sendMail({
      toEmail,
      toEmailCC,
      betreff,
      schreiben,
      header,
      mailAttachments,
    });

    return {
      status: "success",
      error: null,
      response,
    };
  } catch (error: any) {
    console.error("Error listing customers", error);
    return {
      status: "error",
      error: JSON.stringify(error),
      response: null,
    };
  }
};
