import NETWORK from "@/data/network/index.ts";
import type { ScanProgress, ScanResult, Scan, newScanProps } from "@/data/models/scan.ts";

export const scanEndpoints = {
  async startScan(repo_name: string): Promise<string> {
    const response = await NETWORK.post(`/scans`, {
      repository_name: repo_name,
      scanner_name: "secret_scanner", // Example scanner name, adjust as needed
      configurations: {}
    });

    if (response.status === 422) {
      throw new Error(
        `Failed to create scan: ${response.data.detail.msg}\n${response.data.detail.loc}\n${response.data.detail.type}`
      );
    }
    return response.data.scan_id;
  },

  async getScanProgress(scan_id: string): Promise<ScanProgress> {

    NETWORK.invalidateCache(`/scans/${scan_id}`);
    const response = await NETWORK.get(`/scans/${scan_id}`);

    if (response.status === 422) {
      throw new Error(
        `Failed to get scan progress: ${response.data.detail.msg}\n${response.data.detail.loc}\n${response.data.detail.type}`
      );
    }
    return response.data as ScanProgress;
  },

  async getScanResults(scan_id: string): Promise<ScanResult[]> {
    const response = await NETWORK.get(`/scans/${scan_id}/results`);
    if (response.status === 422) {
      throw new Error(
        `Failed to get scan results: ${response.data.detail.msg}\n${response.data.detail.loc}\n${response.data.detail.type}`
      );
    }
    return response.data as ScanResult[];
  },

  async listScans(): Promise<Scan[]> {
    const response = await NETWORK.get(`/scans`);
    if (response.status === 422) {
      throw new Error(
        `Failed to get scan results: ${response.data.detail.msg}\n${response.data.detail.loc}\n${response.data.detail.type}`
      );
    }
    return response.data as Scan[];
  },

  async updateScanProps(scanProps: newScanProps): Promise<void>{
    console.log("Updating scan props:", scanProps);
  }
};