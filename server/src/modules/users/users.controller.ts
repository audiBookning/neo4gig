import {
    Controller,
    Get,
    Response,
    HttpStatus,
    Param,
    Body,
    Post,
    Put,
    Delete,
    UsePipes,
    ValidationPipe, Inject,
} from '@nestjs/common';
import { IUsersService } from './interfaces/users-service.interface';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateEventNeoDto } from '../events/dto/createEvent.neo.dto';

@Controller('users')
export class UsersController {
    private readonly usersService: IUsersService;

    constructor(@Inject('UsersService') usersService: IUsersService) {
        this.usersService = usersService;
    }

    @Get()
    public async getUsers(@Response() res) {
        const users = await this.usersService.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Get('/:id')
    public async getUser(@Response() res, @Param() param) {
        const user = await this.usersService.findById(param.id);
        return res.status(HttpStatus.OK).json(user);
    }

    @Get('/:id/feed')
    public async getUserFeed(@Response() res, @Param() param) {
        const user = await this.usersService.getUserFeed(param.id);
        return res.status(HttpStatus.OK).json(user);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    public async createUser(@Response() res, @Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        return res.status(HttpStatus.OK).json(user);
    }

    @Put('/:id')
    public async updateUser(@Param() param, @Response() res, @Body() body) {
        const user = await this.usersService.update(param.id, body);
        return res.status(HttpStatus.OK).json(user);
    }

    @Put('/:id/follow-change')
    public async updateUserFollows(@Param() param, @Response() res, @Body() body) {
        const user = await this.usersService.updateFollow(body);
        return res.status(HttpStatus.OK).json(user);
    }

    @Put('/:id/interest-change')
    public async updateUserInterests(@Param() param, @Response() res, @Body() body) {
        const genre = await this.usersService.updateInterest(body);
        return res.status(HttpStatus.OK).json(genre);
    }

    @Put('/:id/attendance-change')
    public async updateUserAttendings(@Param() param, @Response() res, @Body() body) {
        const event = await this.usersService.updateAttendance(body);
        return res.status(HttpStatus.OK).json(event);
    }

    @Put('/:id/likes-change')
    public async updateUserLikes(@Param() param, @Response() res, @Body() body) {
        const band = await this.usersService.updateLikes(body);
        return res.status(HttpStatus.OK).json(band);
    }

    @Delete('/:id')
    public async deleteUser(@Param() param, @Response() res) {

        const user = await this.usersService.delete(param.id);
        return res.status(HttpStatus.OK).json(user);
    }

    @Post('/:neoId/events')
    @UsePipes(new ValidationPipe())
    public async createEvent(@Param() param, @Response() res, @Body() createEventNeoDto: CreateEventNeoDto) {
        const user = await this.usersService.createEvent(param.neoId, createEventNeoDto);
        return res.status(HttpStatus.OK).json(user);
    }

    @Get('/:neoId/genres/:id/suggested')
    public async getSuggestedUsersForGenre(@Response() res, @Param() param) {
        const users = await this.usersService.getSuggestedUsersByGenre(param.id, param.neoId, 5);
        return res.status(HttpStatus.OK).json(users);
    }

    @Get('/:neoId/bands/:id/suggested')
    public async getSuggestedUsersForBand(@Response() res, @Param() param) {
        const users = await this.usersService.getSuggestedUsersByBand(param.id, param.neoId, 5);
        return res.status(HttpStatus.OK).json(users);
    }
}
