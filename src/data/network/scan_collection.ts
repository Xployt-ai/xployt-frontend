import NETWORK from "@/data/network/index.ts";
import type { ScanProgressAggStream } from "@/data/models/scan.ts";
import type { ScanCollection } from "@/data/models/scan_collection.ts";

export const scanCollectionEndpoints = {
  BASE_URL: '/scan-collections',

  async createScanCollection(repository_name: string, scanners: string[]): Promise<ScanCollection> {
    const response = await NETWORK.post(`${this.BASE_URL}`, {
      repository_name,
      scanners,
      configurations: {"mock": true}
    })
    return response.data as ScanCollection;
  },

  getScanProgressSSE(scan_id: string, onUpdate?: (progress: ScanProgressAggStream) => void): EventSource {
    NETWORK.invalidateCache(`${this.BASE_URL}/${scan_id}/stream`);
    const source = new EventSource(`${this.BASE_URL}/${scan_id}/stream`);

    source.onopen = () => {
      console.log("Connection opened: Scan progress");
    };

    // Close the connection if no messages are received within the timeout period
    let lastMessageTime = Date.now();
    const timeoutMs = 60_000; // 1 minute

    const checkTimeout = setInterval(() => {
      if (Date.now() - lastMessageTime > timeoutMs) {
        console.warn("No updates received for 1 minute — closing SSE.");
        source.close();
        clearInterval(checkTimeout);
      }
    }, 10_000);

    source.onmessage = (event) => {
      try {

        lastMessageTime = Date.now();

        const data: ScanProgressAggStream = JSON.parse(event.data);
        console.log("Received scan progress:", data);
        onUpdate?.(data);

        if (data.collection.status === "completed" || data.collection.progress_percent === 100) {
          console.log("Scan completed — closing SSE connection.");
          source.close();
        }

      } catch (error) {
        console.error("Failed to parse event data:", error);
      }
    };

    source.onerror = (error) => {
      if (source.readyState === EventSource.CLOSED) {
        console.log("SSE connection closed by server");
        source.close();
      } else if (source.readyState === EventSource.CONNECTING) {
        console.warn("Attempting to reconnect to scan progress stream...");
      }else {
        console.error("SSE connection error: Scan progress", error);
      }
    };

    return source;
  },
}