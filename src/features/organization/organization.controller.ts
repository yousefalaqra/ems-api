import { Body,Post,Controller } from "@nestjs/common";
import { OrganizationModel } from "./models/organization.model";
import { OrganizationService } from "./organization.service";

@Controller('/api/v1/organizaton')

export class OrganizationController{
    constructor(
        private _organizationService:OrganizationService,
    ){}

    @Post('')
    async create(@Body() model:OrganizationModel) {
      return this._organizationService.create(model);
    }
}