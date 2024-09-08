import { AvatarGroup } from '@mui/material';

import RemyAvatar from '../../vendor/images/avatars/1.jpg';
import TravisAvatar from '../../vendor/images/avatars/2.jpg';
import CindyAvatar from '../../vendor/images/avatars/3.jpg';
import AgnesAvatar from '../../vendor/images/avatars/4.jpg';
import TrevorAvatar from '../../vendor/images/avatars/5.jpg';
import { AVATAR_SIZE_STYLE } from './constants';
import RoomMember from './RoomMember';

function MockMembersList() {
    return (
        <>
            <RoomMember alt="Remy Sharp" src={RemyAvatar} />
            <RoomMember alt="Travis Howard" src={TravisAvatar} />
            <RoomMember alt="Cindy Baker" src={CindyAvatar} />
            <RoomMember alt="Agnes Walker" src={AgnesAvatar} />
            <RoomMember alt="Trevor Henderson" src={TrevorAvatar} />
        </>
    );
}

function RoomMembers() {
    return (
        <AvatarGroup
            max={4}
            sx={{
                margin: 1,
            }}
            slotProps={{
                surplus: {
                    sx: {
                        ...AVATAR_SIZE_STYLE,
                        fontSize: 16,
                    },
                },
            }}
        >
            <MockMembersList />
        </AvatarGroup>
    );
}

export default RoomMembers;
