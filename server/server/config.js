import * as bcrypt from 'bcrypt';

export const config = {
  salt: bcrypt.genSaltSync(10, 'b'),
  secretKey: 'Very secret key'
}
