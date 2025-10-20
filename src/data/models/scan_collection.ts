import type { Vulnerability } from "@/data/models/scan.ts";

export interface ScanCollection {
  collection_id: string;
  scan_ids: string[];
}

// {
//   "success": true,
//   "data": {
//   "collection_id": "664e8c4f7f0a8b0012abcd89",
//     "scan_ids": ["664e8c4f7f0a8b0012000001", "664e8c4f7f0a8b0012000002"]
// },
//   "message": "Scan collection started",
//   "timestamp": "2025-10-18T10:00:00Z"
// }

export interface CollectionResults {
  collection_id: string;
  vulnerabilities: Vulnerability[];
}

