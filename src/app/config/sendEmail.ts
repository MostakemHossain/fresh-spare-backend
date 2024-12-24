import { Resend } from 'resend';
import config from '.';

const resend = new Resend(config.resend_api);

type SendEmailParams = {
  sendTo: string | string[];
  subject: string;
  html: string;
};

const sendEmail = async ({
  sendTo,
  subject,
  html,
}: SendEmailParams): Promise<any> => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'FreshSpare <onboarding@resend.dev>',
      to: sendTo,
      subject: subject,
      html: html,
    });
    if (error) {
      console.error({ error });
      return null;
    }
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default sendEmail;
