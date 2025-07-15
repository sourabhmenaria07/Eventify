import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf";

export class DatabasesService {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createEvent(eventData) {
    try {
      await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteEventsCollectionId,
        ID.unique(),
        eventData
      );
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  }

  async getEvents(queries = []) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteEventsCollectionId,
        queries
      );
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  }

  async getEventsBySlug(slug) {
    try {
      const res = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteEventsCollectionId,
        [Query.equal("slug", slug)]
      );
      return res.documents[0];
    } catch (error) {
      console.error("Error fetching event by slug:", error);
      throw error;
    }
  }

  async editEvent(eventId, updatedData) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteEventsCollectionId,
        eventId,
        updatedData
      );
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  }
  async deleteEvent(eventId) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteEventsCollectionId,
        eventId
      );
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  }

  async uploadCover(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Error uploading cover:", error);
      throw error;
    }
  }

  async getFilePreview(fileId) {
    try {
      return await this.storage.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.error("Error previewing cover:", error);
      throw error;
    }
  }

  async deleteCover(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Error deleting cover:", error);
      return false;
    }
  }

  async bookmarkEvent({ userId, eventId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteBookmarksCollectionId,
        ID.unique(),
        { userId, eventId }
      );
    } catch (error) {
      console.error("Error bookmarking event:", error);
      throw error;
    }
  }

  async unbookmark(bookmarkId) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteBookmarksCollectionId,
        bookmarkId
      );
    } catch (error) {
      console.error("Error removing bookmark:", error);
      throw error;
    }
  }

  async getBookmarkByUser(userId) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteBookmarksCollectionId,
        [Query.equal("userId", userId)]
      );
    } catch (error) {
      console.error("Error fetching user bookmarks:", error);
      throw error;
    }
  }
}

const databaseService = new DatabasesService();

export default databaseService;
