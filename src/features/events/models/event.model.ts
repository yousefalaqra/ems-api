export class EventModel {
  title: string;

  description: string;

  isMain: boolean;

  isPublished: boolean;

  startTime: Date;

  endTime: Date;

  src: string; // required data for youtube | vimeo | zoom source

  img: string;
}
