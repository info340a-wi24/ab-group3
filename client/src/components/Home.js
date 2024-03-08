'use strict';

import { Routes, Route, Navigate, Link } from 'react-router-dom';

import { HomeOption } from './home/HomeOption';
import { Discovery } from './home/Discovery';
import { Following } from './home/Following';
import { Saved } from './home/Saved';
import { Recent } from './home/Recent';

export function Home(props) {
    return (
        <>
            <HomeOption />
            <Routes>
                <Route path="discovery" element={<Discovery />} >
                    <Route index element={<Discovery />} />
                </Route>
                <Route path="following" element={<Following />} />
                <Route path="saved" element={<Saved />} />
                <Route path="recent" element={<Recent />} />
                <Route path="*" element={<Navigate to="discovery" />} />
            </Routes>
        </>
    )
}