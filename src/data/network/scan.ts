import NETWORK from "@/data/network/index.ts";
import type {ScanProgress} from "@/data/models/scan.ts";

export const scanEndpoints = {
  async startScan(repo_name: string): Promise<string> {
    const response = await NETWORK.post(`/scans`, {
      repository_name: repo_name,
      scanner_name: "default",
      configurations: {}
    });
    console.log("Response from /scans:", response);
    if (response.status === 422) {
      throw new Error(
        `Failed to create scan: ${response.data.detail.msg}\n${response.data.detail.loc}\n${response.data.detail.type}`
      );
    }
    return response.data.scan_id;
  },

  async getScanProgress(scan_id: string): Promise<ScanProgress>{
    const response = await NETWORK.get(`/scans/${scan_id}`);
    console.log("Response from /scans/scan_id", response)
    if (response.status === 422) {
      throw new Error(
        `Failed to get scan progress: ${response.data.detail.msg}\n${response.data.detail.loc}\n${response.data.detail.type}`
      );
    }
    return response.data as ScanProgress;
  }
};