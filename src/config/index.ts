/* eslint-disable prettier/prettier */
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.join(process.cwd(), '.env'),
})

export default {
  db_url: process.env.DB_URL,
  port: process.env.PORT,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
}
