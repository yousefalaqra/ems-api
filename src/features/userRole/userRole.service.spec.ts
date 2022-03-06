import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleServices } from './userRole.service';

describe('UserRoleServices', () => {
  let service: UserRoleServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRoleServices],
    }).compile();

    service = module.get<UserRoleServices>(UserRoleServices);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});