import { Controller, Get, Post, Body, Param, HttpStatus } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
@Controller('users/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('createRoles')
  createRoles(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRoles(createRoleDto);
  }

  @Get('all')
  getAllRoles() {
    return this.rolesService.getAllRoles();
  }
  @Get(':id')
  getRoleById(@Param('id') id: number) {
    return this.rolesService.getRoleById(+id);
  }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
  //   return this.rolesService.update(+id, updateRoleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.rolesService.remove(+id);
  // }
}
