import { Client, Account } from "appwrite";
import conf from "../conf/conf";

export const client = new Client();

client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId)

export const Account = new Account(client)