import NETWORK from "@/data/network/index.ts";
import type { ScanProgressAggStream } from "@/data/models/scan.ts";
import type { CollectionResults, ScanCollection, ScanCollectionId } from "@/data/models/scan_collection.ts";

export const scanCollectionEndpoints = {
  BASE_URL: '/scan-collections',

  async createScanCollection(repository_name: string, scanners: string[]): Promise<ScanCollectionId> {
    const response = await NETWORK.post(`${this.BASE_URL}`, {
      repository_name,
      scanners,
      // configurations: {"mock": true}
    })
    return response.data as ScanCollectionId;
  },

  getScanProgressSSE(scan_id: string, onUpdate?: (progress: ScanProgressAggStream) => void): EventSource {

    // Use NETWORK.openEventSource helper which will append token and manage watchdogs
    const path = `${this.BASE_URL}/${scan_id}/stream`;

    const handleProgress = (event: MessageEvent) => {
      try {
        const data: ScanProgressAggStream = JSON.parse(event.data);
        console.log("Received scan progress:", data);
        onUpdate?.(data);

        if (data.collection.status === "completed" || data.collection.progress_percent === 100) {
          console.log("Scan completed — closing SSE connection.");
          // EventSource.close will be handled by the NETWORK helper's returned object
          // but we still close explicitly here for clarity
        }
      } catch (error) {
        console.error("Failed to parse event data:", error);
      }
    };

    const source = NETWORK.openEventSource(
      path,
      {},
      {
        onOpen: () => {
          console.log("Connection opened: Scan progress");
        },
        onMessage: (e) => handleProgress(e),
        events: {
          progress: (e: MessageEvent) => handleProgress(e),
        },
        onError: (err) => {
          console.error('SSE connection error: Scan progress', err);
        }
      },
      60_000
    );

    // If the server indicates completion via message content we close here as well
    source.addEventListener('progress', (e: MessageEvent) => {
      try {
        const data: ScanProgressAggStream = JSON.parse(e.data);
        if (data.collection.status === "completed" || data.collection.progress_percent === 100) {
          source.close();
        }
      } catch (_err) {
        // ignore parse errors here
      }
    });

    return source;
  },

  async getCollectionResults(collection_id: string): Promise<CollectionResults>{
    const response = await NETWORK.get(`${this.BASE_URL}/${collection_id}/results`);
    return response.data as CollectionResults;
  },

  async getUserCollections(): Promise<ScanCollection[]>{
    const response = await NETWORK.get(`${this.BASE_URL}`);
    return response.data as ScanCollection[];
  },

  async getScanCollection(collection_id: string): Promise<ScanCollection>{
    const response = await NETWORK.get(`${this.BASE_URL}/${collection_id}`);
    return response.data as ScanCollection;
  }
}