export class AcknowledgeDto {
  key: string;  // Unique identifier for the client
  status: string;  // Status of the acknowledgment (e.g., 'delivered')
  messageId: string;  // Unique message ID
}
