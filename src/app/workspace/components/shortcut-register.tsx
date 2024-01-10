'use client';

import { useHotkeys } from 'react-hotkeys-hook';
import {CommandPalette} from "@/app/workspace/components/command-palette";

export default function ShortcutRegister() {
    return <>
        <CommandPalette/>
    </>
}