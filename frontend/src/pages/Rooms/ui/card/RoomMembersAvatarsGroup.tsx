import AvatarGroup from '@mui/material/AvatarGroup';

import {
    AgnesAvatar,
    CindyAvatar,
    RemyAvatar,
    TravisAvatar,
    TrevorAvatar,
} from '@shared/assets';

import { AVATAR_SIZE_STYLE } from './constants';
import { RoomMemberAvatar } from './RoomMemberAvatar';

function MockMembersList() {
    return (
        <>
            <RoomMemberAvatar alt="Remy Sharp" src={RemyAvatar} />
            <RoomMemberAvatar alt="Travis Howard" src={TravisAvatar} />
            <RoomMemberAvatar alt="Cindy Baker" src={CindyAvatar} />
            <RoomMemberAvatar alt="Agnes Walker" src={AgnesAvatar} />
            <RoomMemberAvatar alt="Trevor Henderson" src={TrevorAvatar} />
        </>
    );
}

export function RoomMembersAvatarsGroup() {
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
