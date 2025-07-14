const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  appwriteEventsCollectionId: String(import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID),
  appwriteBookmarksCollectionId: String(import.meta.env.VITE_APPWRITE_BOOKMARKS_COLLECTION_ID),
};

export default conf;
