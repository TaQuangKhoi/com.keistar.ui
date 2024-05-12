import {useEffect, useState} from 'react';
import { useSession } from '@/bonita/api/system/get-the-current-user-session';
export function useUsername() {
    const [session] = useSession();
    const [username, setUsername] = useState<string>();

    useEffect(() => {
        if (session.user_name) {
            setUsername(session.user_name);
        }
    }, [session]);

    return [username];
}
