import { calendar_v3, google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { Migration } from './migration';
import { GoogleOauth2Config as Config } from '@/utils/config';

import { User } from '@/users/user';
import { TodoCreationParams } from '@/todos/todo';

export class GoogleMigration extends Migration {
  private oauth2Client: OAuth2Client;

  constructor(user: User) {
    super(user);

    this.oauth2Client = new OAuth2Client(new Config());
  }

  url() {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/calendar.readonly',
    });
  }

  async auth(authorizationCode: string): Promise<void> {
    const { tokens } = await this.oauth2Client.getToken({
      code: authorizationCode,
    });

    this.oauth2Client.credentials = tokens;
  }

  async pull(): Promise<calendar_v3.Schema$Event[]> {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

    const res = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 50,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = res.data.items;

    return events ?? [];
  }

  parse(data: calendar_v3.Schema$Event[]): TodoCreationParams[] {
    return data.map((data) => {
      const todoCreationParams: TodoCreationParams = {
        title: data.summary ?? '',
        description: data.description?.split('\n')[0] ?? '',
      };

      const dueDate = data.start?.dateTime || data.start?.date;

      if (dueDate) {
        todoCreationParams.dueDate = new Date(dueDate);
      }

      return todoCreationParams;
    });
  }
}
