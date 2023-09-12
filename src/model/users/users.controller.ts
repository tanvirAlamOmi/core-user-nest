import { Body, Controller, Get, Post, UseGuards, Request, Param, Patch, Put, Delete } from '@nestjs/common';
import { Roles } from 'src/common/decorators/metadatas/role';
import { Permissions } from 'src/common/decorators/metadatas/permission';
import { RolesEnum, PermissionsEnum } from 'src/common/enums';
import { RolesGuard } from 'src/common/guards/roles';
import { PermissionsGuard } from 'src/common/guards/permissions';
import { UpdateDto, UserDto } from './dto';
import { User } from './entities';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor( private readonly service: UsersService ) {}

    @Get()
    @UseGuards(RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.USER)
    async get(): Promise<User[]> {
        return await this.service.findAll(); 
    } 
    
    @Get(':id')
    @UseGuards(RolesGuard, PermissionsGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.USER)
    @Permissions(PermissionsEnum.MASTER_USER)
    async getById(@Param('id') id: string): Promise<User> {
        return await this.service.findOne(id);
    }

    @Patch(':id')
    @UseGuards(RolesGuard)
    @Roles(RolesEnum.ADMIN)
    async update(@Param('id') id: string, @Body() UpdateDto: UpdateDto): Promise<UserDto> {
        return await this.service.update(id, UpdateDto);
    }

    // @Put(':id')
    // async replace(@Param('id') id: string, @Body() userDto: UserDto): Promise<User> {
    //     return await this.service.replace(id, userDto); 
    // }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<UserDto>  {
        return await this.service.delete(id);
    }
}
