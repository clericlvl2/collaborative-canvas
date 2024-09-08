import { Avatar, type AvatarProps } from '@mui/material';

import { AVATAR_SIZE_STYLE } from './constants';

function RoomMember(props: AvatarProps) {
    return <Avatar {...props} sx={AVATAR_SIZE_STYLE} />;
}

export default RoomMember;
