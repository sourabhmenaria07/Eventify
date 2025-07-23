import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
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

      // Log in temporarily to call verification
      await this.account.createEmailPasswordSession(email, password);

      // Send verification email
      await this.account.createVerification(`${window.location.origin}/verify`);

      // Log out immediately
      await this.account.deleteSessions();

      return userAccount;
    } catch (error) {
      //temp check again
      const message = error?.message;
      if (message.includes("Rate limit")) {
        alert(
          "You're doing that too much. Please wait a moment and try again."
        );
      }
      //
      console.log("Appwrite service :: signup ::error", error);
    }
  }

  // async verifyEmail({ userId, secret, email, password }) {
  //   try {
  //     const verified = await this.account.updateVerification(userId, secret);
  //     console.log("✅ Email verification successful:", verified);
  //     // await this.login({ email, password });
  //     if (email && password) {
  //     await this.login({ email, password });
  //   }
  async verifyEmail({ userId, secret }) {
    try {
      return await this.account.updateVerification(userId, secret);
    } catch (error) {
      console.log("Appwrite service :: emailVerification ::error", error);
      throw error;
    }
  }

  async sendVerificationEmail({ email, password }) {
    try {
      await this.account.createEmailPasswordSession(email, password);
      const result = await this.account.createVerification(
        `${window.location.origin}/verify`
      );

      await this.account.deleteSessions();

      return result;
    } catch (error) {
      console.error("Appwrite service :: resend verification :: error", error);
      throw error;
    }
  }

  async login({ email, password }) {
    // try {
    const session = await this.account.createEmailPasswordSession(
      email,
      password
    );
    const user = await this.getCurrentUser();

    if (!user.emailVerification) {
      // Optionally log them out immediately
      await this.logout();
      throw new Error("Email not verified. Please check your inbox.");
    }

    return session;
    // } catch (error) {
    //   console.log("Appwrite service :: login ::error", error);
    // }
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
