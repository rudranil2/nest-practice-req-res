import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST }) // This will create a new requst service for each request, so userId won't be overridden
export class RequestService {
  private userId: string;

  setUserId(userId: string) {
    this.userId = userId;
  }
  getUserId() {
    return this.userId;
  }
}
