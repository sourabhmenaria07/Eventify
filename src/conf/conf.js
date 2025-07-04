const conf = {
    appwriteUrl: String(import.meta.env.APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.APPWRITE_DATABASE_ID),
    appwriteBucketId: String(import.meta.enc.APPWRITE_BUCKET_ID),
    appwriteEventsCollectionId: String(import.meta.enc.APPWRITE_EVENTS_COLLECTION_ID),
    appwriteBookmarksCollectionId: String(import.meta.enc.APPWRITE_BOOKMARKS_COLLECTION_ID)
}

export default conf;