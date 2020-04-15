import { MessageService } from '../core/message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
  });

  it('should have no messages to start', () => {
    expect(service.messages.length).toBe(0);
  });

  it('should have one message', () => {
    service.add('Go');
    expect(service.messages.length).toBe(1);
  });
});
