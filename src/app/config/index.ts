import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUND,
  jwt__access_secret: process.env.JWT_REFRESH_SECRET,
  jwt__refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt__access_expire_in: process.env.JWT_ACCESS_EXPIRE_IN,
  jwt__refresh_expire_in: process.env.JWT_REFRESH_EXPIRE_IN,
  resend_api: process.env.RESEND_API,
  frontend_url: process.env.FRONTEND_URL,
  cloudinary_cloud_name: process.env.CLOUD_NAME,
  cloudinary_api_key: process.env.API_KEY,
  cloudinary_api_secret: process.env.API_SECRET,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  stripe_publish_key: process.env.STRIPE_PUBLISH_KEY,
  FRONTEND_URL: process.env.FRONTEND_URL,
};
