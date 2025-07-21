
export type LinkItem = {
    id: number;
    url: string;
    title: string;
    tag: string;
    updatedAt?: string;
    publishedAt?: string;

}

export type LinkListHandle = {
  addAndPushLink: (newLink: LinkItem) => Promise<{
    success: boolean;
    data?: unknown;
  }>;
};