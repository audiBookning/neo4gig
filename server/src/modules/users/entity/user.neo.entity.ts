import { CreateUserNeoDto } from '../dto/createUser.neo.dto';
import { Genre } from '../../genres/entity/genre.neo.entity';
import { Event } from '../../events/entity/event.neo.entity';
import { Band } from '../../bands/entity/band.neo.entity';
import { AbstractNeoEntity } from '../../../common/entity/abstract-neo-entity.';

export class User extends AbstractNeoEntity {
    static readonly entityName = 'User';
    static readonly relationships = {
        'User->': {
            relationShipName: 'FOLLOWS',
            property: 'following',
            className: User,
        },
        'User<-': {
            relationShipName: 'FOLLOWS',
            property: 'followers',
        },
        'Genre->': {
            relationShipName: 'INTERESTED_INTO',
            property: 'genres',
            className: Genre,
        },
        'Event->': {
            relationShipName: 'ATTENDS',
            property: 'events',
            className: Event,
        },
        'Band->': {
            relationShipName: 'LIKES',
            property: 'likedBands',
            className: User,
        },
        'Band<-': {
            relationShipName: 'HAS_MEMBER',
            property: 'band',
        },
    };

    constructor();
    constructor(user: CreateUserNeoDto);
    constructor(user?: any)
    {
        super();
        this.id = user && user.id || null;
        this.name = user && user.name || null;
        this.email = user && user.email || null;
        this.city = user && user.city || null;
        this.instrument = user && user.instrument || null;
        this.isMusician = user && user.isMusician;
        this.following = user && user.following || [];
        this.followers = user && user.followers || [];
        this.genres = user && user.followers || [];
        this.likedBands = user && user.likedBands || [];
        this.band = user && user.band || null;
    }

    id: number;

    name: string;

    email: string;

    city: string;

    instrument: string;

    isMusician: string;

    following: User[];

    followers: User[];

    genres: Genre[];

    events: Event[];

    likedBands: Band[];

    band: Band;

    static associate(entityName): object {
        if (User.relationships === null) {
            return null;
        }

        return User.relationships[entityName];
    }
}
