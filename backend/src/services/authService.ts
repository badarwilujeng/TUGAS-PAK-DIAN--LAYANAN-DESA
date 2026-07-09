import { getDB } from '../config/database';
import { hashPassword, comparePassword } from '../utils/bcrypt';
import { generateToken } from '../utils/jwt';
import { User, CreateUserInput, LoginInput, Role } from '../models';

export const authService = {
  async login(credentials: LoginInput): Promise<{ token: string; user: Partial<User> }> {
    const [rows] = await getDB().execute('SELECT * FROM users WHERE username = ?', [credentials.username]);
    const user = (rows as any[])[0];

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await comparePassword(credentials.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = generateToken({
      userId: user.id,
      username: user.username,
      role: user.role as Role,
    });

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  },

  async register(userData: CreateUserInput): Promise<User> {
    // Check if username exists
    const [existing] = await getDB().execute('SELECT id FROM users WHERE username = ?', [userData.username]);
    if ((existing as any).length > 0) {
      throw new Error('Username already exists');
    }

    const hashedPassword = await hashPassword(userData.password);

    const [result] = await getDB().execute(
      'INSERT INTO users (username, password, role, penduduk_id, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
      [userData.username, hashedPassword, userData.role, userData.penduduk_id || null]
    );

    const [newUser] = await getDB().execute('SELECT * FROM users WHERE id = ?', [(result as any).insertId]);
    return (newUser as any[])[0] as User;
  },

  async findById(userId: number): Promise<User | null> {
    const [rows] = await getDB().execute('SELECT * FROM users WHERE id = ?', [userId]);
    return ((rows as any[])[0] as User) || null;
  },

  async findByUsername(username: string): Promise<User | null> {
    const [rows] = await getDB().execute('SELECT * FROM users WHERE username = ?', [username]);
    return ((rows as any[])[0] as User) || null;
  },

  async resetPassword(username: string, newPassword: string): Promise<boolean> {
    const user = await this.findByUsername(username);
    if (!user) {
      throw new Error('Username tidak ditemukan');
    }
    const hashedPassword = await hashPassword(newPassword);
    const [result] = await getDB().execute(
      'UPDATE users SET password = ?, updated_at = NOW() WHERE username = ?',
      [hashedPassword, username]
    );
    return (result as any).affectedRows > 0;
  },
};
