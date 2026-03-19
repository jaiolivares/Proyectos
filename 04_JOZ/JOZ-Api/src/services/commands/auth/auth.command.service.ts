import bcrypt from "bcryptjs";
import config from '../../../config';

export class AuthCommandService {
  public async encriptarPassword(password: string): Promise<string> {
    const saltRounds = config.saltRounds;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

}
