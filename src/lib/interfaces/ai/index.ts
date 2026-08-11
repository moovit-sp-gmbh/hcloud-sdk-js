import { ReducedSpace } from "../global";
import type { DesignContent } from "../high5/space/event/stream/design/StreamDesign";
import { ReducedOrganization, ReducedUser } from "../idp";

export type AIHigh5StreamPayloadType = "design" | "documentation";

export interface AIHigh5StreamRequest {
    message: string;
    type: AIHigh5StreamPayloadType;
    payload: DesignContent;
}

export type AIHigh5StreamEvent =
    | {
          type: "start";
          response: AIHigh5StreamResponse;
      }
    | {
          type: "chunk";
          message: string;
      }
    | {
          type: "done";
          response: Omit<AIHigh5StreamResponse, "message">;
      }
    | {
          type: "error";
          message: string;
      };

export type AIHigh5StreamResponse = {
    _id: string;
    
    message: string;
    type: AIHigh5StreamPayloadType;

    organization: ReducedOrganization;
    space: ReducedSpace;

    createdBy: ReducedUser;
    createDate: number;
} & (
    | {
          source: "user";
      }
    | {
          source: "ai";
          type: "design";
          payload?: DesignContent; // only available when streamed back, not when requested from mongodb (field gets dropped)
      }
    | {
          source: "ai";
          type: "documentation";
          payload?: string; // only available when streamed back, not when requested from mongodb (field gets dropped)
      }
);
