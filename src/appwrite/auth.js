import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setEndpoint(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      await this.account.createVerification(
        `${window.location.origin}/verify-email`
      );
      return userAccount;
    } catch (error) {
      console.log("Appwrite service :: signup ::error", error);
    }
  }

  async verifyEmail({ userId, secret, email, password }) {
    try {
      const verified = await this.account.updateVerification(userId, secret);
      await this.login({ email, password });

      return verified;
    } catch (error) {
      console.log("Appwrite service :: emailVerification ::error", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Appwrite service :: login ::error", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser ::error", error);
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout ::error", error);
    }
  }

  async sendPasswordReset(email) {
    try {
      return await this.account.createRecovery(
        email,
        `${window.location.origin}/reset-password`
      );
    } catch (error) {
      console.error("Appwrite password reset send error:", error);
      throw error;
    }
  }

  // Reset password with userId + secret (from email link)
  async confirmPasswordReset({ userId, secret, password }) {
    try {
      return await this.account.updateRecovery(
        userId,
        secret,
        password,
        password
      );
    } catch (error) {
      console.error("Appwrite password reset confirm error:", error);
      throw error;
    }
  }

  // Update user's name
  async updateName(newName) {
    try {
      return await this.account.updateName(newName);
    } catch (error) {
      console.error("Appwrite update name error:", error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
