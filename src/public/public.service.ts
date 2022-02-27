import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntryEntity } from 'src/features/events/entities/entry.entity';
import { EventEntity } from 'src/features/events/entities/event.entity';
import { EntryModel } from 'src/features/events/models/entry.model';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class PublicService {
  constructor(
    @InjectRepository(EventEntity)
    private _eventRepository: Repository<EventEntity>,
    @InjectRepository(EntryEntity)
    private _entryRepository: Repository<EntryEntity>,
    private readonly _mailerService: MailerService,
  ) {}

  getFeaturedEvent(): Promise<EventEntity> {
    return this._eventRepository.findOne({ where: { isMain: true } });
  }

  findOne(id: number): Promise<EventEntity> {
    return this._eventRepository.findOne({ where: { id: id } });
  }

  async register(id: number, model: EntryModel): Promise<InsertResult> {
    let entity = {
      apt: model.apt,
      capacity: model.capacity,
      city: model.city,
      company: model.company,
      country: model.country,
      email: model.email,
      event: { id: id } as EventEntity,
      firstName: model.firstName,
      isSubscribed: model.isSubscribed,
      lastName: model.lastName,
      registrationDate: new Date(Date.now()),
      state: model.state,
      street: model.street,
      title: model.title,
      zipCode: model.zipCode,
    } as EntryEntity;

    console.log('test: ', entity);
    let newEntry = await this._entryRepository.insert(entity);

    let result = await this._mailerService.sendMail({
      to: entity.email,      
      from: 'The Fragrance Foundation',
      subject:
        'Registration Confirmation for The Fragrance Foundation’s Fragrance Day 2022 Virtual Event',
      html: `
        <div
  style="
    background-color: #f6f6f6;
    font-family: sans-serif;
    font-size: 14px;
    line-height: 1.4;
    margin: 0;
    padding: 0;
  "
>
  <table
    border="0"
    cellpadding="0"
    cellspacing="0"
    style="
      background-color: #eee;
      margin: auto;
      border-collapse: separate;
      width: 100%;
    "
  >
    <tbody>
      <tr>
        <td
          style="font-family: sans-serif; font-size: 14px; vertical-align: top"
        >
          &nbsp;
        </td>
        <td
          style="
            font-family: sans-serif;
            font-size: 14px;
            vertical-align: top;
            display: block;
            max-width: 580px;
            padding: 10px;
            width: 580px;
            margin: 0 auto !important;
          "
        >
          <div
            style="
              box-sizing: border-box;
              display: block;
              margin: 0 auto;
              max-width: 580px;
              padding: 10px;
            "
          >
            <table
              style="
                border-collapse: separate;
                background: #fff;
                border-radius: 3px;
                width: 100%;
              "
            >
              <tbody>
                <tr>
                  <td
                    style="
                      font-family: sans-serif;
                      font-size: 14px;
                      vertical-align: top;
                      box-sizing: border-box;
                      padding: 20px;
                    "
                  >
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      style="border-collapse: separate; width: 100%"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              font-family: sans-serif;
                              font-size: 14px;
                              vertical-align: top;
                            "
                          >
                            <div style="width: 100%; text-align: center; display: flex;">
                              <img
                                style="text-align: center"
                                src="https://api.fragranceday.com/storage/imgs/left.png"
                                alt=""                              
                                height="180"
                                class="CToWUd a6T"
                                tabindex="0"
                              />
                              <img
                                style="text-align: center"
                                src="https://api.fragranceday.com/storage/imgs/right.png"
                                alt=""
                                height="180"
                                class="CToWUd a6T"
                                tabindex="0"
                              />
                              <div
                                class="a6S"
                                dir="ltr"
                                style="
                                  opacity: 0.01;
                                  left: 747.549px;
                                  top: 166.778px;
                                "
                              >
                                <div
                                  id=":376"
                                  class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q"
                                  title="Download"
                                  role="button"
                                  tabindex="0"
                                  aria-label="Download attachment "
                                  data-tooltip-class="a1V"
                                >
                                  <div class="akn">
                                    <div class="aSK J-J5-Ji aYr"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div style="width: 100%; text-align: center">
                              <!-- <img
                                src="https://ci3.googleusercontent.com/proxy/Qlz5lynhPOcNPKKw1sqjhcYdgFapANVWfIp7K4MGP30w5bS9zc7UUB0-JvDEftfxvz1jdJP8QEdLIlOCkUAIofhbz_I4dYS0HzokgQKdla9U5RnS8lHg7NdDwEHHRodw=s0-d-e1-ft#https://www.tffnotables.org/wp-content/uploads/2022/01/Unknown-2-1-300x53.png"
                                alt=""
                                width="300"
                                height="53"
                                class="CToWUd"
                              /> -->
                            </div>
                            <div></div>
                            <p>Dear ${model.firstName},</p>
                            <p>
                              <span style="font-weight: 400"
                                >Thank you for registering for The Fragrance
                                Foundation’s <b>The Fragrance Day</b> Virtual
                                Event! Mark your calendar by clicking the link
                                below so you don't miss the event.</span
                              >
                            </p>
                            <p>&nbsp;</p>
                            <p>
                            <span style="font-weight: 400"
                              >Exciting news!  Since you were one of the first 1000 event registrants, you will be receiving our complimentary Scent Journey Kit with scents featured during the event. This will arrive at the address you provided by Friday, March 18th. 
                              </span
                            >
                          </p>
                            <p>&nbsp;</p>
                            <p>
                              <b>The Fragrance Day</b>
                            </p>
                            <p><b>Date: Monday, March 21</b></p>
                            <p><b>Time: 12:00 PM - 5:00 PM ET</b></p>
                            <p>
                              <span style="font-weight: 400"
                                >Click on the calendar link below to add the
                                event to your calendar:</span
                              >
                            </p>

                            <p>
                              <b>Monday, March 21</b>
                            </p>

                            <p>
                              <a href="https://www.google.com/calendar/render?action=TEMPLATE&text=Registration%20Confirmation%20for%20The%20Fragrance%20Foundation%E2%80%99s%20Fragrance%20Day%202022%20Virtual%20Event&dates=20211020T160000Z/20211020T210000Z&details=Registration%20Confirmation%20for%20The%20Fragrance%20Foundation%E2%80%99s%20Fragrance%20Day%202022%20Virtual%20Event%0D%0A%3Ca%20href%3D%22https%3A%2F%2Ffragranceday.org%2Flive%2F2%22%3ELIVE%20EVENT%20WEBCAST%3C%2Fa%3E&location=TFF&trp=true&sf=true&output=xml#f" target="_blank"
                                ><span style="font-weight: 400"
                                  >Google Calendar</span
                                ></a
                              >
                            </p>
                            <p>
                              <a href="https://api.fragranceday.com/storage/cal/fragrance-day-2022-virtual-event.ics" target="_blank"
                                ><span style="font-weight: 400"
                                  >Outlook Calendar</span
                                ></a
                              >
                            </p>
                            <p>
                              <a href="https://api.fragranceday.com/storage/cal/fragrance-day-2022-virtual-event.ics" target="_blank"
                                ><span style="font-weight: 400"
                                  >Apple Calendar</span
                                ></a
                              >
                            </p>
                            <p>&nbsp;</p>
                            <p>
                             <span style="font-weight: 400"
                                  >Program of events schedule available <a href="https://fragrance.org" target="_blank">@fragrance.org</a></span
                                >
                            </p>
                            <p>
                              <a href="https://fragranceday.org/live/2" target="_blank" data-saferedirecturl=""
                                ><span style="font-weight: 400"
                                  >Click Here To View Event Webcast</span
                                ></a
                              >
                            </p>
                            <p><span style="font-weight: 400">&nbsp;</span></p>
                            <p>
                              <span style="font-weight: 400"
                                >We look forward to seeing you there! <a href="https://www.instagram.com/explore/tags/fragranceday/?hl=en"></span
                              >
                            </p>
                            <p>
                            <span style="font-weight: 400">
                            <a href="https://www.instagram.com/fragrancefoundation/?hl=en">#FragranceDay</a> <a href="https://www.instagram.com/fragrancefoundation/?hl=en">#FragranceForwardTFF</a> <a href="https://www.instagram.com/fragrancefoundation/?hl=en">@fragrancefoundation</a>
                            </span>
                            </p>
                            <p>
                              <span style="font-weight: 400"
                                >For any technical support questions, ema</span
                              ><span style="font-weight: 400"
                                >il
                                <a
                                  href="mailto:info@fragranceday.org"
                                  target="_blank"
                                  >info@fragranceday.org</a
                                ></span
                              >
                            </p>
                            <p>
                              <span style="font-weight: 400"
                                >or call 212-629-0622.</span
                              >
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>

            <div
              style="
                clear: both;
                padding-top: 10px;
                text-align: center;
                width: 100%;
              "
            >
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                style="border-collapse: separate; width: 100%"
              >
                <tbody>
                  <tr>
                    <td
                      style="
                        font-family: sans-serif;
                        font-size: 14px;
                        vertical-align: top;
                        color: #999999;
                        font-size: 12px;
                        text-align: center;
                      "
                    >
                      <span
                        class="m_6079988073592711674apple-link"
                        style="
                          color: #999999;
                          font-size: 12px;
                          text-align: center;
                        "
                        ><a
                          href="https://www.tffnotables.org"
                          style="font-size: 12px; text-align: center"
                          target="_blank"
                          data-saferedirecturl="https://www.google.com/url?q=https://www.tffnotables.org&amp;source=gmail&amp;ust=1645730711146000&amp;usg=AOvVaw1fOhxWkqf5fODLX8OLy_de"
                        ></a
                      ></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </td>
        <td
          style="font-family: sans-serif; font-size: 14px; vertical-align: top"
        >
          &nbsp;
        </td>
      </tr>
    </tbody>
  </table>
  <div class="yj6qo"></div>
  <div class="adL"></div>
</div>

        `,
    });

    let notification = await this._mailerService.sendMail({
      to: 'info@fragranceday.org',
      from: 'info@fragranceday.org',
      subject:
        'Registration Notification for The Fragrance Foundation’s Fragrance Day 2022 Virtual Event',
      html: `
      The following submission was made for: {event-title} at {venue} on {event-date}
<table>
<tbody>
<tr>
<td>First Name:</td>
<td>${entity.firstName}</td>
</tr>
<tr>
<td>Last Name:</td>
<td>${entity.lastName}</td>
</tr>
<tr>
<td>Email:</td>
<td>${entity.email}</td>
</tr>
<tr>
<td>Title:</td>
<td>${entity.title}</td>
</tr>
<tr>
<td>Company:</td>
<td>${entity.company}</td>
</tr>

<tr>
<td>Capacity:</td>
<td>${entity.capacity}</td>
</tr>

<tr>
<td>Country:</td>
<td>${entity.country}</td>
</tr>


<tr>
<td>State:</td>
<td>${entity.state}</td>
</tr>
<tr>

<tr>
<td>Zip Code:</td>
<td>${entity.zipCode}</td>
</tr>
<tr>
<td>City:</td>
<td>${entity.city}</td>
</tr>

<tr>
<td>Street:</td>
<td>${entity.street}</td>
</tr>
<tr>

<tr>
<td>Apt# / floor:</td>
<td>${entity.apt}</td>
</tr>
<tr>

<tr>
<td>Registration Date:</td>
<td>${entity.registrationDate}</td>
</tr>
<tr>

<tr>
<td>Subscribed to newsletter:</td>
<td>${entity.isSubscribed}</td>
</tr>
<tr>




</tbody>
</table>
      `,
    });

    console.log(result);

    return newEntry;
  }
}
