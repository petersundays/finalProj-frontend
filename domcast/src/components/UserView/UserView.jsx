import React, { useEffect, useState } from 'react';
import UserViewProfilePublic from './UserViewProfilePublic/UserViewProfilePublic';
import UserViewProfilePrivate from './UserViewProfilePrivate/UserViewProfilePrivate';
import { userStore } from "../../stores/UserStore";

const UserView = (() => {
    const { user } = userStore;

    return user.visible ? <UserViewProfilePublic /> : <UserViewProfilePrivate />;
});

export default UserView;